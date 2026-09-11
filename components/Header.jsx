import Image from "next/image";

export default function Header({ marka }) {
  return (
    <header className="pasek">
      <div className="pasek-wnetrze">
        <a className="pasek-marka" href="/" aria-label="Strona główna">
          <Image
            className="pasek-logo"
            src={marka.logo}
            alt={`${marka.nazwa} ${marka.nazwisko} Fotografia`}
            width={1000}
            height={289}
            priority
          />
        </a>
        <nav className="pasek-nav">
          <a href="/#portfolio">Portfolio</a>
          <a href="/#o-mnie">O mnie</a>
          <a href="/#opinie">Opinie</a>
        </nav>
      </div>
    </header>
  );
}
