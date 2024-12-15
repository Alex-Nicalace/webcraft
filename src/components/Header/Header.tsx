import { useEffect, useState } from 'react';
import './Header.scss';
import Container from '../Container';
import Logo from '../Logo';
import MainMenu from '../MainMenu';
import Button from '../ui/Button';
import TogglerTheme from '../ui/TogglerTheme';
import { useScreenWidth } from '../../Context/ScreenWidthContext';
import BurgerButton from '../BurgerButton';
import { useDarkMode } from '../../Context/DarkModeContext';

const MENU_ITEMS = [
  { label: 'Обо мне', href: '#section1' },
  { label: 'Портфолио', href: '#section2' },
  { label: '10 фактов', href: '#section3' },
];

// type THeaderProps = { }
function Header(/*{ }: THeaderProps*/): JSX.Element {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLessTablet, isLessMobileMd, isLessMobileSmall } = useScreenWidth();
  const { isDarkMode, toggleMode } = useDarkMode();
  const isMobileMenu = isLessTablet;

  useEffect(function manageScrolledState() {
    // Первоначально реализовал с помощью window.addEventListener('scroll', ...)
    // в колбэке отслеживал значение window.scrollY и колбэк обернул в throttle.ts
    // Но решил попрактиковаться с IntersectionObserver
    const options = {
      root: null, // Наблюдаем за viewport
      threshold: 0, // Пересечение фиксируется мгновенно
      // Область наблюдения. Верхнюю границу поднял примерно на высоту хедера
      // а нижнюю поднял на всю высоту экрана вверх.
      // Т.о. получилась область наблюдения вне видимой части экрана сверху полосой в 60px
      rootMargin: '60px 0px -100.2% 0px',
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        setScrolled(entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(callback, options);
    // Ищем первый элемент после хедера, т.к. после него контент котрый и будет скроллиться
    const contentElem = document.querySelector('.header + *');
    if (contentElem) observer.observe(contentElem);

    return () => {
      if (contentElem) observer.unobserve(contentElem);
    };
  });

  return (
    <Container
      tag="header"
      className={['header', scrolled && 'header_scrolled']
        .filter(Boolean)
        .join(' ')}
    >
      <div className="header__logo-wrapper">
        <Logo className="header__logo" isSizeSmall={isLessMobileSmall} />
      </div>
      <div className="header__menu-wrapper">
        {isMobileMenu && (
          <BurgerButton
            className="header__burger"
            pressed={isMenuOpen}
            onClick={() => setMenuOpen(!isMenuOpen)}
          />
        )}
        <MainMenu
          className={!isMobileMenu ? 'header__menu' : ''}
          items={MENU_ITEMS}
          isSwitchable={isMobileMenu}
          isOpen={isMenuOpen}
          slotTop={
            isLessMobileSmall && (
              <TogglerTheme
                isDarkMode={isDarkMode}
                onClick={() => toggleMode()}
              />
            )
          }
        />
      </div>
      <div className="header__buttons">
        {!isLessMobileSmall && (
          <TogglerTheme
            className="header__toggler-theme"
            isDarkMode={isDarkMode}
            onClick={() => toggleMode()}
          />
        )}
        <Button className="header__button" href="#my-contacts">
          {isLessMobileMd ? 'Связаться' : 'Связаться со мной'}
        </Button>
      </div>
    </Container>
  );
}

export default Header;
