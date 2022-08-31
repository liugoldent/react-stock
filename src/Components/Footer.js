function Footer(props) {
  return (
    <div className="flex flex-row justify-center items-center h-24 border-t-2">
      <p className="text-xl">{props.copyright}</p>
    </div>
  );
}

export default Footer;
