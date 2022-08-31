import lightSvg from "../png/light.svg";
import darkSvg from "../png/dark.svg";

const darkModeControl = function ({ propsLightStatus, propsControlLight }) {
  return (
    <div className="flex flex-col justify-center items-center w-[100px] h-[100px] fixed right-[10px] bottom-[150px]">
      <button
        className={`rounded-lg  bg-white p-2 w-[50px] h-[50px] mb-[5px] ${
          propsLightStatus ? "hidden" : ""
        }`}
        onClick={propsControlLight}
      >
        <img src={lightSvg} alt="lightMode" />
      </button>
      <button
        className={`rounded-lg bg-slate-100 p-2 w-[50px] h-[50px] ${
          !propsLightStatus ? "hidden" : ""
        }`}
        onClick={propsControlLight}
      >
        <img src={darkSvg} alt="lightMode" />
      </button>
    </div>
  );
};

export default darkModeControl;
