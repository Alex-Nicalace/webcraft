import screenshotJpg1 from '../../assets/img/projects/01.jpg';
import screenshotWebP1 from '../../assets/img/projects/01.webp';
import screenshotJpg2 from '../../assets/img/projects/02.jpg';
import screenshotWebP2 from '../../assets/img/projects/02.webp';
import screenshotJpg3 from '../../assets/img/projects/03.jpg';
import screenshotWebP3 from '../../assets/img/projects/03.webp';
import screenshotJpg4 from '../../assets/img/projects/04.jpg';
import screenshotWebP4 from '../../assets/img/projects/04.webp';
import screenshotJpg5 from '../../assets/img/projects/05.jpg';
import screenshotWebP5 from '../../assets/img/projects/05.webp';
import screenshotJpg6 from '../../assets/img/projects/06.jpg';
import screenshotWebP6 from '../../assets/img/projects/06.webp';

export const PROJECTS = [
  {
    url: 'http://commerce.alex-webdev.ru/',
    title: 'Интернет-магазин одежды',
    popupData: {
      title: 'Название организации',
      imageUrl: {
        src: screenshotJpg1,
        sources: [{ srcset: screenshotWebP1, type: 'image/webp' }],
      },
    },
  },
  {
    url: 'http://build.alex-webdev.ru/',
    title: 'Сайт для строительной компании',
    popupData: {
      title: 'Название организации',
      imageUrl: {
        src: screenshotJpg2,
        sources: [{ srcset: screenshotWebP2, type: 'image/webp' }],
      },
    },
  },
  {
    url: 'http://stylish-image.alex-webdev.ru/',
    title: 'Интернет-магазин одежды',
    popupData: {
      title: 'Название организации',
      imageUrl: {
        src: screenshotJpg3,
        sources: [{ srcset: screenshotWebP3, type: 'image/webp' }],
      },
    },
  },
  {
    url: 'https://the-wild-oasis-mocha-gamma.vercel.app',
    title: 'Дашборд по бронированию отеля',
    popupData: {
      title: 'Название организации',
      imageUrl: {
        src: screenshotJpg4,
        sources: [{ srcset: screenshotWebP4, type: 'image/webp' }],
      },
    },
  },
  {
    url: 'http://consulting.alex-webdev.ru',
    title: 'Сайт для консалтинговой компании в сфере фармацевтики',
    popupData: {
      title: 'Название организации',
      imageUrl: {
        src: screenshotJpg5,
        sources: [{ srcset: screenshotWebP5, type: 'image/webp' }],
      },
    },
  },
  {
    url: 'http://sea-battle.alex-webdev.ru',
    title: 'Игра',
    popupData: {
      title: 'Название организации',
      imageUrl: {
        src: screenshotJpg6,
        sources: [{ srcset: screenshotWebP6, type: 'image/webp' }],
      },
    },
  },
];
