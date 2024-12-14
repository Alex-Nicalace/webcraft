import './App.scss';
import AppLayout from './components/AppLayout';
import ScreenWidthProvider from './Context/ScreenWidthContext';

function App() {
  return (
    <ScreenWidthProvider>
      <AppLayout />
    </ScreenWidthProvider>
  );
}

export default App;
