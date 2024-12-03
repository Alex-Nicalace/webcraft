import { useState } from 'react';
import './App.scss';
import Container from './components/Container';
import Logo from './components/Logo';
import ScrollUp from './components/ScrollUp';
import Button from './components/ui/Button';
import ButtonSlider from './components/ui/ButtonSlider';
import Icon from './components/ui/Icon';
import Puzzle from './components/ui/Puzzle';
import TogglerTheme from './components/ui/TogglerTheme';
import ProjectLink from './components/ui/ProjectLink';
import projectImg from './assets/img/projects/Снимок экрана 2024-11-30 150026.jpg';
import ProjectList from './components/ui/ProjectList';

function App() {
  const [isOpenPuzzle, setOpenPuzzle] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'dark-mode' | 'light-mode'>(
    'dark-mode'
  );

  function handleToggleTheme() {
    const newTheme = currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode';
    setCurrentTheme(newTheme);
    document.documentElement.classList.remove('dark-mode');
    document.documentElement.classList.remove('light-mode');
    document.documentElement.classList.add(newTheme);
  }

  return (
    <>
      <Container tag="div" className="tst">
        <h1 className="header-additional">Привет</h1>
        <h1 className="header">H1 (доп.) - 180</h1>
        <br />
        <div className="text-menu-item">H2, пункты меню - 15</div>
        <br />
        <div className="text-button">текст в кнопках</div>
        <br />
        <div className="text-typing">Наборный 1 - 16</div>
        <br />
        <div className="text-competencies">Компетенции, футер - 20</div>
        <br />
        <div className="text-credo">Кредо - 20</div>
        <br />
        <div className="text-explanation">
          Пояснение к интерактиву с пазлами - 16
        </div>
        <br />
        <div className="text-portfolio">Портфолио - 70</div>
        <br />
        <div className="text-footer">Футер - 16_320</div>
        <br />
        <div className="text-code-background">Код-фон - 6_320</div>
        <br />
        <div>{/* <Icon name="DarkTheme" /> */}</div>
        <br />
        <Icon name="ArrowRight" height={24} width={24} />
        <br />
        <Icon name="ArrowRight" height={32} width={32} />
        <br />
        <Icon
          name="ArrowRight"
          rotate={-90}
          strokeWidth={3}
          height={40}
          width={40}
        />
        <br />
        <Icon name="LightTheme" height={32} width={32} />
        <Icon name="DarkTheme" height={32} width={32} />
        <br />
        <Logo />
        <Logo size="small" />
        <br />
        <Button href="#" variant="menu-item">
          Пункт меню
        </Button>
        <br />
        <br />
        <Button href="#">Button</Button>
        <br />
        <br />
        <Button href="#">Button</Button>
        <br />
        <br />
        <Button disabled>Button</Button>
        <br />
        <br />
        <Button href="#" variant="button-secondary">
          Button
        </Button>
        <br />
        <br />
        <Button variant="button-secondary" disabled>
          Button
        </Button>
        <br />
        <br />
        <ScrollUp />
        <br />
        <br />
        <ButtonSlider />
        <br />
        <ButtonSlider direction="left" />
        <br />
        <ButtonSlider disabled />
        <br />
        <br />
        <TogglerTheme
          style={{ position: 'fixed', bottom: '40px', right: '20px' }}
          currentTheme={currentTheme}
          onClick={handleToggleTheme}
        />
        <br />
        <button
          style={{ position: 'fixed', bottom: '20px', right: '20px' }}
          onClick={() => setOpenPuzzle((prev) => !prev)}
        >
          Открыть/закрыть пазлы
        </button>
        <br />
        <Puzzle variant={3} text="Каждая строчка кода," isOpen={isOpenPuzzle} />
        <br />
        <br />
        <Puzzle variant={4} text="как деталь пазла," isOpen={isOpenPuzzle} />
        <br />
        <br />
        <Puzzle
          variant={5}
          text="должна быть на своём месте,"
          isOpen={isOpenPuzzle}
        />
        <br />
        <br />
        <Puzzle variant={6} text="чтобы получился" isOpen={isOpenPuzzle} />
        <br />
        <br />
        <Puzzle variant={7} text="ожидаемый результат." isOpen={isOpenPuzzle} />
        <br />
        <br />
        <ProjectList>
          <ProjectLink
            href="#"
            projectData={{
              title: 'Название организации',
              imageUrl: projectImg,
            }}
          >
            Очень длинное название проекта в две строки и не влазит чень длинное
            название проекта в две строки и не влазит
          </ProjectLink>
          <ProjectLink
            href="#"
            projectData={{
              title: 'Название организации',
              imageUrl: projectImg,
            }}
          >
            Очень длинное название проекта в две строки и не влазит чень длинное
            название проекта в две строки и не влазит
          </ProjectLink>
          <ProjectLink
            href="#"
            projectData={{
              title: 'Название организации',
              imageUrl: projectImg,
            }}
          >
            Очень длинное название проекта в две строки и не влазит чень длинное
            название проекта в две строки и не влазит
          </ProjectLink>
          <ProjectLink
            href="#"
            projectData={{
              title: 'Название организации',
              imageUrl: projectImg,
            }}
          >
            Очень длинное название проекта в две строки и не влазит чень длинное
            название проекта в две строки и не влазит
          </ProjectLink>
        </ProjectList>
        <br />
        <br />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <Puzzle
            variant="fact-1"
            text="Обожаю компьютеры и всё, что с ними связано, с детства."
            isOpen={isOpenPuzzle}
          />
          <Puzzle
            variant="fact-2"
            text="Люблю то, чем занимаюсь."
            isOpen={isOpenPuzzle}
          />
          <Puzzle
            variant="fact-3"
            text="Всегда ищу решения. Даже, если что-то не знаю."
            isOpen={isOpenPuzzle}
          />
          <Puzzle
            variant="fact-4"
            text="Я симпатичный и скромный ))"
            isOpen={isOpenPuzzle}
          />
          <Puzzle
            variant="fact-5"
            text="Я вдумчивый и детальный."
            isOpen={isOpenPuzzle}
          />
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Container>
    </>
  );
}

export default App;
