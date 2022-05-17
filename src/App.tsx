import "./App.css";
import ButtonComponent from "./ButtonComponent";
import { PuttResult } from "./constants";

function App() {
  const buttonComponents: any[] = [];
  for (let index = 1; index <= 20; index++) {
    buttonComponents.push(
      <ButtonComponent distance={index} puttResult={PuttResult.Make} />
    );
    buttonComponents.push(
      <ButtonComponent distance={index} puttResult={PuttResult.Miss} />
    );
    buttonComponents.push(<br />);
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
      <button style={actionButtonStyle}>Undo previous putt</button>
      <button style={actionButtonStyle}>Redo previous undo</button>
    </div>
  );
}

export default App;
