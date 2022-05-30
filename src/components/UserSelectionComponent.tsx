import { useState } from "react";
import { getUserIdFromLocalStorage } from "../utilities";

function UserSelectionComponent() {
  // TODO: Implement getting users from the db
  // const users = [
  //   { usedId: 1, name: "Tuomas" },
  //   { usedId: 2, name: "Lauri" },
  // ];

  const [user, setUser] = useState(getUserIdFromLocalStorage() ?? 1);

  const handleUserChange = (event: any) => {
    const value: number = parseInt(event.target.value);
    // Put the selected value into localstorage for a better (persistent) user experience
    localStorage.setItem("userId", value.toString());
    setUser(value);
  };

  const radioButtonContainerStyle = { paddingLeft: 10 };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div style={radioButtonContainerStyle}>
        <input
          type="radio"
          id="userRadioButton1"
          value={1}
          checked={user === 1}
          onChange={handleUserChange}
        />{" "}
        <label htmlFor="userRadioButton1">Tuomas</label>
      </div>
      <div style={radioButtonContainerStyle}>
        <input
          type="radio"
          id="userRadioButton2"
          value={2}
          checked={user === 2}
          onChange={handleUserChange}
        />{" "}
        <label htmlFor="userRadioButton2">Lauri</label>
      </div>
    </div>
  );
}

export default UserSelectionComponent;
