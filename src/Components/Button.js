import React from "react";
const Button = ({ handleClick, clickCount }) => {
  console.log("text render", clickCount);
  return (
    <div className="flex flex-col justify-center m-10">
      <button onClick={() => handleClick(2)}>Button {clickCount}</button>
      <p>{clickCount}</p>
      <span>{Math.random()}</span>
    </div>
  );
};
export default React.memo(Button);
