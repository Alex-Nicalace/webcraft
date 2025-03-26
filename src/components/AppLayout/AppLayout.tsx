import { useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import ScrollUp from '../ScrollUp';
import { TWindowScrollState } from './AppLayout.types';

function AppLayout(): JSX.Element {
  const [windowScrollState, setWindowScrollState] =
    useState<TWindowScrollState>('atTop');

  return (
    <>
      <ScrollRestoration />
      <Header
        isUseBlurBg={['scrolled', 'showBackToTop'].includes(windowScrollState)}
      />
      <Outlet context={{ setWindowScrollState }} />
      <ScrollUp isRender={windowScrollState === 'showBackToTop'} />
      <Footer id="my-contacts" />
    </>
  );
}

export default AppLayout;
