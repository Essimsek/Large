type HeaderProps = {
    title: string;
}

const Header = ({title}: HeaderProps) => {
    return (
        <div className="relative inline-block !max-w-[500px]">
          <div className="header-bg"></div>
          <h1 className="header-title">{title}</h1>
        </div>
    );
}

export default Header;
