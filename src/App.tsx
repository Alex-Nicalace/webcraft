import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import AppLayout from './components/AppLayout';
import DarkModeProvider from './Context/DarkModeContext';
import DeviceProvider from './Context/DeviceContext';
import MainPage from './pages/MainPage';
import ProjectsPage from './pages/ProjectsPage';
import ErrorMessage from './components/ErrorMessage';
import './App.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorMessage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
      {
        path: '*',
        loader: () => redirect('/'), // Чистый редирект без рендера компонента
      },
    ],
  },
]);

function App() {
  return (
    <DeviceProvider>
      <DarkModeProvider>
        <RouterProvider router={router} />
      </DarkModeProvider>
    </DeviceProvider>
  );
}

export default App;
