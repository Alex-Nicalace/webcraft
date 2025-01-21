import { useRef } from 'react';
import Container from '../Container';
import ContactPuzzle, { TContactPuzzleProps } from '../ui/ContactPuzzle';
import { useScreenWidth } from '../../Context/ScreenWidthContext';
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
  const { isLessMobileMd } = useScreenWidth();
  const footerRef = useRef<HTMLDivElement>(null);
  const { isIntersecting: isFooterVisible } = useIntersectionObserver(
    footerRef,
    INTERSECTION_OPTIONS
  );

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
        >
          {DESIGN_CONTACT.label}
        </ContactPuzzle>
      </div>
    </Container>
  );
}

export default Footer;
