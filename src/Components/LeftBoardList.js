import React from "react";
function LeftBoardList({
  propsHotList,
  propsArticleFetch,
  propsMainClass,
}) {
  /**
   * @description 點選看板 -> 打api
   * @param {*} data
   */
  const clickBoard = (data) => {
    propsArticleFetch(data);
  };
  return (
    <div className={propsMainClass}>
      {propsHotList.map((data, index) => {
        return (
          <div
            key={index}
            className="h-screen w-full flex flex-col justify-center items-start my-3 hover:bg-[#e5e7eb] hover:cursor-pointer pl-[10px] py-[3px] rounded-lg"
            onClick={() => {
              clickBoard(data);
            }}
          >
            <p className="text-2xl underline">
              <span>{index + 1}. </span>
              {data.board_class}
            </p>
            <p className="text-xs pl-[50px] before:content-['人氣：']">
              {" "}
              {data.board_nuser}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default React.memo(LeftBoardList);
