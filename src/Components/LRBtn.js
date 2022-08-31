import React from "react";
import leftSvg from "../png/left-arrow.svg";

function svgBtn({ propsClass, propsExtendBoard, propsRotate }) {
  const rotate180Deg = propsRotate ? "rotate-180" : "rotate-0";
  const outerClass = `w-[44px] h-[44px] flex ${propsClass} ${rotate180Deg} bg-emerald-100 hover:bg-emerald-200 text-emerald-500 duration-300 flex justify-center items-center opacity-80 rounded-full`;
  /**
   * @description 點下去讓左方看板出來消失
   */
  const childExtendBoard = function () {
    propsExtendBoard();
  };
  return (
    <div className={outerClass} onClick={childExtendBoard}>
      <button>
        <img src={leftSvg} alt="arrow" className="w-[20px] h-[20px]" />
      </button>
    </div>
  );
}

export default svgBtn;
