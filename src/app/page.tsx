"use client";

import { FormEvent, useEffect, useState } from "react";

type Locale = "en" | "tr" | "bg";

const languages: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "tr", label: "TR" },
  { value: "bg", label: "BG" },
];

const truckReferenceImage = "/truck-hero.jpg";

const serviceImages = [
  truckReferenceImage,
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1200&q=85",
];

const translations = {
  en: {
    nav: ["Who we are", "Services", "History", "Contact"],
    cta: "Track your cargo",
    brandAriaLabel: "Ays Logistics Solutions home page",
    heroEyebrow: "Beyond borders logistics",
    heroTitle: ["The world between", "your business."],
    heroCopy: "No matter where your cargo is, AysLine delivers it safely to its destination with confidence.",
    heroPrimary: "Track your cargo",
    heroSecondary: "Meet us",
    statOne: ["42", "countries in operation"],
    statTwo: ["30", "years of experience"],
    statThree: ["24/7", "continuous support"],
    scroll: "SCROLL TO EXPLORE",
    manifestoEyebrow: "01 / Who we are",
    manifestoTitle: ["A moving", "world."],
    manifestoText: [
      "Ays Logistics Solutions does not just move cargo. We connect people, ideas, and opportunities.",
      "Behind every route is a solid plan, and behind every delivery is a team committed to its promise. We see logistics not as a final stop, but as a path to new beginnings.",
    ],
    manifestoLink: "Discover our story",
    manifestoLine: ["Reliability", "Transparency", "Agility"],
    servicesEyebrow: "Services",
    servicesTitle: ["The right solution", "for every route."],
    servicesNote: "Our global network combines with local expertise to build the smartest path for your cargo, whatever the need.",
    trackingLabel: "Ays portal",
    trackingTitle: ["Know your cargo", "in real time."],
    trackingBrand: "Ays Logistics Solutions",
    trackingTagline: "Your cargo, tracked every step of the way.",
    trackingIntro: "From pickup to delivery, follow your shipment with clear updates and reliable route visibility.",
    trackingDescription: "Track where your shipment is, what comes next, and when it will arrive from a single screen.",
    trackingInputLabel: "Tracking number",
    trackingPlaceholder: "Ex. AYS-2408-0192",
    trackingButtonLabel: "Track cargo",
    trackingRequired: "Please enter a tracking number.",
    trackingReady: (value: string) => `${value} status updates are being prepared.`,
    portalNote: "The portal is expanding with new features soon.",
    historyEyebrow: "02 / History",
    historyTitle: ["Our journey", "continues."],
    historyText: "What began with a truck, three people, and a bold belief has grown into a global logistics network. Today, we combine road, air, and sea freight with clear communication, careful planning, and the visibility businesses need at every step.",
    contactEyebrow: "Contact",
    contactTitle: ["Let’s move", "together."],
    contactText: "We are here for your next route, project, or any question on your mind.",
    footerText: "All rights reserved.",
    backToTop: "Back to top",
    localeLabel: "Language",
    location: "41°00' N\n28°58' E",
    connect: "live network",
    route: "live network",
  },
  tr: {
    nav: ["Biz kimiz", "Faaliyet alanlarımız", "Tarihçe", "İletişim"],
    cta: "Yükünü takip et",
    brandAriaLabel: "Ays Logistics Solutions ana sayfa",
    heroEyebrow: "Sınırları aşan lojistik",
    heroTitle: ["Dünya ile işiniz", "arasında."],
    heroCopy: "Yükünüz nerede olursa olsun, AysLine onu hedeflediği yere güvenle ulaştırır.",
    heroPrimary: "Yükünü takip et",
    heroSecondary: "Bizi tanıyın",
    statOne: ["42", "ülkede operasyon"],
    statTwo: ["30", "yıllık deneyim"],
    statThree: ["24/7", "kesintisiz destek"],
    scroll: "KEŞFETMEK İÇİN AŞAĞI İNMENİZ GEREKİR",
    manifestoEyebrow: "01 / Biz kimiz",
    manifestoTitle: ["Hareket eden", "bir dünya."],
    manifestoText: [
      "Ays Logistics Solutions, yalnızca yük taşımıyor. İnsanları, fikirleri ve fırsatları birbirine bağlıyoruz.",
      "Her rotanın arkasında güçlü bir plan, her teslimatın arkasında sözüne sadık bir ekip var. Çünkü biz lojistiği bir son durak değil, yeni başlangıçlara açılan yol olarak görüyoruz.",
    ],
    manifestoLink: "Hikayemizi keşfet",
    manifestoLine: ["Güvenilirlik", "Şeffaflık", "Çeviklik"],
    servicesEyebrow: "Faaliyet alanlarımız",
    servicesTitle: ["Her rota için", "doğru çözüm."],
    servicesNote: "Global ağımız, yerel uzmanlığımızla birleşiyor. İhtiyacınız ne olursa olsun, yükünüz için en akıllı yolu birlikte buluyoruz.",
    trackingLabel: "Ays portal",
    trackingTitle: ["Yükünüzü", "her an takip edin."],
    trackingBrand: "Ays Logistics Solutions",
    trackingTagline: "Yükünüz her adımda takipte.",
    trackingIntro: "Yükünüzün teslim alma noktasından varışına kadar tüm hareketlerini net güncellemelerle takip edin.",
    trackingDescription: "Gönderinizin nerede olduğunu, bir sonraki adımını ve teslimat zamanını tek ekrandan takip edin.",
    trackingInputLabel: "Takip numaranız",
    trackingPlaceholder: "Örn. AYS-2408-0192",
    trackingButtonLabel: "Yükü takip et",
    trackingRequired: "Lütfen bir takip numarası girin.",
    trackingReady: (value: string) => `${value} için güncel hareketler hazırlanıyor.`,
    portalNote: "Portal yakında yeni özelliklerle büyüyor.",
    historyEyebrow: "02 / Tarihçe",
    historyTitle: ["Yolculuğumuz", "devam ediyor."],
    historyText: "İşin mutfağında başlayan hizmet anlayışımız bugün kıtalar arası bir lojistik ağa dönüştü. Karayolu, havayolu ve denizyolu çözümlerimizi güçlü planlama, açık iletişim ve yükünüzün her adımını görünür kılan takip anlayışıyla birleştiriyoruz.",
    contactEyebrow: "İletişim",
    contactTitle: ["Birlikte", "hareket edelim."],
    contactText: "Yeni rotanız, projeniz ya da aklınızdaki soru için buradayız.",
    footerText: "Tüm hakları saklıdır.",
    backToTop: "Başa dön",
    localeLabel: "Dil",
    location: "41°00' N\n28°58' E",
    connect: "CANLI AĞ",
    route: "CANLI AĞ",
  },
  bg: {
    nav: ["За нас", "Услуги", "История", "Контакт"],
    cta: "Следете товара",
    brandAriaLabel: "Ays Logistics Solutions начална страница",
    heroEyebrow: "Логистика извън границите",
    heroTitle: ["Светът между", "вашия бизнес."],
    heroCopy: "Независимо къде е вашият товар, AysLine го доставя безопасно и сигурно до местоназначението.",
    heroPrimary: "Следете товара",
    heroSecondary: "Запознайте се с нас",
    statOne: ["42", "страни с операции"],
    statTwo: ["30", "години опит"],
    statThree: ["24/7", "непрекъсната подкрепа"],
    scroll: "ПРОЛИСТАЙ ЗА ДА ОПИТАШ",
    manifestoEyebrow: "01 / За нас",
    manifestoTitle: ["Движещ се", "свят."],
    manifestoText: [
      "Ays Logistics Solutions не просто транспортира товара. Ние свързваме хора, идеи и възможности.",
      "Зад всеки маршрут стои силен план, а зад всяка доставка – екип, който държи на обещанията си. За нас логистиката не е крайна точка, а път към нови начала.",
    ],
    manifestoLink: "Разгледайте историята ни",
    manifestoLine: ["Надеждност", "Прозрачност", "Гъвкавост"],
    servicesEyebrow: "Услуги",
    servicesTitle: ["Правилното решение", "за всеки маршрут."],
    servicesNote: "Нашата глобална мрежа се съчетава с местна експертиза, за да намерим най-интелигентния път за вашия товар.",
    trackingLabel: "Портал Ays",
    trackingTitle: ["Следете товара", "в реално време."],
    trackingBrand: "Ays Logistics Solutions",
    trackingTagline: "Вашият товар се проследява на всяка стъпка.",
    trackingIntro: "Следете пратката си от получаването до доставката с ясни актуализации и надеждна видимост на маршрута.",
    trackingDescription: "Следете къде се намира вашата пратка, какво следва и кога ще пристигне от един екран.",
    trackingInputLabel: "Номер за проследяване",
    trackingPlaceholder: "Пример: AYS-2408-0192",
    trackingButtonLabel: "Следете товара",
    trackingRequired: "Моля, въведете номер за проследяване.",
    trackingReady: (value: string) => `Подготвяме актуализации за ${value}.`,
    portalNote: "Порталът скоро ще се разшири с нови функции.",
    historyEyebrow: "02 / История",
    historyTitle: ["Нашето пътуване", "продължава."],
    historyText: "Пътят ни започна с камион, трима души и силна вяра, а днес се превърна в международна логистична мрежа. Съчетаваме автомобилен, въздушен и морски транспорт с прецизно планиране, ясна комуникация и проследимост на всяка стъпка.",
    contactEyebrow: "Контакт",
    contactTitle: ["Да се движим", "заедно."],
    contactText: "Ние сме тук за вашия следващ маршрут, проект или всякакъв въпрос, който имате.",
    footerText: "Всички права запазени.",
    backToTop: "Нагоре",
    localeLabel: "Език",
    location: "41°00' N\n28°58' E",
    connect: "НАЖИВО МРЕЖА",
    route: "НАЖИВО МРЕЖА",
  },
} as const;

const services = {
  en: [
    ["01 / Road", "Road freight", "Safe and flexible door-to-door road solutions across Europe and the Middle East.", serviceImages[0], "/services/road-freight"],
    ["02 / Air", "Air freight", "Fast access to leading air cargo networks for time-critical shipments.", serviceImages[1], "/services/air-freight"],
    ["03 / Sea", "Sea freight", "Planned ocean freight services connecting global ports with scale advantages.", serviceImages[2], "/services/sea-freight"],
    ["04 / Express", "Speedy Minivan", "Fast and flexible international minivan delivery for urgent shipments and last-mile needs.", "/sprinter.jpeg", "/services/speedy-minivan"],
    ["05 / Storage", "Warehousing", "Secure storage, organized handling, and dependable distribution support.", "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85", "/services/warehousing"],
    ["06 / Customs", "Customs Clearance", "Clear documentation and practical coordination for smooth international cargo flows.", "/customs.jpeg", "/services/customs-clearance"],
  ],
  tr: [
    ["01 / Kara", "Karayolu taşımacılığı", "Avrupa ve Orta Doğu'da, kapıdan kapıya planlanan güvenli ve esnek karayolu çözümleri.", serviceImages[0], "/services/road-freight"],
    ["02 / Hava", "Havayolu taşımacılığı", "Zaman kritik gönderileriniz için dünyanın önde gelen hava kargo ağlarına hızlı erişim.", serviceImages[1], "/services/air-freight"],
    ["03 / Deniz", "Denizyolu taşımacılığı", "Dünya limanlarını birbirine bağlayan, ölçekte avantaj sağlayan planlı denizyolu servisleri.", serviceImages[2], "/services/sea-freight"],
    ["04 / Express", "Speedy Minivan", "Acil gönderiler ve son kilometre ihtiyaçları için hızlı ve esnek uluslararası minivan taşımacılığı.", "/sprinter.jpeg", "/services/speedy-minivan"],
    ["05 / Depolama", "Depolama", "Güvenli stoklama, düzenli elleçleme ve güvenilir dağıtım desteği.", "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85", "/services/warehousing"],
    ["06 / Gümrük", "Gümrükleme", "Uluslararası yük akışlarınız için açık dokümantasyon ve pratik gümrük koordinasyonu.", "/customs.jpeg", "/services/customs-clearance"],
  ],
  bg: [
    ["01 / Път", "Камионен транспорт", "Сигурни и гъвкави решения от врата до врата в Европа и Близкия изток.", serviceImages[0], "/services/road-freight"],
    ["02 / Въздух", "Въздушен транспорт", "Бърз достъп до водещи въздушни мрежи за срокови пратки.", serviceImages[1], "/services/air-freight"],
    ["03 / Морски", "Морски транспорт", "Планирани морски услуги, свързващи световни пристанища с икономии от мащаба.", serviceImages[2], "/services/sea-freight"],
    ["04 / Експрес", "Speedy Minivan", "Бърз и гъвкав международен транспорт с миниван за спешни пратки и последната миля.", "/sprinter.jpeg", "/services/speedy-minivan"],
    ["05 / Склад", "Складови услуги", "Сигурно съхранение, организирана обработка и надеждна дистрибуция.", "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85", "/services/warehousing"],
    ["06 / Митници", "Митническо оформяне", "Ясна документация и практична координация за международните товарни потоци.", "/customs.jpeg", "/services/customs-clearance"],
  ],
} as const;

const milestones = {
  en: [
    ["1996", "Ays brand foundations were established with a practical, service-first approach."],
    ["2004", "International capacity expanded through dependable partners and stronger route planning."],
    ["2014", "Global freight operations began across road, air, and sea connections."],
    ["2020", "Digital transformation brought clearer communication and shipment visibility."],
    ["2026", "AysLine moves forward with one promise: make every shipment easier to manage."],
  ],
  tr: [
    ["1996", "Ays markasının temelleri, hizmet odaklı güçlü bir anlayışla atıldı."],
    ["2004", "Güvenilir iş ortakları ve güçlü rota planlamasıyla uluslararası kapasite artırıldı."],
    ["2014", "Karayolu, havayolu ve denizyolu bağlantılarıyla global taşımalar başladı."],
    ["2020", "Dijitalleşme ile iletişim ve yük görünürlüğü daha güçlü hale getirildi."],
    ["2026", "AysLine yoluna tek bir sözle devam ediyor: her yükü daha kolay yönetilebilir kılmak."],
  ],
  bg: [
    ["1996", "Поставени са основите на марката Ays с практичен и ориентиран към клиента подход."],
    ["2004", "Международният капацитет е разширен чрез надеждни партньори и по-добро планиране."],
    ["2014", "Започнаха глобалните превози по автомобилни, въздушни и морски маршрути."],
    ["2020", "Дигитализацията подобри комуникацията и видимостта на пратките."],
    ["2026", "AysLine продължава напред с едно обещание: всяка пратка да се управлява по-лесно."],
  ],
} as const;

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingMessage, setTrackingMessage] = useState("");
  const [selectedTrackingMode, setSelectedTrackingMode] = useState<"sea" | "air" | "road" | "van" | null>(null);

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("transays-locale") as Locale | null;
    if (savedLocale && languages.some((language) => language.value === savedLocale)) {
      setLocale(savedLocale);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "bg" ? "ltr" : locale === "tr" ? "ltr" : "ltr";
    window.localStorage.setItem("transays-locale", locale);
  }, [locale]);

  const t = translations[locale];
  const currentServices = services[locale];
  const currentMilestones = milestones[locale];
  const trackingModeLabels = {
    sea: locale === "tr" ? "Deniz yolu" : locale === "bg" ? "Морски транспорт" : "Sea freight",
    air: locale === "tr" ? "Hava yolu" : locale === "bg" ? "Въздушен транспорт" : "Air freight",
    road: locale === "tr" ? "Karayolu" : locale === "bg" ? "Автомобилен транспорт" : "Road freight",
    van: locale === "tr" ? "Minivan & Express" : locale === "bg" ? "Миниван и експрес" : "Minivan & express",
  };

  function handleTracking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanedNumber = trackingNumber.trim();

    if (!cleanedNumber) {
      setTrackingMessage(t.trackingRequired);
      return;
    }

    setTrackingMessage(t.trackingReady(cleanedNumber));
  }

  function handleImageTracking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanedNumber = trackingNumber.trim();
    if (!cleanedNumber) {
      setTrackingMessage(t.trackingRequired);
      return;
    }
    setTrackingMessage(t.trackingReady(cleanedNumber));
  }

  const trackingLocations = {
    sea: locale === "tr" ? "Son konum: İstanbul Limanı · Hamburg rotası" : locale === "bg" ? "Последна позиция: пристанище Истанбул · маршрут Хамбург" : "Last location: Istanbul Port · Hamburg route",
    air: locale === "tr" ? "Son konum: İstanbul Havalimanı · Hamburg varışı" : locale === "bg" ? "Последна позиция: летище Истанбул · пристигане в Хамбург" : "Last location: Istanbul Airport · Hamburg arrival",
    road: locale === "tr" ? "Son konum: İstanbul · Avrupa karayolu hattı" : locale === "bg" ? "Последна позиция: Истанбул · европейски автомобилен маршрут" : "Last location: Istanbul · European road corridor",
    van: locale === "tr" ? "Son konum: Hamburg dağıtım merkezi · son kilometre" : locale === "bg" ? "Последна позиция: дистрибуционен център Хамбург · последна миля" : "Last location: Hamburg distribution hub · last mile",
  };

  return (
    <div className="site-shell" dir="ltr">
      <header className="site-header">
        <a className="brand" href="#top" aria-label={t.brandAriaLabel}>
          <span className="brand-mark">A</span>
          <span>Ays <span>Logistics Solutions</span></span>
        </a>

        <nav className="main-nav" aria-label={locale === "bg" ? "Главна навигация" : locale === "tr" ? "Ana navigasyon" : "Main navigation"}>
          <a href="#hikaye">{t.nav[0]}</a>
          <a href="#hizmetler">{t.nav[1]}</a>
          <a href="#tarihce">{t.nav[2]}</a>
          <a href="#iletisim">{t.nav[3]}</a>
        </nav>

        <div className="header-actions">
          <div className="language-switcher" aria-label={t.localeLabel}>
            {languages.map((language) => (
              <button
                key={language.value}
                type="button"
                className={locale === language.value ? "active" : ""}
                onClick={() => setLocale(language.value)}
                aria-pressed={locale === language.value}
              >
                {language.label}
              </button>
            ))}
          </div>
          <a className="header-cta" href="#takip">{t.cta} <span>↗</span></a>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-image" aria-hidden="true">
            <div className="hero-visual hero-visual--truck" />
            <div className="hero-visual hero-visual--ship" />
            <div className="hero-visual hero-visual--plane" />
          </div>
          <div className="hero-content">
            <p className="eyebrow hero-eyebrow"><span /> {t.heroEyebrow}</p>
            <h1>
              {t.heroTitle[0]}<br />
              <em>{t.heroTitle[1]}</em>
            </h1>
            <p className="hero-copy">{t.heroCopy}</p>
            <div className="hero-actions">
              <a className="button button--accent" href="#takip">{t.heroPrimary} <span>↗</span></a>
              <a className="text-link text-link--light" href="#hikaye">{t.heroSecondary} <span>↓</span></a>
            </div>
          </div>
          <div className="hero-stats">
            <div>
              <strong>{t.statOne[0]}</strong>
              <span>{t.statOne[1]}</span>
            </div>
            <div>
              <strong>{t.statTwo[0]}</strong>
              <span>{t.statTwo[1]}</span>
            </div>
            <div>
              <strong>{t.statThree[0]}</strong>
              <span>{t.statThree[1]}</span>
            </div>
          </div>
          <div className="scroll-note">{t.scroll} <span>↓</span></div>
        </section>

        <section className="manifesto-section" id="hikaye">
          <div className="section-kicker">{locale === "en" ? "01" : locale === "tr" ? "01" : "01"} <span>{t.manifestoEyebrow.split("/")[1]?.trim() || t.nav[0]}</span></div>
          <div className="manifesto-grid">
            <h2>
              {t.manifestoTitle[0]}<br />
              <em>{t.manifestoTitle[1]}</em>
            </h2>
            <div className="manifesto-copy">
              <p>{t.manifestoText[0]}</p>
              <p>{t.manifestoText[1]}</p>
              <a className="text-link" href="#tarihce">{t.manifestoLink} <span>↗</span></a>
            </div>
          </div>
          <div className="manifesto-line">
            <span>01</span><span>{t.manifestoLine[0]}</span>
            <span>02</span><span>{t.manifestoLine[1]}</span>
            <span>03</span><span>{t.manifestoLine[2]}</span>
          </div>
        </section>

        <section className="services-section" id="hizmetler">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span /> {t.servicesEyebrow}</p>
              <h2>
                {t.servicesTitle[0]}<br />
                <em>{t.servicesTitle[1]}</em>
              </h2>
            </div>
            <p className="heading-note">{t.servicesNote}</p>
          </div>
          <div className="service-grid">
            {currentServices.map(([label, title, text, image, href]) => (
              <a className="service-card" key={label} href={`${href}?lang=${locale}`} style={{ backgroundImage: `url(${image})` }}>
                <div className="service-shade" />
                <div className="service-content">
                  <p>{label}</p>
                  <h3>{title}</h3>
                  <span className="service-arrow">↗</span>
                  <div className="service-description">{text}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="tracking-section" id="takip">
          <div className="tracking-graphic">
            <div className="tracking-brand-lockup">
              <strong>{t.trackingBrand}</strong>
              <span>{t.trackingTagline}</span>
              <p>{t.trackingIntro}</p>
            </div>
            <button className="tracking-hotspot tracking-hotspot--sea" type="button" onClick={() => { setSelectedTrackingMode("sea"); setTrackingMessage(""); }} aria-label={trackingModeLabels.sea}>
              <span className="tracking-hotspot__label">{trackingModeLabels.sea}</span>
            </button>
            <button className="tracking-hotspot tracking-hotspot--air" type="button" onClick={() => { setSelectedTrackingMode("air"); setTrackingMessage(""); }} aria-label={trackingModeLabels.air}>
              <span className="tracking-hotspot__label">{trackingModeLabels.air}</span>
            </button>
            <button className="tracking-hotspot tracking-hotspot--road" type="button" onClick={() => { setSelectedTrackingMode("road"); setTrackingMessage(""); }} aria-label={trackingModeLabels.road}>
              <span className="tracking-hotspot__label">{trackingModeLabels.road}</span>
            </button>
            <button className="tracking-hotspot tracking-hotspot--van" type="button" onClick={() => { setSelectedTrackingMode("van"); setTrackingMessage(""); }} aria-label={trackingModeLabels.van}>
              <span className="tracking-hotspot__label">{trackingModeLabels.van}</span>
            </button>
            {selectedTrackingMode && (
              <div className={`image-tracking-modal image-tracking-modal--${selectedTrackingMode}`} role="dialog" aria-label={t.trackingInputLabel}>
                <button className="image-tracking-modal__close" type="button" onClick={() => setSelectedTrackingMode(null)} aria-label="Close">×</button>
                <p>{t.trackingLabel}</p>
                <strong>{t.trackingTitle[0]} {t.trackingTitle[1]}</strong>
                <form onSubmit={handleImageTracking}>
                  <label htmlFor="image-tracking-number">{t.trackingInputLabel}</label>
                  <div>
                    <input id="image-tracking-number" autoFocus value={trackingNumber} onChange={(event) => setTrackingNumber(event.target.value)} placeholder={t.trackingPlaceholder} />
                    <button type="submit" aria-label={t.trackingButtonLabel}>→</button>
                  </div>
                </form>
                {trackingMessage && <div className="image-tracking-result" role="status"><strong>{trackingMessage}</strong><span>{trackingLocations[selectedTrackingMode]}</span></div>}
              </div>
            )}
            <div className="coordinate">{t.location}</div>
          </div>
        </section>

        <section className="history-section" id="tarihce">
          <div className="section-kicker">{locale === "en" ? "02" : locale === "tr" ? "02" : "02"} <span>{t.historyEyebrow.split("/")[1]?.trim() || t.nav[2]}</span></div>
          <div className="history-intro">
            <h2>
              {t.historyTitle[0]}<br />
              <em>{t.historyTitle[1]}</em>
            </h2>
            <p>{t.historyText}</p>
          </div>
          <div className="milestones">
            {currentMilestones.map(([year, detail]) => (
              <div className="milestone" key={year}>
                <strong>{year}</strong>
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-section" id="iletisim">
          <div>
            <p className="eyebrow"><span /> {t.contactEyebrow}</p>
            <h2>
              {t.contactTitle[0]}<br />
              <em>{t.contactTitle[1]}</em>
            </h2>
          </div>
          <div className="contact-info">
            <p>{t.contactText}</p>
            <a href="mailto:info@aysline.com">info@aysline.com <span>↗</span></a>
            <a href="tel:+3892970297">+389 297 0 297</a>
            <address>Ays Logistics Solutions Eood, Maritsa Blvd. 69, Floor 1, Office 3. Plovdiv, Bulgaria</address>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand" href="#top">
          <span className="brand-mark">A</span>
          <span>Ays <span>Logistics Solutions</span></span>
        </a>
        <span>© 2024 Ays Logistics Solutions</span>
        <span>{t.footerText}</span>
        <a href="#top">{t.backToTop} ↑</a>
      </footer>
    </div>
  );
}
