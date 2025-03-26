export type OutletContextType = {
  setWindowScrollState: React.Dispatch<
    React.SetStateAction<TWindowScrollState>
  >;
};
export type TWindowScrollState = 'atTop' | 'scrolled' | 'showBackToTop';
