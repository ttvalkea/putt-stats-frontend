import "./App.css";
import { PuttResult } from "./constants";

type ButtonComponentProps = {
  puttResult: PuttResult;
  distance: number;
};

function ButtonComponent(props: ButtonComponentProps) {
  const makeStyle = {
    backgroundColor: "green",
    width: 90,
    marginRight: 40,
    marginBottom: 5,
  };
  const missStyle = { backgroundColor: "red", width: 90, marginBottom: 5 };
  return (
    <button
      style={props.puttResult === PuttResult.Make ? makeStyle : missStyle}
    >
      {props.distance === 21 ? "> 20" : props.distance}
    </button>
  );
}

export default ButtonComponent;
