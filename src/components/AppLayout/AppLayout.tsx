import { useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { TStateFirstSection } from '../../pages/MainPage';
import Footer from '../Footer';
import Header from '../Header';
import ScrollUp from '../ScrollUp';

function AppLayout(): JSX.Element {
  const [stateFirstSection, onChangeStateFirstSection] =
    useState<TStateFirstSection>('normal');

  return (
    <>
      <ScrollRestoration />
      <Header
        isUseBlurBg={['scrolled', 'invisible'].includes(stateFirstSection)}
      />
      <Outlet context={{ onChangeStateFirstSection }} />
      <ScrollUp isRender={stateFirstSection === 'invisible'} />
      <Footer id="my-contacts" />
    </>
  );
}

export default AppLayout;
