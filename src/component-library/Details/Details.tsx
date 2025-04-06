import { useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { Transition } from '../Transition';
import { TDetailsProps } from './Details.types';
import { TDetailsContentProps } from './Details.types';

function Details({
  animationOptions = {},
  summaryNode,
  contentNode,
  disabled = false,
  closeOnOutsideClick = false,
  unmountContentOnClose = true,
  summaryProps = {},
  contentProps = {},
  open,
  onChange, // можно этот проп задействовать для изменения внешнего состояния, но можно summaryProps.onClick. Лучше использовать onChange
  defaultOpen = false,
  ...props
}: TDetailsProps): JSX.Element {
  const { duration = 300, timingFunction = 'ease-out' } = animationOptions;
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  function onOutsideClick(e: MouseEvent) {
    if (detailsRef.current?.contains(e.target as Node)) return;
    if (getIsOpen()) {
      toggle(false);
    }
  }

  function getIsOpen() {
    return open ?? isOpen;
  }

  function toggle(value: boolean = !getIsOpen()) {
    if (disabled) return;

    if (open === undefined) {
      setIsOpen(value);
    }
    onChange?.(value);
  }

  function onSummaryClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    summaryProps.onClick?.(e);
    e.preventDefault(); // отменить поведение по умолчанию
    if (disabled) return;

    toggle(!getIsOpen());
  }

  function setHeightInit() {
    const detailsEl = detailsRef.current;
    if (!detailsEl) return;

    detailsEl.style.transition = `height ${duration}ms ${timingFunction}`;
    detailsEl.style.overflow = 'hidden'; // скрыть переполнение

    detailsEl.style.height = `${detailsEl.offsetHeight}px`; // высота закрытого состояния;
  }

  function setHeightExpanded() {
    const detailsEl = detailsRef.current;
    const summaryEl = summaryRef.current;
    const contentEl = contentRef.current;
    if (!detailsEl || !summaryEl || !contentEl) return;

    detailsEl.style.height = `${
      summaryEl.offsetHeight + contentEl.offsetHeight
    }px`;
  }
  function setHeightClosed() {
    const detailsEl = detailsRef.current;
    const summaryEl = summaryRef.current;
    if (!detailsEl || !summaryEl) return;

    detailsEl.style.height = `${summaryEl.offsetHeight}px`;
  }

  function resetHeight() {
    const detailsEl = detailsRef.current;
    if (!detailsEl) return;
    detailsEl.style.overflow = '';
    detailsEl.style.height = '';
    detailsEl.style.transition = '';
    if (!detailsEl.style.length) {
      detailsEl.removeAttribute('style');
    }
  }

  return (
    <Transition
      enter={getIsOpen()}
      timeout={duration}
      unmountOnExit={false}
      onEnter={setHeightInit}
      onEntering={setHeightExpanded}
      onEntered={resetHeight}
      onExit={setHeightInit}
      onExiting={setHeightClosed}
      onExited={resetHeight}
    >
      {(state) => (
        <details
          ref={detailsRef}
          {...props}
          {...(disabled && { 'data-disabled': '' })}
          open={state !== 'exited'}
        >
          <summary
            {...summaryProps}
            ref={(node) => {
              summaryRef.current = node;
              const ref = summaryProps?.ref;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref && typeof ref === 'object' && 'current' in ref) {
                // @ts-expect-error: we know it's a mutable ref
                ref.current = node;
              }
            }}
            onClick={onSummaryClick}
          >
            {typeof summaryNode === 'function'
              ? summaryNode(getIsOpen())
              : summaryNode}
          </summary>
          {(state !== 'exited' || getIsOpen() || !unmountContentOnClose) && (
            <DetailsContent
              {...contentProps}
              refProp={contentRef}
              onOutsideClick={onOutsideClick}
              closeOnOutsideClick={closeOnOutsideClick}
            >
              {typeof contentNode === 'function'
                ? contentNode(getIsOpen())
                : contentNode}
            </DetailsContent>
          )}
        </details>
      )}
    </Transition>
  );
}

// ========================= DetailsContent =========================
// выделил в отдельную компоненту из-за хука useOutsideClick т.е. чтобы прослушиватель клика
// вне компонента активировался только при открытом состоянии. Чтобы типа даром не висел когда нет необходимости
const DetailsContent = ({
  children,
  onOutsideClick,
  closeOnOutsideClick,
  refProp,
  ...props
}: TDetailsContentProps) => {
  const contentRef: React.MutableRefObject<HTMLDivElement | null> =
    useOutsideClick<HTMLDivElement>(onOutsideClick, !closeOnOutsideClick);
  return (
    <div
      {...props}
      ref={(node) => {
        contentRef.current = node;

        if (typeof refProp === 'function') {
          refProp(node);
        } else if (
          refProp &&
          typeof refProp === 'object' &&
          'current' in refProp
        ) {
          // @ts-expect-error: we know it's a mutable ref
          refProp.current = node;
        }
      }}
    >
      {children}
    </div>
  );
};

export default Details;
