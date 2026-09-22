"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type Locale = "en" | "tr" | "bg";

const copy = {
  en: {
    label: "Shipment tracking",
    title: "Track your cargo.",
    text: "Enter your tracking number to see the latest status and route information for your shipment.",
    input: "Tracking number",
    placeholder: "Ex. AYS-2408-0192",
    button: "Track shipment",
    required: "Please enter a tracking number.",
    ready: (value: string) => `Tracking updates for ${value} are being prepared.`,
    home: "Back to home",
  },
  tr: {
    label: "Yük takibi",
    title: "Yükünüzü takip edin.",
    text: "Gönderinizin güncel durumunu ve rota bilgilerini görmek için takip numaranızı girin.",
    input: "Takip numarası",
    placeholder: "Örn. AYS-2408-0192",
    button: "Yükü sorgula",
    required: "Lütfen bir takip numarası girin.",
    ready: (value: string) => `${value} için güncel takip bilgileri hazırlanıyor.`,
    home: "Ana sayfaya dön",
  },
  bg: {
    label: "Проследяване на пратка",
    title: "Следете товара си.",
    text: "Въведете номера за проследяване, за да видите актуалния статус и маршрута на вашата пратка.",
    input: "Номер за проследяване",
    placeholder: "Пример: AYS-2408-0192",
    button: "Проследете пратката",
    required: "Моля, въведете номер за проследяване.",
    ready: (value: string) => `Подготвяме актуализации за ${value}.`,
    home: "Назад към началото",
  },
} as const;

function readLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem("transays-locale") as Locale | null;
  return saved === "tr" || saved === "bg" ? saved : "en";
}

export default function TrackingPage() {
  const [locale, setLocale] = useState<Locale>("en");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [message, setMessage] = useState("");
  const [transportMode, setTransportMode] = useState("");
  const t = copy[locale];

  useEffect(() => {
    setLocale(readLocale());
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem("transays-locale", locale);
  }, [locale]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const number = params.get("number") || "";
    setTrackingNumber(number);
    setTransportMode(params.get("mode") || "");
    if (number) setMessage(t.ready(number));
  }, [t]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = trackingNumber.trim();
    setMessage(value ? t.ready(value) : t.required);
  }

  return (
    <main className="tracking-page">
      <header className="tracking-page__header">
        <Link className="brand" href="/" aria-label="AysLine home page">
          <span className="brand-mark">A</span>
          <span>Ays <span>Logistics Solutions</span></span>
        </Link>
        <div className="language-switcher" aria-label="Language">
          {(["en", "tr", "bg"] as Locale[]).map((value) => (
            <button key={value} type="button" className={locale === value ? "active" : ""} onClick={() => setLocale(value)} aria-pressed={locale === value}>
              {value.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <section className="tracking-page__hero">
        <div className="tracking-page__content">
          <p className="eyebrow"><span /> {t.label}</p>
          <h1>{t.title}</h1>
          <p>{t.text}</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="tracking-page-number">{t.input}</label>
            <div className="tracking-page__input">
              <input id="tracking-page-number" value={trackingNumber} onChange={(event) => setTrackingNumber(event.target.value)} placeholder={t.placeholder} />
              <button type="submit">{t.button} <span>→</span></button>
            </div>
          </form>
          {transportMode && <p className="tracking-page__mode">{transportMode.toUpperCase()} FREIGHT</p>}
          {message && <p className="tracking-page__message" role="status">{message}</p>}
          <button className="text-link text-link--light tracking-page__back" type="button" onClick={() => window.history.back()}>{t.home} <span>↩</span></button>
        </div>
      </section>
    </main>
  );
}
