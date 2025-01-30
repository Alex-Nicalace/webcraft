class Hanks {
  constructor(public hunks: string[]) {}
  get(from: number, to?: number, isConcat = false) {
    const subArray = this.hunks.slice(from, to);
    return isConcat ? subArray.join(' ') : subArray;
  }
}

const hunkArr = [
  'С 2021 года занимаюсь фронтенд-разработкой. Убеждён, что прочная база в HTML, CSS и JavaScript — основа для уверенной работы. Поэтому стараюсь основе уделять достаточное внимание.',
  'Однако для более эффективной разработки выбрал React и на данный момент позиционирую себя как React-разработчик.',
  'Считаю, что использование любой библиотеки или фреймворка без понимания основ фронтенда ведёт к поверхностному освоению технологии.',
  'В портфолио есть проекты, выполненные без фреймворков и сторонних библиотек — на чистом JavaScript и SCSS.',
  'Среди них есть объемные проекты такие как интернет-магазин.',
  'Эти проекты позволили глубже разобраться в возможностях нативного JavaScript и лучше понять, как работают ключевые механизмы фронтенда.',
  'Последние проекты я делаю на React с использованием TypeScript. Среди них — интернет-магазин с бэкендом, а так же и этот, просмативаемый сайт.',
  'В процессе реализации проектов на React использовал сторонние библиотеки Redux, React Query, React Hook Form, Tailwind, Styled Components и другие укрепляя ключевые навыки.',
  'В прошлом работал программистом с использованием Delphi и T-SQL для MS SQL Server. Опыт разработки серверной логики помогает мне лучше понимать взаимодействие фронтенда с бэкэндом.',
  'Ищу проект, где смогу применить свои знания React TypeScript, одновременно расширяя профессиональный кругозор. Для меня важно, чтобы был баланс между решением задач и изучением новых технологий.',
  'Хочу работать в команде, где  стремятся соблюдать хорошие практики и уделяют внимание качеству кода.',
  'Мои работы — примеры верстки сложных интерфейсов с анимацией, выпадающими списками и попапами, а также проекты на React с применением TypeScript. Ссылки на проекты и их исходники доступны в разделе проектов и на GitHub.',
];

const hunks = new Hanks(hunkArr);

export const paragraphsByScreenSize = {
  pc: [hunks.get(0, 1), hunks.get(1, 4), hunks.get(4, 8), hunks.get(8)],
  tablet: [hunks.get(0, 2), hunks.get(2, 7), hunks.get(7)],
  mobile: [hunks.get(0, 1), hunks.get(1, 11), hunks.get(11)],
  mobileSmall: [
    [hunks.get(0, 2, true), hunks.get(2, 3)],
    [hunks.get(3, 5, true), hunks.get(5, 7, true)],
    hunks.get(7, 9),
    [hunks.get(9, 11, true), hunks.get(11)],
  ],
  mobileUltraSmall: [
    [hunks.get(0, 1), hunks.get(1, 3, true)],
    [hunks.get(3, 5, true), hunks.get(5, 7, true)],
    hunks.get(7, 9),
    [hunks.get(9, 10), hunks.get(10, 12, true)],
  ],
};
