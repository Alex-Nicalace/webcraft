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

function App() {
  const [isOpenPuzzle, setOpenPuzzle] = useState(false);

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
        <TogglerTheme currentTheme="dark" />
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
