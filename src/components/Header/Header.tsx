import { useState } from 'react';
import './Header.scss';
import Container from '../Container';
import Logo from '../Logo';
import MainMenu from '../MainMenu';
import Button from '../ui/Button';
import TogglerTheme from '../ui/TogglerTheme';
import { useScreenWidth } from '../../Context/ScreenWidthContext';
import BurgerButton from '../BurgerButton';
import { useDarkMode } from '../../Context/DarkModeContext';
import { usePageScrolled } from '../../hooks/usePageScrolled';

const MENU_ITEMS = [
  { label: 'Обо мне', href: '#about-me' },
  { label: 'Портфолио', href: '#portfolio' },
  { label: '10 фактов', href: '#facts' },
];

// type THeaderProps = { }
function Header(/*{ }: THeaderProps*/): JSX.Element {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { isLessTablet, isLessMobileMd, isLessMobileSmall } = useScreenWidth();
  const { isDarkMode, toggleMode } = useDarkMode();
  const scrolledPage = usePageScrolled();
  const isMobileMenu = isLessTablet;

  function handleToggleDarkModeOnMobile() {
    toggleMode();
    setMenuOpen((prev) => !prev);
  }

  return (
    <Container
      tag="header"
      className={['header', scrolledPage && 'header_scrolled']
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
                onClick={handleToggleDarkModeOnMobile}
              />
            )
          }
          closeMenu={() => setMenuOpen(false)}
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
