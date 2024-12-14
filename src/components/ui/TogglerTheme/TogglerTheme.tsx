import Icon from '../Icon';
import './TogglerTheme.scss';
import { TTogglerThemeProps } from './TogglerTheme.types';

function TogglerTheme({
  isDarkMode,
  className,
  ...props
}: TTogglerThemeProps): JSX.Element {
  return (
    <button
      className={['toggler-theme', className].filter(Boolean).join(' ')}
      {...props}
    >
      {isDarkMode ? (
        <Icon
          className="toggler-theme__icon"
          name="LightTheme"
          width={32}
          height={32}
        />
      ) : (
        <Icon
          className="toggler-theme__icon"
          name="DarkTheme"
          width={32}
          height={32}
        />
      )}
    </button>
  );
}

export default TogglerTheme;
