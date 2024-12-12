import './MainMenu.scss';
import Button from '../ui/Button';
import { TMainMenuProps } from './MainMenu.types';

function MainMenu({ className, items }: TMainMenuProps): JSX.Element {
  return (
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
}

export default MainMenu;
