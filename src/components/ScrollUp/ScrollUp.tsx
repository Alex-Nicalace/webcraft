import { TScrollUpProps } from './ScrollUp.types';
import './ScrollUp.scss';
import Container from '../Container';
import ButtonUp from '../ui/ButtonUp';

function ScrollUp({
  className,
  isNotAnimated = false,
  isRender,
}: TScrollUpProps) {
  if (!isRender) return null;

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: isNotAnimated ? 'instant' : 'smooth',
    });
  }

  return (
    <Container
      tag="div"
      className={['scroll-up', className].filter(Boolean).join(' ')}
    >
      <ButtonUp
        className="scroll-up__button"
        onClick={scrollToTop}
        aria-label="Прокрутить вверх"
      />
    </Container>
  );
}

export default ScrollUp;
