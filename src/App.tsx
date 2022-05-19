import "./App.css";
import ButtonComponent from "./ButtonComponent";
import { PuttResult } from "./constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { undoLastPuttResult } from "./database";
import { apiPuttResult } from "./types";
import { Link } from "react-router-dom";

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

  const undoPreviousPutt = async () => {
    const undoResult: apiPuttResult | boolean = await undoLastPuttResult();
    if (undoResult === true) {
      toast.warn("No putt results to undo!");
    } else {
      const lastPuttDistance = (undoResult as apiPuttResult).distance;
      const lastPuttResult = (undoResult as apiPuttResult).isMade;
      toast(
        `↩️ Undid previous putt (${
          lastPuttDistance === 21 ? "> 20" : lastPuttDistance
        } m ${lastPuttResult ? "make" : "miss"})`
      );
    }
  };

  return (
    <div className="App">
      <ToastContainer />
      <h1>Putt makes and misses</h1>
      {buttonComponents}
      {/* Distance over 20 meters is marked as 21 meters */}
      <ButtonComponent distance={21} puttResult={PuttResult.Make} />
      <ButtonComponent distance={21} puttResult={PuttResult.Miss} />

      <br />
      <br />
      <button style={actionButtonStyle} key="undo" onClick={undoPreviousPutt}>
        ↩️ Undo previous putt
      </button>
      <br />
      <Link to="/stats">Putting stats</Link>
    </div>
  );
}

export default App;
