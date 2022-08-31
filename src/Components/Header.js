function Header(props) {
  return (
    <div className="flex flex-row justify-center items-center shadow-lg h-24">
      <h1 className="text-xl">{props.title}</h1>
    </div>
  );
}


export default Header;
