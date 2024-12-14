import './App.scss';
import AppLayout from './components/AppLayout';
import DarkModeProvider from './Context/DarkModeContext';
import ScreenWidthProvider from './Context/ScreenWidthContext';

function App() {
  return (
    <ScreenWidthProvider>
      <DarkModeProvider>
        <AppLayout />
      </DarkModeProvider>
    </ScreenWidthProvider>
  );
}

export default App;
