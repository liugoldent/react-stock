import { useState, useContext } from "react";
import { LineIcon, LineShareButton } from "react-share";
import { UrlContext } from "../Pages/Ptt";
function ShareCounter({ propsSelectArticle }) {
  let [openStatus, setOpenState] = useState(false);
  const url = useContext(UrlContext);
  /**
   * @description 決定使用者點選到的新聞是否要跳出來
   */
  const changeStatus = () => {
    setOpenState(!openStatus);
  };
  const getUrl = function () {
    let shareListUrl = "";
    for (let i = 0, len = propsSelectArticle.length; i < len; i++) {
      shareListUrl =
        shareListUrl + `${url.shareBase}${propsSelectArticle[i].link} \n`;
    }
    return shareListUrl;
  };
  const SelectList = function () {
    if (openStatus) {
      return (
        <div className="flex flex-col justify-start items absolute bottom-10 w-96 right-12 duration-300">
          {propsSelectArticle.map((data, index) => {
            return (
              <div
                className="bg-green-100 m-2 p-2 rounded-md opacity-90"
                key={index}
              >
                <p>{data.title}</p>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="fixed right-10 bottom-10 flex">
      <SelectList />
      <button onClick={changeStatus}>
        <p className="bg-indigo-200	 hover:bg-indigo-400 duration-300 font-serif w-9 h-9 flex justify-center items-center absolute -left-6 -top-6 opacity-90">
          {propsSelectArticle.length}
        </p>
      </button>
      <LineShareButton url={getUrl()} className="hover:scale-125 duration-300">
        <LineIcon size={44} round={true} />
      </LineShareButton>
    </div>
  );
}

export default ShareCounter;
