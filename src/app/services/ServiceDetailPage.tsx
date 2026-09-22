"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Locale = "en" | "tr" | "bg";
type ServiceSlug = "road" | "air" | "sea" | "van" | "storage" | "customs";

const languages: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "tr", label: "TR" },
  { value: "bg", label: "BG" },
];

const translations = {
  road: {
    en: {
      kicker: "Road Freight",
      title: "International road transport with a 30-year track record.",
      summary:
        "With 30 years of experience, we provide international road freight solutions backed by a highly skilled team and a strong supplier network. From daily lane operations to complex project cargo, we build reliable routes for businesses that need consistency, visibility, and speed.",
      sectionOneTitle: "What we deliver",
      sectionOneList: [
        "Door-to-door road freight across Europe and the Middle East",
        "Flexible capacity planning with trusted carrier partners",
        "Transit coordination for time-sensitive and regular shipments",
        "Consistent communication and proactive updates throughout the route",
      ],
      sectionTwoTitle: "Why clients choose us",
      sectionTwoText:
        "Our international road transport expertise is driven by long-standing relationships, operational discipline, and a deep understanding of customs, planning, and routing. We help businesses move cargo with confidence, while keeping delivery schedules realistic, efficient, and fully supported.",
      home: "Back to home",
    },
    tr: {
      kicker: "Karayolu Taşımacılığı",
      title: "30 yıllık deneyimle uluslararası karayolu taşımacılığı.",
      summary:
        "30 yıllık deneyimle, yüksek uzmanlık sahibi ekibimiz ve güçlü tedarikçi ağımızla uluslararası karayolu taşımacılığı çözümleri sunuyoruz. Günlük hat operasyonlarından karmaşık proje yüklerine kadar, istikrar, görünürlük ve hız isteyen işletmeler için güvenilir rota çözümleri üretiyoruz.",
      sectionOneTitle: "Neler sunuyoruz",
      sectionOneList: [
        "Avrupa ve Orta Doğu genelinde kapıdan kapıya karayolu taşımacılığı",
        "Güvenilir taşıyıcı ortaklarla esnek kapasite planlaması",
        "Zaman kritik ve düzenli sevkiyatlar için transit koordinasyonu",
        "Rota boyunca tutarlı iletişim ve proaktif güncellemeler",
      ],
      sectionTwoTitle: "Neden bizi tercih ediyorlar",
      sectionTwoText:
        "Uluslararası karayolu taşımacılığı uzmanlığımız, uzun yıllara dayanan ilişkiler, operasyonel disiplin ve gümrük, planlama ve rota yönetimi konusundaki derin bilgiye dayanır. İşletmelerin yüklerini güvenle hareket ettirmelerine yardımcı olurken, teslim programlarını gerçekçi, verimli ve eksiksiz destekliyoruz.",
      home: "Ana sayfaya dön",
    },
    bg: {
      kicker: "Камионен транспорт",
      title: "Международен автомобилен транспорт с 30-годишен опит.",
      summary:
        "С 30 години опит предлагаме международни решения за автомобилен транспорт, подкрепени от висококвалифициран екип и силна мрежа от доставчици. От ежедневни маршрути до сложни проектни пратки, изграждаме надеждни решения за фирми, които се нуждаят от стабилност, видимост и скорост.",
      sectionOneTitle: "Какво предлагаме",
      sectionOneList: [
        "Автомобилен транспорт от врата до врата в Европа и Близкия изток",
        "Гъвкаво планиране на капацитета с надеждни партньори",
        "Координация на транзит за срокови и редовни пратки",
        "Последователна комуникация и proactive актуализации по време на маршрута",
      ],
      sectionTwoTitle: "Защо ни избират",
      sectionTwoText:
        "Нашият опит в международния автомобилен транспорт се основава на дългогодишни партньорства, оперативна дисциплина и дълбоко познаване на митниците, планирането и маршрутизацията. Помагаме на бизнеса да движи товара си с увереност, като същевременно запазваме реалистични, ефективни и добре подкрепени срокове на доставка.",
      home: "Назад към началото",
    },
  },
  air: {
    en: {
      kicker: "Air Freight",
      title: "Fast, agile, and dependable air cargo solutions.",
      summary:
        "We organize air freight services for urgent, high-priority, and time-sensitive shipments with a focus on speed, coordination, and secure handling. Our team works with leading air cargo networks to ensure cargo moves from origin to destination with precision and control.",
      sectionOneTitle: "Air freight focus",
      sectionOneList: [
        "Urgent shipments and tight delivery windows",
        "Priority coordination with airline and handling partners",
        "Door-to-door visibility for time-sensitive cargo",
        "Flexible solutions for retail, industrial, and project freight",
      ],
      sectionTwoTitle: "Why it matters",
      sectionTwoText:
        "When deadlines are critical, every minute matters. We build a response plan around your cargo profile to keep shipments moving quickly while maintaining full traceability and a smooth flow from booking to final delivery.",
      home: "Back to home",
    },
    tr: {
      kicker: "Havayolu Taşımacılığı",
      title: "Hızlı, esnek ve güvenilir hava kargo çözümleri.",
      summary:
        "Acil, yüksek öncelikli ve zaman kritik gönderiler için hava taşımacılığı çözümleri organize ediyoruz. Hız, koordinasyon ve güvenli taşıma odaklı yaklaşımımızla ekiplerimiz, yükün menşeden varış noktasına doğru hassas ve kontrollü şekilde ilerlemesini sağlıyor.",
      sectionOneTitle: "Hava taşımacılığı odağı",
      sectionOneList: [
        "Acil sevkiyatlar ve dar teslimat süreleri",
        "Havayolu ve operasyon ortaklarıyla öncelikli koordinasyon",
        "Zaman kritik yükler için kapıdan kapıya görünürlük",
        "Perakende, endüstriyel ve proje yükleri için esnek çözümler",
      ],
      sectionTwoTitle: "Neden önemli",
      sectionTwoText:
        "Süreler kritik olduğunda her dakika önemlidir. Gönderi profilinize göre hızlı hareketi koruyacak ve rezervasyondan son teslimata kadar tam izlenebilirlik sunacak bir plan kuruyoruz.",
      home: "Ana sayfaya dön",
    },
    bg: {
      kicker: "Въздушен транспорт",
      title: "Бързи, гъвкави и надеждни въздушни товарни решения.",
      summary:
        "Организираме въздушен транспорт за спешни, приоритетни и срокови пратки с акцент върху скоростта, координацията и сигурната обработка. Нашият екип работи с водещи въздушни мрежи, за да гарантира, че товарът се движи от произход до местоназначение с прецизност и контрол.",
      sectionOneTitle: "Фокус на въздушния транспорт",
      sectionOneList: [
        "Спешни пратки и стегнати срокове за доставка",
        "Приоритетна координация с авиокомпании и обработващи партньори",
        "Видимост от врата до врата за срокови пратки",
        "Гъвкави решения за търговски, индустриални и проектни товари",
      ],
      sectionTwoTitle: "Защо това е важно",
      sectionTwoText:
        "Когато сроковете са критични, всяка минута има значение. Изграждаме план според профила на вашия товар, за да поддържаме бързо движение, пълна проследимост и гладко течение от резервация до крайна доставка.",
      home: "Назад към началото",
    },
  },
  sea: {
    en: {
      kicker: "Sea Freight",
      title: "Cost-efficient ocean logistics designed for scale.",
      summary:
        "Our sea freight services connect global ports with well-planned schedules, reliable supply chain coordination, and a strong focus on cargo safety. We provide container solutions that balance economy, flexibility, and operational efficiency for import and export flows.",
      sectionOneTitle: "Sea freight capabilities",
      sectionOneList: [
        "FCL and LCL planning with global port coverage",
        "Full coordination across booking, loading, and documentation",
        "Support for regular cargo flows and project shipments",
        "Reliable scheduling with practical route optimization",
      ],
      sectionTwoTitle: "Operational advantage",
      sectionTwoText:
        "For cargo that does not demand immediate airspeed, sea freight remains the most efficient and scalable option. We design each movement around your commercial priorities, helping you control cost while keeping transit planning consistent and predictable.",
      home: "Back to home",
    },
    tr: {
      kicker: "Denizyolu Taşımacılığı",
      title: "Ölçek için tasarlanmış maliyet verimli deniz lojistiği.",
      summary:
        "Denizyolu taşımacılığı çözümlerimiz, küresel limanları iyi planlanmış programlarla, güvenilir tedarik zinciri koordinasyonu ve yüksek yük güvenliği odaklı bir yaklaşımla birleştirir. İthalat ve ihracat akışları için ekonomi, esneklik ve operasyonel verimliliği dengeleyen konteyner çözümleri sunarız.",
      sectionOneTitle: "Deniz taşımacılığı yetenekleri",
      sectionOneList: [
        "Küresel liman kapsamı ile FCL ve LCL planlama",
        "Rezervasyon, yükleme ve dokümantasyon sürecinde tam koordinasyon",
        "Düzenli yük akışları ve proje sevkiyatları için destek",
        "Pratik rota optimizasyonu ile güvenilir çizelgeleme",
      ],
      sectionTwoTitle: "Operasyonel avantaj",
      sectionTwoText:
        "Acil hava hızı gerektirmeyen yükler için denizyolu taşımacılığı en verimli ve ölçeklenebilir seçenek olmaya devam ediyor. Her taşıma planını ticari önceliklerinize göre tasarlayıp maliyeti kontrol ederken transit planlamasını tutarlı ve öngörülebilir tutuyoruz.",
      home: "Ana sayfaya dön",
    },
    bg: {
      kicker: "Морски транспорт",
      title: "Рентабилна морска логистика, проектирана за мащаб.",
      summary:
        "Нашите морски услуги свързват световни пристанища чрез добре планирани графици, надеждна координация на веригата за доставки и силен фокус върху безопасността на товара. Предлагаме контейнерни решения, които балансират икономията, гъвкавостта и оперативната ефективност при внос и износ.",
      sectionOneTitle: "Възможности на морския транспорт",
      sectionOneList: [
        "FCL и LCL планиране с глобално покритие на пристанища",
        "Пълна координация на резервация, товарене и документи",
        "Поддръжка за редовни товарни потоци и проектни пратки",
        "Надеждни графици с практична оптимизация на маршрута",
      ],
      sectionTwoTitle: "Оперативно предимство",
      sectionTwoText:
        "За товари, които не изискват незабавна въздушна скорост, морският транспорт остава най-ефективният и мащабируем вариант. Проектираме всяко движение според вашите бизнес приоритети, помагайки да контролирате разходите, като същевременно запазвате планирането на транзита последователно и предвидимо.",
      home: "Назад към началото",
    },
  },
  van: {
    en: {
      kicker: "Speedy Minivan",
      title: "Fast last-mile delivery with flexible minivan capacity.",
      summary: "Our speedy minivan service is built for urgent deliveries, smaller shipments, and time-sensitive last-mile movement. We keep local delivery agile, visible, and carefully coordinated from pickup to handover.",
      sectionOneTitle: "What we deliver",
      sectionOneList: ["Fast international delivery with spacious minivan capacity", "Flexible support for urgent and smaller shipments", "Direct coordination from pickup to final handover", "Clear updates throughout the delivery route"],
      sectionTwoTitle: "Why clients choose us",
      sectionTwoText: "When a full truck is too much and a standard courier is not enough, Speedy Minivan gives businesses a practical middle ground. We combine speed, space, and personal coordination for deliveries that cannot wait.",
      home: "Back to home",
    },
    tr: {
      kicker: "Speedy Minivan",
      title: "Esnek minivan kapasitesiyle hızlı son kilometre teslimatı.",
      summary: "Speedy Minivan hizmetimiz acil teslimatlar, küçük hacimli gönderiler ve zaman kritik son kilometre taşımaları için tasarlandı. Teslim alma noktasından teslimata kadar süreci hızlı, görünür ve kontrollü şekilde yönetiyoruz.",
      sectionOneTitle: "Neler sunuyoruz",
      sectionOneList: ["Geniş minivan kapasitesiyle hızlı uluslararası teslimat", "Acil ve küçük hacimli gönderiler için esnek destek", "Teslim alma ve son teslimat arasında doğrudan koordinasyon", "Teslimat rotası boyunca net bilgilendirme"],
      sectionTwoTitle: "Neden Speedy Minivan",
      sectionTwoText: "Tam kamyonun fazla, standart kuryenin yetersiz kaldığı durumlarda Speedy Minivan pratik bir çözüm sunar. Bekleyemeyecek gönderiler için hız, alan ve kişisel koordinasyonu bir araya getiriyoruz.",
      home: "Ana sayfaya dön",
    },
    bg: {
      kicker: "Speedy Minivan",
      title: "Бърза доставка на последната миля с гъвкав капацитет.",
      summary: "Нашата услуга Speedy Minivan е предназначена за спешни доставки, по-малки пратки и сроков транспорт на последната миля. Управляваме всяка доставка бързо, видимо и координирано.",
      sectionOneTitle: "Какво предлагаме",
      sectionOneList: ["Бърза международна доставка с просторен миниван", "Гъвкава поддръжка за спешни и малки пратки", "Директна координация от получаването до доставката", "Ясни актуализации по време на маршрута"],
      sectionTwoTitle: "Защо Speedy Minivan",
      sectionTwoText: "Когато един камион е прекалено голям, а стандартният куриер не е достатъчен, Speedy Minivan предлага практично решение. Съчетаваме скорост, пространство и лична координация.",
      home: "Назад към началото",
    },
  },
  storage: {
    en: {
      kicker: "Warehousing",
      title: "Secure storage and organized distribution support.",
      summary: "We provide practical warehousing support for businesses that need secure space, careful handling, and reliable flow between storage and delivery. Your inventory stays organized, accessible, and ready for its next route.",
      sectionOneTitle: "What we deliver",
      sectionOneList: ["Secure short- and long-term storage support", "Organized receiving, handling, and dispatch coordination", "Flexible space for regular and project cargo", "Clear communication across every warehouse movement"],
      sectionTwoTitle: "Why clients choose us",
      sectionTwoText: "Good warehousing is more than a place to keep goods. We connect storage with transport planning, helping businesses reduce friction, protect inventory, and keep distribution moving reliably.",
      home: "Back to home",
    },
    tr: {
      kicker: "Depolama",
      title: "Güvenli depolama ve düzenli dağıtım desteği.",
      summary: "Güvenli alan, dikkatli elleçleme ve depolama ile teslimat arasındaki akış için işletmelere pratik depolama desteği sunuyoruz. Stoklarınızı düzenli, erişilebilir ve bir sonraki rotaya hazır tutuyoruz.",
      sectionOneTitle: "Neler sunuyoruz",
      sectionOneList: ["Kısa ve uzun dönem güvenli depolama desteği", "Düzenli kabul, elleçleme ve sevk koordinasyonu", "Düzenli ve proje yükleri için esnek alan çözümleri", "Depodaki her hareket boyunca net iletişim"],
      sectionTwoTitle: "Neden bizi tercih ediyorlar",
      sectionTwoText: "İyi depolama yalnızca ürünleri bekletmek değildir. Depolamayı taşıma planlamasıyla birleştirerek operasyonel sürtünmeyi azaltıyor, stoklarınızı koruyor ve dağıtım akışını güvenilir tutuyoruz.",
      home: "Ana sayfaya dön",
    },
    bg: {
      kicker: "Складови услуги",
      title: "Сигурно съхранение и организирана дистрибуция.",
      summary: "Предлагаме практична складова поддръжка за фирми, които се нуждаят от сигурно пространство, внимателна обработка и надежден поток между склада и доставката.",
      sectionOneTitle: "Какво предлагаме",
      sectionOneList: ["Сигурно краткосрочно и дългосрочно съхранение", "Организирано приемане, обработка и експедиция", "Гъвкаво пространство за редовни и проектни товари", "Ясна комуникация при всяко движение в склада"],
      sectionTwoTitle: "Защо ни избират",
      sectionTwoText: "Доброто складиране е повече от място за съхранение. Свързваме склада с транспортното планиране, за да защитим стоката и да поддържаме дистрибуцията надеждна.",
      home: "Назад към началото",
    },
  },
  customs: {
    en: {
      kicker: "Customs Clearance",
      title: "Clear customs coordination for confident international trade.",
      summary: "We help businesses move through customs with organized documentation, practical coordination, and clear communication. Our team supports the process so cargo can keep moving with fewer surprises and better visibility.",
      sectionOneTitle: "What we deliver",
      sectionOneList: ["Documentation coordination for import and export flows", "Practical support for customs procedures and requirements", "Clear communication between shippers, carriers, and partners", "Proactive follow-up through the clearance process"],
      sectionTwoTitle: "Why clients choose us",
      sectionTwoText: "Customs should not become an uncertain pause in your supply chain. We bring structure to the paperwork and coordination around each shipment, helping businesses plan with more confidence and keep international cargo moving.",
      home: "Back to home",
    },
    tr: {
      kicker: "Gümrükleme",
      title: "Uluslararası ticaret için açık ve güvenilir gümrük koordinasyonu.",
      summary: "Düzenli dokümantasyon, pratik koordinasyon ve net iletişimle işletmelerin gümrük süreçlerini daha kontrollü yönetmesine yardımcı oluyoruz. Yükünüzün daha az sürprizle ve daha yüksek görünürlükle ilerlemesini sağlıyoruz.",
      sectionOneTitle: "Neler sunuyoruz",
      sectionOneList: ["İthalat ve ihracat akışları için dokümantasyon koordinasyonu", "Gümrük prosedürleri ve gereklilikleri için pratik destek", "Gönderici, taşıyıcı ve iş ortakları arasında net iletişim", "Gümrükleme süreci boyunca proaktif takip"],
      sectionTwoTitle: "Neden bizi tercih ediyorlar",
      sectionTwoText: "Gümrük süreçleri tedarik zincirinizde belirsiz bir bekleme noktası olmamalı. Her gönderinin evrak ve koordinasyon akışına düzen kazandırarak daha güvenli planlama yapmanıza ve uluslararası yüklerinizi kesintisiz ilerletmenize yardımcı oluyoruz.",
      home: "Ana sayfaya dön",
    },
    bg: {
      kicker: "Митническо оформяне",
      title: "Ясна митническа координация за международна търговия.",
      summary: "Помагаме на бизнеса да преминава през митническите процедури с организирана документация, практична координация и ясна комуникация, така че товарът да продължи с по-малко изненади.",
      sectionOneTitle: "Какво предлагаме",
      sectionOneList: ["Координация на документи при внос и износ", "Практична подкрепа при митнически процедури и изисквания", "Ясна комуникация между изпращачи, превозвачи и партньори", "Проактивно проследяване по време на оформянето"],
      sectionTwoTitle: "Защо ни избират",
      sectionTwoText: "Митницата не трябва да бъде несигурна пауза във веригата за доставки. Внасяме структура в документите и координацията, за да планирате по-уверено и да поддържате международния товар в движение.",
      home: "Назад към началото",
    },
  },
} as const;

function readSavedLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const savedLocale = window.localStorage.getItem("transays-locale") as Locale | null;
  if (savedLocale && languages.some((language) => language.value === savedLocale)) {
    return savedLocale;
  }
  return "en";
}

export default function ServiceDetailPage({ slug }: { slug: ServiceSlug }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [localeReady, setLocaleReady] = useState(false);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("lang") as Locale | null;
    const saved = requested && languages.some((language) => language.value === requested) ? requested : readSavedLocale();
    setLocale(saved);
    setLocaleReady(true);
  }, []);

  useEffect(() => {
    if (!localeReady) return;
    document.documentElement.lang = locale;
    document.documentElement.dir = "ltr";
    window.localStorage.setItem("transays-locale", locale);
  }, [locale, localeReady]);

  const content = translations[slug][locale];

  return (
    <main className="service-detail-page">
      <header className="service-detail-header">
        <a className="brand" href="/" aria-label="Ays Logistics Solutions home page">
          <span className="brand-mark">A</span>
          <span>Ays <span>Logistics Solutions</span></span>
        </a>

        <div className="language-switcher" aria-label="Language">
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
      </header>

      <div className={`service-hero service-hero--${slug}`}>
        <div className="service-hero__content">
          <p className="eyebrow"><span /> {content.kicker}</p>
          <h1>{content.title}</h1>
          <p>{content.summary}</p>
          <div className="service-detail-actions">
            <Link href="/" className="button button--accent">
              {content.home} <span>↗</span>
            </Link>
          </div>
        </div>
      </div>

      <section className="service-detail-section">
        <div className="service-detail-grid">
          <div>
            <h2>{content.sectionOneTitle}</h2>
            <ul>
              {content.sectionOneList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2>{content.sectionTwoTitle}</h2>
            <p>{content.sectionTwoText}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
