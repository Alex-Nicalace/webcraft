import './Header.scss';
import Container from '../Container';
import Logo from '../Logo';
import MainMenu from '../MainMenu';
import Button from '../ui/Button';
import TogglerTheme from '../ui/TogglerTheme';

const MENU_ITEMS = [
  { label: 'Обо мне', href: '#section1' },
  { label: 'Портфолио', href: '#section2' },
  { label: '10 фактов', href: '#section3' },
];

// type THeaderProps = { }
function Header(/*{ }: THeaderProps*/): JSX.Element {
  return (
    <Container tag="header" className="header">
      <div className="header__logo-wrapper">
        <Logo className="header__logo" />
      </div>
      <div className="header__menu-wrapper">
        <MainMenu className="header__menu" items={MENU_ITEMS} />
      </div>
      <div className="header__buttons">
        <TogglerTheme
          className="header__toggler-theme"
          currentTheme="dark-mode"
        />
        <Button className="header__button" href="#my-contacts">
          Связаться со мной
        </Button>
      </div>
    </Container>
  );
}

export default Header;
