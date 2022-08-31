const Loading = function ({ propsLightStatus }) {
  const bgColor = propsLightStatus ? 'bg-white' : 'bg-slate-900'
  return (
    <div className={`${bgColor} w-full h-full flex-col justify-center items-center`}>
      <div className="w-11/12 h-screen grow flex flex-col justify-center items-center ">
        <p className="text-center font-extrabold p-10 text-transparent text-8xl bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
          Loading
        </p>
      </div>
    </div>
  );
};

export default Loading;
