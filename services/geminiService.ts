import type { Student, ScreeningAnswers, AIAnalysisResult, SchoolData } from '../types';

// NOTE: This service now uses the Minimax API (OpenAI compatible) instead of Gemini/AgentRouter.
// The filename is kept for simplicity based on the user request.

const API_URL = 'https://api.minimax.io/v1/text/chatcompletion_v2';
const API_KEY = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJHcm91cE5hbWUiOiJBemFtYXQgSXNrYWtvdiIsIlVzZXJOYW1lIjoiQXphbWF0IElza2Frb3YiLCJBY2NvdW50IjoiIiwiU3ViamVjdElEIjoiMTk4Mzg3MTA0NDE4MzY1ODk5MyIsIlBob25lIjoiIiwiR3JvdXBJRCI6IjE5ODM4NzEwMzk3MDgzNDA3MjIiLCJQYWdlTmFtZSI6IiIsIk1haWwiOiJhLmlza2Frb3YxOTg5QGdtYWlsLmNvbSIsIkNyZWF0ZVRpbWUiOiIyMDI1LTExLTE3IDIwOjExOjE0IiwiVG9rZW5UeXBlIjoxLCJpc3MiOiJtaW5pbWF4In0.i24qDS6z8WinBO9rNyhJOKZcJGOdxu6OnPKIpo2A4McWGysSjo-2ONTn2tO29TUfZDx1QjeE--0epXykn69yB2J8RPY_JeY2U-bOg9Odpk7kly2oyTte_g3-uFw_oahCkHGdUIEXqnCaicQ-nhfVBzNqkIFpEGWqD9NSl5OiA28lsJkKPcBNwxnT1Bigvd8BbTHw3-c819YzW8_qfRUu5i0BeL776cruTqX8TuYI6hGlQ7x7lzTUbRn4xQOeBq6L56G1MDILC69Hdr2ZpMgt4qW0vIw7LrRSUsf31k7DDspM88t4o6q606HynE9Lb3sxHCdxBY0tZKkv2mC5Q2Z0qQ';
const MODEL = 'MiniMax-M2';

export const analyzeStudentData = async (
  student: Student,
  answers: ScreeningAnswers
): Promise<AIAnalysisResult> => {
  const systemPrompt = `Ты — ИИ-ассистент школьного психолога. Твоя задача — проанализировать данные об ученике для выявления социальных и поведенческих рисков и предложить персонализированный план поддержки. Ты ДОЛЖЕН отвечать только валидным JSON объектом со следующей структурой:
{
    "riskLevel": "string",
    "riskCategory": "string",
    "summary": "string",
    "recommendations": [
        {
            "type": "string",
            "title": "string",
            "description": "string"
        }
    ]
}
Не добавляй никаких объяснений или форматирования markdown (например, \`\`\`json).`;

  const userPrompt = `
    Проанализируй следующие данные об ученике и верни JSON.

    **Данные:**
    1.  **Поведенческие сигналы (из школьной системы):**
        *   Имя: ${student.name}, Класс: ${student.class}
        *   Посещаемость (последние месяцы): ${student.attendance.map(a => `${a.month}: ${a.percentage}%`).join(', ')}
        *   Успеваемость (средний балл): ${student.grades.map(g => `${g.subject}: ${g.grade}`).join(', ')}
        *   Инциденты: ${student.incidents.join(', ') || 'Нет'}

    2.  **Ответы на анкету SEL/Wellbeing:**
        *   Эмоциональное состояние (от 1 до 10): ${answers.emotionalState}
        *   Уровень стресса (обратная шкала, 1 - высокий, 10 - низкий): ${answers.stressLevel}
        *   Социальные навыки и отношения с одноклассниками (от 1 до 10): ${answers.socialSkills}
        *   Учебная мотивация (от 1 до 10): ${answers.motivation}
        *   Сталкивался(лась) ли с буллингом/насмешками?: ${answers.bullyingExperience}
        *   Личное описание состояния: ${answers.currentStateDescription || 'Не указано'}
  `;
  
  try {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: MODEL,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            response_format: { type: "json_object" }
        })
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("API Error Response:", errorBody);
        throw new Error(`API request failed with status ${response.status}\n\nResponse Body:\n${errorBody}`);
    }

    const data = await response.json();
    const jsonText = data.choices[0].message.content;
    if (!jsonText || !jsonText.trim().startsWith('{')) {
        throw new Error(`API returned a non-JSON or empty response:\n\n${jsonText}`);
    }
    return JSON.parse(jsonText) as AIAnalysisResult;

  } catch (error) {
    console.error("Error analyzing student data:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    // Fallback in case of API error
    return {
        riskLevel: 'Средний',
        riskCategory: 'Ошибка анализа',
        summary: 'Не удалось получить данные от ИИ. Показан примерный результат. Проверьте подключение и API-ключ.',
        recommendations: [
            { type: 'Психолог', title: 'Проверить систему', description: 'Произошла ошибка при обращении к API.' }
        ],
        error: errorMessage
    };
  }
};


export const generateSchoolForecast = async (data: SchoolData): Promise<string> => {
    const prompt = `
        Ты — ИИ-аналитик в сфере образования. Проанализируй краткую сводку по социальной обстановке в школе и дай краткий прогноз (2-3 предложения) о потенциальных проблемных группах или будущих вызовах.

        Данные:
        - Всего учеников: ${data.totalStudents}
        - Распределение по группам риска: ${data.riskDistribution.map(d => `${d.name}: ${d.value}`).join(', ')}
        - Динамика числа учеников в группе высокого риска за последние месяцы: ${data.riskDynamics.map(d => `${d.month}: ${d.highRiskCount}`).join(', ')}

        Пример ответа: "Наблюдается рост числа учащихся в группе высокого риска, особенно в зимние месяцы. Следует уделить внимание 9-м классам, где может возрастать стресс из-за подготовки к экзаменам."

        Твой прогноз:
    `;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { role: 'user', content: prompt }
                ],
                max_tokens: 150
            })
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error("API Error Response:", errorBody);
            throw new Error(`API request failed with status ${response.status}\n\nResponse Body:\n${errorBody}`);
        }

        const responseData = await response.json();
        return responseData.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error generating school forecast:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        return `Не удалось сгенерировать прогноз.\n\nДетали ошибки:\n${errorMessage}`;
    }
};