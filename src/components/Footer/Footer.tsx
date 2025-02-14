import { useRef, useState } from 'react';
import Container from '../Container';
import ContactPuzzle, { TContactPuzzleProps } from '../ui/ContactPuzzle';
import { useDevice } from '../../Context/DeviceContext';
import { DESIGN_CONTACT, MY_CONTACTS } from './Footer.config';
import './Footer.scss';
import { TFooterProps } from './Footer.types';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

function getVariant(index: number): TContactPuzzleProps['variant'] {
  if (index >= 0 && index < 6) {
    return (index + 1) as TContactPuzzleProps['variant'];
  }
  throw new Error('Index of puzzle out of bounds');
}

const INTERSECTION_OPTIONS = { once: true, threshold: 0.99 };

function Footer({ className, ...props }: TFooterProps): JSX.Element {
  const { isLessMobileMd } = useDevice();
  const footerRef = useRef<HTMLDivElement>(null);
  const { isIntersecting: isFooterVisible } = useIntersectionObserver(
    footerRef,
    INTERSECTION_OPTIONS
  );
  const [completedAnimationPuzzles, setCompletedAnimationPuzzles] =
    useState(false);

  function handleReplayAnimation() {
    const footerEl = footerRef.current;
    if (!footerEl) return;
    footerEl.classList.remove('footer_animated');
    setCompletedAnimationPuzzles(false);
    // Ждём следующего кадра, чтобы применить анимацию снова
    requestAnimationFrame(() => {
      footerEl.classList.add('footer_animated');
    });
  }

  function handleAnimationEnd() {
    if (completedAnimationPuzzles) return;

    return (e: React.AnimationEvent<HTMLDivElement>) => {
      if (e.animationName.includes('rotateFooter')) {
        setCompletedAnimationPuzzles(true);
      }
    };
  }

  return (
    <Container
      ref={footerRef}
      tag="footer"
      className={[
        'footer footer_animated',
        !isFooterVisible && 'footer_animated_paused',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
      onDoubleClick={handleReplayAnimation}
      onAnimationEnd={handleAnimationEnd()}
    >
      <div
        className={['footer__links', isLessMobileMd && 'footer__links_column']
          .filter(Boolean)
          .join(' ')}
      >
        <address className="footer__address">
          {MY_CONTACTS.map(({ label, href, type }, index) => (
            <ContactPuzzle
              key={href}
              className="footer__contact"
              href={href}
              target={['почта', 'телефон'].includes(type) ? '_self' : '_blank'}
              rel="noopener noreferrer"
              variant={getVariant(index)}
              isSingleRow={isLessMobileMd}
              aria-label={`Перейти на ${type || label}`}
              isNotUseClipContainer={!completedAnimationPuzzles}
            >
              {label}
            </ContactPuzzle>
          ))}
        </address>
        <ContactPuzzle
          className="footer__contact"
          href={DESIGN_CONTACT.href}
          target="_blank"
          rel="noopener noreferrer"
          variant={6}
          isSingleRow={isLessMobileMd}
          aria-label={`Перейти на ${DESIGN_CONTACT.type || DESIGN_CONTACT.label}`}
          isNotUseClipContainer={!completedAnimationPuzzles}
        >
          {DESIGN_CONTACT.label}
        </ContactPuzzle>
      </div>
    </Container>
  );
}

export default Footer;
