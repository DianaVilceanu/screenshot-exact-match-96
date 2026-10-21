import type { Article, Category } from "../journal";

export const categories: Category[] = [
  { id: "graphic-design", slug: "design-grafic", name: "Design grafic și branding", description: "Identitate, tipografie și arta de a face un brand ușor de recunoscut." },
  { id: "social-media", slug: "social-media", name: "Design și strategie pentru social media", description: "Feeduri, carusele, campanii și design care atrage atenția în timpul derulării." },
  { id: "content-creation", slug: "creare-de-continut", name: "Creare de conținut și direcție artistică", description: "Concepte, direcție vizuală și conținut care spune o poveste." },
];

type Block = Article["sections"][number]["blocks"][number];
const p = (text: string): Block => ({ type: "p", text });
const h3 = (text: string): Block => ({ type: "h3", text });
const ul = (...items: string[]): Block => ({ type: "ul", items });
const ol = (...items: string[]): Block => ({ type: "ol", items });

export const articles: Article[] = [
  {
    id: "how-to-build-a-strong-visual-identity",
    slug: "cum-sa-construiesti-o-identitate-vizuala-puternica",
    title: "Cum să construiești o identitate vizuală puternică pentru brandul tău",
    description: "Un ghid practic despre elementele esențiale ale unei identități vizuale și despre cum să le păstrezi consecvente odată ce începi să publici.",
    category: "graphic-design",
    publishedAt: null,
    cover: { key: "journal-identity", alt: "Colaj roz cu un chip clasic în semitonuri, o schiță pe hârtie și o mână care ține un stilou" },
    intro: "O identitate vizuală înseamnă mai mult decât un logo. Este ansamblul de decizii care îi ajută pe oameni să te recunoască înainte să-ți citească numele. În acest ghid vei afla cu ce decizii să începi, cum să le transformi într-un sistem și cum să păstrezi coerența acelui sistem odată ce începi să creezi conținut în mod regulat.",
    sections: [
      {
        id: "incepe-cu-o-pozitionare",
        heading: "Începe cu o poziționare, nu cu o paletă de culori",
        blocks: [
          p("Înainte să alegi culorile, scrie într-o singură propoziție ce reprezintă brandul și cui i se adresează. Verifică fiecare decizie ulterioară în raport cu această idee. Un brand pentru oameni încrezători și jucăuși are nevoie de alte forme și cuvinte decât unul construit în jurul unei expertize care inspiră calm."),
          p("Inklabs este un exemplu bun: întreaga sa identitate pornește de la o singură idee: tatuajele nu trebuie să fie pentru totdeauna. Această idee îi permite brandului să fie îndrăzneț, direct și puțin obraznic."),
        ],
      },
      {
        id: "elementele-de-baza",
        heading: "Elementele de bază ale unei identități",
        blocks: [
          h3("Culoarea"),
          p("O paletă restrânsă este mai ușor de recunoscut. Alege o culoare dominantă, una secundară și una neutră. Folosește culoarea dominantă suficient de des încât oamenii să înceapă să o asocieze cu tine."),
          h3("Tipografia"),
          p("Alege un font cu personalitate pentru titluri și unul ușor de citit pe telefon pentru text. Două familii de fonturi sunt, de obicei, suficiente."),
          h3("Imaginile"),
          p("Stabilește cum ar trebui să arate fotografiile: lumina, fundalurile, încadrarea și felul în care apar oamenii. Imaginile consecvente contribuie la recunoașterea brandului la fel de mult ca un logo."),
          h3("Elementele grafice"),
          p("Formele, chenarele, stickerele sau fotografiile de ambalaj care reapar îți oferă un punct de plecare pentru fiecare compoziție."),
        ],
      },
      {
        id: "transforma-deciziile-intr-un-sistem",
        heading: "Transformă deciziile într-un sistem",
        blocks: [
          p("Un sistem înseamnă că oricine poate crea o postare nouă care să arate în continuare ca parte din brand. Notează regulile și construiește câteva șabloane:"),
          ul("Două sau trei grile de compoziție pentru postări și story-uri", "Reguli pentru lungimea și dimensiunea titlurilor", "Unde se așază logoul și unde nu trebuie pus niciodată", "Exemple de utilizare corectă și incorectă"),
        ],
      },
      {
        id: "pastreaza-consecventa-pe-masura-ce-cresti",
        heading: "Păstrează consecvența pe măsură ce crești",
        blocks: [
          p("Cea mai mare amenințare pentru o identitate nu este un design slab, ci o sută de variante ușor diferite. Analizează feedul în fiecare lună, renunță la compozițiile care se îndepărtează de direcția stabilită și actualizează sistemul în loc să faci excepții."),
          p("Dacă ai nevoie de ajutor pentru a construi o identitate care funcționează bine în social media, descoperă serviciul meu de branding."),
        ],
      },
    ],
    related: { projects: ["inklabs", "divaz"], services: ["branding"] },
  },
  {
    id: "why-some-fonts-make-a-brand-look-more-expensive",
    slug: "de-ce-unele-fonturi-fac-un-brand-sa-para-mai-scump",
    title: "De ce unele fonturi fac un brand să pară mai scump",
    description: "Contrast, spațiere și simplitate: detaliile tipografice care dau unui brand un aer premium și cele care îl fac să pară ieftin.",
    category: "graphic-design",
    publishedAt: null,
    cover: { key: "journal-fonts", alt: "Colaj tipografic: un A mare cu serife și un a mic pe roz, cu steluțe și hârtie ruptă" },
    intro: "Oamenii își formează o idee despre prețul unui produs din tipografie cu mult înainte să vadă eticheta de preț. Acest articol explică ce trăsături tipografice sugerează un brand premium, de ce funcționează și cum să le folosești fără ca brandul tău să devină rece.",
    sections: [
      {
        id: "contrastul",
        heading: "Contrastul sugerează măiestrie",
        blocks: [
          p("Fonturile cu serife și contrast puternic, în care liniile groase stau alături de cele subțiri, vin dintr-o lungă tradiție a tiparului editorial și de modă. Le asociem vizual cu revistele, ambalajele de lux și atenția la detalii."),
          p("Nu ai nevoie de un font cu serife ca să pari premium, dar ai nevoie de contrast undeva: între dimensiuni, între grosimile literelor sau între text și spațiul liber."),
        ],
      },
      {
        id: "spatiul",
        heading: "Spațiul este adevăratul lux",
        blocks: [p("Spațierea generoasă între litere în textele scurte cu majuscule, marginile ample și mai puține cuvinte în fiecare compoziție transmit același lucru: nu avem nevoie să strigăm. Compozițiile aglomerate amintesc de pliantele cu reduceri, indiferent de fontul folosit.")],
      },
      {
        id: "simplitatea",
        heading: "Simplitatea bate decorul",
        blocks: [ul("Folosește una sau două familii de fonturi, nu cinci", "Limitează grosimile: o variantă normală și una aldină sunt adesea suficiente", "Evită efectele pe text, precum contururile, umbrele puternice și degradeurile", "Păstrează titlurile scurte")],
      },
      {
        id: "cand-aspectul-premium-nu-este-scopul",
        heading: "Când aspectul premium nu este scopul",
        blocks: [p("Nu orice brand trebuie să pară scump. Un brand jucăuș și accesibil își poate pierde căldura dacă folosește un font cu serife subțiri, care creează distanță. Alege fontul în funcție de emoția pe care vrei să o transmiți, apoi aplică aceleași principii de contrast și spațiere.")],
      },
    ],
    related: { projects: ["iq-fashion", "divaz"], services: ["branding"] },
  },
  {
    id: "how-to-create-a-consistent-instagram-feed",
    slug: "cum-sa-creezi-un-feed-instagram-coerent",
    title: "Cum să creezi un feed Instagram coerent pentru brandul tău",
    description: "Șabloane, ritm cromatic și piloni de conținut: o metodă simplă pentru un profil Instagram cu o direcție vizuală clară.",
    category: "social-media",
    publishedAt: null,
    cover: { key: "journal-feed", alt: "Telefon cu o grilă de Instagram în roz pudrat, înconjurat de fotografii beauty și o paletă de culori" },
    intro: "Un feed coerent îi ajută pe oameni să-ți recunoască postările înainte să-ți vadă numele. Vei afla cum să planifici pilonii de conținut, să construiești șabloane și să folosești ritmul cromatic pentru ca grila ta să aibă o direcție clară, fără să devină repetitivă.",
    sections: [
      {
        id: "pilonii-de-continut",
        heading: "Planifică mai întâi pilonii de conținut",
        blocks: [p("Alege între trei și cinci tipuri de conținut pe care le vei publica regulat, de exemplu produse, conținut educativ, culise și oferte. Fiecare pilon primește propriul șablon, astfel încât oamenii să înțeleagă dintr-o privire ce fel de postare au în față.")],
      },
      {
        id: "sabloanele",
        heading: "Construiește șabloane, nu postări izolate",
        blocks: [p("Șabloanele fac posibilă consecvența în practică. Stabilește grila, dimensiunile textului și poziția logoului pentru fiecare pilon. Schimbă conținutul, nu structura.")],
      },
      {
        id: "ritmul-cromatic",
        heading: "Folosește ritmul cromatic",
        blocks: [p("Alternarea unei culori puternice cu postări în nuanțe mai deschise sau cu fotografii creează un ritm în grilă. Divaz alternează fotografiile de produs în roz pudrat cu tonuri mai intense de fructe de pădure; grila rămâne recognoscibilă ca parte din același brand chiar și atunci când subiectele se schimbă.")],
      },
      {
        id: "verifica-grila",
        heading: "Verifică grila înainte să publici",
        blocks: [ol("Previzualizează împreună următoarele nouă postări", "Verifică să nu existe două șabloane similare unul lângă altul", "Asigură-te că nu trec mai mult de câteva postări fără să apară culoarea dominantă")],
      },
    ],
    related: { projects: ["divaz", "inklabs"], services: ["social-media-design"] },
  },
  {
    id: "7-branding-mistakes-that-make-a-business-look-unprofessional",
    slug: "7-greseli-de-branding-care-fac-o-afacere-sa-para-neprofesionista",
    title: "7 greșeli de branding care fac o afacere să pară neprofesionistă",
    description: "Șapte greșeli frecvente de branding ale afacerilor mici și soluții simple pentru fiecare.",
    category: "graphic-design",
    publishedAt: null,
    cover: { key: "journal-mistakes", alt: "Colaj de brand în roz și bleumarin, cu mostre de culoare, un pahar de cafea, o etichetă și forme" },
    intro: "Cele mai multe branduri nu par neprofesioniste din cauza unei singure decizii greșite, ci din cauza micilor inconsecvențe care se adună. Iată șapte dintre cele mai frecvente și cum le poți corecta.",
    sections: [
      {
        id: "cele-sapte-greseli",
        heading: "Cele șapte greșeli",
        blocks: [
          h3("1. Prea multe fonturi"),
          p("Fiecare font nou face brandul mai greu de recunoscut. Alege două și folosește-le consecvent."),
          h3("2. Un logo care se schimbă de fiecare dată"),
          p("Culorile diferite, decupările și versiunile deformate fac brandul să pară improvizat. Păstrează variantele aprobate într-un singur dosar."),
          h3("3. Lipsa unei ierarhii"),
          p("Dacă totul este mare, nimic nu mai iese în evidență. Decide ce ar trebui să citească privitorul mai întâi."),
          h3("4. Imagini de slabă calitate"),
          p("Fotografiile neclare sau pixelate fac chiar și o compoziție bună să pară ieftină."),
          h3("5. Un ton inconsecvent"),
          p("Imaginile și cuvintele ar trebui să pară că vin de la aceeași persoană."),
          h3("6. Materiale tipărite și digitale care nu se potrivesc"),
          p("Un pliant ar trebui să transmită aceeași identitate de brand ca feedul de Instagram."),
          h3("7. Urmărirea fiecărui trend"),
          p("Trendurile se învechesc repede. Adaptează-le la sistemul tău sau renunță la ele."),
        ],
      },
      {
        id: "cum-le-corectezi",
        heading: "Cum le corectezi",
        blocks: [p("Cele mai multe dintre aceste probleme dispar cu un sistem simplu de identitate de brand: câteva reguli, materiale vizuale aprobate și șabloane. Începe de aici înainte să refaci orice design.")],
      },
    ],
    related: { projects: ["kanoi", "global-medical-health"], services: ["branding", "printed-media"] },
  },
  {
    id: "how-to-make-your-social-media-design-stand-out",
    slug: "cum-sa-iesi-in-evidenta-prin-design-in-social-media",
    title: "Cum să ieși în evidență prin design în social media",
    description: "Tehnici practice pentru postări care îi fac pe oameni să se oprească din derulat: contrast, un singur mesaj, mișcare și elemente ușor de recunoscut.",
    category: "social-media",
    publishedAt: null,
    cover: { key: "inklabs-stop", alt: "Postare Inklabs pe fundal galben, cu mesajul „Oprește-te din derulat”" },
    intro: "În social media, designul tău are cam o secundă ca să atragă atenția. Acest articol prezintă tehnicile care ajută o postare să iasă în evidență și explică de ce funcționează.",
    sections: [
      {
        id: "un-singur-mesaj",
        heading: "O postare, un singur mesaj",
        blocks: [p("Postările care încearcă să spună totul nu spun nimic. Alege o singură idee pentru fiecare postare și fă-o imposibil de trecut cu vederea. Pune detaliile în descriere sau într-un carusel.")],
      },
      {
        id: "contrastul",
        heading: "Folosește contrastul cu intenție",
        blocks: [p("Contrastul puternic între culori, textul mare și fundalurile simple fac o postare vizibilă chiar și în miniatură. Postările Inklabs în galben și negru sunt ușor de citit chiar și atunci când apar foarte mici în feed.")],
      },
      {
        id: "adreseaza-te-privitorului",
        heading: "Adresează-te direct privitorului",
        blocks: [p("Titlurile care se adresează direct oamenilor, printr-o întrebare, o provocare sau un îndemn jucăuș, par mai degrabă o conversație decât o reclamă.")],
      },
      {
        id: "adauga-miscare",
        heading: "Adaugă mișcare acolo unde ajută",
        blocks: [p("Reelurile scurte și animațiile subtile atrag privirea. Păstrează mișcarea în aceeași direcție vizuală cu designul static, astfel încât să se simtă că aparțin aceluiași brand.")],
      },
    ],
    related: { projects: ["inklabs", "ads-campaigns-selection"], services: ["social-media-design", "ads-campaigns"] },
  },
  {
    id: "what-makes-a-brand-look-premium",
    slug: "ce-face-un-brand-sa-para-premium",
    title: "Ce face un brand să pară premium?",
    description: "Fotografia, simplitatea, materialele și consecvența sunt indiciile vizuale care dau unui brand un aer premium.",
    category: "content-creation",
    publishedAt: null,
    cover: { key: "divaz-gloss35", alt: "Luciu de buze Divaz într-o compoziție cu fructe de pădure și înghețată" },
    intro: "Impresia de premium se construiește din multe indicii mici. Vei afla care sunt acestea și cum să le integrezi în fotografii, compoziții și conținut, chiar și cu un buget modest.",
    sections: [
      {
        id: "directia-artistica",
        heading: "Fotografie cu direcție artistică",
        blocks: [p("Brandurile premium rareori prezintă un produs pe o masă simplă. Îi creează o lume: un material, o atmosferă, accesorii care spun o poveste. Divaz asociază luciul de buze cu fructe și înghețată, astfel încât produsul să sugereze un răsfăț.")],
      },
      {
        id: "materiale-si-texturi",
        heading: "Materiale și texturi",
        blocks: [p("Mătase, hârtie, sticlă, metal. Texturile care îți dau senzația că ar fi plăcute la atingere fac brandul să pară tangibil și atent gândit.")],
      },
      {
        id: "simplitatea",
        heading: "Simplitate în compoziție",
        blocks: [p("Mai puține elemente, mai mult spațiu și o tipografie care inspiră încredere. Elimină tot ce nu susține mesajul.")],
      },
      {
        id: "consecventa",
        heading: "Consecvență în timp",
        blocks: [p("Un aspect premium se construiește prin repetiție. Când fiecare postare, ambalaj și buletin informativ respectă aceleași reguli, oamenii au mai multă încredere în brand.")],
      },
    ],
    related: { projects: ["divaz", "iq-fashion"], services: ["content-creation", "branding"] },
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const isPublished = (a: Article) => !!a.publishedAt;

export function readingTime(a: Article) {
  const text = [a.intro, ...a.sections.flatMap((s) => [s.heading, ...s.blocks.map((b) => ("text" in b ? b.text : b.items.join(" ")))])].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}

export function formatDate(d: string) {
  return new Date(d).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" });
}
