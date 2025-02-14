import './App.scss';
import AppLayout from './components/AppLayout';
import DarkModeProvider from './Context/DarkModeContext';
import DeviceProvider from './Context/DeviceContext';

function App() {
  return (
    <DeviceProvider>
      <DarkModeProvider>
        <AppLayout />
      </DarkModeProvider>
    </DeviceProvider>
  );
}

export default App;
