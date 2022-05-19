import "./App.css";
import ButtonComponent from "./ButtonComponent";
import { PuttResult } from "./constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const undoPreviousPutt = () => {
    const lastPuttDistance = 5; // TODO: This should come from the API
    const lastPuttResult = PuttResult.Make; // TODO: This should come from the API
    toast(
      `↩️ Undid previous putt (${lastPuttDistance} m ${
        lastPuttResult === PuttResult.Make ? "make" : "miss"
      })`
    );
  };
  const redoPreviousUndo = () => {
    const lastPuttDistance = 5; // TODO: This should come from the API
    const lastPuttResult = PuttResult.Make; // TODO: This should come from the API
    toast(
      `➡️ Redid previously undone putt (${lastPuttDistance} m ${
        lastPuttResult === PuttResult.Make ? "make" : "miss"
      })`
    );
  };

  return (
    <div className="App">
      <ToastContainer />
      <h1>Puttimerkinnät</h1>
      {buttonComponents}
      {/* Distance over 20 meters is marked as 21 meters */}
      <ButtonComponent distance={21} puttResult={PuttResult.Make} />
      <ButtonComponent distance={21} puttResult={PuttResult.Miss} />

      <br />
      <br />
      <button style={actionButtonStyle} key="undo" onClick={undoPreviousPutt}>
        Undo previous putt
      </button>
      <button style={actionButtonStyle} key="redo" onClick={redoPreviousUndo}>
        Redo previous undo
      </button>
    </div>
  );
}

export default App;
