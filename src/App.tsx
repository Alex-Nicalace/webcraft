import './App.scss';
import Container from './components/Container';
import Icon from './components/ui/Icon';

function App() {
  return (
    <>
      <Container tag="div" className="tst">
        <h1 className="header-additional">Привет</h1>
        <h1 className="header">H1 (доп.) - 180</h1>
        <br />
        <h2 className="header">H2, пункты меню - 15</h2>
        <br />
        <div className="text button">текст в кнопках</div>
        <br />
        <div className="text typing">Наборный 1 - 16</div>
        <br />
        <div className="text competencies">Компетенции, футер - 20</div>
        <br />
        <div className="text credo">Кредо - 20</div>
        <br />
        <div className="text explanation">
          Пояснение к интерактиву с пазлами - 16
        </div>
        <br />
        <div className="text portfolio">Портфолио - 70</div>
        <br />
        <div className="text footer">Футер - 16_320</div>
        <br />
        <div className="text code-background">Код-фон - 6_320</div>
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
      </Container>
    </>
  );
}

export default App;
