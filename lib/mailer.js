import nodemailer from "nodemailer";
import { marka } from "../content.js";

function utworzTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 8000,
  });
}

export async function wyslijZgloszenie(dane) {
  const transporter = utworzTransporter();

  await transporter.sendMail({
    from: `"Formularz — ${marka.nazwa} ${marka.nazwisko}" <${process.env.SMTP_USER}>`,
    to: marka.email,
    replyTo: dane.email,
    subject: `Nowe zapytanie: ${dane.dataWesela} — ${dane.sala}`,
    text: [
      `Imię i nazwisko: ${dane.imieNazwisko}`,
      `E-mail: ${dane.email}`,
      `Telefon: ${dane.telefon}`,
      `Data wesela: ${dane.dataWesela}`,
      `Sala weselna: ${dane.sala}`,
      "",
      "Wiadomość:",
      dane.wiadomosc?.trim() || "(brak)",
    ].join("\n"),
  });
}
