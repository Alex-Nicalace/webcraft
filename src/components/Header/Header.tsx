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

const MENU_ITEMS = [
  { label: 'Обо мне', href: '#section1' },
  { label: 'Портфолио', href: '#section2' },
  { label: '10 фактов', href: '#section3' },
];

// type THeaderProps = { }
function Header(/*{ }: THeaderProps*/): JSX.Element {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { isLessTablet, isLessMobileMd, isLessMobileSmall } = useScreenWidth();
  const { isDarkMode, toggleMode } = useDarkMode();
  const isMobileMenu = isLessTablet;

  return (
    <Container tag="header" className="header">
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
