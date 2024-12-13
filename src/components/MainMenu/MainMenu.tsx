import './MainMenu.scss';
import Button from '../ui/Button';
import { TMainMenuProps } from './MainMenu.types';
import DekorSvg from '../../assets/img/puzzles/dekor.svg?react';
import Container from '../Container';

/**
 * Меню, переключающееся между мобильной и дексктопной версиями
 * @param className - дополнительный класс для root-элемента
 * @param items - список пунктов меню
 * @param isSwitchable - true, если меню будет переключаться между мобильной и
 *  дексктопной версиями
 * @param isOpen - true, если меню открыто
 * @returns JSX-элемент меню
 */
function MainMenu({
  className,
  items,
  isSwitchable,
  isOpen,
}: TMainMenuProps): JSX.Element {
  const navElem = (
    <nav className={['main-menu', className].filter(Boolean).join(' ')}>
      <ul className="main-menu__list">
        {items.map(({ label, href }) => (
          <li key={href} className="main-menu__item">
            <Button href={href} variant="menu-item">
              {label}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );

  if (isSwitchable)
    return (
      <Container
        tag="div"
        className={['wrap-main-menu', isOpen && 'wrap-main-menu_open']
          .filter(Boolean)
          .join(' ')}
      >
        {navElem}
        {isSwitchable && <DekorSvg className="main-menu__dekor" />}
      </Container>
    );

  return navElem;
}

export default MainMenu;
