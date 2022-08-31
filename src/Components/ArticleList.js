import { UrlContext } from "../Pages/Ptt";
import { useContext } from "react";
function List(props) {
  const { shareBase } = useContext(UrlContext);
  const mainBgColor = props.propsLightStatus ? "bg-white-100" : "bg-slate-900	";
  const textColor = props.propsLightStatus ? "text-black" : "text-gray-100";
  const mainBaseClass =
    "w-full overflow-auto	h-screen flex-col justify-start items-center flex";
  return (
    <div className={`${mainBgColor} ${mainBaseClass}`}>
      <div className="mt-[15px] relative px-6 py-2 group">
        <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-indigo-700 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full bg-white border-2 border-indigo group-hover:bg-indigo"></span>
        <span className="relative text-indigo-700 group-hover:text-indigo-700 text-5xl">
          {props.propsSelectBoard}
        </span>
      </div>
      <div className="sm:w-10/12 md:w-9/12 w-7/12">
        {props.propsArticleList.map((data, index) => {
          return (
            <div
              className="flex flex-col justify-start items-start my-2 border-b-4 py-4 border-b-indigo-400"
              key={index}
            >
              <div className="flex flex-row justify-start items-end my-1">
                <p className={`text-9xl ${textColor}`}>{index + 1}</p>
                <div className="mx-5 pb-2">
                  <p className={textColor}>日期：{data.date}</p>
                  <p className={textColor}>
                    推文數：{data.pushCount ? data.pushCount : 0}
                  </p>
                </div>
              </div>
              <div className="flex flex-row justify-center items-end">
                <input
                  type="checkbox"
                  checked={data.checkStatus}
                  onChange={() => props.propsArticleCheck(data)}
                  name="controlled"
                  className="mr-2 h-5 w-5"
                ></input>
                <p className={`text-4xl ${textColor}`}>
                  <a href={`${shareBase}${data.link}`}>{data.title}</a>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
