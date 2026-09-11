// Cała treść strony jest tutaj. Zmieniasz tekst albo cenę w tym pliku i to wszystko.
// Zdjęcia podmieniasz w folderze public/foto, zachowując nazwy plików.

export const marka = {
  nazwa: "Michał",
  nazwisko: "Mlenko",
  telefon: "+48 600 000 000",
  telefonLink: "+48600000000",
  email: "kontakt@mlenko.pl",
  logo: "/foto/logo.png",
  // Zostaw pusty ciąg znaków, jeśli nie chcesz przycisku do Messengera.
  messenger: "https://m.me/twojprofil",
  rok: "2027",
};

export const hero = {
  zdjecie: "/foto/hero.jpg",
  zdanie: "Robię zdjęcia tak, żebyście na własnym weselu czuli się swobodnie.",
  podpis: "Oferta na sezon " + marka.rok,
};

export const portfolio = [
  "/foto/01.jpg",
  "/foto/02.jpg",
  "/foto/03.jpg",
  "/foto/04.jpg",
  "/foto/05.jpg",
  "/foto/06.jpg",
  "/foto/07.jpg",
  "/foto/08.jpg",
];

// Link do pełnej galerii z jednego wesela. Zostaw pusty adres, jeśli jeszcze go nie masz.
export const pelnyReportaz = {
  tekst: "Zobacz cały reportaż: Ania i Paweł",
  url: "",
};

export const oMnie = {
  zdjecie: "/foto/portret.jpg",
  podpis: "/foto/podpis.png",
  akapity: [
    "Cześć, jestem Michał. Fotografuję wesela od sześciu lat i wciąż nie umiem stać z boku — najlepsze kadry robią się wtedy, kiedy jestem blisko i nikt już nie pamięta, że mam aparat.",
    "Nie ustawiam ludzi w rzędach i nie każę patrzeć w obiektyw przez pół godziny. Podpowiadam, co zrobić z rękami, resztę zostawiam Wam. Wychodzi z tego reportaż, a nie sesja przebierana za wesele.",
    "Pracuję w okolicach [Twoje miasto], ale na dobre wesele przyjadę wszędzie.",
  ],
};

export const opinie = [
  {
    tekst: "Baliśmy się, że będziemy sztywni na zdjęciach, bo żadne z nas nie lubi się fotografować. Michał załatwił to w dziesięć minut i potem już go nie zauważaliśmy. Zdjęcia dostaliśmy szybciej, niż obiecywał.",
    autor: "Ania i Paweł",
    kontekst: "wesele w [nazwa sali], sierpień 2025",
  },
  {
    tekst: "Goście do dziś pytają, kto robił nam zdjęcia. Najbardziej lubimy te, o których nie wiedzieliśmy, że powstają.",
    autor: "Kasia i Marcin",
    kontekst: "wesele w [nazwa sali], czerwiec 2025",
  },
  {
    tekst: "Ślub mieliśmy w ciemnym kościele i baliśmy się o zdjęcia. Wyszły lepiej niż te z pleneru. Michał ogarnął też rodzinę przy zdjęciach grupowych, co samo w sobie zasługuje na medal.",
    autor: "Ola i Bartek",
    kontekst: "wesele w [nazwa sali], wrzesień 2025",
  },
];

// Pakiety budują się jeden na drugim. W polu "nowe" wpisuj tylko to,
// co dochodzi względem pakietu wyżej.
export const pakiety = [
  {
    nazwa: "Sam ślub",
    cena: "3500 zł",
    nowe: [
      "Od przygotowań do pierwszego tańca, maksymalnie 10 godzin",
      "Około 500 obrobionych zdjęć",
      "Galeria online na 12 miesięcy, chroniona hasłem",
      "Krótki mini plener w trakcie wesela, jeśli pogoda pozwoli",
    ],
    opis: "Najprostsza opcja i wcale nie gorsza. Jestem z Wami od przygotowań po pierwszy taniec, czyli przez wszystko, co potem oglądacie najczęściej.",
  },
  {
    nazwa: "Ślub i plener",
    cena: "4000 zł",
    polecany: true,
    nowe: [
      "Dłuższy dzień: zostaję do 1:00, maksymalnie 13 godzin",
      "Około 600 zdjęć zamiast 500",
      "Plener ślubny w innym dniu, około 60 zdjęć",
    ],
    opis: "Ten wybiera większość par. Plener to dwie godziny spaceru z aparatem tydzień albo miesiąc po weselu — bez stresu, bez gości, bez presji czasu.",
  },
  {
    nazwa: "Od zaręczyn do wesela",
    cena: "4600 zł",
    nowe: [
      "Sesja narzeczeńska przed ślubem, około 50 zdjęć",
      "Album z 30 odbitkami w drewnianym pudełku",
    ],
    opis: "Spotykamy się trzy razy, więc w dniu ślubu jestem już kimś znajomym, a nie obcym z aparatem. Najlepsza opcja dla par, które boją się pozowania.",
  },
];

export const ctaPakiet = "Sprawdź termin na ten pakiet";

export const zadatek = "Rezerwacja terminu to 500 zł zadatku, reszta w dniu wesela.";

export const sesje = [
  {
    nazwa: "Sesja narzeczeńska",
    cena: "700 zł",
    opis: "Dwie godziny, jedno miejsce, około 50 zdjęć. Dobry sposób, żeby sprawdzić, czy się dogadamy, zanim zarezerwujecie termin ślubu.",
  },
  {
    nazwa: "Plener ślubny",
    cena: "900 zł",
    opis: "Dla par, które mają już fotografa na wesele, ale chcą jeszcze pochodzić w sukni i garniturze bez tłumu dookoła.",
  },
];

export const dodatki = [
  { nazwa: "Dodatkowa godzina", cena: "250 zł", opis: "Kiedy zabawa nie chce się skończyć albo przygotowania zaczynają się wcześniej." },
  { nazwa: "Odbitki", cena: "3 zł za sztukę", opis: "Papier matowy, format 15×21. Możecie dobrać do pudełka albo zamówić osobno." },
  { nazwa: "Drewniane pudełko z odbitkami", cena: "350 zł", opis: "Sto zdjęć w pudełku. Najlepszy prezent dla rodziców, sprawdzone wielokrotnie." },
  { nazwa: "Dojazd", cena: "w cenie", opis: "Do 150 km od [Twoje miasto]. Dalej dogadamy się indywidualnie." },
];

export const proces = [
  {
    pytanie: "Kiedy dostaniecie zdjęcia?",
    odpowiedz: "Zapowiedź, czyli 30 kadrów do pokazania rodzinie, wysyłam w ciągu 48 godzin. Cały reportaż do 45 dni od wesela.",
  },
  {
    pytanie: "W jakiej formie?",
    odpowiedz: "Galeria online chroniona hasłem, z której pobieracie wszystko w pełnej rozdzielczości. Link działa przez 12 miesięcy.",
  },
  {
    pytanie: "Czy zdjęcia są obrobione?",
    odpowiedz: "Każde: kolor, kadr, kontrast. Nie zmieniam Waszych twarzy ani sylwetek. Na zdjęciach macie wyglądać jak Wy, tylko w lepszym świetle.",
  },
  {
    pytanie: "Co, jeśli zachorujesz przed naszym ślubem?",
    odpowiedz: "Mam dogadane zastępstwo z dwoma fotografami o podobnym stylu. Gdyby stało się coś, na co nie mam wpływu, przyjeżdża jeden z nich, a zdjęcia obrabiam już ja. Przez sześć lat nie musiałem z tego skorzystać.",
  },
  {
    pytanie: "A jeśli padnie karta albo dysk?",
    odpowiedz: "W trakcie wesela aparat zapisuje wszystko od razu na dwie karty naraz. Po powrocie materiał ląduje na dwóch dyskach i w chmurze, gdzie zostaje przez rok.",
  },
  {
    pytanie: "Jak rezerwujecie termin?",
    odpowiedz: "Piszecie datę i miejsce, sprawdzam kalendarz i odsyłam umowę. Termin blokuję po wpłacie zadatku, zwykle w ciągu dwóch dni.",
  },
];

export const kontakt = {
  naglowek: "Sprawdźmy, czy mam wolny termin",
  tekst: "Napiszcie datę i miejsce wesela, odpowiem tego samego dnia. Jeśli wolicie porozmawiać, dzwońcie śmiało.",
};
