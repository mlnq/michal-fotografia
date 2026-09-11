import { marka } from "../content";
import "./globals.css";

export const metadata = {
  title: `${marka.nazwa} ${marka.nazwisko} — fotografia ślubna`,
  description:
    "Reportaż ślubny bez pozowania. Pakiety od 3500 zł, plener i sesja narzeczeńska do wyboru.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400&family=Work+Sans:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
