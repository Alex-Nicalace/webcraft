import { useState } from 'react';
import MainPage, { TStateFirstSection } from '../../pages/MainPage';
import Footer from '../Footer';
import Header from '../Header';
import ScrollUp from '../ScrollUp';

function AppLayout(): JSX.Element {
  const [stateFirstSection, onChangeStateFirstSection] =
    useState<TStateFirstSection>('normal');

  return (
    <>
      <Header
        isUseBlurBg={['scrolled', 'invisible'].includes(stateFirstSection)}
      />
      <MainPage onChangeStateFirstSection={onChangeStateFirstSection} />
      <ScrollUp isRender={stateFirstSection === 'invisible'} />
      <Footer id="my-contacts" />
    </>
  );
}

export default AppLayout;
