/** Весь контент сайта — только подтверждённые формулировки из текущей версии ADVISER. */

export type Mode = 'voice' | 'code' | 'trade'

const files = import.meta.glob<string>('./assets/media/*.webp', { eager: true, query: '?url', import: 'default' })
const media = (file: string) => files[`./assets/media/${file}`]

export interface Direction {
  id: Mode
  anchor: string
  index: string
  name: string
  word: string
  kicker: string
  tagline: string
  summary: string
  tags: string[]
  modalTitle: string
  modalLead?: string
  modalBody: string[]
  pipeline?: string[]
  image: { src: string; srcSet: string; full: string; width: number; height: number; alt: string }
}

export const directions: Direction[] = [
  {
    id: 'voice',
    anchor: 'voice',
    index: '01',
    name: 'Voice & Communications',
    word: 'Связь.',
    kicker: 'Voice & Communications',
    tagline: 'Связь без границ',
    summary:
      'Опыт с VoIP, Cisco, интеграциями и цифровыми коммуникациями. Надёжная связь — основа эффективных команд.',
    tags: ['Cisco CUCM', 'Unity', 'Jabber', 'SIP', 'MRA', 'VoIP'],
    modalTitle: 'Cisco Unified Communications',
    modalBody: [
      'Cisco Unified Communications — это корпоративная система для организации рабочих коммуникаций. Она объединяет в одной экосистеме IP-телефонию, видеосвязь, сообщения, контроль присутствия и голосовую почту.',
      'Система позволяет эффективно управлять звонками и другими видами связи, подключать удалённых сотрудников и интегрироваться с различными устройствами и сервисами.',
    ],
    image: {
      src: media('cisco-uc-800.webp'),
      srcSet: `${media('cisco-uc-800.webp')} 800w, ${media('cisco-uc-1540.webp')} 1540w`,
      full: media('cisco-uc-1540.webp'),
      width: 1540,
      height: 1021,
      alt: 'Cisco Unified Communications — архитектура корпоративной связи',
    },
  },
  {
    id: 'code',
    anchor: 'vibe-coding',
    index: '02',
    name: 'Vibe-Coding',
    word: 'Код.',
    kicker: 'Vibe-Coding',
    tagline: 'Идеи в решения',
    summary:
      'Автоматизация, скрипты, боты и веб-решения. Превращаю идеи в работающие инструменты с помощью современных технологий и ИИ.',
    tags: ['Веб-сайты', 'Приложения', 'Скрипты', 'Боты', 'Автоматизация', 'Анализ данных'],
    modalTitle: 'Вайб-кодинг',
    modalLead: 'Любая идея. Реальные результаты.',
    modalBody: [
      'Вайб-кодинг — это современный подход к созданию решений с помощью искусственного интеллекта. Ты описываешь идею на обычном языке, а ИИ помогает превратить её в работающий результат.',
      'Это может быть веб-сайт, приложение, скрипт, аналитика, презентация, текст, изображение или видео — возможности практически безграничны.',
      'Главное — правильно поставить задачу. Я помогаю превратить идеи в реальные и полезные решения.',
    ],
    image: {
      src: media('vibe-coding-720.webp'),
      srcSet: `${media('vibe-coding-720.webp')} 720w, ${media('vibe-coding-1222.webp')} 1222w`,
      full: media('vibe-coding-1222.webp'),
      width: 1222,
      height: 1287,
      alt: 'Vibe-Coding — автоматизация, скрипты, боты и веб-решения',
    },
  },
  {
    id: 'trade',
    anchor: 'trader',
    index: '03',
    name: 'Trader',
    word: 'Результат.',
    kicker: 'Trader',
    tagline: 'Стратегии для роста',
    summary:
      'Алгоритмическая торговля, стратегия, алгоритм, бэктесты, дисциплина и технологии для стабильного результата.',
    tags: ['Алготрейдинг', 'Стратегии', 'Бэктесты', 'DCA', 'Риск-менеджмент'],
    modalTitle: 'План. Алгоритм. Прибыль.',
    modalLead: 'Рынок не спит — человек спит.',
    modalBody: [
      'Поэтому я предпочитаю алгоритмическую торговлю ручной. Торговый бот не испытывает эмоций, не устаёт и не принимает импульсивных решений — он 24/7 следует заранее определённой стратегии. Когда закрывается одна торговая сессия, открывается другая, а алгоритм продолжает работать.',
      'Я сторонник системного подхода. Отдельно интересуюсь DCA-стратегиями, проверяя их работу на больших временных интервалах и исторических данных.',
    ],
    pipeline: ['Стратегия', 'Алгоритм', 'Бэктесты', 'Оптимизация', 'Дисциплинированное исполнение'],
    image: {
      src: media('trader-dca-720.webp'),
      srcSet: `${media('trader-dca-720.webp')} 720w, ${media('trader-dca-1312.webp')} 1312w`,
      full: media('trader-dca-1312.webp'),
      width: 1312,
      height: 1199,
      alt: 'Алготрейдинг DCA — накопление позиции, усреднение цены и автоматический выход из сделки',
    },
  },
]

export const accent: Record<Mode, string> = {
  voice: '#2563ff',
  code: '#6b3cf5',
  trade: '#0b8f76',
}



export const contacts = {
  email: 'lordos2003@gmail.com',
  telegram: { handle: '@Adviser2003', url: 'https://t.me/Adviser2003' },
  max: { label: 'Открыть профиль', url: 'https://max.ru/u/f9LHodD0cOINbCtoLFVXTD6X_0xKMcoa9axErnXpC_4mnjUoSE9VbxSBwFo' },
}

export const aboutText = [
  'Я инженер, который больше пятнадцати лет живёт в мире корпоративной телефонии и унифицированных коммуникаций — Cisco CUCM, Unity, Jabber, SIP, MRA. Но по-настоящему меня драйвит не список технологий, а момент, когда сложная система наконец начинает работать так, как задумано. Умею находить причину проблемы там, где другие разводят руками, и объяснять это простым языком — заказчику, коллеге или новичку в команде.',
  'А ещё меня по-настоящему завораживают возможности vibe coding и алгоритмической торговли — то, как автоматизация и анализ данных открывают совершенно новые способы решать задачи. По характеру я человек открытый и позитивный, сложных задач не боюсь. Женат, воспитываю дочь — это то, что держит в тонусе и напоминает, зачем всё это.',
]

export const aboutPhoto = {
  src: media('about-photo-768.webp'),
  srcSet: `${media('about-photo-480.webp')} 480w, ${media('about-photo-768.webp')} 768w`,
  alt: 'Инженер ADVISER на балконе у моря на закате',
}

export const nav = [
  { href: '#directions', label: 'Направления', id: 'directions' },
  { href: '#about', label: 'Обо мне', id: 'about' },
  { href: '#contact', label: 'Контакты', id: 'contact' },
]
