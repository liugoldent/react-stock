import React, { useState, useEffect, useCallback, useReducer } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import ArticleList from "../Components/ArticleList";
import LeftBoardList from "../Components/LeftBoardList";
import ShareCounter from "../Components/ShareCounter";
import LRBtn from "../Components/LRBtn";
import DarkModeControl from "../Components/DarkMode";
import Loading from "../Components/Loading";
export const UrlContext = React.createContext();
function reducer(state, action) {
  switch (action.type) {
    case "ADD_LIST":
      let linkCount = state.findIndex(
        (data) => data.link === action.payload.link
      );
      if (linkCount === -1) {
        state.push(action.payload);
      }
      return state;
    case "DELETE_LIST":
      state = state.filter((data) => data.link !== action.payload.link);
      return state;
    default:
      return state;
  }
}

function Ptt() {
  let [hotList, setHotList] = useState([]);
  let [articleListVar, setArticleList] = useState([]);
  // useReducer -> 第一個是reducer, 第二個是初始化list
  const [reducerList, dispatch] = useReducer(reducer, []);
  const [selectBoard, setSelsctBoard] = useState("");
  const [lightStatus, setLightStatus] = useState(true);
  const [articleTitle, setArticleTitle] = useState("");
  const url = {
    localhost: "http://127.0.0.1:8080",
    shareBase: "https://www.ptt.cc",
  };

  /**
   * @description mounted時取回資料
   */
  useEffect(() => {
    const fetchHotBoard = async function (category) {
      const apiHotResult = await axios({
        method: "get",
        url: "http://127.0.0.1:8080/pttApi/ptthotlist",
        headers: {},
      });
      if (apiHotResult.status === 200) {
        const { result: apiHotList } = apiHotResult.data;
        setHotList(apiHotList.slice(0, 30));
      }
    };
    fetchHotBoard();
  }, []);
  /**
   * @description 當使用者點選熱門版時，去打api得到各文章資料
   * @param {*} boardDetail
   */
  const fetchArticleFunc = async (boardDetail) => {
    const { queryKey } = boardDetail;
    if (queryKey[1].length === 0) return;
    return axios({
      method: "post",
      url: "http://127.0.0.1:8080/pttApi/pttarticlelist",
      headers: {},
      data: {
        category: queryKey[1], // This is the body part
      },
    });
  };
  const handleClickFetchArticle = useCallback((e) => {
    setSelsctBoard(e.board_class);
    setArticleTitle(e.board_name);
  }, []);

  const {
    isLoading,
    data: fetchResult,
    refetch,
  } = useQuery(["articleListFetch", articleTitle], fetchArticleFunc, {
    refetchOnWindowFocus: false,
    enabled: false,
    manual: true,
  });
  useEffect(() => {
    refetch(articleTitle);
  }, [articleTitle, refetch]);

  useEffect(() => {
    if (fetchResult && fetchResult.status === 200) {
      const { crawData: apiBoardArticleList } = fetchResult.data;
      for (let i = 0, len = apiBoardArticleList.length; i < len; i++) {
        let linkCount = reducerList.findIndex(
          (data) => data.link === apiBoardArticleList[i].link
        );
        apiBoardArticleList[i].checkStatus = linkCount === -1 ? false : true;
      }
      setArticleList(apiBoardArticleList);
    }
  }, [isLoading, fetchResult, reducerList]);

  /**
   * @description 改變勾選到的狀態
   * @param {*} checkData
   */
  const changeArticleCheck = function (checkData) {
    let thisTimeCheckObj = {};
    for (let i = 0, len = articleListVar.length; i < len; i++) {
      if (
        articleListVar[i].title === checkData.title &&
        articleListVar[i].author === checkData.author
      ) {
        articleListVar[i].checkStatus = !articleListVar[i].checkStatus;
        thisTimeCheckObj = articleListVar[i];
        break;
      }
    }
    if (thisTimeCheckObj.checkStatus) {
      dispatch({
        type: "ADD_LIST",
        payload: thisTimeCheckObj,
      });
    } else {
      dispatch({
        type: "DELETE_LIST",
        payload: thisTimeCheckObj,
      });
    }
    setArticleList(articleListVar.slice());
  };
  /**
   * @description 當什麼都沒選時，顯示這個畫面，讓使用者先去點選
   * @returns
   */
  const ChoiceOne = function () {
    return (
      <div className="w-11/12 h-screen grow flex flex-col justify-center items-center ">
        <p className="text-center font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Pleace Choice One
        </p>
      </div>
    );
  };
  /**
   * @description 開啟或關閉面板
   */
  const oriMainCalss =
    "fixed overflow-y-auto h-screen flex flex-col justify-start items-center w-[175px] p-[2px] duration-300 bg-slate-50	drop-shadow-lg";
  const [mainClass, setMainClass] = useState(oriMainCalss);
  const [openStatus, setOpenStatus] = useState(false);
  const extendBoard = function () {
    setOpenStatus(!openStatus);
    const extendStatus = openStatus ? "translate-x-0" : "translate-x-[-173px]";
    setMainClass(() => `${extendStatus} ${oriMainCalss}`);
  };
  /**
   * @description dark mode開啟關閉
   */
  const changeLight = useCallback(
    function () {
      setLightStatus(!lightStatus);
    },
    [lightStatus]
  );
  return (
    <div className="flex flex-row justify-start items-center">
      <UrlContext.Provider value={url}>
        <DarkModeControl
          propsLightStatus={lightStatus}
          propsControlLight={changeLight}
        />
        <LRBtn
          propsClass="fixed right-10 bottom-24 z-10"
          propsExtendBoard={extendBoard}
          propsRotate={openStatus}
        />
        <LeftBoardList
          propsHotList={hotList}
          propsMainClass={mainClass}
          propsArticleFetch={handleClickFetchArticle}
          className="h-screen w-1/12"
        />
        {articleListVar.length > 0 ? (
          isLoading ? (
            <Loading propsLightStatus={lightStatus} />
          ) : (
            <ArticleList
              className="w-11/12"
              propsArticleList={articleListVar}
              propsArticleCheck={changeArticleCheck}
              propsSelectBoard={selectBoard}
              propsLightStatus={lightStatus}
            />
          )
        ) : (
          <ChoiceOne></ChoiceOne>
        )}
        <ShareCounter propsSelectArticle={reducerList.slice()} />
      </UrlContext.Provider>
    </div>
  );
}

export default Ptt;
