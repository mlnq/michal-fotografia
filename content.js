// Cała treść strony jest tutaj. Zmieniasz tekst albo cenę w tym pliku i to wszystko.
// Zdjęcia do karuzeli portfolio dodajesz przez galleryIndex.js:
// 1. konwertujesz je do public/foto/klienci/<wesele>/ (patrz scripts/convert_to_webp.py)
// 2. wybierasz, które pokazać, w public/foto/klienci/<wesele>/index.json
// 3. dopisujesz nazwę folderu <wesele> do galleryFolders w galleryIndex.js

export const marka = {
  nazwa: "Michał",
  nazwisko: "Mlenko",
  telefon: "+48784284560",
  email: "michal.mlenko@gmail.com",
  logo: "/foto/logo.png",
  // Zostaw pusty ciąg znaków, jeśli nie chcesz przycisku do Messengera.
  messenger: "https://m.me/twojprofil",
  rok: "2027",
};

export const hero = {
  zdjecie: "/foto/hero.webp",
  // Cytat pojawia się w ciemnym banerze niżej na stronie, nie na zdjęciu hero.
  zdanie: "„Kochać to znaczy patrzeć w tym samym kierunku.” — C.S. Lewis",
  // To zdanie jest pierwszą linijką tekstu w sekcji "intro" zaraz pod nagłówkiem.
  podpis:
    "Świętujcie ten dzień z najważniejszymi ludźmi wokół. Dobrze się bawcie, a ja zajmę się resztą i uwiecznię te wyjątkowe chwile!",
};

// Sekcja "intro" zaraz pod hero: nadtytuł + duży nagłówek, obok Twój portret.
export const intro = {
  nadtytul: "Fotograf ślubny • Białystok i okolice",
  naglowek: "Wasza historia, zatrzymana na zawsze",
};

// Nagłówek sekcji "mój styl fotograficzny".
export const styl = {
  naglowek: "Mój styl fotograficzny",
};


// Zdjęcia w kompaktowej galerii portfolio, w dokładnie tej kolejności.
// Pliki muszą już istnieć w public/foto/klienci/<folder>/.
export const portfolioWybrane = [
  { folder: "kinga-mateusz", plik: "Kinga&Mateusz-0692-041A2013.webp" },
  { folder: "kinga-mateusz", plik: "Kinga&Mateusz-0895-041A2793.webp" },
  { folder: "aniela-mateusz", plik: "Aniela&Mateusz-0312-041A3321.webp" },
  { folder: "aniela-mateusz", plik: "Aniela&Mateusz-0301-2U9A1483.webp" },
  { folder: "aniela-mateusz", plik: "Aniela&Mateusz-0331-041A3458.webp" },
  { folder: "aniela-mateusz", plik: "Aniela&Mateusz-0563-041A4366.webp" },
];

// Link do pełnej galerii z jednego wesela. Zostaw pusty adres, jeśli jeszcze go nie masz.
export const pelnyReportaz = {
  tekst: "Zobacz cały reportaż: Ania i Paweł",
  url: "",
};

export const oMnie = {
  zdjecie: "/foto/portret.png",
  podpis: "/foto/podpis.png",
  akapity: [
    "Cześć, jestem Michał. Fotografuję wesela od pięciu lat i wciąż nie umiem stać z boku — najlepsze kadry robią się wtedy, kiedy jestem blisko i nikt już nie pamięta, że mam aparat.",
    "Zamiast reżyserowanych scen, daję Wam przestrzeń do bycia sobą. Jeśli trzeba — delikatnie podpowiem i pokieruję, ale przede wszystkim pozwalam wydarzeniom płynąć własnym rytmem. Efekt to szczery reportaż pełen autentycznych emocji.",
    "Pracuję w okolicach Białegostoku, ale na dobre wesele przyjadę wszędzie.",
  ],
};

export const opinie = [
  {
    tekst: "Piękne zdjęcia, do tego nastrojowa muzyka, było czuć ten klimat i emocje, aż się łezka w oku zakręciła! Zrobiłeś kawał dobrej roboty!",
    autor: "Kuba i Asia",
  },
  {
    tekst: "Michał, zdjęcia są cudowne, jestem w szoku, że te wszystkie emocje były uchwycone na tych zdjęciach. Wracam do nich. Naprawdę, w takim stylu i vibe jaki chciałam.",
    autor: "Aniela i Mateusz",
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
  { nazwa: "Dojazd", cena: "w cenie", opis: "Do 150 km od Białegostoku. Dalej dogadamy się indywidualnie." },
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
  zapasowyTekst: "Wolisz zadzwonić albo napisać bezpośrednio?",
  formularz: {
    pola: {
      imieNazwisko: { etykieta: "Imię i nazwisko", placeholder: "Ania i Paweł" },
      email: { etykieta: "E-mail", placeholder: "wy@przyklad.pl" },
      telefon: { etykieta: "Telefon", placeholder: "+48 600 000 000" },
      dataWesela: { etykieta: "Data wesela" },
      sala: { etykieta: "Sala weselna", placeholder: "Nazwa sali / miejsca" },
      wiadomosc: {
        etykieta: "Wiadomość (opcjonalnie)",
        placeholder: "Dodatkowe informacje, pytania...",
      },
    },
    przycisk: "Wyślij zapytanie",
    przyciskWysylanie: "Wysyłanie…",
    sukces: "Dziękuję! Wiadomość dotarła — odpowiem najszybciej, jak mogę.",
    blad: "Coś poszło nie tak. Spróbujcie ponownie albo napiszcie bezpośrednio na maila lub zadzwońcie.",
  },
};
