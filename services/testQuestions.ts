
export interface TestQuestionOption {
  text: string;
  value: string;
}

export interface TestQuestion {
  id: string;
  text: string;
  options: TestQuestionOption[];
  condition?: {
    questionId: string;
    values: string[];
  };
}

export interface TestSection {
  id: string;
  title: string;
  questions: TestQuestion[];
}

export const testQuestions: TestSection[] = [
  {
    id: 'general',
    title: 'I. Общие вопросы',
    questions: [
      {
        id: 'general_1_overwhelmed',
        text: 'Как часто ты чувствуешь себя перегруженным(ой) делами и обязанностями?',
        options: [
          { text: 'Очень часто', value: 'very_often' },
          { text: 'Часто', value: 'often' },
          { text: 'Иногда', value: 'sometimes' },
          { text: 'Редко', value: 'rarely' },
          { text: 'Никогда', value: 'never' },
        ],
      },
      {
        id: 'general_1a_planning',
        text: 'Тебе трудно планировать свое время?',
        options: [{ text: 'Да', value: 'yes' }, { text: 'Нет', value: 'no' }],
        condition: { questionId: 'general_1_overwhelmed', values: ['very_often', 'often'] },
      },
      {
        id: 'general_1b_say_no',
        text: 'Тебе трудно сказать "нет", когда тебя просят о помощи?',
        options: [{ text: 'Да', value: 'yes' }, { text: 'Нет', value: 'no' }],
        condition: { questionId: 'general_1_overwhelmed', values: ['very_often', 'often'] },
      },
      {
        id: 'general_2_concentration',
        text: 'Как часто ты испытываешь трудности с концентрацией внимания?',
        options: [
          { text: 'Очень часто', value: 'very_often' },
          { text: 'Часто', value: 'often' },
          { text: 'Иногда', value: 'sometimes' },
          { text: 'Редко', value: 'rarely' },
          { text: 'Никогда', value: 'never' },
        ],
      },
      {
        id: 'general_3_irritable',
        text: 'Как часто ты чувствуешь себя раздражительным(ой) или вспыльчивым(ой) без видимой причины?',
        options: [
          { text: 'Очень часто', value: 'very_often' },
          { text: 'Часто', value: 'often' },
          { text: 'Иногда', value: 'sometimes' },
          { text: 'Редко', value: 'rarely' },
          { text: 'Никогда', value: 'never' },
        ],
      },
      {
        id: 'general_4_tired',
        text: 'Как часто ты чувствуешь усталость, даже после того, как хорошо выспался(ась)?',
        options: [
          { text: 'Очень часто', value: 'very_often' },
          { text: 'Часто', value: 'often' },
          { text: 'Иногда', value: 'sometimes' },
          { text: 'Редко', value: 'rarely' },
          { text: 'Никогда', value: 'never' },
        ],
      },
      {
        id: 'general_5_worry',
        text: 'Ты часто беспокоишься о будущем?',
        options: [
          { text: 'Да, очень часто', value: 'very_often' },
          { text: 'Да, часто', value: 'often' },
          { text: 'Иногда', value: 'sometimes' },
          { text: 'Редко', value: 'rarely' },
          { text: 'Нет, никогда', value: 'never' },
        ],
      },
    ],
  },
  {
    id: 'school',
    title: 'II. Вопросы о школьном стрессе',
    questions: [
      {
        id: 'school_1_grades',
        text: 'Насколько сильно ты переживаешь из-за оценок в школе?',
        options: [
          { text: 'Очень сильно', value: 'very_much' },
          { text: 'Сильно', value: 'much' },
          { text: 'Умеренно', value: 'moderately' },
          { text: 'Слабо', value: 'slightly' },
          { text: 'Совсем не переживаю', value: 'not_at_all' },
        ],
      },
       {
        id: 'school_2_overload',
        text: 'Как часто ты чувствуешь, что не справляешься с объемом заданий в школе?',
        options: [
          { text: 'Очень часто', value: 'very_often' },
          { text: 'Часто', value: 'often' },
          { text: 'Иногда', value: 'sometimes' },
          { text: 'Редко', value: 'rarely' },
          { text: 'Никогда', value: 'never' },
        ],
      },
       {
        id: 'school_3_pressure',
        text: 'Как часто ты чувствуешь давление со стороны родителей/учителей в отношении учебы?',
        options: [
          { text: 'Очень часто', value: 'very_often' },
          { text: 'Часто', value: 'often' },
          { text: 'Иногда', value: 'sometimes' },
          { text: 'Редко', value: 'rarely' },
          { text: 'Никогда', value: 'never' },
        ],
      },
      {
        id: 'school_4_interest',
        text: 'Насколько тебе интересны предметы, которые ты изучаешь?',
        options: [
            { text: 'Очень интересно', value: 'very_interesting' },
            { text: 'Интересно', value: 'interesting' },
            { text: 'Нейтрально', value: 'neutral' },
            { text: 'Неинтересно', value: 'uninteresting' },
            { text: 'Совсем неинтересно', value: 'very_uninteresting' },
        ]
      },
      {
        id: 'school_5_test_stress',
        text: 'Как часто ты испытываешь стресс перед контрольными/тестами?',
        options: [
            { text: 'Всегда', value: 'always' },
            { text: 'Часто', value: 'often' },
            { text: 'Иногда', value: 'sometimes' },
            { text: 'Редко', value: 'rarely' },
            { text: 'Никогда', value: 'never' },
        ]
      },
      {
        id: 'school_6_focus',
        text: 'Трудно ли тебе сосредоточиться на уроках в школе?',
        options: [
            { text: 'Очень трудно', value: 'very_hard' },
            { text: 'Трудно', value: 'hard' },
            { text: 'Нейтрально', value: 'neutral' },
            { text: 'Легко', value: 'easy' },
            { text: 'Очень легко', value: 'very_easy' },
        ]
      },
      {
        id: 'school_7_satisfaction',
        text: 'Насколько ты доволен(а) своей успеваемостью в школе?',
        options: [
            { text: 'Полностью доволен(а)', value: 'fully_satisfied' },
            { text: 'В основном доволен(а)', value: 'mostly_satisfied' },
            { text: 'Нейтрально', value: 'neutral' },
            { text: 'В основном недоволен(а)', value: 'mostly_unsatisfied' },
            { text: 'Совершенно недоволен(а)', value: 'completely_unsatisfied' },
        ]
      }
    ],
  },
   {
    id: 'social',
    title: 'III. Вопросы о социальных отношениях',
    questions: [
        {
            id: 'social_1_lonely',
            text: 'Как часто ты чувствуешь себя одиноким(ой) или изолированным(ой) от сверстников?',
            options: [
              { text: 'Очень часто', value: 'very_often' },
              { text: 'Часто', value: 'often' },
              { text: 'Иногда', value: 'sometimes' },
              { text: 'Редко', value: 'rarely' },
              { text: 'Никогда', value: 'never' },
            ],
        },
        {
            id: 'social_2_conflicts',
            text: 'Как часто ты испытываешь конфликты с друзьями или одноклассниками?',
            options: [
              { text: 'Очень часто', value: 'very_often' },
              { text: 'Часто', value: 'often' },
              { text: 'Иногда', value: 'sometimes' },
              { text: 'Редко', value: 'rarely' },
              { text: 'Никогда', value: 'never' },
            ],
        },
        {
            id: 'social_3_misunderstood',
            text: 'Как часто ты чувствуешь, что тебя не понимают окружающие?',
            options: [
              { text: 'Очень часто', value: 'very_often' },
              { text: 'Часто', value: 'often' },
              { text: 'Иногда', value: 'sometimes' },
              { text: 'Редко', value: 'rarely' },
              { text: 'Никогда', value: 'never' },
            ],
        },
        {
            id: 'social_4_support',
            text: 'Чувствуешь ли ты поддержку со стороны семьи и друзей?',
            options: [
                { text: 'Всегда', value: 'always' },
                { text: 'Часто', value: 'often' },
                { text: 'Иногда', value: 'sometimes' },
                { text: 'Редко', value: 'rarely' },
                { text: 'Никогда', value: 'never' },
            ]
        },
        {
            id: 'social_5_comfort',
            text: 'Насколько комфортно ты чувствуешь себя в школьном коллективе?',
            options: [
                { text: 'Очень комфортно', value: 'very_comfortable' },
                { text: 'Комфортно', value: 'comfortable' },
                { text: 'Нейтрально', value: 'neutral' },
                { text: 'Некомфортно', value: 'uncomfortable' },
                { text: 'Совершенно некомфортно', value: 'very_uncomfortable' },
            ]
        },
        {
            id: 'social_6_new_friends',
            text: 'Легко ли тебе заводить новых друзей?',
            options: [
                { text: 'Очень легко', value: 'very_easy' },
                { text: 'Легко', value: 'easy' },
                { text: 'Нейтрально', value: 'neutral' },
                { text: 'Трудно', value: 'hard' },
                { text: 'Очень трудно', value: 'very_hard' },
            ]
        }
    ]
  },
  {
    id: 'physical',
    title: 'IV. Вопросы о физическом состоянии',
    questions: [
        {
            id: 'physical_1_pain',
            text: 'Как часто ты испытываешь головные боли или боли в животе без видимой причины?',
            options: [
              { text: 'Очень часто', value: 'very_often' },
              { text: 'Часто', value: 'often' },
              { text: 'Иногда', value: 'sometimes' },
              { text: 'Редко', value: 'rarely' },
              { text: 'Никогда', value: 'never' },
            ],
        },
        {
            id: 'physical_2_appetite',
            text: 'Изменился ли твой аппетит в последнее время?',
            options: [
                { text: 'Улучшился', value: 'improved' },
                { text: 'Ухудшился', value: 'worsened' },
                { text: 'Не изменился', value: 'no_change' },
            ],
        },
        {
            id: 'physical_3_sleep',
            text: 'Как часто ты испытываешь проблемы со сном (бессонница, беспокойный сон)?',
            options: [
              { text: 'Очень часто', value: 'very_often' },
              { text: 'Часто', value: 'often' },
              { text: 'Иногда', value: 'sometimes' },
              { text: 'Редко', value: 'rarely' },
              { text: 'Никогда', value: 'never' },
            ],
        },
        {
            id: 'physical_4_energy',
            text: 'Чувствуешь ли ты постоянную нехватку энергии?',
            options: [
                { text: 'Да, постоянно', value: 'always' },
                { text: 'Часто', value: 'often' },
                { text: 'Иногда', value: 'sometimes' },
                { text: 'Редко', value: 'rarely' },
                { text: 'Никогда', value: 'never' },
            ],
        }
    ]
  },
  {
    id: 'personal',
    title: 'V. Вопросы о личных переживаниях',
    questions: [
        {
            id: 'personal_1_share',
            text: 'Есть ли у тебя какие-то личные переживания, которыми тебе трудно поделиться с кем-либо?',
            options: [
                { text: 'Да, очень серьезные', value: 'yes_serious' },
                { text: 'Да, но я не хотел(а) бы говорить об этом', value: 'yes_private' },
                { text: 'Нет', value: 'no' },
            ]
        },
        {
            id: 'personal_2_hopelessness',
            text: 'Как часто ты испытываешь чувство безнадежности или отчаяния?',
            options: [
              { text: 'Очень часто', value: 'very_often' },
              { text: 'Часто', value: 'often' },
              { text: 'Иногда', value: 'sometimes' },
              { text: 'Редко', value: 'rarely' },
              { text: 'Никогда', value: 'never' },
            ],
        },
        {
            id: 'personal_3_meaningless',
            text: 'Появляются ли у тебя мысли о том, что жизнь не имеет смысла?',
            options: [
                { text: 'Да', value: 'yes' },
                { text: 'Иногда', value: 'sometimes' },
                { text: 'Нет', value: 'no' },
            ],
        },
        {
            id: 'personal_4_trusted_adult',
            text: 'Есть ли у тебя доверенный взрослый (родитель, учитель, родственник, друг), к которому ты можешь обратиться за помощью и поддержкой?',
            options: [
                { text: 'Да, всегда', value: 'yes_always' },
                { text: 'Да, обычно', value: 'yes_usually' },
                { text: 'Иногда', value: 'sometimes' },
                { text: 'Редко', value: 'rarely' },
                { text: 'Нет, никого', value: 'no_one' },
            ]
        },
        {
            id: 'personal_5_life_satisfaction',
            text: 'Насколько ты доволен(а) своей жизнью в целом?',
            options: [
                { text: 'Полностью доволен(а)', value: 'fully_satisfied' },
                { text: 'В основном доволен(а)', value: 'mostly_satisfied' },
                { text: 'Нейтрально', value: 'neutral' },
                { text: 'В основном недоволен(а)', value: 'mostly_unsatisfied' },
                { text: 'Совершенно недоволен(а)', value: 'completely_unsatisfied' },
            ]
        }
    ]
  }
];
