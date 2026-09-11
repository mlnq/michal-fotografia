export default function Footer({ marka }) {
  return (
    <footer className="stopka">
      {marka.nazwa} {marka.nazwisko} — fotografia ślubna, sezon {marka.rok}
    </footer>
  );
}
