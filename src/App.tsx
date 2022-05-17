import "./App.css";
import ButtonComponent from "./ButtonComponent";
import { PuttResult } from "./constants";

function App() {
  const buttonComponents: any[] = [];
  for (let index = 1; index <= 20; index++) {
    buttonComponents.push(
      <ButtonComponent
        distance={index}
        puttResult={PuttResult.Make}
        key={`button-make-${index}`}
      />
    );
    buttonComponents.push(
      <ButtonComponent
        distance={index}
        puttResult={PuttResult.Miss}
        key={`button-miss-${index}`}
      />
    );
    buttonComponents.push(<br key={`br-${index}`} />);
  }
  const actionButtonStyle = { width: 100, height: 40, margin: 20 };
  return (
    <div className="App">
      <h1>Puttimerkinnät</h1>
      {buttonComponents}
      {/* Distance over 20 meters is marked as 21 meters */}
      <ButtonComponent distance={21} puttResult={PuttResult.Make} />
      <ButtonComponent distance={21} puttResult={PuttResult.Miss} />

      <br />
      <br />
      <button style={actionButtonStyle} key="undo">
        Undo previous putt
      </button>
      <button style={actionButtonStyle} key="redo">
        Redo previous undo
      </button>
    </div>
  );
}

export default App;
