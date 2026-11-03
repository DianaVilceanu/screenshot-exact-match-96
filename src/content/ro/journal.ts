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
    publishedAt: "2026-05-12",
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
    publishedAt: "2026-06-02",
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
    publishedAt: "2026-06-23",
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
    publishedAt: "2026-07-14",
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
    publishedAt: "2026-09-08",
    cover: { key: "journal-stand-out", alt: "Colaj roz și bleumarin cu un scorpion gravat, o călimară, un ochi în semitonuri și o floare" },
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
    publishedAt: "2026-10-13",
    cover: { key: "journal-premium", alt: "Colaj roz cu un luciu de buze rose, zmeură, afine, o petală și buze în semitonuri" },
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
  {
    id: "how-much-does-a-brand-identity-cost",
    slug: "cat-costa-o-identitate-vizuala",
    title: "Cât costă o identitate vizuală? Pentru ce plătești, de fapt",
    seoTitle: "Cât costă o identitate vizuală? Ghid de preț",
    description: "Prețurile pentru identitate vizuală diferă mult. Iată ce influențează costul, ce include o ofertă corectă și cum compari designerii fără să ghicești.",
    category: "graphic-design",
    publishedAt: "2026-10-20",
    cover: { key: "journal-mistakes", alt: "Colaj de brand în roz și bleumarin, cu mostre de culoare, un pahar de cafea, o etichetă și forme" },
    intro: "Întreabă trei designeri cât costă o identitate vizuală și vei primi trei răspunsuri foarte diferite. Nu pentru că ar minți cineva, ci pentru că „identitate vizuală” poate însemna un logo cu două culori sau un sistem complet, cu ghid de brand, șabloane și ambalaje. Ghidul de mai jos explică ce mută prețul, ca să poți compara ofertele cum trebuie.",
    sections: [
      {
        id: "pentru-ce-platesti",
        heading: "Pentru ce plătești, de fapt",
        blocks: [
          p("Un logo este un fișier. O identitate vizuală este un set de decizii care te ajută să arăți la fel peste tot: pe Instagram, pe o cutie, pe o carte de vizită, pe site. Cu cât sunt luate mai multe dintre aceste decizii pentru tine și testate în mai multe situații, cu atât este mai mult de muncă în spatele prețului final."),
          p("Când am construit identitatea pentru Caterina Tomasso, un magazin online de argint sterling, logoul a fost cea mai mică parte. Cea mai mare parte a muncii a mers în paletă, tipografie, regulile de fotografie și într-un manual de brand care se asigură că fiecare postare și fiecare ambalaj viitor păstrează același aer."),
        ],
      },
      {
        id: "ce-influenteaza-pretul",
        heading: "Cele cinci lucruri care influențează prețul",
        blocks: [
          ol("Amploarea: doar logo, logo plus culori și fonturi sau un sistem complet, cu șabloane și ghid.", "Cercetarea: discuția cu tine, analiza concurenței și stabilirea unei poziționări cer timp real și sunt ceea ce desparte un brand de o imagine frumoasă.", "Numărul de runde: două runde de modificări și modificări nelimitate sunt promisiuni foarte diferite.", "Utilizarea: un brand care trăiește doar pe social media costă mai puțin de proiectat decât unul care are nevoie și de ambalaje, print și firme.", "Experiența: un designer care a mai rezolvat o problemă ca a ta lucrează mai repede și greșește mai puțin, iar greșelile costă."),
          p("Observă că nimic din listă nu ține de cât a durat desenarea logoului. Clienții presupun adesea că plătesc desenul. De fapt plătesc gândirea care face desenul corect."),
        ],
      },
      {
        id: "ce-include-o-oferta-corecta",
        heading: "Ce ar trebui să includă o ofertă corectă",
        blocks: [
          p("O ofertă serioasă este detaliată. Dacă primești un singur număr și o linie de descriere, cere mai multe detalii înainte să spui da. Ar trebui să găsești cel puțin:"),
          ul("Livrabilele enumerate unul câte unul (logo principal, logo secundar, pictogramă, paletă de culori, fonturi, ghid de brand, șabloane).", "Formatele de fișiere pe care le primești, inclusiv fișiere vectoriale pe care le poți mări oricât.", "Câte concepte vei vedea și câte runde de modificări sunt incluse.", "Termenul de livrare și ce se întâmplă dacă feedbackul vine târziu.", "Cui aparțin fișierele finale și ce drepturi de utilizare primești."),
        ],
      },
      {
        id: "ieftin-vs-scump",
        heading: "De ce varianta ieftină costă adesea mai mult mai târziu",
        blocks: [
          p("Un preț foarte mic înseamnă, de obicei, un logo din șablon, nicio strategie și fișiere pe care nu le poți folosi cum trebuie. Apoi plătești încă o dată peste un an ca să îl refaci sau rămâi cu o identitate care nu funcționează niciodată bine pe ecranul telefonului sau pe o cutie tipărită."),
          p("Și invers: scump nu înseamnă automat potrivit pentru tine. O afacere mică locală are rar nevoie de un manual de patruzeci de pagini. Are nevoie de un logo clar, două sau trei culori, două fonturi și câteva șabloane pe care să le folosească cu adevărat în fiecare săptămână."),
        ],
      },
      {
        id: "cum-compari-ofertele",
        heading: "Cum compari ofertele fără să te pierzi",
        blocks: [
          p("Scrie ce trebuie să facă identitatea în următorii doi ani. Va apărea pe ambalaje? Pe un site? Pe mașini? Apoi cere fiecărui designer o ofertă pentru exact lista aceea. Ofertele devin comparabile doar când răspund la aceeași întrebare."),
          p("Uită-te în portofoliu după lucrări care rezolvă o problemă asemănătoare, nu doar după lucrări frumoase. Citește cum vorbește designerul despre proiecte. Dacă fiecare studiu de caz este doar o galerie de imagini, fără nicio explicație a gândirii din spate, cumperi la noroc."),
        ],
      },
      {
        id: "cum-arata-un-proiect-obisnuit",
        heading: "Cum arată un proiect obișnuit",
        blocks: [
          p("Majoritatea proiectelor de identitate urmează același drum. Mai întâi vine etapa de descoperire, în care discutăm despre afacere, public și concurență. Apoi vin conceptele: direcții pentru logo, culoare și tipografie. După ce alegi o direcție, aceasta este rafinată, aplicată pe câteva exemple reale și, în final, împachetată în fișiere și, dacă e nevoie, într-un ghid."),
          p("Un proiect pentru o afacere mică se poate face în câteva săptămâni. Un brand care are nevoie de ambalaje, un sistem complet pentru social media și materiale tipărite durează mai mult, pentru că fiecare aplicație trebuie proiectată și testată. Rapid și bun se pot împreuna; ieftin, rapid și temeinic, nu."),
        ],
      },
      {
        id: "cum-scoti-mai-mult-din-buget",
        heading: "Cum scoți mai mult din buget",
        blocks: [
          ul("Pregătește un brief scurt înainte de prima discuție: cui vinzi, trei branduri pe care le admiri și trei care nu îți plac.", "Adună exemple reale de locuri unde va apărea brandul, ca designerul să testeze identitatea unde trebuie.", "Cere un plan în etape: identitatea de bază acum, aplicațiile suplimentare mai târziu, când afacerea crește.", "Dă feedback într-un singur mesaj pe rundă, nu bucată cu bucată. Câștigi ore bune de ambele părți."),
          p("Dacă vrei să vezi cum arată în practică un proces complet de identitate, uită-te la serviciul meu de branding și la proiectele de mai jos. Iar dacă încă nu știi exact de ce ai nevoie, e un punct de plecare foarte bun pentru o discuție."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Cât durează o identitate vizuală?"),
          p("Pentru o afacere mică, o identitate de bază durează, de obicei, câteva săptămâni, în funcție de cât de repede revine feedbackul. Sistemele mai mari, cu ambalaje, print și șabloane, durează mai mult."),
          h3("Pot plăti în rate?"),
          p("Da, și este frecvent. O împărțire obișnuită este un avans înainte de start și restul la livrare sau în pași legați de etape. Stabiliți asta în scris."),
          h3("Am nevoie de logo înainte de site sau de social media?"),
          p("Ai nevoie cel puțin de o identitate simplă mai întâi. Dacă construiești un site sau un feed pe un logo provizoriu, vei reface multă muncă mai târziu."),
          h3("Cui aparține logoul după proiect?"),
          p("Ar trebui să fie scris în contract. În majoritatea cazurilor, clientul primește drepturi depline asupra fișierelor finale după plata integrală a proiectului."),
        ],
      },
    ],
    related: { projects: ["caterina-tomasso", "fleurane"], services: ["branding"] },
  },
  {
    id: "logo-vs-brand-identity-vs-branding",
    slug: "logo-identitate-vizuala-branding-diferente",
    title: "Logo, identitate vizuală și branding: care este diferența?",
    seoTitle: "Logo, identitate vizuală și branding",
    description: "Logoul, identitatea vizuală și brandingul nu sunt același lucru. Explicația pe înțelesul tuturor, cu exemple, și ce are nevoie afacerea ta mai întâi.",
    category: "graphic-design",
    publishedAt: "2026-10-21",
    cover: { key: "journal-identity", alt: "Colaj roz cu un chip clasic în semitonuri, o schiță pe hârtie și o mână care ține un stilou" },
    intro: "Mulți folosesc „logo”, „identitate vizuală” și „branding” ca și cum ar fi același cuvânt. Nu sunt, iar confuzia duce la briefuri care ratează miezul și la bugete care ajung în locul greșit. Iată o metodă simplă prin care le poți deosebi.",
    sections: [
      {
        id: "logoul",
        heading: "Logoul: o singură piesă din puzzle",
        blocks: [
          p("Un logo este un semn care identifică o afacere. Poate fi un logotip (doar numele, într-un anumit font), un simbol sau amândouă. Rolul lui este recunoașterea: când cineva îl vede, știe cine vorbește."),
          p("Un logo singur nu face un brand. Un logo bun pus peste culori la întâmplare, fonturi la întâmplare și poze la întâmplare dă totuși un feed dezordonat."),
        ],
      },
      {
        id: "identitatea-vizuala",
        heading: "Identitatea vizuală: sistemul din ce vezi",
        blocks: [
          p("Identitatea vizuală înseamnă tot ce se poate vedea: logoul, paleta de culori, fonturile, stilul de fotografie și de ilustrație, formele și modelele, felul în care sunt construite compozițiile. Este jumătatea vizibilă a brandului, gândită ca să arate la fel în orice loc în care apare."),
          p("Inklabs este un exemplu bun. Identitatea lui se sprijină pe galben, negru și o voce tipografică foarte directă. Poți scoate logoul dintr-o postare și tot o recunoști ca Inklabs, iar acesta este adevăratul test al unei identități."),
          ul("Logoul și variantele lui", "Paleta de culori și felul în care se combină culorile", "Tipografia: fontul pentru titluri și cel pentru text", "Imagini: fotografie, ilustrație, pictograme", "Elemente grafice: modele, chenare, stickere", "Reguli de compoziție și șabloane"),
        ],
      },
      {
        id: "brandingul",
        heading: "Brandingul: tabloul complet",
        blocks: [
          p("Brandingul este procesul și practica mai largă de a construi ce cred și ce simt oamenii despre o afacere. Include identitatea vizuală, dar și numele, tonul vocii, felul în care sunt tratați clienții, calitatea produsului și promisiunea pe care o face firma."),
          p("Brandingul nu se termină niciodată. Identitatea se poate livra ca un set de fișiere. Brandingul continuă de fiecare dată când un client interacționează cu tine."),
        ],
      },
      {
        id: "un-mod-simplu-sa-retii",
        heading: "Un mod simplu să reții",
        blocks: [
          p("Gândește-te la o persoană. Logoul este semnătura ei. Identitatea vizuală este hainele, freza și ținuta. Brandingul este reputația: ce spun oamenii despre ea după ce iese din cameră."),
        ],
      },
      {
        id: "confuzii-frecvente",
        heading: "Trei confuzii frecvente",
        blocks: [
          ul("„Avem nevoie de un brand nou” înseamnă adesea „avem nevoie de un logo nou”. Verifică ce nu merge cu adevărat înainte să schimbi tot.", "Un logo frumos, fără reguli în spate, creează un feed inconsecvent, pentru că fiecare designer îl interpretează diferit.", "Un rebranding nu este mereu necesar. Uneori un set clar de reguli pentru identitatea existentă rezolvă problema."),
          p("Dacă nu ești sigur care dintre ele ți se aplică, pune ultimele zece postări una lângă alta. Dacă par să aparțină aceluiași loc, probabil ai o identitate. Dacă par venite din cinci locuri diferite, ai un logo și niște obiceiuri."),
        ],
      },
      {
        id: "de-care-ai-nevoie-intai",
        heading: "De care ai nevoie mai întâi?",
        blocks: [
          p("Dacă abia începi, nu te grăbi să pornești de la logo. Începe cu două întrebări: pentru cine este și ce vrem să simtă? Răspunsurile modelează identitatea, iar identitatea face apoi logoul ușor de proiectat."),
          ul("Afacere nouă: o identitate mică (logo, paletă, două fonturi) și câteva șabloane.", "Afacere cu logo, dar cu un aspect inconsecvent: un sistem de identitate propriu-zis și un ghid.", "Afacere consacrată care pare depășită: o împrospătare, păstrând ce recunosc deja oamenii.", "Afacere care crește spre canale noi: extinderea sistemului către ambalaje, print și social media."),
          p("Dacă nu știi care dintre ele ți se potrivește, pagina mea de branding explică cum abordez de obicei fiecare caz."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Este suficient un logo pentru o afacere mică?"),
          p("La început, un logo clar plus două culori și un font pot fi suficiente. De îndată ce postezi regulat sau tipărești ceva, vei vrea ceva mai multă structură."),
          h3("Care e diferența dintre identitate vizuală și ghid de brand?"),
          p("Identitatea este setul de elemente vizuale. Ghidul este documentul care explică cum să le folosești corect."),
          h3("Pot face branding fără designer?"),
          p("Poți face părți din el, precum definirea publicului și a tonului vocii. Identitatea vizuală este locul unde un designer economisește cel mai mult timp și evită greșelile costisitoare."),
        ],
      },
    ],
    related: { projects: ["inklabs", "divaz"], services: ["branding"] },
  },
  {
    id: "how-to-choose-brand-colours",
    slug: "cum-alegi-culorile-brandului",
    title: "Cum alegi culorile brandului tău (fără clișee)",
    seoTitle: "Cum alegi culorile brandului",
    description: "Alegerea culorilor unui brand nu ține doar de gust. O metodă practică pentru o paletă potrivită publicului, funcțională peste tot și ușor de recunoscut.",
    category: "graphic-design",
    publishedAt: "2026-10-22",
    cover: { key: "divaz-cover", alt: "Cutii roz Divaz cu unghii false cu gel instant, în mai multe nuanțe" },
    intro: "Majoritatea sfaturilor despre culorile unui brand spun că albastrul înseamnă încredere și roșul înseamnă energie. Nu e greșit, dar nici foarte util. Culoarea funcționează în context, în combinație și prin repetiție. Iată metoda pe care o folosesc când construiesc o paletă pentru un brand.",
    sections: [
      {
        id: "porneste-de-la-emotie",
        heading: "Pornește de la emoție, nu de la culoare",
        blocks: [
          p("Înainte să deschizi un selector de culori, scrie trei cuvinte pentru cum ar trebui să se simtă oamenii când văd brandul. Pentru Divaz, un brand de unghii press-on, cuvintele au fost blând, lucios și accesibil. Ele au indicat repede spre roz pudrat, trandafiriu și un berry adânc pentru contrast."),
          p("Dacă pornești de la o culoare care îți place, ajungi să aperi o preferință personală. Dacă pornești de la o emoție, poți testa fiecare variantă în raport cu ea."),
        ],
      },
      {
        id: "uita-te-la-piata",
        heading: "Uită-te la piață, apoi alege-ți golul",
        blocks: [
          p("Adună zece concurenți și vezi ce culori se repetă. Dacă fiecare farmacie folosește același verde și fiecare cabinet stomatologic același albastru, ai două opțiuni: te încadrezi și pari de încredere sau ieși în evidență într-un mod care rămâne credibil."),
          p("Pentru Art Innova Dentalmed am păstrat un turcoaz liniștit, care transmite în continuare curățenie, dar am folosit valuri line și mult spațiu alb, ca să pară mai prietenos decât albastrul clinic obișnuit."),
        ],
      },
      {
        id: "construieste-o-paleta-mica",
        heading: "Construiește o paletă mică, pe care o poți folosi",
        blocks: [
          p("O paletă cu opt culori arată grozav într-o prezentare și se destramă în viața reală. Majoritatea brandurilor funcționează cel mai bine cu această structură:"),
          ul("O culoare dominantă, cu care oamenii să te asocieze.", "O culoare de sprijin, care aduce contrast sau căldură.", "Un accent folosit cu zgârcenie, pentru butoane, prețuri și evidențieri.", "Una sau două neutre pentru fundaluri și text, pentru că negrul pur și albul pur arată rar rafinat."),
          p("Folosește culoarea dominantă pe mai mult de jumătate din ce publici. Această repetiție construiește recunoașterea."),
        ],
      },
      {
        id: "testeaza-in-conditii-reale",
        heading: "Testează în condiții reale",
        blocks: [
          p("O culoare care arată bine pe monitor se poate comporta altfel în alte locuri. Înainte să te hotărăști, verifică paleta în aceste situații:"),
          ul("Pe ecranul telefonului, la luminozitate mică și afară.", "Tipărită pe hârtie și pe o cutie, unde culorile devin adesea mai șterse.", "Ca text pe un fundal colorat, ca să verifici contrastul și lizibilitatea.", "Lângă fotografii reale cu produsul tău."),
          p("Contrastul contează mai mult decât crede lumea. Dacă accentul tău nu se poate citi pe fundal, ascunzi tocmai lucrul pe care vrei să îl vadă oamenii, de exemplu prețul sau butonul."),
        ],
      },
      {
        id: "greseli-frecvente-de-culoare",
        heading: "Greșelile de culoare pe care le văd cel mai des",
        blocks: [
          ul("Alegerea unei culori pentru că e în trend, apoi schimbarea ei anul viitor.", "Folosirea unei nuanțe diferite din aceeași culoare în fiecare loc.", "Text deschis pe fundal deschis, pentru că pare elegant.", "Prea multe culori de accent, așa că nimic nu iese în evidență.", "Neverificarea felului în care arată culoarea în modul întunecat sau pe un monitor ieftin."),
          p("Cele mai multe se rezolvă cu același obicei: notează paleta o singură dată și folosește doar ce este notat."),
        ],
      },
      {
        id: "noteaza-regulile",
        heading: "Notează regulile",
        blocks: [
          p("Dă fiecărei culori un nume și codurile ei (HEX pentru ecran, CMYK pentru tipar). Apoi adaugă două reguli simple: ce culoare se folosește pentru fundaluri și care pentru evidențieri. THS Organic folosește o lume de culoare pentru fiecare produs, chihlimbar pentru imunitate, negru și maro pentru păr și coral pentru piele, legate de un singur logo. Reguli ca acestea păstrează o gamă coerentă pe măsură ce crește."),
          p("În final, dă-i timp. O paletă devine culoarea unui brand prin repetiție, nu prin primul design. Dacă vrei ajutor ca să transformi o paletă într-o identitate completă, vezi serviciul meu de branding."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Câte culori ar trebui să aibă un brand?"),
          p("De obicei trei până la cinci: una dominantă, una de sprijin, un accent și una sau două neutre."),
          h3("Să folosesc negru în paletă?"),
          p("Adesea da, ca neutră pentru text. Pentru fundaluri, un bleumarin sau un maro foarte închis poate arăta mai blând și mai rafinat decât negrul pur."),
          h3("Am nevoie de culori Pantone?"),
          p("Contează când reproducerea exactă a culorii este critică, de exemplu la ambalaje. Pentru majoritatea utilizărilor în social media și web, ajung valorile HEX și CMYK."),
        ],
      },
    ],
    related: { projects: ["divaz", "ths-organic"], services: ["branding"] },
  },
  {
    id: "what-is-a-brand-book-and-do-you-need-one",
    slug: "ce-este-un-brand-book-si-ai-nevoie-de-unul",
    title: "Ce este un brand book (ghid de brand) și ai nevoie de unul?",
    seoTitle: "Ce este un brand book?",
    description: "Un brand book păstrează logoul, culorile și fonturile consecvente. Află ce conține un ghid de brand și cum îl pot folosi în practică afacerile mici.",
    category: "graphic-design",
    publishedAt: "2026-10-23",
    cover: { key: "journal-fonts", alt: "Colaj tipografic: un A mare cu serife și un a mic pe roz, cu steluțe și hârtie ruptă" },
    intro: "Un brand book pare ceva ce au doar companiile mari. În realitate, este cel mai practic lucru pe care îl primești după un proiect de branding, pentru că transformă un design frumos în ceva ce tu și echipa ta puteți folosi corect în continuare. Articolul explică ce conține și cum poate arăta pentru un brand mic.",
    sections: [
      {
        id: "ce-este",
        heading: "Ce este un brand book",
        blocks: [
          p("Un brand book, numit și ghid de brand, este un document care explică cum arată și cum sună un brand. Răspunde la întrebări înainte să fie puse: ce culori folosim, unde se așază logoul, cum arată pozele, cum scriem o descriere."),
          p("Scopul nu este să limiteze creativitatea. Este să se asigure că, atunci când un colaborator, un angajat sau o tipografie lucrează cu brandul tău, nu trebuie să ghicească."),
        ],
      },
      {
        id: "ce-contine",
        heading: "Ce conține",
        blocks: [
          ul("Povestea brandului și poziționarea, în câteva propoziții sincere.", "Logoul, variantele lui și spațiul liber din jurul lui.", "Ce nu se face cu logoul: întins, recolorat, pus pe imagini aglomerate.", "Paleta de culori cu valori HEX, RGB și CMYK.", "Tipografia: ce fonturi, pentru ce și în ce mărimi.", "Stilul de fotografie și de ilustrație, cu exemple bune și proaste.", "Elemente grafice precum modele, pictograme și chenare.", "Exemple de aplicații reale: postări, cărți de vizită, ambalaje.", "Tonul vocii, cu câteva fraze de probă."),
          p("Brand book-ul pe care l-am proiectat pentru Caterina Tomasso acoperă exact asta: simbolul cu balerina și logotipul, paleta argintiu și nude de balerină, tipografia, texturile și șabloanele pentru social media. Are nouă pagini, pentru că atât are nevoie brandul."),
        ],
      },
      {
        id: "cine-are-nevoie",
        heading: "Cine are nevoie, de fapt",
        blocks: [
          p("Dacă mai mult de o persoană creează conținut pentru brand, ai nevoie de un ghid. La fel dacă lucrezi cu designeri externi, tipografii sau agenții. Este util și dacă plănuiești să crești spre canale noi, pentru că oprește brandul să se strice de fiecare dată când se adaugă ceva."),
          p("Un fondator care postează singur tot poate începe cu o variantă mai ușoară: o fișă de o pagină cu logoul, culorile, fonturile și două sau trei exemple de compoziție."),
        ],
      },
      {
        id: "cum-il-faci-util",
        heading: "Cum îl faci util, nu decorativ",
        blocks: [
          ul("Păstrează-l scurt. Un ghid pe care nu îl citește nimeni e mai rău decât unul scurt pe care îl urmează oamenii.", "Arată, nu doar spune. Un exemplu real valorează cât un paragraf de reguli.", "Include resursele descărcabile: fișierele logoului, fonturile și șabloanele.", "Scrie-l pe înțelesul tuturor, ca și cum un coleg nou l-ar citi în prima zi.", "Actualizează-l când se schimbă brandul și datează fiecare versiune."),
        ],
      },
      {
        id: "un-exemplu-mic",
        heading: "Un exemplu mic de regulă utilă",
        blocks: [
          p("O regulă bună este concretă. „Folosește logoul cu respect” nu spune nimic. „Păstrează în jurul logoului un spațiu liber egal cu înălțimea literei M și nu îl pune niciodată pe poze unde contrastul scade sub limita de lizibilitate” este ceva ce un om poate urma."),
          p("Regulile concrete sunt și mai ușor de verificat. Când iese o postare nouă, oricine o poate compara cu ghidul și poate vedea dacă i se potrivește."),
        ],
      },
      {
        id: "folosirea-dupa-proiect",
        heading: "Folosirea lui după terminarea proiectului",
        blocks: [
          p("Trimite brand book-ul tuturor celor care ating brandul și menționează-l la integrarea colegilor noi. Ține o copie a șabloanelor editabile într-un folder comun. O dată pe trimestru, pune ultimele zece postări lângă ghid și verifică dacă încă se potrivesc."),
          p("Dacă plănuiești o identitate nouă, cere un ghid printre livrabile. Eu îl includ în proiectele mele de branding, dimensionat după ce are nevoie fiecare brand."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Cât de lung ar trebui să fie un brand book?"),
          p("Cât are nevoie și nu mai mult. Pentru o afacere mică, de obicei sunt suficiente între cinci și cincisprezece pagini."),
          h3("Ce format e cel mai bun?"),
          p("PDF-ul este cel mai comun. Pentru echipe, o pagină online sau un fișier de design partajat poate fi mai ușor de actualizat."),
          h3("Brand book-ul este același lucru cu un ghid de stil?"),
          p("Termenii se suprapun. Un ghid de stil se concentrează adesea pe reguli vizuale, în timp ce un brand book poate include și poveste, valori și ton al vocii."),
        ],
      },
    ],
    related: { projects: ["caterina-tomasso", "inklabs"], services: ["branding"] },
  },
  {
    id: "packaging-design-premium-look",
    slug: "design-de-ambalaje-cum-faci-un-produs-sa-para-premium",
    title: "Design de ambalaje: cum faci un produs să pară premium",
    seoTitle: "Design de ambalaje premium: sfaturi",
    description: "Ambalajul premium înseamnă mici alegeri disciplinate. Iată detaliile care fac produsele de skincare, cadourile și alimentele să pară că valorează mai mult.",
    category: "graphic-design",
    publishedAt: "2026-10-24",
    cover: { key: "caterina-cover", alt: "Două piese lucioase aurii, o zaharniță cu capac și o cană, pe un raft de lemn, în lumină caldă razantă" },
    intro: "Ambalajul este adesea primul lucru pe care îl atinge cu adevărat un client și decide în câteva secunde dacă produsul pare obișnuit sau special. Vestea bună: premium nu înseamnă materiale scumpe sau design strident. Vine, de obicei, dintr-o mână de alegeri disciplinate. Iată cum le abordez în proiecte precum gama de skincare Fleurane.",
    sections: [
      {
        id: "porneste-de-la-locul-unde-se-vede",
        heading: "Pornește de la locul unde va fi văzut",
        blocks: [
          p("Ambalajul trăiește în locuri diferite: un raft, o poză din magazinul online, o cutie de curier, o pungă cadou. Fiecare cere alt nivel de detaliu. Un produs vândut online trebuie să se citească clar ca miniatură. Un produs de pe raft concurează cu zeci de altele, la o distanță de braț."),
          p("Înainte să proiectezi, notează cele trei situații în care oamenii vor întâlni ambalajul și testează fiecare decizie în raport cu ele."),
        ],
      },
      {
        id: "sobrietatea",
        heading: "Sobrietatea este ceea ce pare scump",
        blocks: [
          p("Ambalajele premium folosesc aproape întotdeauna mai puține elemente: un nume clar, o frază cu beneficiul, mult spațiu gol. Cu cât adaugi mai multe pretenții, insigne și pictograme, cu atât ambalajul pare mai mult un produs la reducere."),
          p("Pentru gama de îngrijire Fleurane, eticheta este construită în jurul unui arc care încadrează logoul, a unui model fin de molecule în auriu, care sugerează ingredientele active, și a unor nume de produse clare. Restul rămâne discret."),
        ],
      },
      {
        id: "culoare-si-finisaje",
        heading: "Culoare și finisaje",
        blocks: [
          ul("Folosește două sau trei culori și păstrează-le consecvente la toate produsele din gamă.", "Detaliile metalice, precum folia aurie pe o etichetă, adaugă valoare, dar folosește-le pe elemente mici: o linie, un logo, un model.", "Un finisaj mat pare, de obicei, mai rafinat decât unul foarte lucios.", "Un capac colorat este o cale ieftină de a da întregii game o semnătură."),
          p("Întreabă mereu tipografia ce finisaje oferă cu adevărat înainte să proiectezi cu ele în minte. Un efect frumos pe care nu îl poți produce este doar o dezamăgire."),
        ],
      },
      {
        id: "tipografia",
        heading: "Tipografia face jumătate din muncă",
        blocks: [
          p("Pe o etichetă mică, textul trebuie să poarte brandul. Alege un font cu serife sau fără, cu personalitate, pentru numele produsului și unul foarte clar, simplu, pentru ingrediente și instrucțiuni. Lasă numele să respire și nu lăsa niciodată textul legal să îi facă concurență."),
          p("Ține minte că informațiile obligatorii nu sunt opționale la cosmetice și alimente: lista INCI, greutatea, modul de folosire, lotul și codul de bare. Proiectează compoziția pentru ele de la început, nu le înghesui la final."),
        ],
      },
      {
        id: "o-gama-nu-un-produs",
        heading: "Proiectează o gamă, nu un singur produs",
        blocks: [
          p("Dacă plănuiești să vinzi mai mult de un produs, proiectează întâi sistemul. Decide ce este la fel pe fiecare ambalaj (chenarul, poziția logoului, tipografia) și ce se schimbă (culoarea, numele, o pictogramă mică). Astfel, un client căruia îi place primul produs îl recunoaște imediat pe al doilea."),
          p("Același mod de gândire a ajutat la proiectul Caterina Tomasso, unde fiecare piesă de argint, cutie și card urmează aceeași paletă și structură."),
        ],
      },
      {
        id: "greseli-de-evitat",
        heading: "Greșeli de ambalaj care ieftinesc un produs",
        blocks: [
          ul("Prea multe fonturi și prea multe culori pe o singură etichetă.", "Text atât de mic încât nu se poate citi dintr-o privire.", "Logouri și imagini cu rezoluție mică, care ies neclare la tipar.", "Ignorarea spatelui ambalajului, unde se uită clienții mai departe.", "Alegerea unui finisaj fără să fi văzut o mostră fizică."),
          p("Observă că niciuna nu cere un buget mai mare ca să fie corectată. Cer disciplină și o probă de tipar."),
        ],
      },
      {
        id: "prototipul",
        heading: "Fă un prototip înainte să tipărești",
        blocks: [
          ol("Tipărește eticheta pe hârtie obișnuită și înfășoar-o pe un recipient real.", "Verifică mărimea celui mai mic text la distanță de braț.", "Privește ambalajul lângă cele ale concurenților, pe o masă sau pe un raft.", "Fotografiază-l așa cum o vei face pentru magazinul tău online.", "Abia apoi trimite fișierele la tipografie, cu bleed și profilul de culoare corect."),
          p("Dacă lucrezi la ambalajul unei game noi, uită-te la lucrările mele de print și ambalaje și scrie-mi oricând."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Cât costă design-ul de ambalaje?"),
          p("Depinde de numărul de produse, de structura ambalajului și de câte variante sunt necesare. O singură etichetă este mult mai simplă decât o cutie completă, cu mai multe fețe."),
          h3("Ce fișiere are nevoie tipografia?"),
          p("De obicei un PDF gata de tipar, cu bleed, semne de tăiere, mod de culoare corect și fonturi încorporate sau transformate în contururi. Cere fișa tehnică a tipografiei înainte să începi."),
          h3("Pot schimba ambalajul mai târziu?"),
          p("Da, dar schimbarea unui sistem este mult mai grea decât extinderea lui. Un sistem flexibil, gândit de la început, economisește efort când gama crește."),
        ],
      },
    ],
    related: { projects: ["fleurane", "caterina-tomasso"], services: ["printed-media", "branding"] },
  },
  {
    id: "instagram-carousel-design-tips",
    slug: "design-caruseluri-instagram-sfaturi",
    title: "Design pentru caruseluri Instagram: 9 sfaturi pentru slide-uri pe care oamenii le derulează",
    seoTitle: "Design caruseluri Instagram: 9 sfaturi",
    description: "Sfaturi practice pentru designul caruselelor de Instagram: slide-ul de copertă, mărimea textului, ordinea slide-urilor și apelul final, cu exemple reale.",
    category: "social-media",
    publishedAt: "2026-10-25",
    cover: { key: "journal-feed", alt: "Telefon cu o grilă de Instagram în roz pudrat, înconjurat de fotografii beauty și o paletă de culori" },
    intro: "Un carusel îți dă ceva ce o postare simplă nu poate: loc ca să explici. Este formatul pe care îl folosesc cel mai des pentru servicii, tutoriale și tot ce are nevoie de un pic de raționament. Dar un carusel funcționează doar dacă oamenii derulează, deci fiecare slide trebuie să îl merite pe următorul. Iată cele nouă reguli la care revin în fiecare proiect.",
    sections: [
      {
        id: "slide-ul-de-coperta",
        heading: "1. Tratează primul slide ca pe o reclamă",
        blocks: [
          p("Majoritatea oamenilor vor vedea doar slide-ul unu. El trebuie să promită ceva concret: o întrebare, un număr, o afirmație surprinzătoare. Pentru Art Innova Dentalmed, coperta unui carusel întreabă pur și simplu „Cum știi că a venit timpul unui consult stomatologic?”. Pregătește răspunsul fără să îl dea."),
          p("Pune logoul mic și titlul mare. Dacă coperta nu se citește la mărimea unei miniaturi, refă-o."),
        ],
      },
      {
        id: "o-idee-pe-slide",
        heading: "2. O idee pe slide",
        blocks: [
          p("Când un slide încearcă să spună trei lucruri, cititorul nu reține niciunul. Împarte conținutul până când fiecare slide are o singură idee. Mai bine opt slide-uri ușoare decât cinci grele."),
        ],
      },
      {
        id: "marimea-textului",
        heading: "3. Scrie pentru un telefon ținut la distanță de braț",
        blocks: [
          ul("Titluri: cât de mari permite compoziția.", "Text de bază: niciodată mai mic decât poți citi pe telefon fără zoom.", "Cel mult 30–40 de cuvinte pe slide.", "Contrast puternic între text și fundal, mai ales peste fotografii."),
        ],
      },
      {
        id: "un-sistem-vizual-clar",
        heading: "4. Folosește un sistem vizual care se repetă",
        blocks: [
          p("Un șablon consecvent face caruselul să pară un singur obiect. Pentru contul Selfconsulting, de inginerie și arhitectură, caruselele au în comun un fundal verde închis, un verde mentă pentru evidențieri, grafică din linii subțiri și logoul în același colț. Cititorii simt seria înainte să o citească."),
        ],
      },
      {
        id: "ghideaza-derularea",
        heading: "5. Dă oamenilor un motiv să deruleze",
        blocks: [
          p("Ajută indiciile vizuale: o săgeată, un numărător de slide-uri, un element care trece de pe un slide pe altul sau o frază vizibil neterminată la margine. Caruselele de servicii ale Art Innova folosesc trei săgeți mici pe copertă tocmai pentru asta."),
        ],
      },
      {
        id: "usor-de-scanat",
        heading: "6. Fă fiecare slide ușor de scanat",
        blocks: [
          p("Folosește liste cu elemente scurte, pune în evidență cuvintele-cheie și păstrează alinierea consecventă. Cineva ar trebui să înțeleagă slide-ul în două secunde și să se bucure mai mult dacă îl citește complet."),
        ],
      },
      {
        id: "ordonea-povestea",
        heading: "7. Ordonează slide-urile ca pe o poveste",
        blocks: [
          ol("Coperta: întrebarea sau promisiunea.", "Contextul: de ce contează.", "Ideile principale, câte una pe slide.", "Un rezumat sau un exemplu.", "Un slide de final cu un singur apel la acțiune."),
        ],
      },
      {
        id: "ultimul-slide",
        heading: "8. Încheie cu o singură acțiune",
        blocks: [
          p("Ultimul slide este locul unde oamenii decid ce fac mai departe. Alege o acțiune: salvează, trimite, programează-te, intră pe site. Dacă ceri cinci lucruri, nu primești niciunul."),
        ],
      },
      {
        id: "idei-de-caruseluri",
        heading: "Idei de caruseluri care merg pentru majoritatea brandurilor",
        blocks: [
          ul("O serie mit versus realitate, ca la contul KDT Romania.", "Un ghid pas cu pas pentru un proces pe care clienții tăi îl găsesc confuz.", "O listă de întrebări de pus înainte să cumperi produsul sau serviciul tău.", "O explicație „care este diferența dintre X și Y”.", "Un înainte și după sau o listă de verificare pe care oamenii vor vrea să o salveze."),
          p("Alege o temă la care ai răspuns deja în mesajele clienților. E dovada că oamenii o vor."),
        ],
      },
      {
        id: "testeaza-si-repeta",
        heading: "9. Vezi ce funcționează, apoi repetă",
        blocks: [
          p("Uită-te la ce caruseluri sunt salvate și distribuite, nu doar apreciate. Salvările înseamnă, de obicei, conținut util. Apoi repetă structura cu o temă nouă. Dacă vrei caruseluri proiectate ca sistem pentru brandul tău, vezi serviciul meu de design pentru social media."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Ce dimensiune ar trebui să aibă un carusel Instagram?"),
          p("Formatul portret 4:5, de 1080 pe 1350 de pixeli, ocupă cel mai mult loc în feed și merge de obicei bine. Pătratul de 1080 pe 1080 funcționează și el."),
          h3("Câte slide-uri ar trebui să aibă un carusel?"),
          p("Câte cere ideea. Majoritatea caruselelor utile au între cinci și zece slide-uri. Nu umple degeaba."),
          h3("Textul să fie în imagine sau în descriere?"),
          p("Pune conținutul principal în slide-uri și folosește descrierea pentru context, cuvinte-cheie și apel la acțiune."),
        ],
      },
    ],
    related: { projects: ["art-innova", "selfconsulting"], services: ["social-media-design"] },
  },
  {
    id: "instagram-reels-for-small-businesses",
    slug: "reels-instagram-pentru-afaceri-mici",
    title: "Reels pe Instagram pentru afaceri mici: cum le plănuiești, filmezi și editezi",
    seoTitle: "Reels Instagram pentru afaceri mici",
    description: "Un flux simplu pentru Reels pe Instagram: alegi o idee, scrii un hook, filmezi vertical, adaugi subtitrări și ții un ritm. Cu exemple de la branduri reale.",
    category: "social-media",
    publishedAt: "2026-10-26",
    cover: { key: "journal-stand-out", alt: "Colaj roz și bleumarin cu un scorpion gravat, o călimară, un ochi în semitonuri și o floare" },
    intro: "Reels sunt cea mai simplă cale prin care un brand mic ajunge la oameni care încă nu îl urmăresc și formatul care îi sperie cel mai mult pe mulți proprietari. Secretul este să nu le mai privești ca pe producții și să le tratezi ca pe idei scurte, repetabile. Iată fluxul pe care îl folosesc când montez Reels pentru branduri precum Farmacia Farmex și THS Organic.",
    sections: [
      {
        id: "alege-o-idee",
        heading: "Alege o singură idee pe Reel",
        blocks: [
          p("Un Reel funcționează când răspunde la o singură întrebare sau arată un singur lucru. O farmacie poate arăta cum se folosește un produs. Un brand de mâncare sau wellness poate arăta turnatul, desfacerea pachetului sau rutina de dimineață. Evită să explici tot brandul în treizeci de secunde."),
          p("Ține o listă permanentă cu întrebările pe care le pun clienții tăi cu adevărat. Fiecare este un Reel."),
        ],
      },
      {
        id: "hookul",
        heading: "Scrie primele trei secunde primele",
        blocks: [
          p("Majoritatea oamenilor decid aproape instant dacă rămân. Începe cu partea interesantă: rezultatul, momentul surprinzător, întrebarea. Nu cu logoul, nu cu „salut tuturor”."),
          ul("Arată rezultatul final, apoi cum ai ajuns la el.", "Deschide cu o întrebare clară pe care și-o pune publicul tău.", "Începe din mijlocul acțiunii.", "Pune mesajul principal pe ecran, ca text mare."),
        ],
      },
      {
        id: "filmeaza-vertical",
        heading: "Filmează vertical și păstrează-l simplu",
        blocks: [
          ul("Filmează în 9:16, la 1080 pe 1920, ca să nu fie nevoie de decupări mai târziu.", "Folosește lumina naturală de lângă o fereastră ori de câte ori poți.", "Ține telefonul stabil: un trepied mic bate orice filtru.", "Filmează fiecare cadru puțin mai mult decât ai nevoie, ca editorul să aibă loc.", "Prinde un sunet curat: vorbește aproape de microfon și evită locurile zgomotoase."),
        ],
      },
      {
        id: "subtitrarile",
        heading: "Subtitrările nu sunt opționale",
        blocks: [
          p("Mulți oameni se uită fără sunet. Subtitrările îi țin lângă tine și îi ajută și pe cei care preferă să citească. Evidențiază cuvântul-cheie din fiecare rând cu o culoare a brandului, cum fac la Reels-urile THS Organic, ca ochii să urmărească mesajul."),
          p("Așază subtitrările departe de marginea de jos, unde interfața le acoperă, și păstrează cel mult două rânduri."),
        ],
      },
      {
        id: "ritmul",
        heading: "Montează pentru ritm",
        blocks: [
          p("Taie pe mișcare, scoate orice pauză care nu adaugă sens și schimbă cadrul la fiecare două-patru secunde. Adaugă o bucată scurtă de muzică sau un sunet care susține starea și ține vocea clar deasupra."),
          p("Privește Reel-ul pe telefon, o dată cu sunet și o dată fără. Dacă povestea merge în ambele feluri, ai unul bun."),
        ],
      },
      {
        id: "idei-cu-care-sa-incepi",
        heading: "Idei de Reels cu care să începi",
        blocks: [
          ul("Răspunde la o întrebare a unui client în mai puțin de treizeci de secunde.", "Arată cum se face, se ambalează sau se folosește produsul.", "Prezintă un om din echipă și ce face.", "Compară sincer două opțiuni și spune cui i se potrivește fiecare.", "Arată rezultatul unui mic experiment, precum mierea în ceai sau o rutină de o săptămână."),
          p("Dacă nu ai idei, parcurge mesajele și comentariile. Oamenii îți spun ce vor să știe."),
        ],
      },
      {
        id: "fa-o-serie",
        heading: "Transformă Reels-urile într-o serie",
        blocks: [
          p("Același grafic de deschidere, același tip de subtitrări și același cadru final fac Reels-urile tale să fie recunoscute ca o familie. Îl și produc mai repede pe următorul. Dacă vrei ajutor la montaj și la un aspect consecvent pentru Reels, uită-te la serviciul meu de design pentru social media."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Cât de lung ar trebui să fie un Reel?"),
          p("Cât cere ideea. Multe Reels bune au între cincisprezece și patruzeci și cinci de secunde. Taie tot ce nu adaugă sens."),
          h3("Am nevoie de o cameră profesională?"),
          p("Nu. Un telefon modern, lumină bună și mâini stabile sunt suficiente. Calitatea sunetului și montajul contează mai mult decât camera."),
          h3("Cât de des ar trebui să postez Reels?"),
          p("O dată sau de două ori pe săptămână este un ritm bun și sustenabil pentru o afacere mică."),
        ],
      },
    ],
    related: { projects: ["ths-organic", "farmacia-farmex"], services: ["social-media-design", "content-creation"] },
  },
  {
    id: "social-media-content-calendar",
    slug: "cum-planifici-un-calendar-de-continut-social-media",
    title: "Cum planifici un calendar de conținut pentru social media pe care chiar îl poți ține",
    seoTitle: "Calendar de conținut social media",
    description: "Un calendar de conținut care rezistă în viața reală: piloni de conținut, un ritm săptămânal, o rutină lunară și loc pentru ce se întâmplă pe parcurs.",
    category: "social-media",
    publishedAt: "2026-10-27",
    cover: { key: "journal-premium", alt: "Colaj roz cu un luciu de buze rose, zmeură, afine, o petală și buze în semitonuri" },
    intro: "Majoritatea calendarelor de conținut mor în săptămâna a treia. Sunt prea ambițioase, prea rigide sau prea complicate. Un calendar bun este un sistem mic pe care îl poți susține într-o zi aglomerată. Aceasta este abordarea pe care o folosesc când planific conținut pentru branduri cu campanii lunare, precum Divaz și Kanoi.",
    sections: [
      {
        id: "incepe-cu-pilonii",
        heading: "Începe cu trei sau patru piloni de conținut",
        blocks: [
          p("Un pilon este un tip de conținut care servește un scop. Pentru un brand de beauty pot fi produsele, tutorialele, ofertele și culisele. Pentru o afacere de servicii pot fi postările educative, dovezile, ofertele și echipa."),
          p("Pilonii te opresc să te întrebi în fiecare dimineață „ce postăm azi?”. Întrebarea devine „care pilon urmează?”."),
        ],
      },
      {
        id: "alege-un-ritm",
        heading: "Alege un ritm pe care îl poți ține",
        blocks: [
          p("Trei postări bune pe săptămână bat șapte făcute în grabă. Hotărăște câte postări de feed, story-uri și Reels poți produce cinstit și scrie asta. E ușor să adaugi mai târziu; e demoralizant să rămâi în urmă."),
          ul("La început: 2–3 postări de feed și câteva story-uri pe săptămână.", "În creștere: 3–4 postări de feed, 1–2 Reels și story-uri zilnice.", "Săptămâni de campanie: adaugă o explozie scurtă de conținut, apoi revino la ritmul obișnuit."),
        ],
      },
      {
        id: "planifica-luna",
        heading: "Planifică luna dintr-o singură ședință",
        blocks: [
          ol("Listează datele care contează: sărbători, reduceri, lansări, zile de conștientizare relevante pentru tine.", "Așază mai întâi cea mai mare campanie sau ofertă.", "Umple locurile rămase rotind pilonii.", "Scrie un titlu de lucru scurt pentru fiecare postare, nu toată descrierea.", "Marchează postările care au nevoie de ședință foto, de design sau de video."),
          p("Campaniile sezoniere pentru Divaz, de la Galentine's Day la trendurile de unghii de sărbători, funcționează pentru că au fost puse în calendar cu săptămâni înainte să fie necesare."),
        ],
      },
      {
        id: "lucreaza-in-serie",
        heading: "Lucrează în serie",
        blocks: [
          p("Să proiectezi zece postări într-o după-amiază e mult mai rapid decât să proiectezi una pe zi, pentru că mintea rămâne în același șablon și în aceeași lume vizuală. Fă la fel cu fotografiile și cu videoclipurile: filmează pentru toată luna într-o singură ședință."),
        ],
      },
      {
        id: "lasa-loc-pentru-ce-se-intampla",
        heading: "Lasă loc pentru ce se întâmplă",
        blocks: [
          p("Păstrează liberă cam o cincime din calendar pentru noutăți, reacții, întrebările clienților și lucrurile care merg bine. Un calendar care nu se poate îndoi va fi abandonat prima dată când se întâmplă ceva neașteptat."),
        ],
      },
      {
        id: "instrumente",
        heading: "Instrumente pe care le poți folosi",
        blocks: [
          p("Un calendar nu are nevoie de software special. Un tabel partajat sau o tablă simplă, cu coloane pentru idee, în lucru, gata și publicat, este suficient. Adaugă coloane pentru pilon, format, dată și responsabil."),
          p("Cel mai bun instrument este cel pe care echipa ta îl va deschide cu adevărat în fiecare săptămână. Dacă un instrument adaugă fricțiune, treci la ceva mai simplu."),
        ],
      },
      {
        id: "revizuieste",
        heading: "Revizuiește o dată pe lună",
        blocks: [
          p("La sfârșitul lunii, notează ce postări au fost salvate, distribuite sau au adus mesaje și care au fost ignorate. Mută tipurile câștigătoare mai devreme și rărește restul. Un calendar este o ciornă pe care o îmbunătățești mereu. Dacă vrei un sistem de conținut și designuri construite în jurul lui, vezi serviciul meu de design pentru social media."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Cu cât timp înainte ar trebui să planific?"),
          p("O lună este un orizont bun. Planifică campaniile mari cu câteva săptămâni mai devreme, ca designul și producția să nu fie făcute în grabă."),
          h3("Ce fac dacă nu am timp să postez zilnic?"),
          p("Postează mai puțin, dar păstrează ritmul. Consecvența contează mai mult decât volumul."),
          h3("Să programez postările dinainte?"),
          p("Da, când poți. Programarea îți permite să lucrezi în serie și totuși să păstrezi un ritm constant, dar verifică regulat contul pentru comentarii."),
        ],
      },
    ],
    related: { projects: ["divaz", "kanoi"], services: ["social-media-design", "content-creation"] },
  },
  {
    id: "social-media-for-clinics-and-dental-practices",
    slug: "social-media-pentru-clinici-si-cabinete-stomatologice",
    title: "Social media pentru clinici și cabinete stomatologice: ghid practic",
    seoTitle: "Social media pentru clinici medicale",
    description: "Cum pot folosi clinicile, cabinetele stomatologice și opticile social media pentru a câștiga încredere: ce postezi, cum proiectezi și ce greșeli eviți.",
    category: "social-media",
    publishedAt: "2026-10-28",
    cover: { key: "artinnova-cover", alt: "Medic stomatolog cu mănuși albastre care examinează o pacientă zâmbitoare, cu oglinda și sonda" },
    intro: "Pacienții aleg o clinică cu ochii cu mult înainte să intre pe ușă. O prezență calmă, clară și consecventă pe social media le spune că vor fi pe mâini bune. Dar sănătatea este un domeniu sensibil, deci ce funcționează pentru un brand de adidași nu funcționează aici. Acestea sunt principiile pe care le urmez în proiectele pentru Art Innova Dentalmed, Global Medical Health, Optica Tei și Dr. Kurbe Clinic.",
    sections: [
      {
        id: "increderea-inainte-de-vanzare",
        heading: "Construiește încrederea înainte să vinzi",
        blocks: [
          p("Oamenii sunt îngrijorați pentru sănătatea lor. Postările care explică, liniștesc și arată echipa fac mai mult decât promoțiile constante. Pentru Art Innova, o serie de caruseluri explică fiecare serviciu pe înțelesul tuturor, de la stomatologia generală la implantologie, ca pacientul să știe la ce să se aștepte înainte să se programeze."),
        ],
      },
      {
        id: "ce-postezi",
        heading: "Ce postezi",
        blocks: [
          ul("Postări educative care răspund la întrebări reale, precum cum funcționează lentilele progresive sau când mergi la dentist.", "Prezentarea medicilor și a echipei, ideal în videoclipuri scurte.", "Explicații despre proceduri și tehnologie, spuse simplu.", "Zile de conștientizare și urări sezoniere, care arată că o clinică este făcută din oameni.", "Oferte clare, precum prețul primei vizite, cu exact ce include."),
          p("Explicația Optica Tei despre diferența dintre oftalmolog și optometrist este un model bun: o întrebare pe care oamenii și-o pun cu adevărat, cu răspuns în câteva slide-uri prietenoase."),
        ],
      },
      {
        id: "design-pentru-calm",
        heading: "Proiectează pentru calm și claritate",
        blocks: [
          p("Designul pentru sănătate trebuie să pară curat și ordonat. Folosește mult spațiu alb, o paletă sobră și text mare, lizibil. Valurile turcoaz de la Art Innova și sistemul alb cu turcoaz de la Global Medical Health păstrează un subiect clinic apropiat, fără să îl facă rece."),
          p("Alege atent fotografiile. Pozele de stoc cu zâmbete prea perfecte par adesea false. Fotografiile reale cu clinica, aparatura și echipa construiesc mai multă încredere, iar vizualurile 3D sau ilustrațiile bune pot umple golurile."),
        ],
      },
      {
        id: "lasa-medicii-sa-vorbeasca",
        heading: "Lasă medicii să vorbească",
        blocks: [
          p("Videoclipurile scurte în care un medic explică o singură temă sunt printre cele mai valoroase lucruri pe care le poate publica o clinică. Arată deodată expertiza și personalitatea. La Global Medical Health, Reels-urile subtitrate permit medicilor să explice screeningul și depistarea precoce pe înțelesul tuturor, ceea ce funcționează chiar și fără sunet."),
        ],
      },
      {
        id: "fii-atent-la-afirmatii",
        heading: "Fii atent la afirmații și la confidențialitate",
        blocks: [
          ul("Nu publica niciodată poze sau povești ale pacienților fără acord scris.", "Evită să promiți rezultate sau să garantezi un deznodământ.", "Verifică regulile colegiului profesional și reglementările locale privind publicitatea medicală.", "Precizează clar că informațiile online nu înlocuiesc un consult."),
        ],
      },
      {
        id: "o-structura-lunara-simpla",
        heading: "O structură lunară simplă pentru o clinică",
        blocks: [
          ol("Un carusel educativ despre un serviciu.", "Un scurt videoclip cu un medic care răspunde la o întrebare.", "O postare care prezintă un om din echipă.", "O postare sezonieră sau de zi de conștientizare.", "O ofertă clară, cu prețul și ce include.", "Story-uri cu clinica, aparatura și viața de zi cu zi."),
          p("Este suficient ca să menții contul activ, util și de încredere, fără să copleșești o echipă ocupată."),
        ],
      },
      {
        id: "consecventa-si-programare",
        heading: "Fii consecvent și ușor de programat",
        blocks: [
          p("Fă mereu următorul pas evident: un număr de telefon, o adresă, un link de programare. Postările GMH se încheie cu adresele clinicii și ale spitalului și un număr de telefon, mereu în același loc. Consecvența este un semn de siguranță, exact ce caută pacienții. Dacă vrei un aspect de social media pentru cabinetul tău, vezi serviciul meu de design pentru social media."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Poate o clinică să arate poze înainte și după?"),
          p("Doar cu acordul scris al pacientului și în regulile colegiului profesional. Multe clinici preferă conținut educativ care evită subiectul."),
          h3("Instagram sau Facebook e mai bun pentru un cabinet medical?"),
          p("Depinde de pacienții tăi. Multe clinici le folosesc pe amândouă, Facebook ajungând la un public mai în vârstă, iar Instagram la unul mai tânăr."),
          h3("Cum gestionez comentariile negative?"),
          p("Răspunde politicos și invită persoana să continue în privat. Nu împărtăși niciodată detalii despre pacienți în public."),
        ],
      },
    ],
    related: { projects: ["art-innova", "global-medical-health"], services: ["social-media-design", "content-creation"] },
  },
  {
    id: "how-to-write-a-design-brief",
    slug: "cum-scrii-un-brief-de-design-pentru-un-designer-grafic",
    title: "Cum scrii un brief de design care îți aduce lucrări mai bune de la un designer grafic",
    seoTitle: "Cum scrii un brief de design",
    description: "Un brief bun economisește timp și bani. Iată întrebările la care răspunzi, un șablon simplu și greșelile care duc la modificări fără sfârșit.",
    category: "content-creation",
    publishedAt: "2026-10-29",
    cover: { key: "farmex-cover", alt: "Stetoscop lângă blistere și pastile, pe fundal verde salvie" },
    intro: "Când un proiect merge prost, motivul rareori este designul. De obicei este un brief prea vag sau unul care s-a schimbat pe parcurs. Un brief clar durează o oră de scris și poate economisi săptămâni de modificări. Aceasta este structura pe care o cer clienților și pe care o folosesc eu însămi când scriu briefuri pentru propriile lucrări.",
    sections: [
      {
        id: "de-ce-conteaza-un-brief",
        heading: "De ce contează un brief",
        blocks: [
          p("Un brief este o înțelegere comună despre ce trebuie să realizeze lucrarea. Îi permite designerului să rezolve problema ta, nu s-o ghicească, și îți dă un reper cu care măsori rezultatul. „O să știu când o să văd” este cea mai scumpă propoziție din design."),
        ],
      },
      {
        id: "intrebarile",
        heading: "Întrebările la care răspunzi",
        blocks: [
          ol("Cine ești și ce vinzi? Două propoziții, pe înțelesul tuturor.", "Pentru cine este? Descrie persoana, nu doar o categorie demografică.", "Care este scopul? Mai multe cereri, o lansare, un rebranding, recunoaștere la un târg?", "Unde va fi folosit? Social media, print, ambalaje, un site?", "Ce ar trebui să gândească sau să simtă oamenii când îl văd?", "Ce trebuie să conțină? Logo, text, prețuri, informații legale.", "Ce îți place și ce nu? Trei exemple din fiecare, cu motive.", "Care sunt termenul și bugetul?"),
          p("Pentru o companie precum KDT Romania, care vinde utilaje pentru prelucrarea lemnului, un brief bun ar spune cine sunt cumpărătorii, ce dovezi contează pentru ei (rezultate, prezența la târguri, instruiri) și unde vor apărea postările. Asta modelează imediat tonul și compoziția."),
        ],
      },
      {
        id: "fii-concret",
        heading: "Fii concret despre problemă, nu despre soluție",
        blocks: [
          p("„Fă logoul mai mare” este o soluție. „Oamenii nu pot citi numele brandului pe mobil” este o problemă. Descrie problema și lasă designerul să propună remedierea, pentru că poate știe una mai bună."),
        ],
      },
      {
        id: "referintele",
        heading: "Adu referințe, cu explicații",
        blocks: [
          p("Exemplele sunt foarte utile, dar doar dacă explici ce îți place la ele. „Îmi plac culorile”, „îmi place cât spațiu alb este” sau „îmi place cât de direct e titlul” îi spune unui designer mult mai mult decât un folder cu imagini la întâmplare."),
        ],
      },
      {
        id: "feedbackul",
        heading: "Gândește cum va funcționa feedbackul",
        blocks: [
          ul("Hotărăște cine are ultimul cuvânt și adună părerile într-un singur mesaj.", "Dă feedback despre scop („nu pare destul de premium”), nu doar despre detalii.", "Spune ce funcționează, ca să nu fie schimbat din greșeală.", "Stabilește de la început numărul de runde de modificări."),
        ],
      },
      {
        id: "greseli-care-duc-la-modificari-fara-sfarsit",
        heading: "Greșeli care duc la modificări fără sfârșit",
        blocks: [
          ul("Schimbarea scopului la jumătatea proiectului.", "Feedback de la cinci oameni, în cinci mesaje separate.", "Cererea unui lucru „modern” fără să spui ce înseamnă.", "Omiterea publicului, așa că deciziile se iau pe baza gustului personal.", "Lăsarea conținutului esențial, precum prețurile sau textul legal, pentru ultima rundă."),
          p("Cele mai multe cicluri de modificări nu țin de calitatea designului. Țin de informații care au ajuns prea târziu."),
        ],
      },
      {
        id: "un-sablon-scurt",
        heading: "Un șablon scurt pe care îl poți copia",
        blocks: [
          p("Despre noi: două propoziții. Public: un paragraf. Scop: o propoziție. Livrabile și formate: o listă. Ton: trei adjective. De inclus și de evitat: două liste scurte. Termen și buget: câte o linie. Dacă le poți completa pe toate, ai deja un brief mai bun decât majoritatea. Dacă vrei să îl discutăm pe al tău, te ajut cu plăcere."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Cât de lung ar trebui să fie un brief de design?"),
          p("Una sau două pagini sunt suficiente pentru majoritatea proiectelor. Claritatea contează mai mult decât lungimea."),
          h3("Ce fac dacă nu știu ce vreau?"),
          p("Spune asta și descrie problema. Un designer bun te va ajuta să definești direcția, dar un scurt apel de descoperire ajută mult."),
          h3("Să includ bugetul în brief?"),
          p("Da. Îi permite designerului să propună amploarea potrivită, nu să ghicească. Un interval este suficient."),
        ],
      },
    ],
    related: { projects: ["kdt-romania", "iq-fashion"], services: ["branding", "content-creation"] },
  },
  {
    id: "canva-vs-hiring-a-graphic-designer",
    slug: "canva-sau-designer-grafic-cand-alegi-fiecare",
    title: "Canva sau designer grafic: când are sens fiecare",
    seoTitle: "Canva sau designer grafic?",
    description: "Canva e bun pentru unele lucruri și un risc pentru altele. O comparație sinceră cu un designer profesionist și momentul în care merită să treci la el.",
    category: "content-creation",
    publishedAt: "2026-10-30",
    cover: { key: "iq-cover", alt: "Mâini care țin o rochie-cămașă roz pudrat pe umeraș, lângă un stender cu haine în nuanțe de teracotă" },
    intro: "Sunt designer, deci te-ai aștepta să spun că nu trebuie folosit niciodată Canva. Nu o voi spune, pentru că e cu adevărat util. Întrebarea reală este ce treabă trebuie făcută. Pentru unele sarcini Canva este exact potrivit, pentru altele te costă pe nesimțite clienți. Iată cum decizi.",
    sections: [
      {
        id: "ce-face-bine-canva",
        heading: "Ce face bine Canva",
        blocks: [
          ul("Grafice rapide, de moment, precum un afiș de eveniment sau un anunț simplu.", "Prezentări și documente interne.", "Adaptarea unui design existent în dimensiuni noi.", "Modificări făcute de o echipă care trebuie să schimbe text și date fără designer."),
          p("Dacă ai un set bun de șabloane, Canva este un instrument excelent pentru a le folosi în fiecare săptămână."),
        ],
      },
      {
        id: "unde-nu-ajunge",
        heading: "Unde nu ajunge",
        blocks: [
          p("Canva îți dă mii de machete gata făcute, la fel ca altor mii de afaceri. Dacă folosești aceleași șabloane ca ale concurenților, arăți ca ei. Un șablon nu poate decide cine ești, ce te face diferit sau cum ar trebui să se simtă un întreg feed."),
          ul("Nu creează o strategie de brand sau o identitate distinctivă.", "Logourile făcute din elemente de stoc nu sunt adesea exclusive și pot fi greu de protejat.", "Culorile, fonturile și spațierea alunecă în timp, fără reguli clare.", "Proiectele complexe, precum ambalajele, fișierele de tipar și sistemele mari, cer unelte și know-how profesionist."),
        ],
      },
      {
        id: "cand-angajezi-un-designer",
        heading: "Când e momentul să angajezi un designer",
        blocks: [
          ol("Lansezi un brand și ai nevoie de o identitate cu adevărat a ta.", "Vrei un feed coerent, nu doar postări bune luate separat.", "Tipărești ceva, iar pregătirea fișierelor contează.", "Marketingul tău crește, iar aspectul începe să alunece.", "Concurezi pe o piață unde designul semnalează calitate, precum moda sau beauty."),
          p("Pentru IQ Fashion, un boutique de modă premium, limbajul vizual trebuia să pară rafinat și consecvent în postări, bannere și newslettere. Asta este un sistem de design, nu un șablon."),
        ],
      },
      {
        id: "o-varianta-hibrida",
        heading: "O variantă hibridă care funcționează bine",
        blocks: [
          p("Multe branduri folosesc ambele. Un designer creează identitatea, șabloanele cheie și regulile brandului. Echipa folosește apoi Canva sau o unealtă similară ca să producă conținutul de zi cu zi în aceste limite. Costurile rămân mici, iar aspectul consecvent."),
          p("Dacă alegi varianta aceasta, cere ca șabloanele să fie livrate în unealta pe care o folosește echipa ta, împreună cu un ghid scurt despre ce se poate schimba și ce nu."),
        ],
      },
      {
        id: "intrebari-de-pus-inainte-sa-decizi",
        heading: "Întrebări pe care să ți le pui înainte să decizi",
        blocks: [
          ul("Va fi văzut de clienți sau doar intern?", "Am nevoie să dureze ani sau o săptămână?", "Am deja o identitate și șabloane de la care să pornesc?", "Costul de a părea generic este mai mare decât cel al unui designer?", "Voi avea nevoie de fișiere de tipar sau de ambalaje?"),
          p("Răspunsurile te vor îndrepta, de obicei, clar într-o direcție."),
        ],
      },
      {
        id: "cum-decizi",
        heading: "Cum decizi",
        blocks: [
          p("Întreabă-te: dacă un client ar vedea asta lângă alți trei concurenți, ar ști totuși că suntem noi? Dacă răspunsul sincer este nu, e momentul să investești în design. Dacă sarcina este scurtă și internă, Canva ajunge. Orice ai alege, fii consecvent. Poți vedea cum abordez identitatea și social media în serviciile mele."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Pot folosi Canva pentru logo?"),
          p("Poți, dar logourile făcute din elemente de stoc pot să nu fie unice pentru tine, iar fișierele pot fi limitate. Pentru un brand pe care vrei să îl crești, un logo custom este o alegere mai sigură."),
          h3("Este Canva bun pentru social media?"),
          p("Da, pentru a produce postări de zi cu zi dintr-un set de șabloane. Este mai puțin potrivit pentru crearea sistemului vizual în sine."),
          h3("Cât costă un designer față de Canva?"),
          p("Canva costă un abonament mic, în timp ce un designer înseamnă un cost de proiect. Comparația este mai corectă dacă numeri timpul pe care îl petreci și consecvența pe care o câștigi."),
        ],
      },
    ],
    related: { projects: ["iq-fashion", "kanoi"], services: ["branding", "social-media-design"] },
  },
  {
    id: "food-and-wellness-brand-design",
    slug: "idei-de-design-si-continut-pentru-branduri-de-mancare-si-wellness",
    title: "Idei de design și conținut pentru branduri de mâncare și wellness",
    seoTitle: "Design pentru branduri de mâncare",
    description: "Cum pot arăta apetisant și de încredere online brandurile de mâncare, mese sănătoase și wellness: culoare, fotografie, produs și conținut care vinde.",
    category: "content-creation",
    publishedAt: "2026-10-31",
    cover: { key: "ilie-cover", alt: "Brutăriță zâmbitoare, cu mănuși negre, care pune fursecuri din borcane de sticlă într-o pungă de hârtie" },
    intro: "Brandurile de mâncare și wellness trăiesc sau mor din poftă și încredere. Oamenii trebuie să își dorească produsul și să creadă în el, adesea înainte să îl fi gustat sau încercat. Este în același timp o problemă de design și una de conținut. Acestea sunt ideile la care revin când lucrez cu Moș Ilie, THS Organic și Green Table.",
    sections: [
      {
        id: "da-i-o-personalitate",
        heading: "Dă-i brandului o personalitate care are gustul produsului",
        blocks: [
          p("Un brand de patiserie tradițională ar trebui să pară cald și nostalgic, așa cum sunt construite vizualurile Moș Ilie în jurul produselor tradiționale românești făcute manual. Un brand de livrare de mese sănătoase ar trebui să pară proaspăt și vesel, motiv pentru care Green Table folosește verde închis cu lime aprins și litere rotunjite, prietenoase. Culoarea și tipografia sunt primul gust pe care îl simt oamenii."),
        ],
      },
      {
        id: "fotografia",
        heading: "Fotografia este jumătate din vânzare",
        blocks: [
          ul("Folosește lumină naturală, caldă, și evită blițul dur.", "Filmează de aproape: textura, aburul, picăturile și firimiturile spun mai mult decât o farfurie din depărtare.", "Arată produsul folosit: miere turnată în ceai, un plic desfăcut, o cutie pe o masă de bucătărie.", "Păstrează fundalurile simple, ca produsul să rămână eroul.", "Retușează ușor. Mâncarea prea prelucrată pare artificială."),
          p("În conținutul THS Organic, fotografiile macro cu miere fac mare parte din muncă înainte să apară vreun text."),
        ],
      },
      {
        id: "explica-beneficiul",
        heading: "Explică beneficiul într-o singură linie",
        blocks: [
          p("Brandurile de wellness explică adesea prea mult. Alege o promisiune clară pe produs, precum întărirea imunității, îngrijirea părului sau calmarea pielii, și fă-o titlu. Apoi susține-o cu două sau trei puncte scurte, nu cu un paragraf."),
        ],
      },
      {
        id: "semnale-de-incredere",
        heading: "Arată semnale de încredere, cu sinceritate",
        blocks: [
          ul("Ingredientele și de unde provin.", "Ambalaj clar, care spune ce este și ce nu este produsul.", "Oameni reali care folosesc produsul, cu acordul lor.", "Comparații corecte și factuale, nu agresive.", "Certificări pe care le deții cu adevărat, niciodată inventate."),
        ],
      },
      {
        id: "continut-care-vinde",
        heading: "Conținut care funcționează în această nișă",
        blocks: [
          ol("Rețete și moduri de folosire a produsului.", "Culisele: unde și de către cine este făcut.", "Rutine înainte și după, prezentate realist.", "Reels scurte cu desfăcutul pachetelor și gustarea.", "Oferte sezoniere și pachete."),
        ],
      },
      {
        id: "etichete-si-afirmatii",
        heading: "Etichete și afirmații: păstrează-le cinstite",
        blocks: [
          p("Mâncarea și wellness-ul sunt domenii reglementate. Afirmațiile despre sănătate trebuie susținute și formulate atent, iar listele de ingrediente trebuie să fie corecte. Proiectează ambalajul și postările ca informațiile obligatorii să fie ușor de citit și cere sfatul unui specialist dacă nu ești sigur de formulare."),
          p("Limbajul cinstit câștigă și încredere. „Făcut din miere și extracte din plante” este mai bun decât o promisiune vagă pe care nu o poate verifica nimeni."),
        ],
      },
      {
        id: "pastreaza-gama-coerenta",
        heading: "Păstrează coerentă o gamă care crește",
        blocks: [
          p("Dacă adaugi produse, dă fiecăruia un loc în sistem, de exemplu propria culoare de accent, păstrând la fel logoul, compoziția și stilul fotografiei. Așa poate crește un brand de la un produs la cinci fără să devină confuz. Dacă construiești un brand de mâncare sau wellness, uită-te la lucrările mele pentru acești clienți."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Ce culori funcționează pentru un brand de mâncare?"),
          p("Tonurile calde precum chihlimbarul, roșul și portocaliul stimulează pofta, în timp ce verdele sugerează prospețime și sănătate. Alegerea potrivită depinde de produs și de public."),
          h3("Am nevoie de fotografie profesională de mâncare?"),
          p("Face o mare diferență, dar o configurație curată cu telefonul și lumină naturală poate funcționa bine pentru social media. Pentru ambalaje și site, fotografiile profesionale merită."),
          h3("Cât de des ar trebui să posteze un brand de mâncare?"),
          p("De trei-patru ori pe săptămână, combinând rețete, fotografii de produs, Reels și oferte, este un ritm realist."),
        ],
      },
    ],
    related: { projects: ["mos-ilie", "ths-organic", "green-table"], services: ["content-creation", "social-media-design"] },
  },
  {
    id: "what-a-small-business-website-needs",
    slug: "ce-trebuie-sa-aiba-o-pagina-de-prezentare-ca-sa-converteasca",
    title: "Ce trebuie să aibă o pagină de prezentare ca să transforme vizitatorii în clienți",
    seoTitle: "Ce trebuie să aibă o landing page",
    description: "Șapte lucruri de care are nevoie orice landing page: promisiune clară, dovezi, buton vizibil, design rapid pe mobil și altele, cu lecții din proiecte UX/UI.",
    category: "graphic-design",
    publishedAt: "2026-11-01",
    cover: { key: "greentable-cover", alt: "Ingrediente proaspete și sănătoase pe o masă albă din lemn: somon, avocado, sparanghel, roșii, ouă, nuci și fructe de pădure" },
    intro: "O pagină de prezentare are o singură treabă: să le fie ușor oamenilor potriviți să facă următorul pas. Majoritatea paginilor care nu funcționează nu sunt urâte. Sunt confuze. După ce am proiectat interfețe pentru o florărie online, o companie de tipar, un brand de mese sănătoase și o platformă educațională, văd mereu aceleași șapte lucruri care despart paginile care funcționează de cele care nu.",
    sections: [
      {
        id: "o-promisiune-clara",
        heading: "1. O promisiune pe care oamenii o înțeleg în cinci secunde",
        blocks: [
          p("Primul ecran trebuie să răspundă la trei întrebări: ce este, pentru cine este și de ce ar trebui să-mi pese. Pagina de start Green Table se deschide cu „Fresh, Organic, Delivered to Your Door”. Nimeni nu trebuie să deruleze ca să înțeleagă oferta."),
        ],
      },
      {
        id: "o-actiune-principala",
        heading: "2. O singură acțiune principală",
        blocks: [
          p("Alege cel mai important pas, precum cumpără, programează-te, cere o ofertă sau încearcă, și fă-l cel mai puternic element de pe pagină. Acțiunile secundare trebuie să arate clar secundare. Pe pagina de start Green Table, butonul plin „Try it” conduce, iar „Contact Sales” stă lângă el, mai discret, doar cu contur."),
        ],
      },
      {
        id: "dovezi",
        heading: "3. Dovezi că ești real",
        blocks: [
          ul("Recenzii și evaluări, cu nume reale când se poate.", "Logouri ale clienților sau partenerilor.", "Fotografii cu echipa, produsul sau atelierul.", "Studii de caz scurte sau rezultate.", "Garanții, condiții de livrare și retur, spuse pe șleau."),
        ],
      },
      {
        id: "detaliile-practice",
        heading: "4. Detaliile practice, ușor de găsit",
        blocks: [
          p("Prețul, livrarea, mărimile, ce este inclus, cât durează: acestea decid cumpărăturile. Paginile de produs Regata listează detaliile tehnice, formatele de fișiere acceptate și modalitățile de plată în blocuri clare, pentru că exact asta vrea să știe un client de tipar înainte să comande."),
        ],
      },
      {
        id: "mai-intai-pe-telefon",
        heading: "5. Proiectată mai întâi pentru telefon",
        blocks: [
          p("Majoritatea vizitatorilor vor intra de pe telefon. Folosește zone mari de atingere, text lizibil fără zoom, un meniu scurt și formulare cu cât mai puține câmpuri. Verifică pagina cu o mână, în picioare, pe o conexiune lentă."),
        ],
      },
      {
        id: "viteza-si-simplitatea",
        heading: "6. Rapidă, simplă și calmă",
        blocks: [
          ul("Comprimă imaginile și evită videoclipurile grele care pornesc singure.", "Limitează fonturile la două familii.", "Folosește mult spațiu alb ca acțiunea principală să iasă în evidență.", "Scoate tot ce nu ajută vizitatorul să se decidă."),
        ],
      },
      {
        id: "test-de-cinci-secunde",
        heading: "Un test de cinci secunde",
        blocks: [
          p("Arată pagina cuiva timp de cinci secunde, apoi ascunde-o și pune trei întrebări: ce este, pentru cine este, ce ai face mai departe? Dacă ezită la oricare, pagina are nevoie de muncă. Nu costă nimic și este cea mai rapidă cale să îți vezi pagina cu ochi noi."),
        ],
      },
      {
        id: "accesibilitatea",
        heading: "7. Accesibilă tuturor",
        blocks: [
          p("Un contrast suficient, etichete clare, texte de butoane cu sens și stări de focus bune ajută pe orice vizitator, nu doar pe cei cu dizabilități. De obicei ajută și motoarele de căutare să înțeleagă pagina."),
          p("Dacă vrei un site sau o interfață de aplicație proiectată după aceste principii, vezi serviciul meu de design UX/UI și proiectele de mai jos."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Care e diferența dintre o landing page și un site?"),
          p("O landing page are un scop și o singură acțiune. Un site are multe pagini și servește mai multe scopuri."),
          h3("Cât de lungă ar trebui să fie o landing page?"),
          p("Cât îi trebuie ca să răspundă la întrebările vizitatorului, și nu mai mult. Pentru oferte simple merge o pagină scurtă. Pentru decizii scumpe sau complexe, o pagină mai lungă, cu dovezi și detalii, funcționează mai bine."),
          h3("Am nevoie de designer pentru o landing page?"),
          p("Un designer ajută cel mai mult când pagina trebuie să construiască încredere și să ghideze alegerile. Pentru o pagină simplă, un șablon bun cu texte îngrijite poate fi suficient."),
        ],
      },
    ],
    related: { projects: ["green-table", "regata-print", "floraria-mariei"], services: ["ux-ui-design"] },
  },
  {
    id: "how-to-prepare-files-for-print",
    slug: "cum-pregatesti-fisierele-pentru-tipar-bleed-cmyk-rezolutie",
    title: "Cum pregătești fișierele pentru tipar: bleed, CMYK și rezoluție explicate",
    seoTitle: "Cum pregătești fișierele pentru tipar",
    description: "Fișierele pentru tipar greșesc din aceleași câteva motive. Află ce înseamnă bleed, CMYK, rezoluție și fonturi și cum verifici un fișier înainte de tipografie.",
    category: "graphic-design",
    publishedAt: "2026-11-02",
    cover: { key: "regata-cover", alt: "Doi designeri, văzuți de sus, care aleg culori de pe mostre tipărite, la o cafea" },
    intro: "Nimic nu e mai frustrant decât un design care arată perfect pe ecran și ajunge de la tipografie cu margini albe, culori șterse sau text neclar. Aproape toate problemele de tipar vin din aceeași mână de cauze și fiecare poate fi evitată. Aceasta este lista pe care o folosesc înainte să trimit la tipar cărți de vizită, vouchere, pliante și calendare.",
    sections: [
      {
        id: "porneste-de-la-dimensiunea-exacta",
        heading: "Pornește de la dimensiunea exactă",
        blocks: [
          p("Setează documentul la dimensiunea finală din primul minut: A4, A6, o carte de vizită, un afiș. Redimensionarea ulterioară duce la imagini neclare și margini stângace. Cere tipografiei șablonul lor, dacă au unul."),
        ],
      },
      {
        id: "bleed",
        heading: "Bleed: marginea în plus care previne liniile albe",
        blocks: [
          p("Hârtia se taie cu o mică marjă de eroare. Dacă fundalul tău se oprește exact la margine, poate apărea o linie albă subțire. Bleed-ul rezolvă asta extinzând fundalul și imaginile dincolo de dimensiunea finală, de obicei cu 3 mm pe fiecare parte."),
          ul("Adaugă 3 mm de bleed, cu excepția cazului în care tipografia spune altceva.", "Extinde fundalurile și pozele până la marginea de bleed.", "Păstrează textul important și logourile într-o marjă de siguranță, la 4–5 mm de tăietură."),
          p("Calendarul de perete GMH proiectat de mine a fost livrat cu bleed și semne de tăiere, ca tipografia să îl poată tăia curat."),
        ],
      },
      {
        id: "modul-de-culoare",
        heading: "CMYK vs RGB",
        blocks: [
          p("Ecranele amestecă lumină (RGB). Imprimantele amestecă cerneală (CMYK). Culorile foarte vii de pe ecran, mai ales albastrul, verdele și neonul intens, nu pot fi reproduse întotdeauna cu cerneală. Dacă proiectezi în RGB și convertești la final, culorile pot ieși mai șterse."),
          ul("Creează proiectele de tipar în CMYK de la început.", "Întreabă tipografia ce profil de culoare folosește.", "Pentru culorile brandului, definește o valoare CMYK sau Pantone în ghidul de brand.", "Cere o probă de culoare dacă acuratețea contează, de exemplu la ambalaje sau la un logo."),
        ],
      },
      {
        id: "rezolutia",
        heading: "Rezoluția: 300 dpi la dimensiunea reală",
        blocks: [
          p("Imaginile au nevoie de circa 300 dpi la dimensiunea la care se tipăresc. O poză care arată clar la 1000 de pixeli lățime pe ecran va fi prea mică pentru un pliant A4. Nu mări pur și simplu o imagine mică: va arăta fadă. Caută o variantă originală mai mare."),
        ],
      },
      {
        id: "fonturi-si-text",
        heading: "Fonturi, text și negru",
        blocks: [
          ul("Convertește textul în contururi sau încorporează fonturile la exportul PDF.", "Evită textul mai mic de aproximativ 6 pt și fii atent cu textul deschis pe fundal închis.", "Pentru textul negru, folosește negru pur (doar K), nu un amestec de patru cerneluri.", "Folosește rich black doar pentru suprafețe mari negre și cere tipografiei valorile recomandate."),
        ],
      },
      {
        id: "lista-finala",
        heading: "O listă finală înainte să trimiți",
        blocks: [
          ul("Dimensiunea finală și orientarea sunt corecte.", "Bleed-ul și semnele de tăiere sunt incluse, dacă sunt cerute.", "Toate imaginile au 300 dpi la dimensiunea reală.", "Culorile sunt în CMYK, iar textul negru este negru pur.", "Fonturile sunt încorporate sau transformate în contururi.", "Codurile QR, numerele de telefon și ortografia au fost verificate.", "Ai confirmarea tipografiei pentru format și cantitate."),
          p("Dacă tipărești ceva important, comandă mai întâi o singură probă. Costă puțin față de un tiraj întreg care are o greșeală."),
        ],
      },
      {
        id: "export-si-verificare",
        heading: "Exportă și verifică",
        blocks: [
          ol("Exportă un PDF în presetarea tipografiei, de exemplu PDF/X-4 sau cea pe care o primești.", "Include semnele de tăiere și bleed-ul, dacă sunt cerute.", "Deschide PDF-ul și mărește ca să verifici textul, marginile și imaginile.", "Verifică ortografia, numerele de telefon și codurile QR. Scanează codul QR cu un telefon."),
          p("Fă asta o dată și păstrează setările ca șablon. Dacă ai nevoie de ajutor la pregătirea fișierelor de tipar sau la proiectarea materialelor tipărite, vezi lucrările mele de design de print."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Ce înseamnă bleed la tipar?"),
          p("Bleed-ul este zona suplimentară de fundal care depășește linia de tăiere, ca să nu apară margini albe după tăiere."),
          h3("De ce arată culorile tipărite altfel decât pe ecran?"),
          p("Ecranele folosesc lumină, iar imprimantele cerneală, deci culorile vii pot ieși mai șterse la tipar. Proiectarea în CMYK și comandarea unei probe ajută."),
          h3("Ce rezoluție am nevoie pentru tipar?"),
          p("Aproximativ 300 dpi la dimensiunea finală tipărită. O rezoluție mai mică arată fadă sau pixelată."),
        ],
      },
    ],
    related: { projects: ["global-medical-health", "caterina-tomasso"], services: ["printed-media"] },
  },
  {
    id: "explainer-animation-for-business-and-education",
    slug: "animatie-2d-explicativa-pentru-business-si-educatie",
    title: "Animație 2D explicativă pentru business și educație: când funcționează și cum o planifici",
    seoTitle: "Animație 2D explicativă: ghid",
    description: "Animațiile explicative fac ideile complicate simple. Află când este animația 2D formatul potrivit, cum scrii scenariul și cum planifici producția.",
    category: "content-creation",
    publishedAt: "2026-11-03",
    cover: { key: "nextlab-cover", alt: "Mâini în mănuși care folosesc un multimetru pentru a testa o placă de bază într-un laborator de electronică" },
    intro: "Unele idei sunt greu de explicat într-un paragraf: cum funcționează un algoritm, ce include un studiu de fezabilitate, de ce o platformă economisește timp profesorilor. O animație 2D scurtă le poate face clare într-un minut. Timp de trei ani am lucrat in house la NEXTLAB.TECH, unde animațiile au purtat lecțiile unui proiect de informatică și robotică. Iată ce am învățat despre când funcționează formatul și cum îl planifici.",
    sections: [
      {
        id: "cand-functioneaza",
        heading: "Când este animația 2D alegerea potrivită",
        blocks: [
          ul("Subiectul este abstract sau invizibil, precum software, date, procese sau memorie.", "Trebuie să explici același lucru multor oameni, iar și iar.", "Filmarea este nepractică sau scumpă.", "Vrei un ton prietenos, cu personaje și umor.", "Publicul învață, deci claritatea contează mai mult decât spectaculosul."),
          p("În educație este deosebit de bună: un personaj care vorbește elevului, o scenă care arată un exemplu din viața de zi cu zi și o diagramă simplă pot transforma un concept dificil în ceva familiar."),
        ],
      },
      {
        id: "un-singur-mesaj",
        heading: "Începe cu un singur mesaj",
        blocks: [
          p("Decide singurul lucru pe care ar trebui să îl înțeleagă sau să îl facă privitorul la final. O animație trebuie să aibă o idee. Dacă ai cinci, fă cinci videoclipuri scurte. În lecțiile noastre, un clip despre algoritmi folosește ca exemplu o rețetă de smoothie: oricine înțelege pașii dintr-o rețetă, deci ideea de algoritm ajunge fără efort."),
        ],
      },
      {
        id: "scrie-scenariul",
        heading: "Scrie scenariul pentru ureche",
        blocks: [
          ul("Folosește propoziții scurte și cuvinte simple.", "Deschide cu o întrebare sau o situație familiară.", "Dă un exemplu înainte de definiție.", "Încheie cu un rezumat scurt, precum „Deci reține!” din lecțiile noastre.", "Citește-l cu voce tare și taie tot ce sună a manual."),
          p("Un minut de vorbire înseamnă aproximativ 130–150 de cuvinte. Rămâi la asta și nu va trebui să grăbești imaginile."),
        ],
      },
      {
        id: "storyboard",
        heading: "Fă storyboard înainte să animi",
        blocks: [
          p("Un storyboard este un rând de cadre simple care arată ce e pe ecran la fiecare propoziție. Este cel mai ieftin loc în care găsești greșeli. Marchează unde apare textul, unde intră personajele și ce se schimbă de la o scenă la alta."),
        ],
      },
      {
        id: "design-si-animatie",
        heading: "Păstrează designul simplu și consecvent",
        blocks: [
          ol("Alege un set mic de personaje și o paletă clară de culori.", "Folosește un stil de ilustrație consecvent în toate scenele.", "Animă doar ce susține mesajul: o evidențiere, o tranziție, o săgeată desenată.", "Ține textul mare și pe ecran destul cât să poată fi citit de două ori.", "Adaugă subtitrări, ca videoclipul să meargă fără sunet și în săli de clasă zgomotoase."),
        ],
      },
      {
        id: "ce-influenteaza-timpul-si-efortul",
        heading: "Ce influențează timpul și efortul",
        blocks: [
          ul("Durata videoclipului.", "Numărul de personaje și de scene.", "Cantitatea de ilustrație custom necesară.", "Complexitatea mișcării.", "Cât de repede sunt aprobate feedbackul și scenariul."),
          p("O animație scurtă, bine planificată, se poate face mult mai repede decât una lungă, cu idei care se schimbă. Scenariul și storyboardul sunt locul unde economisești cel mai mult timp."),
        ],
      },
      {
        id: "sunet-si-revizuire",
        heading: "Sunet și revizuire",
        blocks: [
          p("O voce clară contează mai mult decât muzica. Ține muzica încet și simplă și lasă mici pauze după replicile importante. Testează videoclipul cu cineva care nu știe nimic despre subiect. Dacă îți poate explica înapoi, funcționează."),
          p("Poți vedea exemple de animații explicative pe pagina serviciului de animație 2D și în proiectul NEXTLAB.TECH."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Cât de lung ar trebui să fie un videoclip explicativ?"),
          p("Unul sau două minute funcționează pentru majoritatea subiectelor. Lecțiile mai lungi se împart mai bine în mai multe părți scurte."),
          h3("Am nevoie de voce off?"),
          p("O voce clară ajută înțelegerea, mai ales în educație. Subtitrările permit videoclipului să funcționeze fără sunet."),
          h3("Se poate folosi animația pentru lecții în alte limbi decât engleza?"),
          p("Da. Ține textul de pe ecran separat de ilustrație, ca să fie ușor de tradus, așa cum am făcut pentru lecțiile în limba română."),
        ],
      },
    ],
    related: { projects: ["nextlab-tech"], services: ["2d-animation", "content-creation"] },
  },
  {
    id: "how-to-pair-fonts-for-a-brand",
    slug: "cum-asociezi-fonturile-pentru-un-brand",
    title: "Cum asociezi fonturile pentru un brand: un sistem simplu care funcționează mereu",
    seoTitle: "Cum asociezi fonturile pentru un brand",
    description: "Asocierea fonturilor fără ghicit: câte fonturi folosești, ce combinații merg și cum le testezi pe compoziții reale și pe telefon.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-fonts", alt: "Colaj tipografic: un A mare cu serife și un a mic pe roz, cu steluțe și hârtie ruptă" },
    intro: "Alegerea fonturilor e una dintre treburile care par simple până o încerci. Două fonturi care arată grozav fiecare în parte se pot bate între ele pe aceeași pagină. Vestea bună este că asocierea fonturilor urmează câteva reguli simple, iar odată ce le știi, poți asocia tipografia pentru aproape orice brand în câteva minute.",
    sections: [
      {
        id: "porneste-de-la-rol",
        heading: "Pornește de la rolul fiecărui font",
        blocks: [
          p("Înainte să răsfoiești o bibliotecă de fonturi, decide pentru ce este fiecare. Un brand are, de obicei, nevoie de un font care vorbește (titluri, logo, afirmații mari) și de unul care lucrează discret (paragrafe, descrieri, prețuri, text legal). O singură familie cu mai multe grosimi poate face ambele, iar asta este adesea cel mai sigur început."),
          p("La designul web Green Table am asociat un font de titlu rotunjit și prietenos cu un sans-serif simplu, foarte lizibil, pentru tot ce e funcțional. Fontul de titlu poartă personalitatea, celălalt doar nu stă în cale."),
        ],
      },
      {
        id: "cate-fonturi",
        heading: "Câte fonturi sunt suficiente",
        blocks: [
          p("Două este numărul care merge pentru aproape oricine. Trei este limita, și doar dacă al treilea are un rol foarte precis, de exemplu un accent scris de mână folosit o singură dată pe compoziție. Mai mult de trei și brandul începe să semene cu o scrisoare de răscumpărare."),
          ul("Un font de titlu cu personalitate.", "Un font de text care rămâne lizibil la mărimi mici pe telefon.", "Opțional, un font de accent folosit rar."),
        ],
      },
      {
        id: "reguli-de-asociere",
        heading: "Patru asocieri care rareori dau greș",
        blocks: [
          ol("Titlu cu serife și text sans-serif curat. O combinație clasică, elegantă, folosită la Caterina Tomasso cu un font rafinat pentru titluri și unul simplu pentru text.", "Titlu sans-serif cu text cu serife, pentru un aer mai editorial.", "O singură familie în două grosimi, de exemplu bold pentru titluri și regular pentru text. Imposibil de greșit.", "Un sans geometric cu un sans umanist: au structură comună, dar căldură diferită."),
          p("Firul comun este contrastul cu un rost. Dacă două fonturi sunt aproape la fel, dar nu chiar, diferența pare o greșeală. Fă-le clar diferite sau clar din aceeași familie."),
        ],
      },
      {
        id: "testeaza-le",
        heading: "Testează perechea acolo unde va trăi",
        blocks: [
          ul("Pune un titlu real, un paragraf, un preț și o descriere, nu text de umplutură.", "Privește-l pe telefon, la mărimea reală, la lumină puternică.", "Verifică dacă cifrele, accentele și caracterele speciale există în ambele fonturi. Diacriticele românești ă, ș și ț sunt o capcană clasică.", "Verifică licența: unele fonturi gratuite nu permit folosirea comercială sau încorporarea pe site."),
          p("Dacă un font nu are caracterele de care limba ta are nevoie, renunță la el, oricât de frumos ar fi. Un brand care nu poate scrie corect numele clienților săi are o problemă."),
        ],
      },
      {
        id: "noteaza-regulile",
        heading: "Notează regulile",
        blocks: [
          p("Odată ce ai o pereche, notează ce font se folosește unde, în ce mărimi și grosimi și cât spațiu rămâne între rânduri. Trei propoziții sunt suficiente. Este partea dintr-un brand book care economisește cel mai mult timp mai târziu."),
          p("Dacă vrei ajutor la alegerea tipografiei ca parte dintr-o identitate completă, vezi serviciul meu de branding."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Pot folosi același font pentru tot?"),
          p("Da. O singură familie bine aleasă, cu mai multe grosimi, este o alegere sigură și elegantă, mai ales pentru brandurile mici."),
          h3("Sunt suficiente fonturile gratuite?"),
          p("Multe sunt excelente. Verifică licența pentru uz comercial și pentru site-uri și aplicații și asigură-te că fontul acceptă limba ta."),
          h3("Fontul logoului trebuie să fie la fel cu cel al brandului?"),
          p("Nu neapărat, dar nu trebuie să se bată cap în cap. Multe branduri folosesc un logotip custom și un font înrudit, mai simplu, pentru restul."),
        ],
      },
    ],
    related: { projects: ["caterina-tomasso", "green-table"], services: ["branding"] },
  },
  {
    id: "logo-file-formats-explained",
    slug: "formate-de-fisiere-pentru-logo-svg-png-pdf-ai",
    title: "Formate de fișiere pentru logo: SVG, PNG, PDF, AI și când folosești fiecare",
    seoTitle: "Formate de fișiere pentru logo: SVG, PNG, PDF",
    description: "Ce fișier de logo folosești unde: SVG pentru web, PNG pentru fundal transparent, PDF și AI pentru tipar și editare și ce îi ceri designerului să livreze.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-identity", alt: "Colaj roz cu un chip clasic în semitonuri, o schiță pe hârtie și o mână care ține un stilou" },
    intro: "După un proiect de logo primești, de obicei, un folder plin de fișiere cu nume ca logo_final_v3.ai și logo-alb.png. Nu e evident pe care îl pui pe site, pe care îl trimiți la tipografie și pe care îl păstrezi bine. Ghidul explică pe înțelesul tuturor formatele comune, ca să iei mereu fișierul potrivit.",
    sections: [
      {
        id: "vector-vs-raster",
        heading: "Vector și raster: singura idee de care ai nevoie",
        blocks: [
          p("Fișierele vectoriale (SVG, AI, EPS, PDF) descriu un logo prin linii și forme, deci pot fi mărite la orice dimensiune, de la un pix la un panou publicitar, fără să își piardă claritatea. Fișierele raster (PNG, JPG) sunt făcute din pixeli, deci au o dimensiune fixă și arată fade dacă le mărești."),
          p("Logoul principal ar trebui să existe mereu ca vector. Tot restul se poate exporta din el."),
        ],
      },
      {
        id: "svg",
        heading: "SVG: cea mai bună alegere pentru site-uri",
        blocks: [
          p("SVG este un format vectorial pe care îl înțeleg browserele. Rămâne clar pe orice ecran, are de obicei o dimensiune foarte mică și își poate schimba culoarea cu o linie de cod. Folosește-l pentru logoul din antetul și din subsolul site-ului."),
          ul("Excelent pentru logouri și pictograme, nu pentru fotografii.", "Verifică dacă textul din logo a fost transformat în contururi, ca fonturile să nu se schimbe.", "Păstrează o copie a SVG-ului pentru variantele închisă și deschisă."),
        ],
      },
      {
        id: "png",
        heading: "PNG: când ai nevoie de transparență",
        blocks: [
          p("PNG este un format raster care acceptă fundal transparent. Este alegerea potrivită pentru a așeza un logo peste o fotografie, în prezentări și pe platforme care nu acceptă SVG, precum multe unelte de social media și e-mail."),
          ul("Exportă la dimensiune mare (de exemplu 2000 de pixeli lățime), ca să rămână clar.", "Păstrează variante pentru fundal deschis și închis.", "Nu folosi un PNG pentru tipar dacă poți folosi un vector."),
        ],
      },
      {
        id: "pdf-ai-eps",
        heading: "PDF, AI și EPS: tipar și editare",
        blocks: [
          p("Un PDF vectorial este cel mai ușor fișier de trimis la tipografie și aproape orice program îl deschide. AI este fișierul editabil din Adobe Illustrator: păstrează-l ca fișier principal pentru modificări viitoare. EPS este un format vectorial mai vechi, pe care unele tipografii și firme de reclame îl cer încă."),
          p("Când o tipografie cere logoul, trimite un PDF vectorial, dacă nu cer altceva. Dacă nu ești sigur, cere specificațiile lor de fișier."),
        ],
      },
      {
        id: "jpg",
        heading: "JPG: de obicei nu pentru logouri",
        blocks: [
          p("JPG comprimă imaginea și nu poate fi transparent, deci un logo salvat ca JPG stă într-o căsuță albă pe orice fundal colorat. E în regulă pentru o previzualizare rapidă, dar nu pentru uz real."),
        ],
      },
      {
        id: "ce-ceri-designerului",
        heading: "Ce îi ceri designerului să livreze",
        blocks: [
          ol("Logoul principal în AI sau alt fișier vectorial editabil.", "Variante SVG și PDF vectorial.", "Variante PNG cu fundal transparent, în culori, alb-negru și alb.", "Variante pentru fundal deschis și închis.", "Pictograma sau varianta mică și o variantă pentru poza de profil de pe rețele sociale."),
          p("Dacă lucrezi la o identitate nouă, cere de la început pachetul complet. Economisești multă corespondență mai târziu."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Pot transforma un logo PNG în vector?"),
          p("Poate fi redesenat sau vectorizat automat, dar rezultatele automate sunt adesea aspre. O redesenare corectă făcută de un designer este mult mai bună."),
          h3("Ce format încarc pe Instagram?"),
          p("Un PNG sau JPG de rezoluție mare, pentru că platforma nu folosește vectori pentru pozele de profil."),
          h3("De ce arată logoul meu neclar pe site?"),
          p("De obicei este un fișier raster mic, întins prea mult. Înlocuiește-l cu un SVG sau cu un PNG mai mare."),
        ],
      },
    ],
    related: { projects: ["inklabs", "fleurane"], services: ["branding"] },
  },
  {
    id: "what-makes-a-good-logo",
    slug: "ce-face-un-logo-bun-7-principii",
    title: "Ce face un logo bun? 7 principii de verificat înainte să îl aprobi",
    seoTitle: "Ce face un logo bun? 7 principii",
    description: "Un logo bun este simplu, memorabil și funcționează peste tot. Șapte principii cu care poți judeca un logo înainte să îl aprobi.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-stand-out", alt: "Colaj roz și bleumarin cu un scorpion gravat, o călimară, un ochi în semitonuri și o floare" },
    intro: "Majoritatea oamenilor judecă un logo după cât le place. E un început, dar un logo trebuie să facă mult mai mult decât să arate frumos. Trebuie recunoscut într-o poză de profil mică, citit pe un fundal închis și să funcționeze și într-o singură culoare. Aceste șapte verificări te ajută să decizi dacă un logo este cu adevărat bun, nu doar frumos.",
    sections: [
      {
        id: "simplu",
        heading: "1. Este destul de simplu ca să fie ținut minte",
        blocks: [
          p("Logourile pe care le țin oamenii minte au o formă clară și puține detalii. Un test: încearcă să îl desenezi din memorie după ce l-ai văzut o dată. Dacă nu poți, probabil e prea complicat."),
          p("Simplu nu înseamnă plictisitor. Logoul Inklabs este construit dintr-un logotip îndrăzneț și o mică literă i cu romb și puncte. Este simplu și inconfundabil."),
        ],
      },
      {
        id: "scalabil",
        heading: "2. Funcționează la orice dimensiune",
        blocks: [
          p("Micșorează logoul la mărimea unei poze de profil și a unui favicon. Apoi mărește-l până umple un banner. Dacă detaliile dispar sau liniile fine se pierd, ai nevoie de o variantă mai simplă pentru utilizările mici."),
          ul("Verifică-l la aproximativ 32 de pixeli lățime.", "Verifică-l pe o carte de vizită tipărită.", "Asigură-te că există o variantă compactă, ca pictogramă, pentru spații mici."),
        ],
      },
      {
        id: "independent-de-culoare",
        heading: "3. Funcționează într-o singură culoare",
        blocks: [
          p("Un logo bun merge și doar în negru sau alb. Vei avea nevoie de varianta aceea pentru ștampile, gravură, o fotocopie sau o comandă mică de tipar. Dacă logoul depinde de un degrade ca să fie înțeles, este fragil."),
          p("Verifică-l și pe fundaluri deschise, închise și fotografice."),
        ],
      },
      {
        id: "se-potriveste",
        heading: "4. Se potrivește afacerii, nu trendului",
        blocks: [
          p("Un logo pentru un boutique de modă premium nu are nevoie de aceeași energie ca unul pentru un brand de unghii press-on. Verifică dacă forma, litera și culoarea se potrivesc publicului. IQ Fashion avea nevoie de un aspect rafinat și sobru. Ar fi greșit pentru un brand jucăuș."),
          p("Fii atent la efectele la modă. Trendurile îmbătrânesc repede, în timp ce o formă atemporală rămâne utilă ani la rând."),
        ],
      },
      {
        id: "distinct",
        heading: "5. Se deosebește de concurenți",
        blocks: [
          p("Pune logoul lângă trei concurenți. Îi poți deosebi în două secunde? Dacă poți schimba numele și nu se schimbă nimic, logoul nu își face treaba."),
        ],
      },
      {
        id: "versatil",
        heading: "6. Este versatil",
        blocks: [
          ul("Variante orizontale și așezate pe verticală.", "Un simbol singur și un logotip singur.", "Variante pentru fundal deschis și închis.", "O formă care poate fi folosită în modele și pe rețelele sociale."),
          p("Versatilitatea face din logo o unealtă, nu doar o imagine."),
        ],
      },
      {
        id: "lizibil",
        heading: "7. Este lizibil",
        blocks: [
          p("Dacă logoul include un nume, asigură-te că poate fi citit repede, la orice mărime. Literele foarte subțiri sau decorative pot arăta frumos și pot da greș la tipar mic. Verifică cum se comportă literele la cea mai mică mărime pe care o vei folosi. Dacă vrei o a doua părere despre un logo, vezi serviciul meu de branding."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Un logo trebuie să aibă pictogramă?"),
          p("Nu neapărat. Un logotip puternic poate fi suficient. O pictogramă ajută în spații mici, precum pozele de profil."),
          h3("Câte culori ar trebui să aibă un logo?"),
          p("De obicei între una și trei. Mai puține culori sunt mai ușor de reprodus și de ținut minte."),
          h3("Pot să îmi fac singur logoul?"),
          p("Poți, dar logoul este nucleul vizibil al brandului tău. Un profesionist te poate ajuta să eviți probleme frecvente, precum scalarea slabă și formele neclare."),
        ],
      },
    ],
    related: { projects: ["inklabs", "iq-fashion"], services: ["branding"] },
  },
  {
    id: "brand-voice-and-tone-of-voice",
    slug: "vocea-brandului-si-tonul-vocii-cum-le-definesti",
    title: "Vocea brandului și tonul vocii: cum le definești pe ale tale (cu exemple)",
    seoTitle: "Vocea brandului și tonul vocii: cum le definești",
    description: "O voce clară a brandului face ca fiecare postare, descriere și e-mail să sune ca aceeași afacere. Cum o definești în trei pași, cu exemple.",
    category: "content-creation",
    publishedAt: "2026-11-03",
    cover: { key: "journal-mistakes", alt: "Colaj de brand în roz și bleumarin, cu mostre de culoare, un pahar de cafea, o etichetă și forme" },
    intro: "Poți recunoaște unele branduri doar după felul în care scriu, chiar cu logoul ascuns. Asta este vocea brandului la lucru. Este personalitatea felului în care vorbește o afacere, iar când este consecventă, clienții au mai multă încredere. Iată o metodă simplă de a o defini pe a ta, chiar dacă ești o afacere cu un singur om.",
    sections: [
      {
        id: "voce-vs-ton",
        heading: "Voce și ton: care este diferența",
        blocks: [
          p("Vocea este personalitatea constantă a brandului: caldă, directă, jucăușă, de expert. Tonul este felul în care vocea se adaptează situației. Un brand poate fi prietenos într-o postare cu un concurs și calm și serios când vorbește despre o întârziere sau o instrucțiune de siguranță."),
          p("Gândește-te la o persoană: vocea este cine este, tonul se schimbă între o petrecere și o ședință."),
        ],
      },
      {
        id: "pasul-unu",
        heading: "Pasul 1: alege trei cuvinte",
        blocks: [
          p("Alege trei adjective care descriu cum ar trebui să sune brandul și scrie câte o propoziție despre ce înseamnă fiecare în practică. Pentru Inklabs, vocea îmbină răzvrătirea cu fiabilitatea: îndrăzneață și puțin obraznică când vorbește despre stil, clară și calmă când vorbește despre siguranța pielii."),
          ul("Prietenos, dar nu copilăresc.", "Expert, dar nu rigid.", "Încrezător, dar nu arogant."),
        ],
      },
      {
        id: "pasul-doi",
        heading: "Pasul 2: scrie reguli de tipul „fă” și „nu face”",
        blocks: [
          p("Pentru fiecare cuvânt, dă un exemplu de ce scrii și ce eviți. Asta face ca vocea să poată fi folosită de altcineva."),
          ul("Folosește propoziții scurte. Nu folosi jargon corporatist.", "Adresează-te cititorului cu „tu”. Nu te ascunde în spatele lui „avem plăcerea să anunțăm”.", "Folosește umorul ușor. Nu glumi pe seama problemelor clienților."),
        ],
      },
      {
        id: "pasul-trei",
        heading: "Pasul 3: testează pe texte reale",
        blocks: [
          p("Rescrie trei descrieri existente, o descriere de produs și un e-mail de mulțumire, folosind regulile. Citește-le cu voce tare. Dacă sună ca brandul, continuă. Dacă par forțate, ajustează cuvintele."),
          p("Canalele diferite pot întinde tonul: mai relaxat pe social media, mai formal într-o ofertă. Vocea rămâne aceeași."),
        ],
      },
      {
        id: "pastreaz-o-consecventa",
        heading: "Păstreaz-o consecventă pe orice canal",
        blocks: [
          ul("Folosește aceeași voce în descrieri, texte de site, e-mailuri și pe ambalaje.", "Împărtășește ghidul cu toți cei care scriu pentru brand.", "Include câteva fraze-model și câteva interzise.", "Revizuiește-l o dată pe an, pe măsură ce brandul crește."),
          p("Un ghid de voce poate avea o pagină. La KDT Romania, un brand industrial, postările rămân clare, practice și axate pe rezultate, chiar când subiectul este tehnic. Dacă vrei o voce și un stil vizual care să funcționeze împreună, vezi serviciul meu de creare de conținut."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Au afacerile mici nevoie de o voce a brandului?"),
          p("Da. Face scrisul mai rapid, pentru că știi cum suni, și face brandul mai ușor de recunoscut."),
          h3("Cât de lung ar trebui să fie un ghid de voce?"),
          p("O pagină este suficientă: trei cuvinte, reguli de tipul „fă” și „nu face” și câteva exemple."),
          h3("Se poate schimba vocea în timp?"),
          p("Da, pe măsură ce brandul evoluează. Schimb-o intenționat și actualizează ghidul, nu o lăsa să alunece."),
        ],
      },
    ],
    related: { projects: ["inklabs", "kdt-romania"], services: ["content-creation", "branding"] },
  },
  {
    id: "how-to-make-a-brand-mood-board",
    slug: "cum-faci-un-mood-board-pentru-brand",
    title: "Cum faci un mood board pentru brand care chiar ghidează designul",
    seoTitle: "Cum faci un mood board pentru brand",
    description: "Un mood board este o unealtă de decizie, nu un colaj. Cum aduni referințe, găsești tiparul și îl transformi în culori, tipografie și stil.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-premium", alt: "Colaj roz cu un luciu de buze rose, zmeură, afine, o petală și buze în semitonuri" },
    intro: "Un mood board este adesea tratat ca decor la începutul unui proiect. Făcut cum trebuie, este una dintre cele mai utile unelte din branding: o cale de a conveni asupra unei direcții înainte ca cineva să petreacă ore proiectând. Iată cum construiești unul care ghidează munca, cu aceeași abordare pe care o urmez în proiectele de identitate.",
    sections: [
      {
        id: "la-ce-ajuta",
        heading: "La ce folosește un mood board",
        blocks: [
          p("Un mood board adună referințe vizuale care arată cum ar trebui să se simtă un brand: culori, texturi, fotografie, tipografie, forme. Rolul lui este să transforme o idee vagă, precum blând, lucios și accesibil, în ceva ce toată lumea poate vedea și discuta."),
          p("Pentru identitatea Divaz, panoul a adunat tonuri de roz și berry, fotografie lucioasă de produs și forme rotunjite, blânde. Asta a dat întregului proiect un limbaj comun înainte să fie desenat vreun logo."),
        ],
      },
      {
        id: "aduna",
        heading: "Adună larg, apoi restrânge",
        blocks: [
          ul("Strânge rapid 30–50 de imagini, fără să te gândești prea mult.", "Include fotografie, ambalaje, interioare, texturi, tipografie și mostre de culoare.", "Uită-te și în afara industriei tale. Moda, arhitectura și mâncarea pot inspira un brand de cosmetice.", "Salvează sursa fiecărei imagini."),
          p("Pinterest, Behance și propriile fotografii sunt surse bune."),
        ],
      },
      {
        id: "gaseste-tiparul",
        heading: "Găsește tiparul",
        blocks: [
          p("Așază totul la vedere și întreabă-te ce se repetă. Lumina caldă? O paletă sobră? Formele rotunjite? Contrastul puternic? Scoate imaginile care nu se potrivesc, chiar dacă îți plac, până apare o direcție clară."),
          p("Apoi scrie trei cuvinte care o descriu, precum blând, lucios și accesibil. Aceste cuvinte devin testul pentru fiecare decizie ulterioară."),
        ],
      },
      {
        id: "transforma-in-decizii",
        heading: "Transformă panoul în decizii",
        blocks: [
          ol("Culori: alege o paletă din imagini și notează codurile.", "Tipografie: alege fonturi care se potrivesc atmosferei, precum un serif elegant sau un sans rotunjit și prietenos.", "Imagini: descrie lumina, fundalul și încadrarea fotografiilor.", "Elemente grafice: notează formele, modelele și detaliile care se repetă.", "Reguli: listează ce nu va face niciodată brandul."),
        ],
      },
      {
        id: "prezinta-l",
        heading: "Prezintă-l ca oamenii să poată reacționa",
        blocks: [
          p("Un panou bun este clar dintr-o privire: o imagine mare, o paletă, două sau trei exemple de tipografie și câteva cuvinte. Arată-l clientului sau echipei și întreabă ce li se pare potrivit și ce nu. Reacțiile la un panou costă mai puțin decât reacțiile la un logo terminat."),
        ],
      },
      {
        id: "folosește-l-si-dupa",
        heading: "Folosește-l și după proiect",
        blocks: [
          p("Păstrează panoul alături de ghidul de brand. Când creezi o campanie nouă, verific-o în raport cu panoul. Dacă vrei un mood board și o identitate completă construită în jurul lui, vezi serviciul meu de branding."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Am nevoie de mood board pentru un proiect mic?"),
          p("Unul mic ajută. Chiar și o duzină de imagini și o paletă pot preveni săptămâni de neînțelegeri."),
          h3("Mood board-ul este același lucru cu brand book-ul?"),
          p("Nu. Mood board-ul explorează direcția. Brand book-ul documentează regulile finale."),
          h3("Ce unelte pot folosi?"),
          p("Pinterest, Figma, Canva sau pur și simplu un folder cu imagini. Unealta contează mai puțin decât gândirea."),
        ],
      },
    ],
    related: { projects: ["divaz", "fleurane"], services: ["branding"] },
  },
  {
    id: "when-to-rebrand",
    slug: "cand-faci-rebranding-si-cum-il-faci-fara-sa-pierzi-clienti",
    title: "Când faci rebranding și cum îl faci fără să-ți pierzi clienții",
    seoTitle: "Când faci rebranding și cum îl faci bine",
    description: "Nu orice afacere are nevoie de rebranding. Cum îți dai seama că e momentul, diferența dintre o împrospătare și o redesenare completă și cum îl lansezi în siguranță.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "iq-cover", alt: "Mâini care țin o rochie-cămașă roz pudrat pe umeraș, lângă un stender cu haine în nuanțe de teracotă" },
    intro: "Un rebranding este deopotrivă entuziasmant și riscant. Făcut la momentul potrivit, poate ridica o afacere care a depășit aspectul vechi. Făcut din motive greșite, aruncă ani de recunoaștere. Înainte să schimbi ceva, pune-ți câteva întrebări sincere.",
    sections: [
      {
        id: "semne",
        heading: "Semne că e momentul",
        blocks: [
          ul("Afacerea s-a schimbat: public nou, servicii noi sau altă poziționare.", "Identitatea pare depășită lângă concurenți, iar clienții o menționează.", "Materialele tale par inconsecvente pentru că sistemul nu a fost niciodată complet.", "Logoul nu funcționează în context digital, de exemplu în poze de profil mici.", "O fuziune, un proprietar nou sau o piață nouă fac identitatea veche nepotrivită."),
          p("Motivul ar trebui să fie strategic. „Ne-am plictisit de ea” este rareori un motiv bun, pentru că publicul se plictisește mult mai târziu decât tine de un brand."),
        ],
      },
      {
        id: "reimprospatare-sau-redesenare",
        heading: "Împrospătare sau redesenare completă",
        blocks: [
          p("O împrospătare păstrează ce recunosc oamenii, precum numele, culoarea principală sau forma de bază a logoului, și îmbunătățește ce e slab. O redesenare schimbă identitatea mai profund. În majoritatea cazurilor, o împrospătare atentă oferă cea mai mare parte din beneficiu, cu mult mai puțin risc."),
          p("Întreabă-te ce părți din brand asociază deja clienții cu tine. Păstrează-le pe acelea și schimbă restul."),
        ],
      },
      {
        id: "incepe-cu-un-audit",
        heading: "Începe cu un audit",
        blocks: [
          ol("Adună tot ce publică brandul acum.", "Notează ce funcționează, ce e inconsecvent și ce lipsește.", "Vorbește cu câțiva clienți despre cum văd brandul.", "Definește ce trebuie să realizeze noua identitate."),
          p("Un audit arată adesea că problema este consecvența, nu designul. În acest caz, un sistem clar și șabloane pot fi tot ce ai nevoie."),
        ],
      },
      {
        id: "planifica-lansarea",
        heading: "Planifică lansarea",
        blocks: [
          ul("Listează toate locurile unde apare brandul: site, profiluri sociale, ambalaje, firme, e-mailuri, facturi.", "Decide ordinea: digitalul este cel mai rapid, tiparul și firmele durează mai mult.", "Pregătește noile șabloane înainte să anunți ceva.", "Folosește o perioadă de tranziție dacă schimbarea e mare."),
        ],
      },
      {
        id: "spune-povestea",
        heading: "Spune clienților povestea",
        blocks: [
          p("Explică schimbarea într-o postare scurtă, pozitivă: de ce evoluezi și ce rămâne la fel. Oamenii acceptă schimbarea când o înțeleg. Evită să ștergi conținutul vechi, pentru că îți păstrează istoria și vizibilitatea în căutări."),
          p("Dacă te gândești la o împrospătare a brandului, vezi serviciul meu de branding."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Cât de des ar trebui împrospătat un brand?"),
          p("Nu există un calendar fix. Revizuiește identitatea la câțiva ani și o împrospătezi doar când s-a schimbat ceva sau nu mai funcționează."),
          h3("Îmi afectează rebrandingul SEO-ul?"),
          p("Poate, dacă adresele, numele și metadatele se schimbă neglijent. Păstrează redirecționările, actualizează titlurile și descrierile și păstrează structura site-ului acolo unde se poate."),
          h3("Cât durează un rebranding?"),
          p("O mică împrospătare poate dura săptămâni. O identitate completă, cu lansare, durează luni."),
        ],
      },
    ],
    related: { projects: ["iq-fashion", "kanoi"], services: ["branding"] },
  },
  {
    id: "how-to-name-a-brand",
    slug: "cum-alegi-numele-unui-brand-lista-practica",
    title: "Cum alegi numele unui brand: o listă practică pentru numele afacerii",
    seoTitle: "Cum alegi numele unui brand: listă practică",
    description: "Un nume bun este ușor de spus, de scris și de ținut minte și este disponibil acolo unde contează. O listă pas cu pas pentru alegerea și verificarea unui nume.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-stand-out", alt: "Colaj roz și bleumarin cu un scorpion gravat, o călimară, un ochi în semitonuri și o floare" },
    intro: "Numele este prima parte din brandul tău pe care o întâlnește cineva și cea mai greu de schimbat mai târziu. Vestea bună este că alegerea lui nu trebuie să fie o străfulgerare de geniu. Poate fi un proces, cu criterii clare și câteva verificări care te scutesc de greșeli scumpe.",
    sections: [
      {
        id: "defineste",
        heading: "Începe cu ce trebuie să facă numele",
        blocks: [
          p("Scrie pentru cine este numele, ce promite afacerea și cum ar trebui să se simtă. Un nume pentru un brand jucăuș de unghii are altă treabă decât un nume pentru un cabinet stomatologic. Ține propoziția aceea în față cât timp faci brainstorming."),
          p("Divaz este un exemplu bun: scurt, glamuros, ușor de spus în orice limbă și potrivit pentru un brand de beauty."),
        ],
      },
      {
        id: "tipuri",
        heading: "Tipuri de nume",
        blocks: [
          ul("Descriptiv: spune ce faci (clar, dar greu de protejat și de diferențiat).", "Evocator: sugerează o emoție sau o idee, precum Inklabs.", "Inventat: un cuvânt nou, memorabil, dar care cere mai multă construire de brand.", "Numele fondatorului: personal și de încredere, dar mai greu de vândut mai târziu.", "Acronim: scurt, dar fără sens pentru cei noi."),
        ],
      },
      {
        id: "brainstorming",
        heading: "Fă brainstorming larg",
        blocks: [
          p("Scrie 50 de nume fără să le judeci. Combină cuvinte, încearcă alte limbi, joacă-te cu sunetele. Apoi taie lista cu ajutorul criteriilor."),
          ul("Ușor de spus și de scris, inclusiv la telefon.", "Destul de scurt cât să încapă pe un logo și într-un nume de profil.", "Fără sens neplăcut în limbile în care plănuiești să vinzi.", "Diferit de concurenți."),
        ],
      },
      {
        id: "verifica",
        heading: "Verifică disponibilitatea înainte să te îndrăgostești",
        blocks: [
          ol("Caută numele pe Google: cine îl mai folosește și în ce domeniu?", "Verifică numele de domeniu și variantele plauzibile.", "Verifică numele de profil pe platformele pe care le vei folosi.", "Caută în bazele de date de mărci din țara ta și din UE nume asemănătoare în categoria ta.", "Spune-l cu voce tare, scrie-l și roagă cinci oameni să îl scrie după ce îl aud o singură dată."),
          p("Căutările de mărci merită făcute cu un profesionist dacă brandul e important. Un nume pe care nu îl poți folosi costă scump."),
        ],
      },
      {
        id: "testeaza",
        heading: "Testează cu oameni reali",
        blocks: [
          p("Arată o listă scurtă câtorva oameni din publicul tău țintă. Întreabă-i ce își imaginează când aud fiecare nume. Scopul nu este să voteze, ci să vezi dacă numele creează emoția pe care o vrei."),
        ],
      },
      {
        id: "dupa-ce-alegi",
        heading: "După ce alegi",
        blocks: [
          p("Înregistrează rapid domeniul și numele de profil, gândește-te la o marcă și lasă identitatea să urmeze numele. Dacă ai nevoie de ajutor la denumire și identitate vizuală împreună, vezi serviciul meu de branding."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Ar trebui ca numele afacerii să conțină cuvinte-cheie?"),
          p("Poate ajuta la claritate, dar un nume unic este mai ușor de protejat și de ținut minte. Multe branduri combină un nume distinctiv cu o linie descriptivă."),
          h3("Este o problemă dacă domeniul este luat?"),
          p("Nu întotdeauna. Poți adăuga un cuvânt sau alege altă extensie, dar evită numele confuz de apropiate de alt brand."),
          h3("Pot schimba numele brandului mai târziu?"),
          p("Da, dar costă timp și recunoaștere. E mult mai ieftin să alegi cu grijă de la început."),
        ],
      },
    ],
    related: { projects: ["inklabs", "divaz"], services: ["branding"] },
  },
  {
    id: "brand-positioning-statement",
    slug: "declaratia-de-pozitionare-a-brandului-sablon-si-exemple",
    title: "Declarația de poziționare a brandului: un șablon simplu (cu exemple)",
    seoTitle: "Declarația de poziționare: șablon și exemple",
    description: "O declarație de poziționare spune cui te adresezi, ce oferi și de ce ești diferit. Un șablon de completat, cu exemple lucrate.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-identity", alt: "Colaj roz cu un chip clasic în semitonuri, o schiță pe hârtie și o mână care ține un stilou" },
    intro: "Dacă ți-e greu să explici ce te face diferit, vor avea de suferit și designul, și conținutul tău. O declarație de poziționare este o propoziție scurtă, internă, care rezolvă asta. Nu este un slogan, dar ghidează fiecare slogan, postare și decizie de design care urmează.",
    sections: [
      {
        id: "ce-este",
        heading: "Ce este o declarație de poziționare",
        blocks: [
          p("Este o descriere în una sau două propoziții a cui se adresează brandul, în ce categorie concurează, beneficiul principal pe care îl oferă și motivul pentru care îl crezi. Este scrisă pentru echipa ta și pentru designer, nu pentru public."),
          p("Fără ea, fiecare decizie este o părere. Cu ea, te poți întreba dacă un design, o descriere sau o ofertă se potrivește poziției."),
        ],
      },
      {
        id: "sablonul",
        heading: "Șablonul",
        blocks: [
          p("Pentru [publicul țintă] care [nevoie sau problemă], [brandul] este [categoria] care [beneficiul principal], pentru că [motiv să crezi]."),
          ol("Publicul: fii specific. „Femei de treizeci de ani care vor cadouri elegante de botez” este mai bine decât „femei”.", "Nevoia: problema sau dorința, în cuvintele lor.", "Categoria: cadrul de referință pe care îl înțeleg oamenii.", "Beneficiul: cel mai important rezultat, într-o singură idee.", "Motivul să crezi: dovada, precum materialele, expertiza sau metoda."),
        ],
      },
      {
        id: "exemplu-unu",
        heading: "Exemplu: un boutique de cadouri din argint",
        blocks: [
          p("Pentru părinții și cei care oferă cadouri și vor ceva durabil pentru un botez, Caterina Tomasso este magazinul online de argint sterling care transformă un cadou într-o amintire, pentru că fiecare piesă este din argint 925 și prezentată premium."),
          p("Din propoziția aceea urmează direcția vizuală: rafinată, argintie, calmă și high end, cu mult spațiu alb."),
        ],
      },
      {
        id: "exemplu-doi",
        heading: "Exemplu: o companie de utilaje industriale",
        blocks: [
          p("Pentru producătorii de mobilă și prelucrare a lemnului care pierd timp mutând plăcile manual, KDT Romania este partenerul de utilaje care automatizează atelierul, pentru că oferă utilajele și instruirea care aduc rezultate."),
          p("Aici conținutul se sprijină pe dovezi și rezultate practice, nu pe decor."),
        ],
      },
      {
        id: "testeaz-o",
        heading: "Testează-ți declarația",
        blocks: [
          ul("Ar putea un concurent să spună aceeași propoziție? Dacă da, fă-o mai specifică.", "Este beneficiul real și dovedibil?", "Te ajută să spui nu unor idei?", "Poate echipa să o repete din memorie?"),
        ],
      },
      {
        id: "foloseste-o",
        heading: "Folosește-o zilnic",
        blocks: [
          p("Pune declarația la începutul ghidului de brand și în fiecare brief. Revizuiește-o o dată pe an. Dacă vrei ajutor să îți găsești poziția și să o transformi într-o identitate vizuală, vezi serviciul meu de branding."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Declarația de poziționare este același lucru cu un slogan?"),
          p("Nu. Este o unealtă internă. Un slogan poate porni din ea, dar este scris pentru clienți."),
          h3("Cât de lungă ar trebui să fie?"),
          p("Una sau două propoziții. Dacă are nevoie de mai mult, ideea nu este încă clară."),
          h3("Au afacerile mici nevoie de ea?"),
          p("Da. O poziție clară economisește timp și bani la fiecare alegere ulterioară."),
        ],
      },
    ],
    related: { projects: ["kdt-romania", "caterina-tomasso"], services: ["branding", "content-creation"] },
  },
  {
    id: "brand-audit-checklist",
    slug: "audit-de-consecventa-a-brandului-lista-cu-10-puncte",
    title: "Audit de consecvență a brandului: o listă cu 10 puncte pe care o faci într-o după-amiază",
    seoTitle: "Audit de consecvență a brandului: 10 puncte",
    description: "Verifică dacă brandul tău arată la fel peste tot cu acest audit în 10 puncte: logo, culori, fonturi, fotografii, ton și șabloane pe fiecare canal.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-mistakes", alt: "Colaj de brand în roz și bleumarin, cu mostre de culoare, un pahar de cafea, o etichetă și forme" },
    intro: "Brandurile rareori devin inconsecvente intenționat. Alunecă: o postare nouă aici, un pliant făcut în grabă dincolo, altă nuanță de albastru în factură. Un audit îți arată cât de mult ai alunecat și durează o după-amiază. Iată lista pe care o folosesc cu clienții înainte să schimbăm un singur design.",
    sections: [
      {
        id: "aduna",
        heading: "Întâi, pune totul într-un singur loc",
        blocks: [
          p("Adună capturi de ecran sau fișiere din fiecare loc în care apare brandul: site, profiluri sociale și ultimele 20 de postări, newslettere, cărți de vizită, ambalaje, facturi, firme, semnături de e-mail. Tipărește-le sau așază-le într-un grid. Tiparele și problemele apar imediat."),
        ],
      },
      {
        id: "zece-verificari",
        heading: "Cele 10 verificări",
        blocks: [
          ol("Logo: este mereu aceeași variantă, în proporții corecte și cu spațiu liber?", "Culori: sunt nuanțele identice peste tot, cu codurile notate?", "Tipografie: se folosesc aceleași fonturi pentru aceleași roluri?", "Fotografie: au imaginile aceeași lumină, același stil și aceeași calitate?", "Elemente grafice: urmează modelele, pictogramele și chenarele un singur stil?", "Compoziții: folosesc postările și documentele aceleași grile și șabloane?", "Ton: sună descrierile, e-mailurile și site-ul ca un singur autor?", "Calitate: sunt imaginile clare, textele corectate și fișierele la dimensiunea potrivită?", "Date de contact: sunt telefonul, adresa și linkurile aceleași peste tot?", "Profiluri: sunt numele, pozele, descrierile și highlight-urile aliniate pe platforme?"),
          p("Notează fiecare verificare de la unu la trei. Tot ce e sub doi este prioritate."),
        ],
      },
      {
        id: "citeste",
        heading: "Citește rezultatele",
        blocks: [
          ul("Majoritatea bune, câteva puncte slabe: repară-le și notează regulile.", "Inconsecvență în mai multe zone: brandul are nevoie de un sistem clar și de șabloane.", "Consecvență bună, dar aspect depășit: ia în calcul o împrospătare, nu o redesenare.", "Aspecte diferite pe canale: decide ce trebuie să rămână constant și ce poate varia."),
        ],
      },
      {
        id: "repara",
        heading: "Repară în ordinea potrivită",
        blocks: [
          ol("Creează sau actualizează un ghid de o pagină: logo, culori, fonturi și ton.", "Construiește șabloane pentru formatele pe care le folosești cel mai des.", "Actualizează întâi locurile cu vizibilitate mare: site, profiluri sociale, semnătura de e-mail.", "Înlocuiește materialele tipărite pe măsură ce se termină, nu pe toate odată."),
        ],
      },
      {
        id: "fa-din-asta-un-obicei",
        heading: "Fă din asta un obicei",
        blocks: [
          p("Repetă auditul la fiecare șase luni sau după o campanie mare. O revizuire scurtă ține sistemul viu. Dacă vrei ajutor la crearea sistemului, vezi serviciile mele de branding și de design pentru social media."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Cât de des ar trebui să îmi auditez brandul?"),
          p("O dată sau de două ori pe an este suficient, plus după orice schimbare mare în afacere."),
          h3("Cine ar trebui să facă auditul?"),
          p("Cineva apropiat de brand și cineva venit din afară. O privire externă vede adesea lucruri pe care tu nu le mai observi."),
          h3("Ce fac dacă fiecare canal arată diferit?"),
          p("Începe prin a alege canalul care reprezintă cel mai bine brandul, apoi aliniază-le pe celelalte la el."),
        ],
      },
    ],
    related: { projects: ["inklabs", "iq-fashion"], services: ["branding", "social-media-design"] },
  },
  {
    id: "logo-design-process",
    slug: "procesul-de-creare-a-unui-logo-pas-cu-pas",
    title: "Procesul de creare a unui logo: ce se întâmplă pas cu pas",
    seoTitle: "Procesul de creare a unui logo, pas cu pas",
    description: "De la brief la fișierele finale: ce se întâmplă de fapt într-un proiect de logo, cât durează fiecare etapă și cum poți ajuta ca totul să meargă bine.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-fonts", alt: "Colaj tipografic: un A mare cu serife și un a mic pe roz, cu steluțe și hârtie ruptă" },
    intro: "Mulți clienți își imaginează designul unui logo ca pe un designer care dispare o săptămână și se întoarce cu semnul perfect. În practică, un logo bun este rezultatul unei serii de pași, iar contribuția ta la fiecare decide cât de bun iese. Iată ce se întâmplă de fapt, ca să știi la ce să te aștepți și când să intervii.",
    sections: [
      {
        id: "unu",
        heading: "1. Brief și descoperire",
        blocks: [
          p("Începem cu întrebări: cui se adresează afacerea, ce promite, cine sunt concurenții, unde va apărea logoul. Etapa aceasta stabilește direcția și economisește cel mai mult timp mai târziu. Adesea le cer clienților să-mi trimită trei branduri care le plac și trei care nu, cu motive."),
        ],
      },
      {
        id: "doi",
        heading: "2. Cercetare și mood board",
        blocks: [
          p("Mă uit la piață, adun referințe vizuale și construiesc un mood board. Aici cuvinte precum cald, precis sau jucăuș devin forme, culori și litere. Tot aici stabilim cum nu trebuie să arate logoul."),
        ],
      },
      {
        id: "trei",
        heading: "3. Schițe și concepte",
        blocks: [
          p("Ideile încep pe hârtie, rapid și în număr mare. Cele mai puternice devin concepte digitale, de obicei două sau trei direcții. Fiecare este arătată în context: pe o poză de profil, pe un ambalaj, pe fundal închis."),
          ul("Un concept este o direcție, nu un logo terminat.", "Feedbackul în această etapă ține de potrivire și de emoție, nu de detalii.", "Este normal să combinăm elemente din direcții diferite."),
        ],
      },
      {
        id: "patru",
        heading: "4. Feedback și rafinare",
        blocks: [
          p("După ce alegi o direcție, aceasta este rafinată: proporții, spațiere, kerning, culoare. Schimbările mici contează mult în această etapă. Adună feedbackul de la cei care decid și trimite-l într-un singur mesaj."),
          ol("Spune mai întâi ce funcționează.", "Descrie problema, nu soluția.", "Folosește scopul ca măsură: pare destul de premium, destul de clar?"),
        ],
      },
      {
        id: "cinci",
        heading: "5. Testare",
        blocks: [
          p("Logoul este testat la dimensiuni mici și mari, într-o singură culoare, pe fotografii și pe machete. Aici apar și se repară slăbiciunile, de exemplu liniile fine care dispar la dimensiuni mici."),
        ],
      },
      {
        id: "sase",
        heading: "6. Fișiere finale și ghid",
        blocks: [
          p("Pachetul final include logoul în formate vectoriale și raster, variante de culoare, varianta de pictogramă și, adesea, un ghid. În proiecte de identitate precum Fleurane, logoul ajunge apoi parte din etichete, ambalaje și materiale tipărite."),
          p("Dacă plănuiești un logo, vezi serviciul meu de branding."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Cât durează crearea unui logo?"),
          p("De la câteva săptămâni pentru un logo simplu până la mai multe săptămâni pentru o identitate completă, în funcție de viteza feedbackului."),
          h3("Câte concepte voi vedea?"),
          p("De obicei două sau trei direcții puternice, ca să poți alege, nu să compari zeci."),
          h3("Ce trebuie să pregătesc?"),
          p("O idee clară despre public, trei branduri care îți plac, trei care nu și locurile unde va fi folosit logoul."),
        ],
      },
    ],
    related: { projects: ["inklabs", "fleurane"], services: ["branding"] },
  },
  {
    id: "brand-strategy-small-business",
    slug: "strategie-de-brand-pentru-o-afacere-mica",
    title: "Strategie de brand pentru o afacere mică: de unde începi cu un buget mic",
    seoTitle: "Strategie de brand pentru o afacere mică",
    description: "O afacere mică nu are nevoie de un document uriaș de strategie. Cinci decizii care dau direcție brandului tău și ordinea în care să le iei.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-premium", alt: "Colaj roz cu un luciu de buze rose, zmeură, afine, o petală și buze în semitonuri" },
    intro: "Strategia de brand sună a ceva pentru companii mari, cu bugete mari. În realitate, o afacere mică are și mai multă nevoie, pentru că fiecare leu trebuie să muncească mai mult. Vestea bună este că o strategie utilă încape pe o singură pagină. Iată cele cinci decizii la care trebuie să răspundă.",
    sections: [
      {
        id: "publicul",
        heading: "1. Pentru cine ești, exact?",
        blocks: [
          p("Descrie în detaliu un client de bază: intervalul de vârstă nu este suficient. Ce vrea, ce îl îngrijorează, unde petrece timp? O clinică dentară precum Art Innova vorbește altfel unui părinte decât unui pacient interesat de estetică."),
          p("Să încerci să atragi pe toată lumea înseamnă, de obicei, să nu atragi pe nimeni."),
        ],
      },
      {
        id: "promisiunea",
        heading: "2. Ce promiți?",
        blocks: [
          p("Alege un beneficiu principal și fă-l credibil. Poate fi viteza, expertiza, căldura, prețul sau calitatea, dar trebuie să fie ceva ce poți livra de fiecare dată."),
        ],
      },
      {
        id: "diferenta",
        heading: "3. Ce te face diferit?",
        blocks: [
          ul("Ceva ce faci tu și concurenții nu fac.", "Un mod de lucru pe care clienții îl observă.", "O poveste sau un background care este cu adevărat al tău."),
          p("Pentru o firmă de consultanță precum Selfconsulting, diferența poate fi mixul de know-how de inginerie și arhitectură. Numește-o clar și repet-o."),
        ],
      },
      {
        id: "personalitatea",
        heading: "4. Cum ar trebui să se simtă brandul?",
        blocks: [
          p("Alege trei cuvinte pentru personalitate și evită contradicțiile. Aceste cuvinte ghidează logoul, culorile, fotografiile și felul în care scrii. Sigur, calm și precis duc la un aspect foarte diferit față de îndrăzneț, zgomotos și jucăuș."),
        ],
      },
      {
        id: "canalele",
        heading: "5. Unde te vor întâlni oamenii?",
        blocks: [
          p("Alege cele două sau trei canale care contează cel mai mult și fă-le bine, în loc să fii peste tot. Pentru servicii locale, poate fi un site bun, un profil Google și o platformă socială."),
        ],
      },
      {
        id: "dupa",
        heading: "Transformă strategia în materiale",
        blocks: [
          ol("Scrie cele cinci răspunsuri pe o pagină.", "Creează o identitate vizuală simplă care le exprimă.", "Construiește șabloane pentru materialele cele mai des folosite.", "Revizuiește o dată pe an."),
          p("Dacă vrei ajutor să transformi aceste decizii într-o identitate consecventă, vezi serviciul meu de branding."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Are o afacere mică într-adevăr nevoie de strategie de brand?"),
          p("Da, dar scurtă. O pagină cu decizii clare este mai utilă decât un document lung pe care nu îl citește nimeni."),
          h3("Ce vine primul, logoul sau strategia?"),
          p("Strategia. Un logo fără direcție este decor."),
          h3("Cât costă?"),
          p("Depinde cine te ajută. Poți face mult singur cu cele cinci întrebări de mai sus, apoi apelezi la un designer pentru identitate."),
        ],
      },
    ],
    related: { projects: ["selfconsulting", "art-innova"], services: ["branding"] },
  },
  {
    id: "brand-archetypes",
    slug: "personalitatea-brandului-si-arhetipurile-explicate",
    title: "Personalitatea brandului și arhetipurile: cum dai un caracter brandului tău",
    seoTitle: "Personalitatea brandului și arhetipurile",
    description: "Arhetipurile sunt o unealtă utilă pentru a descrie caracterul unui brand. Cum le folosești, cu câteva avertismente sincere, și cum modelează personalitatea designul.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-stand-out", alt: "Colaj roz și bleumarin cu un scorpion gravat, o călimară, un ochi în semitonuri și o floare" },
    intro: "Brandurile care par o persoană sunt mai ușor de ținut minte și de crezut. Arhetipurile, un cadru popularizat pornind de la psihologia jungiană, sunt o cale rapidă de a descrie acel caracter. Nu sunt știință, dar ca instrument de gândire ajută o echipă să cadă de acord cum ar trebui să arate, să vorbească și să se comporte brandul.",
    sections: [
      {
        id: "ce-este",
        heading: "Ce este un arhetip",
        blocks: [
          p("Un arhetip este un tip recognoscibil de personaj, precum îngrijitorul, exploratorul, rebelul sau înțeleptul. Cadrele de brand folosesc în jur de o duzină. Fiecare sugerează o stare, un ton și un set de alegeri vizuale."),
        ],
      },
      {
        id: "exemple",
        heading: "Câteva arhetipuri în practică",
        blocks: [
          ul("Îngrijitorul: cald, protector, culori blânde și forme rotunjite. Se potrivește sănătății și brandurilor de familie.", "Înțeleptul: expert, calm, clar. Se potrivește consultanței, educației și ingineriei.", "Creatorul: imaginativ, expresiv. Se potrivește designului, artei și modei.", "Conducătorul: premium, autoritar, rafinat. Se potrivește luxului și serviciilor high end.", "Șugubățul: jucăuș, luminos, informal. Se potrivește divertismentului și brandurilor pentru tineri."),
          p("Un brand de beauty precum Divaz se poate sprijini pe glamour și încredere, în timp ce o companie industrială precum KDT Romania câștigă din siguranța înțeleptului sau a conducătorului."),
        ],
      },
      {
        id: "alege",
        heading: "Cum alegi",
        blocks: [
          ol("Scrie trei cuvinte care descriu cum vrei să se simtă clienții.", "Potrivește-le cu un arhetip principal și, opțional, unul secundar.", "Verifică dacă se potrivește comportamentului tău real, nu doar aspirațiilor.", "Întreabă-te dacă concurenții l-au ales deja pe același."),
        ],
      },
      {
        id: "design",
        heading: "De la caracter la design",
        blocks: [
          p("Odată ce caracterul e clar, alegerile de design devin mai ușoare."),
          ul("Culoare: caldă sau rece, saturată sau stinsă.", "Tipografie: blândă și rotunjită sau tăioasă și structurată.", "Imagini: spontane și umane sau lustruite și minimaliste.", "Ton: prietenos și conversațional sau formal și exact."),
        ],
      },
      {
        id: "atentie",
        heading: "Câteva avertismente",
        blocks: [
          p("Arhetipurile simplifică. Brandurile reale sunt mai nuanțate, iar clienții nu gândesc în categorii. Folosește cadrul ca să începi conversația, nu ca să înlocuiești cercetarea cu publicul tău."),
        ],
      },
      {
        id: "pune-l-la-treaba",
        heading: "Pune-l la treabă",
        blocks: [
          p("Scrie arhetipul și cele trei cuvinte de personalitate la începutul ghidului de brand. Dacă vrei ajutor să transformi personalitatea în identitate vizuală, vezi serviciul meu de branding."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Câte arhetipuri poate avea un brand?"),
          p("Unul principal și cel mult unul secundar. Mai multe încețoșează caracterul."),
          h3("Sunt arhetipurile dovedite științific?"),
          p("Sunt un cadru popular, nu o știință măsurată. Tratează-le ca pe o unealtă creativă."),
          h3("Se poate schimba personalitatea în timp?"),
          p("Da, lent. Schimbările ar trebui să se simtă ca o creștere, nu ca un alt brand."),
        ],
      },
    ],
    related: { projects: ["divaz", "kdt-romania"], services: ["branding"] },
  },
  {
    id: "business-card-design",
    slug: "design-carte-de-vizita-ce-sa-includi-dimensiuni-si-greseli",
    title: "Design de carte de vizită: ce să incluzi, dimensiuni și greșeli de evitat",
    seoTitle: "Design carte de vizită: ce incluzi și ce eviți",
    description: "O carte de vizită rămâne o primă impresie utilă. Ce să pui pe ea, dimensiunile standard, regulile de lizibilitate și greșelile care o fac uitată.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-identity", alt: "Colaj roz cu un chip clasic în semitonuri, o schiță pe hârtie și o mână care ține un stilou" },
    intro: "Cărțile de vizită sunt mici și tocmai de aceea sunt dificile: fiecare element trebuie să-și merite locul. O carte bună se citește repede, se păstrează ușor și este o previzualizare fidelă a brandului. Iată ce să incluzi și ce să eviți.",
    sections: [
      {
        id: "dimensiune",
        heading: "Dimensiune și format",
        blocks: [
          p("În Europa, dimensiunea obișnuită a unei cărți de vizită este 85 x 55 mm. Dimensiunea standard înseamnă că încape în portofel și în suporturi. Formatele neobișnuite pot ieși în evidență, dar doar dacă rămân practice. Adaugă 3 mm de bleed pe fiecare latură pentru tipar și ține textul important la cel puțin 3 sau 4 mm de margine."),
        ],
      },
      {
        id: "continut",
        heading: "Ce să incluzi",
        blocks: [
          ul("Nume și funcție.", "Numele companiei și logoul.", "Un număr de telefon principal și un e-mail.", "Site.", "Adresa, doar dacă te vizitează clienții.", "Un cod QR, doar dacă duce undeva util."),
          p("Sari peste tot ce nu ajută pe cineva să te contacteze. Cinci conturi sociale pe o carte mică sunt zgomot."),
        ],
      },
      {
        id: "ierarhie",
        heading: "Ierarhie și lizibilitate",
        blocks: [
          ol("Fă numele primul lucru pe care îl citesc oamenii.", "Ține liniile de contact într-un bloc curat și aliniat.", "Folosește text de cel puțin 7 sau 8 pt.", "Lasă spațiu alb generos.", "Asigură un contrast suficient între text și fundal."),
        ],
      },
      {
        id: "design",
        heading: "Decizii de design",
        blocks: [
          p("Folosește culorile, fonturile și limbajul vizual al brandului. O carte pentru o companie tech precum NEXTLAB poate fi grafică și îndrăzneață, în timp ce una pentru o companie industrială poate prefera reținerea și claritatea. Cele două fețe îți dau spațiu în plus: folosește verso pentru un model, un mesaj sau logo, nu pentru mai mult text mărunt."),
        ],
      },
      {
        id: "finisaj",
        heading: "Hârtie și finisaj",
        blocks: [
          p("Greutatea și textura modelează prima impresie. O hârtie groasă necretată pare premium, în timp ce finisaje speciale precum lacul selectiv sau folia se folosesc cu măsură. Vezi ghidul meu despre hârtie și finisaje pentru mai multe detalii."),
        ],
      },
      {
        id: "greseli",
        heading: "Greșeli frecvente",
        blocks: [
          ul("Prea mult text.", "Litere cu contrast slab pe fundaluri aglomerate.", "Lipsa bleed-ului, deci apar margini albe după tăiere.", "Logouri de rezoluție mică.", "Coduri QR prea mici ca să poată fi scanate."),
          p("Dacă ai nevoie de cărți care se potrivesc identității tale, vezi serviciul meu de design pentru print."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Care este dimensiunea standard a unei cărți de vizită?"),
          p("În Europa, 85 x 55 mm este dimensiunea obișnuită."),
          h3("Mai am nevoie de cărți de vizită?"),
          p("Da, pentru întâlniri, evenimente și afaceri locale. O carte bună este ținută minte și păstrată."),
          h3("Să pun o fotografie pe carte?"),
          p("Doar dacă munca ta este personală, precum imobiliare sau consultanță, iar poza este de calitate."),
        ],
      },
    ],
    related: { projects: ["nextlab-tech", "kdt-romania"], services: ["printed-media", "branding"] },
  },
  {
    id: "stationery-set",
    slug: "papetaria-brandului-ce-include-un-set-complet",
    title: "Papetăria brandului: ce include un set complet și ce poți sări",
    seoTitle: "Papetăria brandului: ce include un set complet",
    description: "Hârtie cu antet, plicuri, cărți de vizită, mape, stickere: ce piese de papetărie contează cu adevărat pentru un brand mic și cum le păstrezi consecvente.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-fonts", alt: "Colaj tipografic: un A mare cu serife și un a mic pe roz, cu steluțe și hârtie ruptă" },
    intro: "Un set de papetărie este mica familie tipărită a unui brand: piesele care stau pe birouri, circulă în plicuri și ajung odată cu coletele. Nu orice afacere are nevoie de toate. Setul potrivit este cel pe care îl folosești, proiectat ca un tot.",
    sections: [
      {
        id: "de-baza",
        heading: "Piesele de bază",
        blocks: [
          ul("Carte de vizită.", "Hârtie cu antet pentru documente formale.", "Plic, dacă trimiți documente prin poștă.", "Semnătură de e-mail, geamănul digital al hârtiei cu antet.", "Șablon de factură și de ofertă."),
          p("Acestea fac brandul să pară profesionist în contactul de zi cu zi și costă puțin de configurat odată ce identitatea există."),
        ],
      },
      {
        id: "extra",
        heading: "Extra utile după tipul de afacere",
        blocks: [
          ul("Mape și buzunare de prezentare pentru consultanți.", "Cărți de mulțumire și stickere pentru magazine online.", "Hârtie de împachetat și o cutie cu brand pentru boutique-uri de cadouri precum Caterina Tomasso.", "Agende și pixuri ca daruri pentru clienți."),
        ],
      },
      {
        id: "sistem",
        heading: "Proiectează-l ca pe un sistem",
        blocks: [
          ol("Alege o grilă de compoziție și refolosește-o.", "Așază logoul și datele de contact în aceleași poziții pe toate piesele.", "Folosește două sau trei culori de brand, nu pe toate peste tot.", "Păstrează hârtia și finisajul consecvente."),
          p("Consecvența este ceea ce face un set mic să pară proiectat, nu strâns din bucăți."),
        ],
      },
      {
        id: "tipar",
        heading: "Pregătește fișierele pentru tipar",
        blocks: [
          ul("Folosește CMYK pentru tipar, cu bleedul potrivit.", "Convertește textul în contururi sau încorporează fonturile.", "Cere un test de tipar sau o probă înainte de un tiraj mare.", "Cere mostre de hârtie când contează senzația."),
        ],
      },
      {
        id: "digital",
        heading: "Nu uita varianta digitală",
        blocks: [
          p("Hârtia cu antet și facturile se trimit de obicei ca PDF. Asigură-te că șablonul poate fi editat de tine și se exportă curat. Vezi serviciile mele de design pentru print și de branding pentru seturi complete."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Am nevoie de un set complet de papetărie?"),
          p("Nu. Începe cu cartea de vizită, un șablon de document sau hârtie cu antet și o semnătură de e-mail."),
          h3("Ce dimensiune are hârtia cu antet standard?"),
          p("A4 este standard în Europa."),
          h3("Papetăria ar trebui să folosească aceeași hârtie ca cărțile?"),
          p("Ajută. Hârtia și finisajul potrivite fac setul să pară unitar."),
        ],
      },
    ],
    related: { projects: ["caterina-tomasso", "selfconsulting"], services: ["printed-media", "branding"] },
  },
  {
    id: "brand-photography-guidelines",
    slug: "ghid-de-fotografie-pentru-brand",
    title: "Ghid de fotografie pentru brand: cum păstrezi pozele consecvente",
    seoTitle: "Ghid de fotografie pentru brand: poze consecvente",
    description: "Fotografiile fac sau desfac aspectul unui brand. Cum scrii reguli simple de fotografie, astfel încât fiecare imagine de pe site și rețele să pară același brand.",
    category: "content-creation",
    publishedAt: "2026-11-03",
    cover: { key: "journal-premium", alt: "Colaj roz cu un luciu de buze rose, zmeură, afine, o petală și buze în semitonuri" },
    intro: "Poți avea un logo perfect și totuși să arăți inconsecvent dacă fiecare poză e luminată, încadrată și editată altfel. Ghidul de fotografie rezolvă asta. Nu trebuie să fie lung. O pagină sau două, cu exemple clare, sunt suficiente pentru oricine face poze pentru brandul tău.",
    sections: [
      {
        id: "de-ce",
        heading: "De ce ajută un ghid",
        blocks: [
          p("Fotografi, telefoane și anotimpuri diferite produc aspecte diferite. Un ghid permite oricui, de la tine la un freelancer, să producă imagini care stau bine împreună într-un feed sau pe un site."),
        ],
      },
      {
        id: "elemente",
        heading: "Ce să definești",
        blocks: [
          ul("Lumina: lumină naturală blândă, lumină de studio sau întunecată și dramatică.", "Culoarea: caldă, rece, naturală sau o paletă controlată.", "Compoziția: prim-planuri, flat lay, centrat sau decalat, cât spațiu gol.", "Fundaluri și accesorii: suprafețe curate, texturi, medii reale.", "Oameni: spontani sau pozați, diversitate, expresii, ținute.", "Editare: contrast, saturație, grain și filtre de folosit sau de evitat."),
        ],
      },
      {
        id: "exemple",
        heading: "Adaugă exemple de făcut și de evitat",
        blocks: [
          p("Arată trei imagini corecte și trei greșite. Exemplele învață mai repede decât adjectivele. Pentru un brand de mâncare precum Green Table, ghidul poate fi proaspăt, luminos și natural; pentru un brand de farmacie precum Farmex, curat, precis și demn de încredere."),
        ],
      },
      {
        id: "lista",
        heading: "Creează o listă de cadre",
        blocks: [
          ol("Imagini principale pentru site.", "Fotografii de produs pe fundal curat.", "Cadre de detaliu.", "Imagini de lifestyle sau produs în folosire.", "Oameni și culise."),
          p("O listă face fiecare ședință productivă și îți garantează varietatea potrivită."),
        ],
      },
      {
        id: "mentine",
        heading: "Păstrează-l viu",
        blocks: [
          ul("Păstrează imaginile aprobate într-un singur dosar.", "Denumește clar fișierele.", "Revizuiește ghidul când brandul evoluează."),
          p("Dacă vrei ajutor să stabilești direcția vizuală a pozelor și a conținutului, vezi serviciile mele de direcție artistică și creare de conținut."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Am nevoie de un fotograf profesionist?"),
          p("Pentru imaginile cheie, da. Pentru conținutul de zi cu zi, un ghid bun permite unui smartphone să facă multe."),
          h3("Câte poze am nevoie pentru lansare?"),
          p("Suficiente cât să acopere lista de cadre, plus extra pentru mai târziu. Calitatea contează mai mult decât numărul."),
          h3("Se pot potrivi pozele stoc unui brand?"),
          p("Da, dacă sunt alese și editate să respecte ghidul. Evită clișeele evidente."),
        ],
      },
    ],
    related: { projects: ["farmacia-farmex", "green-table"], services: ["content-creation", "content-creation"] },
  },
  {
    id: "instagram-image-sizes",
    slug: "dimensiuni-instagram-postari-stories-reels-si-carusele",
    title: "Dimensiuni pentru Instagram: postări, Stories, Reels și carusele",
    seoTitle: "Dimensiuni Instagram pentru postări și Stories",
    description: "Dimensiunile și rapoartele de aspect care funcționează pe Instagram pentru postări în feed, carusele, Stories și Reels, plus sfaturi de design ca textul să nu fie tăiat.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-feed", alt: "Telefon cu o grilă de Instagram în roz pudrat, înconjurat de fotografii beauty și o paletă de culori" },
    intro: "Nimic nu face un brand să pară neglijent mai repede decât un logo tăiat sau o postare neclară. Instagram acceptă mai multe formate, fiecare cu proporțiile lui. Iată dimensiunile în care să proiectezi, ca să arate conținutul exact cum ai intenționat.",
    sections: [
      {
        id: "feed",
        heading: "Postări în feed",
        blocks: [
          p("Feedul acceptă câteva rapoarte. Formatul portret 4:5, de 1080 x 1350 pixeli, ocupă cel mai mult spațiu pe ecran și este o alegere populară pentru branduri. Postările pătrate au 1080 x 1080 pixeli, iar cele orizontale 1080 x 566 pixeli."),
          ul("Portret 4:5: 1080 x 1350 px.", "Pătrat 1:1: 1080 x 1080 px.", "Orizontal: 1080 x 566 px."),
        ],
      },
      {
        id: "carusel",
        heading: "Carusele",
        blocks: [
          p("Într-un caruzel, raportul de aspect este stabilit de primul slide, iar celelalte îl urmează. Planifică tot setul într-o singură dimensiune. Proiectează fiecare slide să aibă sens singur și să-l tragă pe cel următor după el."),
        ],
      },
      {
        id: "stories",
        heading: "Stories și Reels",
        blocks: [
          p("Stories și Reels folosesc formatul vertical 9:16, 1080 x 1920 pixeli. Reels pot dura până la trei minute."),
          ul("Ține textul cheie și fețele departe de sus și de jos, unde se află interfața.", "Lasă margini laterale ca să nu se simtă înghesuit.", "Verifică previzualizarea pe un telefon real."),
        ],
      },
      {
        id: "grid",
        heading: "Gândește-te la grid-ul profilului",
        blocks: [
          p("Postările din feed apar și ca grid în profil, care le taie. Ține conținutul important în zona centrală, ca o postare să se citească și în grid, și în feed."),
        ],
      },
      {
        id: "calitate",
        heading: "Păstrează calitatea ridicată",
        blocks: [
          ol("Exportă la dimensiunea completă, nu mai mică.", "Folosește imagini clare, cu compresie bună.", "Evită textul minuscul care dispare pe ecrane mici.", "Păstrează o ierarhie clară: o idee pe postare."),
          p("Dacă vrei un set consecvent de șabloane făcute la dimensiunile potrivite, vezi serviciul meu de design pentru social media."),
        ],
      },
      {
        id: "nota",
        heading: "O notă despre schimbări",
        blocks: [
          p("Platformele își schimbă formatele din când în când. Verifică paginile de ajutor Instagram înaintea unei producții mari și testează mereu pe telefon."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Care este cea mai bună dimensiune pentru postările Instagram?"),
          p("Formatul portret 4:5, de 1080 x 1350 pixeli, este o alegere bună pentru că folosește mai mult spațiu de ecran."),
          h3("De ce îmi taie Instagram postările?"),
          p("Pentru că formatul încărcat nu corespunde unui raport acceptat sau pentru că grid-ul profilului arată o decupare centrală."),
          h3("Pot amesteca dimensiuni într-un caruzel?"),
          p("Primul slide stabilește raportul, deci planifică toate slide-urile în același."),
        ],
      },
    ],
    related: { projects: ["divaz", "farmacia-farmex"], services: ["social-media-design"] },
  },
  {
    id: "instagram-stories-design",
    slug: "cum-proiectezi-instagram-stories-pe-care-oamenii-le-vad",
    title: "Cum proiectezi Instagram Stories pe care oamenii chiar le urmăresc",
    seoTitle: "Cum proiectezi Instagram Stories urmărite",
    description: "Stories sunt rapide. Învață să le proiectezi cu un prim cadru clar, zone sigure, text lizibil și un aspect consecvent pe care oamenii îl recunosc.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-feed", alt: "Telefon cu o grilă de Instagram în roz pudrat, înconjurat de fotografii beauty și o paletă de culori" },
    intro: "Un Story durează câteva secunde. Oamenii dau tap repede, deci designul trebuie să-și facă treaba aproape imediat. Asta nu înseamnă țipător. Înseamnă clar: o idee, text lizibil și un aspect imediat al tău.",
    sections: [
      {
        id: "primul-cadru",
        heading: "Câștigă primul cadru",
        blocks: [
          p("Primul cadru decide dacă îl vezi pe următorul. Începe cu o imagine clară sau o linie scurtă și îndrăzneață. Evită introducerile lungi."),
        ],
      },
      {
        id: "zone-sigure",
        heading: "Respectă zonele sigure",
        blocks: [
          p("Stories au 1080 x 1920 pixeli. Elementele interfeței, precum numele profilului sus și bara de răspuns jos, acoperă o parte din cadru."),
          ul("Ține textul și fețele departe de marginile de sus și de jos.", "Lasă margini pe laterale.", "Previzualizează pe un telefon real înainte să publici."),
        ],
      },
      {
        id: "text",
        heading: "Fă textul lizibil",
        blocks: [
          ol("Folosește litere mari și scurte.", "Asigură un contrast puternic cu fundalul.", "Folosește unul sau două fonturi din brand.", "Limitează fiecare cadru la un mesaj."),
        ],
      },
      {
        id: "sistem",
        heading: "Construiește un sistem de șabloane",
        blocks: [
          p("Creează trei sau patru șabloane de Story: un citat, un anunț, un cadru de produs, un sondaj. Refolosirea lor dă un aspect consecvent și economisește timp. Un brand de modă precum IQ Fashion poate folosi un cadru tipografic îndrăzneț lângă o imagine de lookbook, în timp ce un brand de beauty precum Divaz se poate sprijini pe culoare și produs."),
        ],
      },
      {
        id: "secvente",
        heading: "Gândește în secvențe",
        blocks: [
          p("Un set de 3 până la 5 cadre spune o poveste mică: cârlig, detaliu, dovadă, îndemn la acțiune. Fiecare cadru ar trebui să funcționeze și singur."),
        ],
      },
      {
        id: "interactiv",
        heading: "Folosește funcțiile interactive cu rost",
        blocks: [
          ul("Sondajele și întrebările invită la participare.", "Stickerele cu link ar trebui să ducă la ceva util.", "Highlights păstrează cele mai bune Stories disponibile."),
          p("Pentru ajutor cu un sistem de Stories și social media, vezi serviciul meu de design pentru social media."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Ce dimensiune au Instagram Stories?"),
          p("1080 x 1920 pixeli, în format vertical 9:16."),
          h3("Câte Stories ar trebui să postez?"),
          p("Calitate înaintea cantității. Câteva cadre bine proiectate bat un derulat lung de cadre slabe."),
          h3("Ar trebui Stories să semene cu feedul?"),
          p("Ar trebui să pară înrudite: aceleași culori, fonturi și ton, chiar dacă formatul e diferit."),
        ],
      },
    ],
    related: { projects: ["iq-fashion", "divaz"], services: ["social-media-design"] },
  },
  {
    id: "instagram-captions",
    slug: "cum-scrii-descrieri-instagram-care-suna-ca-tine",
    title: "Cum scrii descrieri pentru Instagram care sună ca tine",
    seoTitle: "Cum scrii descrieri Instagram care sună ca tine",
    description: "O structură simplă pentru descrieri care sunt citite: o primă linie puternică, o idee, un pas următor clar și un ton care se potrivește brandului.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-mistakes", alt: "Colaj de brand în roz și bleumarin, cu mostre de culoare, un pahar de cafea, o etichetă și forme" },
    intro: "O imagine bună atrage atenția. Descrierea transformă acea atenție în înțelegere și, uneori, în acțiune. Multe branduri tratează descrierile ca pe o idee de după și pierd șansa de a explica, a conecta sau a vinde. O structură simplă rezolvă cea mai mare parte.",
    sections: [
      {
        id: "prima-linie",
        heading: "Scrie prima linie pentru derulare",
        blocks: [
          p("Doar începutul unei descrieri se vede înainte să apese oamenii pe „mai mult”. Fă-l să conteze: o întrebare, un fapt surprinzător sau o promisiune clară. Evită deschideri precum „Salutare tuturor” care irosesc spațiul."),
        ],
      },
      {
        id: "o-idee",
        heading: "Rămâi la o idee",
        blocks: [
          p("Fiecare postare ar trebui să spună un singur lucru. Dacă ai trei idei, ai trei postări. Un mesaj clar este mai ușor de citit și de ținut minte."),
        ],
      },
      {
        id: "structura",
        heading: "O structură pe care o poți refolosi",
        blocks: [
          ol("Cârlig: prima linie.", "Valoare: informația, povestea sau sfatul.", "Dovadă sau detaliu: un exemplu, un număr pe care îl poți susține, un citat.", "Pasul următor: pune o întrebare, invită la salvare, trimite la un link."),
        ],
      },
      {
        id: "tonul",
        heading: "Potrivește tonul brandului",
        blocks: [
          p("Citește descrierea cu voce tare. Sună ca brandul? Un studio de tatuaje precum Inklabs poate fi direct și expresiv, în timp ce un brand de mâncare sănătoasă precum Green Table poate fi cald și informativ. Consecvența contează mai mult decât isteția."),
        ],
      },
      {
        id: "format",
        heading: "Fă-o ușor de citit",
        blocks: [
          ul("Folosește paragrafe scurte și rânduri goale.", "Evită zidurile de text.", "Adaugă emoji cu măsură, dacă se potrivesc tonului.", "Pune informațiile cheie la început."),
        ],
      },
      {
        id: "cta",
        heading: "Folosește un îndemn clar la acțiune",
        blocks: [
          p("Spune oamenilor ce să facă: să salveze postarea, să răspundă la o întrebare, să viziteze linkul din bio. O acțiune clară bate trei vagi. Dacă ai nevoie de un sistem de conținut și design care să-ți susțină descrierile, vezi serviciul meu de design pentru social media."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Cât de lungă ar trebui să fie o descriere Instagram?"),
          p("Cât are nevoie. Scurtă pentru postări simple, mai lungă pentru sfaturi și povești, mereu cu un început puternic."),
          h3("Să scriu descrierile în română sau în engleză?"),
          p("Scrie în limba publicului tău. Dacă servești ambele, alege-o pe cea principală și păstrează-o pe cealaltă consecventă."),
          h3("Ajută emoji-urile?"),
          p("Pot adăuga personalitate, dar doar dacă se potrivesc tonului tău."),
        ],
      },
    ],
    related: { projects: ["inklabs", "green-table"], services: ["social-media-design", "content-creation"] },
  },
  {
    id: "instagram-bio-and-highlights",
    slug: "bio-poza-de-profil-si-coperti-highlights-instagram",
    title: "Bio, poză de profil și coperți pentru Highlights pe Instagram: o listă pentru brand",
    seoTitle: "Bio, poză de profil și coperți Highlights Instagram",
    description: "Profilul tău de Instagram este vitrina ta. Cum scrii un bio clar, cum alegi o poză de profil care funcționează mică și cum proiectezi coperți pentru highlights care se potrivesc brandului.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-identity", alt: "Colaj roz cu un chip clasic în semitonuri, o schiță pe hârtie și o mână care ține un stilou" },
    intro: "Înainte să-ți deruleze cineva postările, se uită la profil. În două secunde decide dacă ești relevant și de încredere. Un bio clar, o poză recognoscibilă și highlights ordonate fac decizia ușoară.",
    sections: [
      {
        id: "poza",
        heading: "Poza de profil",
        blocks: [
          p("Apare foarte mică și este decupată în cerc. Folosește semnul logoului sau o imagine simplă, cu contrast mare, și testeaz-o la dimensiune de miniatură. Detaliile fine și numele lungi dispar."),
          ul("Centrează elementul important.", "Folosește aceeași poză pe fiecare platformă.", "Păstrează suficient contrast cu fundalul."),
        ],
      },
      {
        id: "nume",
        heading: "Nume și handle",
        blocks: [
          p("Folosește numele brandului și adaugă un cuvânt-cheie în câmpul de nume dacă îi ajută pe oameni să te găsească, de exemplu categoria sau orașul. Păstrează handle-ul simplu și asemănător pe toate platformele."),
        ],
      },
      {
        id: "bio",
        heading: "Bio",
        blocks: [
          ol("Spune ce faci și pentru cine.", "Adaugă o dovadă sau un element diferențiator.", "Include un îndemn la acțiune.", "Adaugă un link care duce undeva util."),
          p("O clinică dentară poate menționa specialitatea și orașul; un brand de beauty poate menționa produsul și promisiunea. Fii concret."),
        ],
      },
      {
        id: "highlights",
        heading: "Coperți pentru Highlights",
        blocks: [
          p("Highlights păstrează vizibile Stories importante: servicii, prețuri, recenzii, cum comanzi. Folosește un set consecvent de coperți: aceeași formă, o pictogramă simplă și etichete scurte. Potrivirea cu culorile brandului face profilul să pară intenționat."),
        ],
      },
      {
        id: "fixate",
        heading: "Postări fixate",
        blocks: [
          p("Fixează până la trei postări care introduc brandul: cea mai bună lucrare, o ofertă, o explicație clară. Pentru ajutor cu un sistem de profil, vezi serviciul meu de design pentru social media."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Ce dimensiune au copertile Highlights?"),
          p("Folosesc formatul Story, 1080 x 1920 pixeli, dar se afișează ca un cerc, deci ține pictograma centrată."),
          h3("Poza de profil ar trebui să fie fața mea sau logoul?"),
          p("Pentru branduri personale, o față clară funcționează bine. Pentru companii, semnul logoului este alegerea mai sigură."),
          h3("Cât de des ar trebui să-mi actualizez bio-ul?"),
          p("Ori de câte ori se schimbă oferta și revizuiește-l la câteva luni."),
        ],
      },
    ],
    related: { projects: ["divaz", "art-innova"], services: ["social-media-design", "branding"] },
  },
  {
    id: "instagram-hashtags",
    slug: "hashtaguri-instagram-mai-conteaza-si-cum-le-folosesti",
    title: "Hashtaguri pe Instagram: mai contează și cum le folosești",
    seoTitle: "Hashtaguri Instagram: mai contează?",
    description: "Hashtagurile nu sunt reach magic, dar ajută în continuare la context și descoperire. Câte să folosești, cum le alegi și ce să eviți.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-premium", alt: "Colaj roz cu un luciu de buze rose, zmeură, afine, o petală și buze în semitonuri" },
    intro: "Sfaturile despre hashtaguri se schimbă în fiecare an, iar multe se contrazic. Punctul de vedere sensibil este modest: hashtagurile ajută la descrierea conținutului și pot adăuga ceva descoperire, dar nu înlocuiesc conținutul bun sau un profil clar. Iată cum le folosești fără să te gândești prea mult.",
    sections: [
      {
        id: "rolul",
        heading: "Ce fac de fapt hashtagurile",
        blocks: [
          p("Etichetează o postare cu un subiect. Instagram folosește subiecte, descrieri, imagini și multe alte semnale ca să înțeleagă despre ce este o postare și cui i-ar putea plăcea. Hashtagurile sunt un indiciu printre multe, nu un întrerupător pentru reach."),
        ],
      },
      {
        id: "cate",
        heading: "Câte să folosești",
        blocks: [
          p("Nu există un număr magic. Un set mic, relevant, este suficient. Câteva care descriu cu adevărat postarea sunt mai bune decât un bloc lung de etichete generice."),
        ],
      },
      {
        id: "alege",
        heading: "Cum le alegi",
        blocks: [
          ol("Începe cu ce este postarea: produsul, subiectul, stilul.", "Adaugă unul sau două pentru nișa sau locația ta.", "Adaugă un tag de brand dacă vrei o colecție de brand.", "Verifică ce arată tagul. Dacă e plin de conținut fără legătură, sari peste el."),
        ],
      },
      {
        id: "amesteca",
        heading: "Amestecă specific și larg",
        blocks: [
          ul("Tagurile specifice atrag publicul potrivit, de exemplu un anumit material sau o tehnică.", "Tagurile largi sunt aglomerate și rareori duc la interacțiune.", "Un tag local poate ajuta o afacere locală precum un restaurant sau o clinică."),
        ],
      },
      {
        id: "evita",
        heading: "Ce să eviți",
        blocks: [
          ul("Copierea aceluiași bloc pe fiecare postare.", "Taguri interzise sau de spam.", "Taguri fără legătură cu conținutul.", "Ascunderea tagurilor într-un mod care face descrierea dezordonată."),
          p("Calitatea conținutului, designul clar și postarea constantă contează mult mai mult. Dacă vrei ajutor cu un sistem de conținut, vezi serviciul meu de design pentru social media."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Hashtagurile merg în descriere sau în comentarii?"),
          p("Oricare. Pune-le acolo unde păstrează descrierea curată și lizibilă."),
          h3("Cum găsesc hashtaguri bune?"),
          p("Uită-te ce folosesc conturi similare, caută taguri relevante și vezi care arată conținut lângă care ai vrea să fii."),
          h3("Garantează hashtagurile reach?"),
          p("Nu. Sunt un semnal mic printre multe."),
        ],
      },
    ],
    related: { projects: ["kanoi", "green-table"], services: ["social-media-design"] },
  },
  {
    id: "instagram-feed-layout",
    slug: "cum-planifici-un-feed-instagram-coerent",
    title: "Cum planifici un feed Instagram coerent (fără să devină plictisitor)",
    seoTitle: "Cum planifici un feed Instagram coerent",
    description: "Un feed coerent se recunoaște dintr-o privire. Cum alegi un sistem vizual, cum amesteci tipurile de postări și cum planifici fără ca toate să arate la fel.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-feed", alt: "Telefon cu o grilă de Instagram în roz pudrat, înconjurat de fotografii beauty și o paletă de culori" },
    intro: "Un feed coerent nu înseamnă că toate postările sunt identice. Înseamnă că cineva poate privi câteva postări și spune ale cui sunt. Recunoașterea aceea construiește încredere și vine din câteva decizii repetabile, nu din perfecțiune.",
    sections: [
      {
        id: "sistem",
        heading: "Alege un sistem vizual",
        blocks: [
          ul("O paletă de două până la patru culori.", "Unul sau două fonturi, folosite la fel.", "Un stil fotografic consecvent: lumină, unghiuri, editare.", "Câteva șabloane de compoziție pentru postările cu text."),
          p("Aceste decizii sunt fundația. Restul sunt variații peste ea."),
        ],
      },
      {
        id: "amesteca",
        heading: "Amestecă tipurile de postări cu intenție",
        blocks: [
          p("Alternează tipurile ca feedul să aibă ritm: produs, oameni, citat, culise, ofertă. Un brand de modă precum IQ Fashion poate alterna fotografii de lookbook cu postări tipografice; un brand de beauty precum Divaz poate alterna fotografii de produs cu grafice conduse de culoare."),
        ],
      },
      {
        id: "grid",
        heading: "Gândește în grid, dar nu obsesiv",
        blocks: [
          p("Uită-te la grid-ul profilului la câteva postări. Verifică echilibrul: nu prea multe postări închise sau aglomerate la rând. Dar nu sacrifica mesajul pentru grid. Postările individuale trebuie să aibă sens în feed mai întâi."),
        ],
      },
      {
        id: "planifica",
        heading: "Planifică cu o lună înainte",
        blocks: [
          ol("Alege subiectele și tipurile de postări.", "Pregătește șabloanele și fotografiază în loturi.", "Scrie descrierile dintr-o singură ședință.", "Programează și revizuiește planul săptămânal."),
        ],
      },
      {
        id: "revizuieste",
        heading: "Revizuiește și ajustează",
        blocks: [
          p("Uită-te care postări primesc salvări, distribuiri și comentarii și fă mai multe din ele. Dacă vrei un sistem complet de șabloane pentru feed, vezi serviciul meu de design pentru social media."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Am nevoie de un grid perfect?"),
          p("Nu. Consecvența în culoare, tipografie și ton contează mai mult decât un aranjament de tip puzzle."),
          h3("Câte șabloane am nevoie?"),
          p("Patru până la șase acoperă majoritatea nevoilor."),
          h3("Cât de des ar trebui să postez?"),
          p("Destul de des ca să fii consecvent. Un program realist bate unul ambițios pe care nu îl poți menține."),
        ],
      },
    ],
    related: { projects: ["divaz", "iq-fashion"], services: ["social-media-design"] },
  },
  {
    id: "tiktok-vs-reels",
    slug: "tiktok-vs-instagram-reels-pentru-branduri-mici",
    title: "TikTok vs Instagram Reels: ce format de video scurt se potrivește brandului tău?",
    seoTitle: "TikTok vs Instagram Reels pentru branduri mici",
    description: "Ambele platforme împing video vertical scurt, dar publicul și obiceiurile diferă. Cum alegi și cum refolosești un video pe ambele fără să pari leneș.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-feed", alt: "Telefon cu o grilă de Instagram în roz pudrat, înconjurat de fotografii beauty și o paletă de culori" },
    intro: "Videoul vertical scurt nu mai este opțional pentru multe branduri. Întrebarea este unde îți pui efortul. TikTok și Instagram Reels arată similar, dar felul în care le folosesc oamenii diferă. Cel mai bun răspuns pentru un brand mic este de obicei practic, nu ideologic.",
    sections: [
      {
        id: "similar",
        heading: "Ce au în comun",
        blocks: [
          ul("Video vertical 9:16, 1080 x 1920 pixeli.", "Muzică, text suprapus și trenduri.", "Cârlige rapide în primele secunde."),
          p("Pentru că formatul este același, un video bine făcut poate trăi adesea pe ambele."),
        ],
      },
      {
        id: "diferite",
        heading: "Unde diferă",
        blocks: [
          p("Reels trăiesc în interiorul Instagram, așa că ajung la oameni care te urmăresc deja sau care răsfoiesc nișa ta și se leagă direct de profil, Stories și highlights. TikTok este construit în jurul descoperirii dintr-un flux de videoclipuri și recompensează divertismentul și personalitatea."),
          ul("Instagram: legătură mai puternică cu un brand vizual și cu urmăritorii existenți.", "TikTok: mai puternic pentru descoperire și conținut informal, în stil creator."),
        ],
      },
      {
        id: "alege",
        heading: "Cum alegi",
        blocks: [
          ol("Unde este deja publicul tău? Întreabă clienții.", "Ce platformă se potrivește conținutului pe care îl poți face constant?", "Unde trăiesc deja profilul și brandul tău?", "Începe cu una, fă-o bine, apoi extinde."),
          p("Un brand vizual precum un studio de artă ca Inklabs poate găsi în Instagram o casă naturală, în timp ce o abordare mai jucăușă, bazată pe povești, poate prospera pe TikTok."),
        ],
      },
      {
        id: "refoloseste",
        heading: "Refolosirea unui video",
        blocks: [
          p("Exportă o versiune curată, fără watermark. Ajustează descrierea, hashtagurile și prima linie pentru fiecare platformă. Ține textul departe de zonele interfeței pe ambele."),
        ],
      },
      {
        id: "calitate",
        heading: "Ce contează pe ambele",
        blocks: [
          ul("Un prim cadru și un cârlig puternice.", "Audio clar sau text pe ecran pentru vizionare fără sunet.", "Un aspect consecvent pe care oamenii îl recunosc.", "Un punct clar: o idee pe video."),
          p("Pentru ajutor cu video scurt și un sistem de conținut, vezi serviciul meu de creare de conținut."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Pot posta același video pe ambele?"),
          p("Da, dacă este exportat curat și adaptat cu o descriere potrivită."),
          h3("Care este mai bună pentru afaceri locale?"),
          p("Instagram se potrivește adesea mai bine, datorită legăturii cu clienții existenți și a instrumentelor de locație."),
          h3("Cât de lungi ar trebui să fie videoclipurile scurte?"),
          p("Cât să țină atenția. Scurt și clar câștigă de obicei."),
        ],
      },
    ],
    related: { projects: ["kanoi", "inklabs"], services: ["social-media-design", "content-creation"] },
  },
  {
    id: "linkedin-post-design",
    slug: "design-postari-linkedin-pentru-branduri-b2b",
    title: "Design de postări LinkedIn pentru branduri B2B și tehnice",
    seoTitle: "Design postări LinkedIn pentru branduri B2B",
    description: "Cum proiectezi postări, carusele și imagini de copertă pe LinkedIn care arată profesionist și clar, chiar și pentru subiecte tehnice sau de inginerie.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-stand-out", alt: "Colaj roz și bleumarin cu un scorpion gravat, o călimară, un ochi în semitonuri și o floare" },
    intro: "LinkedIn este o platformă bazată pe text, dar elementele vizuale decid în continuare dacă cineva se oprește din derulat. Pentru brandurile B2B și tehnice, scopul nu este să fie țipătoare. Este să fie clare, credibile și recognoscibile. Iată cum proiectezi pentru ea.",
    sections: [
      {
        id: "publicul",
        heading: "Cunoaște publicul",
        blocks: [
          p("Oamenii de pe LinkedIn sunt în modul de lucru. Vor informații utile, expertiză credibilă și dovezi clare. Un stil vizual calm, precis și consecvent se potrivește acestei dispoziții."),
        ],
      },
      {
        id: "formate",
        heading: "Formate care funcționează",
        blocks: [
          ul("Imagini singulare cu o afirmație clară.", "Postări de tip document sau caruzel care explică un proces pas cu pas.", "Video-uri scurte care arată un produs sau un proiect.", "O imagine de copertă puternică pe pagina companiei."),
        ],
      },
      {
        id: "design",
        heading: "Principii de design",
        blocks: [
          ol("O idee pe imagine.", "Litere mari, lizibile, cu contrast puternic.", "O grilă și o paletă de culori consecvente din brand.", "Diagrame sau fotografii etichetate în loc de stoc decorativ."),
          p("Pentru o companie de tehnologie precum NEXTLAB, diagramele curate și fotografiile de proiect funcționează mai bine decât decorul abstract. Pentru o firmă de consultanță în inginerie precum Selfconsulting, desenele și imaginile de proiect construiesc credibilitate."),
        ],
      },
      {
        id: "text",
        heading: "Susține imaginea cu textul",
        blocks: [
          p("Primele rânduri ale postării poartă cârligul. Folosește paragrafe scurte și păstrează imaginea în acord cu ce promite textul."),
        ],
      },
      {
        id: "dovezi",
        heading: "Arată dovezi",
        blocks: [
          ul("Proiecte și rezultate reale.", "Citate de la clienți, cu permisiune.", "Proces și culise."),
          p("Dacă vrei ajutor cu o prezență profesionistă pe LinkedIn, vezi serviciul meu de design pentru social media."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Ce dimensiune au imaginile LinkedIn?"),
          p("Alegeri comune sunt imaginile pătrate sau portret. Verifică ghidul actual LinkedIn înainte de o producție mare și previzualizează pe telefon."),
          h3("Funcționează caruselele pe LinkedIn?"),
          p("Da, ca postări document. Se potrivesc explicațiilor pas cu pas."),
          h3("Ar trebui postările B2B să fie formale?"),
          p("Profesioniste, da. Plictisitoare, nu. Scopul este clar și uman."),
        ],
      },
    ],
    related: { projects: ["selfconsulting", "nextlab-tech"], services: ["social-media-design"] },
  },
  {
    id: "facebook-local-business",
    slug: "postari-facebook-pentru-afaceri-locale",
    title: "Postări pe Facebook pentru o afacere locală: ce publici și cum le proiectezi",
    seoTitle: "Postări Facebook pentru o afacere locală",
    description: "Facebook este încă locul unde mulți clienți locali caută programul, ofertele și recenziile. Ce postezi, cum proiectezi și cum menții activă o pagină mică.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-mistakes", alt: "Colaj de brand în roz și bleumarin, cu mostre de culoare, un pahar de cafea, o etichetă și forme" },
    intro: "Pentru multe afaceri locale, pagina de Facebook este încă locul unde clienții verifică programul, pun o întrebare sau citesc recenzii. Nu trebuie să postezi zilnic, dar ai nevoie de o pagină care pare vie și de încredere. Iată un plan practic.",
    sections: [
      {
        id: "bazele",
        heading: "Pune bazele corect",
        blocks: [
          ul("O poză de profil recognoscibilă și o imagine de copertă clară.", "Program, adresă și telefon corecte.", "O descriere scurtă a ce faci.", "Un buton pentru acțiunea principală, precum sună sau trimite mesaj."),
        ],
      },
      {
        id: "continut",
        heading: "Ce postezi",
        blocks: [
          ol("Oferte și promoții sezoniere.", "Produse sau servicii noi.", "Culise și echipa.", "Povești ale clienților și recenzii, cu permisiune.", "Sfaturi utile legate de expertiza ta."),
          p("O brutărie precum Moș Ilie poate arăta produse, articole sezoniere și oamenii din spate; un magazin optic precum Optica Tei poate explica alegerea lentilelor și sfaturi pentru ochi."),
        ],
      },
      {
        id: "design",
        heading: "Proiectează pentru claritate",
        blocks: [
          p("Folosește șabloane consecvente, cu un titlu clar, oferta și data. Ține textul scurt pe imagine și pune detaliile în descriere."),
        ],
      },
      {
        id: "ritm",
        heading: "Păstrează un ritm realist",
        blocks: [
          p("Două sau trei postări bune pe săptămână bat umplutura zilnică. Planifică o lună o dată și păstrează un interval săptămânal pentru răspunsuri la mesaje și comentarii."),
        ],
      },
      {
        id: "reclame",
        heading: "Gândește-te la reclame pentru ofertele cheie",
        blocks: [
          p("Un buget mic plătit poate pune o ofertă importantă în fața oamenilor din apropiere. Folosește o imagine clară și un singur îndemn la acțiune. Vezi serviciul meu de reclame și campanii pentru ajutor."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Mai este Facebook util pentru afaceri locale?"),
          p("Da, mai ales pentru a ajunge la clienții locali și pentru informații precum program și recenzii."),
          h3("Ar trebui Facebookul să semene cu Instagramul?"),
          p("Ar trebui să arate înrudite, dar fiecare poate avea nevoie de formate și descrieri diferite."),
          h3("Cum gestionez recenziile?"),
          p("Răspunde politicos și prompt, inclusiv la cele negative."),
        ],
      },
    ],
    related: { projects: ["mos-ilie", "optica-tei"], services: ["social-media-design"] },
  },
  {
    id: "social-media-templates",
    slug: "sabloane-social-media-cum-construiesti-un-sistem",
    title: "Șabloane pentru social media: cum construiești un sistem care economisește timp",
    seoTitle: "Șabloane social media: un sistem care economisește timp",
    description: "Un set mic de șabloane bine proiectate păstrează postările consecvente și reduce timpul de producție. Ce să incluzi și cum îl construiești.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-fonts", alt: "Colaj tipografic: un A mare cu serife și un a mic pe roz, cu steluțe și hârtie ruptă" },
    intro: "Dacă fiecare postare începe de la o pagină goală, brandul va aluneca, iar volumul de muncă va crește. Un sistem de șabloane rezolvă ambele. Nu trebuie să fie mare: o mână de compoziții bine proiectate acoperă cea mai mare parte din ce publică un brand.",
    sections: [
      {
        id: "de-ce",
        heading: "De ce funcționează șabloanele",
        blocks: [
          ul("Păstrează aspectul consecvent.", "Accelerează producția.", "Permit celor care nu sunt designeri să publice în stilul brandului.", "Fac ușoară schimbarea unui lucru într-un singur loc."),
        ],
      },
      {
        id: "care",
        heading: "Ce șabloane construiești",
        blocks: [
          ol("Anunț sau noutate.", "Citat sau sfat.", "Evidențierea unui produs sau serviciu.", "Ofertă sau promoție.", "Fotografie cu text suprapus.", "Copertă și slide-uri interioare pentru caruzel.", "Cadre pentru Stories."),
          p("O farmacie precum Farmex are nevoie de compoziții clare și liniștitoare pentru informații și oferte; un brand de beauty precum Divaz are nevoie de șabloane care pun în valoare culoarea și produsul."),
        ],
      },
      {
        id: "cum",
        heading: "Cum le construiești",
        blocks: [
          ol("Stabilește grila, marginile și zonele sigure pentru fiecare dimensiune.", "Definește culorile, fonturile și dimensiunile textului.", "Creează zone flexibile pentru imagini care se decupează bine.", "Prevede spațiu pentru texte de lungimi diferite.", "Denumește clar straturile și câmpurile."),
        ],
      },
      {
        id: "unealta",
        heading: "Alege unealta potrivită",
        blocks: [
          p("Folosește o unealtă pe care echipa ta o poate folosi cu adevărat: o aplicație de design pe care o cunoști sau un editor online cu kit de brand. Cel mai bun șablon este cel pe care oamenii îl vor folosi corect."),
        ],
      },
      {
        id: "intretine",
        heading: "Întreține sistemul",
        blocks: [
          p("Revizuiește șabloanele la câteva luni, retrage-le pe cele nefolosite și adaugă-le pe cele cerute de echipă. Pentru un set de șabloane personalizat, vezi serviciul meu de design pentru social media."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Câte șabloane am nevoie?"),
          p("Patru până la opt acoperă majoritatea brandurilor."),
          h3("Fac șabloanele feedul plictisitor?"),
          p("Nu, dacă permit variație de imagine, culoare și compoziție în reguli clare."),
          h3("Cine ar trebui să folosească șabloanele?"),
          p("Oricine publică pentru brand, cu un ghid scurt despre cum."),
        ],
      },
    ],
    related: { projects: ["farmacia-farmex", "divaz"], services: ["social-media-design"] },
  },
  {
    id: "testimonial-posts",
    slug: "cum-proiectezi-postari-cu-recenzii-si-testimoniale",
    title: "Cum proiectezi postări cu recenzii și testimoniale care construiesc încredere",
    seoTitle: "Cum proiectezi postări cu recenzii și testimoniale",
    description: "Recenziile clienților sunt o dovadă puternică, dar o captură de ecran nu este suficientă. Cum transformi recenziile în postări curate și oneste care construiesc încredere.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-premium", alt: "Colaj roz cu un luciu de buze rose, zmeură, afine, o petală și buze în semitonuri" },
    intro: "Oamenii au mai multă încredere în alți clienți decât în branduri. O postare bună cu o recenzie pune acea încredere în față. Diferența dintre una convingătoare și una uitată ține mai ales de alegerea citatului și de grija din design.",
    sections: [
      {
        id: "cere",
        heading: "Cere permisiunea și cuvinte reale",
        blocks: [
          p("Cere mereu acordul înainte să publici cuvintele sau poza unui client. Folosește citate reale, fără să le inventezi sau să le îmbunătățești. Editează doar pentru lungime sau greșeli de scriere și păstrează sensul. Pentru branduri de sănătate și beauty, fii extra atent la afirmații și confidențialitate."),
        ],
      },
      {
        id: "alege",
        heading: "Alege citatul potrivit",
        blocks: [
          ul("Specificul bate generalul: „programarea a fost la timp și mi s-a explicat clar” e mai bine decât „servicii grozave”.", "Alege un citat care răspunde unei îngrijorări reale a clienților.", "Păstrează-l destul de scurt cât să se citească dintr-o privire."),
        ],
      },
      {
        id: "proiecteaza",
        heading: "Proiectează postarea",
        blocks: [
          ol("Pune citatul cu litere mari și clare.", "Adaugă prenumele sau inițialele și contextul, cu permisiune.", "Folosește culorile brandului și o compoziție calmă.", "Include logoul discret.", "Lasă suficient contrast și spațiu."),
          p("O clinică precum Dr. Kurbe sau un magazin optic precum Optica Tei câștigă dintr-un stil curat și liniștitor care se potrivește restului brandului."),
        ],
      },
      {
        id: "formate",
        heading: "Formate care funcționează",
        blocks: [
          ul("Postări cu un singur citat.", "Carusele cu mai multe recenzii scurte.", "Highlights Stories intitulate Recenzii.", "Videoclipuri scurte, cu permisiune."),
        ],
      },
      {
        id: "onestitate",
        heading: "Rămâi onest",
        blocks: [
          p("Nu fabrica recenzii. Dacă nu ai încă, cere-le clienților mulțumiți și, până atunci, folosește alte dovezi precum procesul, rezultate pe care le poți documenta și expertiza ta. Vezi serviciul meu de design pentru social media pentru șabloane de recenzii."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Pot posta capturi de ecran cu recenzii?"),
          p("Cu permisiune, da, dar un citat proiectat se citește adesea mai bine. Asigură-te că sursa e clară."),
          h3("Cât de des ar trebui să postez recenzii?"),
          p("Ocazional, amestecate cu alt conținut, ca feedul să nu devină o reclamă lungă."),
          h3("Ce fac dacă o recenzie este negativă?"),
          p("Răspunde public și calm. Arată cum gestionezi problemele."),
        ],
      },
    ],
    related: { projects: ["dr-kurbe-clinic", "optica-tei"], services: ["social-media-design"] },
  },
  {
    id: "social-media-for-beauty-salons",
    slug: "social-media-pentru-saloane-si-branduri-de-beauty",
    title: "Social media pentru saloane și branduri de beauty: conținut care aduce programări",
    seoTitle: "Social media pentru saloane și branduri de beauty",
    description: "Beauty-ul este vizual, deci social media i se potrivește natural. Ce postezi, cum fotografiezi rezultatele și cum transformi urmăritorii în programări.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-premium", alt: "Colaj roz cu un luciu de buze rose, zmeură, afine, o petală și buze în semitonuri" },
    intro: "Beauty-ul se vinde din priviri. Oamenii aleg un salon, o tehniciană de unghii sau un brand de skincare în mare parte după ce văd. Asta face din social media un canal puternic, atâta timp cât conținutul arată calitate și face programarea sau cumpărarea ușoare.",
    sections: [
      {
        id: "arata",
        heading: "Arată munca",
        blocks: [
          ul("Înainte și după, cu permisiune.", "Prim-planuri cu detalii și finisaj.", "Video-uri scurte cu procesul.", "Produse în folosire, nu doar pe un raft."),
          p("Lumina bună și fundalurile curate contează mai mult decât echipamentul scump."),
        ],
      },
      {
        id: "incredere",
        heading: "Construiește încredere",
        blocks: [
          p("Prezintă oamenii, spațiul și practicile de igienă. Clienții vor să se simtă în siguranță, nu doar răsfățați. Împărtășește informații oneste despre produse și ingrediente și evită afirmațiile exagerate."),
        ],
      },
      {
        id: "brand",
        heading: "Păstrează un aspect consecvent",
        blocks: [
          p("Un feed de salon cu poze aleatorii pare mai ieftin decât este serviciul în realitate. Folosește o paletă coerentă și câteva șabloane. Un brand de beauty precum Divaz se construiește pe culoare și produs, în timp ce o linie naturală precum THS Organic se poate sprijini pe căldură și tonuri de miere."),
        ],
      },
      {
        id: "programare",
        heading: "Fă programarea ușoară",
        blocks: [
          ol("Pune linkul de programare sau telefonul în bio.", "Adaugă un Highlight cu prețuri și cum te programezi.", "Încheie postările cheie cu un îndemn clar la acțiune.", "Răspunde rapid la mesaje."),
        ],
      },
      {
        id: "ritm",
        heading: "Un ritm simplu pe săptămână",
        blocks: [
          ul("Una sau două postări cu rezultate.", "O postare educativă, de exemplu sfaturi de îngrijire după serviciu.", "O postare din culise sau cu echipa.", "Stories la câteva zile pentru disponibilitate și oferte."),
          p("Dacă vrei un sistem de conținut pentru beauty, vezi serviciile mele de design pentru social media și creare de conținut."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Care platformă este cea mai bună pentru beauty?"),
          p("Instagram este punctul obișnuit de start, cu video scurt și Stories, deși depinde de publicul tău."),
          h3("Pot arăta poze cu clienți?"),
          p("Doar cu permisiune clară."),
          h3("Cum gestionez întrebările despre preț?"),
          p("Împărtășește un ghid de prețuri sau un Highlight și explică ce include."),
        ],
      },
    ],
    related: { projects: ["divaz", "ths-organic"], services: ["social-media-design", "content-creation"] },
  },
  {
    id: "ecommerce-product-posts",
    slug: "postari-social-media-pentru-produse-de-ecommerce",
    title: "Postări social media pentru e-commerce: cum arăți un produs ca să se vândă",
    seoTitle: "Postări social media pentru produse e-commerce",
    description: "Cum fotografiezi, încadrezi și descrii produse astfel încât postările să atragă atenția și să ducă spre pagina produsului.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-mistakes", alt: "Colaj de brand în roz și bleumarin, cu mostre de culoare, un pahar de cafea, o etichetă și forme" },
    intro: "O postare de produs are o treabă grea: să oprească derularea, să explice produsul și să împingă privitorul spre magazin. Postările bune de e-commerce fac asta cu o imagine clară, un beneficiu și un pas următor evident.",
    sections: [
      {
        id: "clar",
        heading: "Fă produsul clar",
        blocks: [
          ul("Arată produsul mare și în lumină bună.", "Folosește un fundal curat sau un decor credibil.", "Include o referință de mărime sau scară când e nevoie.", "Arată detaliile și ambalajul."),
          p("Pentru un boutique premium precum Caterina Tomasso contează reținerea, fundalurile curate și prezentarea elegantă. Pentru un brand cosmetic precum Fleurane, ambalajul și texturile adaugă valoare."),
        ],
      },
      {
        id: "beneficiu",
        heading: "Începe cu un beneficiu",
        blocks: [
          p("Clienții se gândesc la ce face un produs pentru ei. Alege un beneficiu pe postare și spune-l simplu. Evită să enumeri toate caracteristicile."),
        ],
      },
      {
        id: "varietate",
        heading: "Variază formatele",
        blocks: [
          ol("Produs pe fundal curat.", "Produs în folosire sau într-o scenă.", "Prim-plan cu detalii.", "Video scurt, de exemplu despachetare sau demonstrație.", "Fotografii ale clienților, cu permisiune."),
        ],
      },
      {
        id: "cta",
        heading: "Fă cumpărarea ușoară",
        blocks: [
          p("Spune-le oamenilor exact cum să cumpere: link în bio, taguri de produs sau mesaj direct. Păstrează prețul și disponibilitatea clare. Într-un caruzel, încheie cu un slide care trimite spre magazin."),
        ],
      },
      {
        id: "reclame",
        heading: "Refolosește postările bune pentru reclame",
        blocks: [
          p("Postările care merg bine organic funcționează adesea și ca reclame. Vezi serviciul meu de reclame și campanii pentru ajutor la transformarea conținutului de produs în campanii."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Câte poze de produs am nevoie?"),
          p("Mai multe unghiuri pe produs plus câteva cadre lifestyle sunt o bază bună."),
          h3("Să arăt prețuri în postări?"),
          p("Depinde de brand. Brandurile premium păstrează adesea prețurile pe pagina magazinului; cele accesibile le arată adesea."),
          h3("Am nevoie de studio?"),
          p("Nu neapărat. Lumina naturală, o suprafață curată și un telefon stabil pot funcționa bine."),
        ],
      },
    ],
    related: { projects: ["caterina-tomasso", "fleurane"], services: ["social-media-design", "ads-campaigns"] },
  },
  {
    id: "social-media-audit",
    slug: "audit-social-media-lista-de-verificare",
    title: "Audit social media: o listă pentru a găsi ce funcționează și ce nu",
    seoTitle: "Audit social media: o listă practică",
    description: "Un audit social media practic care acoperă profilele, conținutul, consecvența designului și rezultatele, cu pași pentru a transforma concluziile într-un plan.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-identity", alt: "Colaj roz cu un chip clasic în semitonuri, o schiță pe hârtie și o mână care ține un stilou" },
    intro: "Majoritatea brandurilor continuă să posteze fără să se oprească vreodată să privească imaginea de ansamblu. Un audit este acea pauză. Nu are nevoie de software special. Are nevoie de o oră, ochi sinceri și o listă de întrebări.",
    sections: [
      {
        id: "profiluri",
        heading: "1. Verifică profilurile",
        blocks: [
          ul("Numele, pozele și bio-urile sunt consecvente pe platforme.", "Linkurile funcționează și duc unde trebuie.", "Datele de contact sunt actuale.", "Highlights și postările fixate sunt la zi."),
        ],
      },
      {
        id: "continut",
        heading: "2. Revizuiește conținutul",
        blocks: [
          p("Uită-te la ultimele 30 de postări. Grupează-le pe tipuri și subiecte. Notează care au cele mai multe salvări, distribuiri, comentarii și reach. Observă ce postezi mult și primește puțin răspuns."),
        ],
      },
      {
        id: "design",
        heading: "3. Revizuiește designul",
        blocks: [
          ol("Arată postările ca un singur brand?", "Este textul lizibil pe telefon?", "Sunt imaginile clare și consecvente?", "Se folosesc șabloane sau totul pare improvizat?"),
          p("Un studio de tatuaje precum Inklabs și un brand de îmbrăcăminte precum Kanoi câștigă amândouă dintr-un aspect recognoscibil, fiecare în stilul lui."),
        ],
      },
      {
        id: "public",
        heading: "4. Înțelege publicul",
        blocks: [
          p("Uită-te cine te urmărește și interacționează: locație, intervale de vârstă, ore de activitate unde sunt disponibile. Compară cu publicul pe care îl vrei."),
        ],
      },
      {
        id: "obiective",
        heading: "5. Compară cu obiectivele",
        blocks: [
          p("Ce ar trebui să facă social media pentru afacere: notorietate, cereri, vânzări? Verifică dacă conținutul susține acel scop."),
        ],
      },
      {
        id: "plan",
        heading: "Transformă concluziile într-un plan",
        blocks: [
          ol("Listează cele mai mari trei probleme.", "Alege câștigurile cele mai rapide.", "Stabilește un ritm de postare pe care îl poți menține.", "Revizuiește din nou peste trei luni."),
          p("Dacă vrei o revizuire din exterior și un sistem de șabloane, vezi serviciul meu de design pentru social media."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Cât de des ar trebui să fac un audit?"),
          p("La fiecare trei până la șase luni."),
          h3("De ce unelte am nevoie?"),
          p("Statisticile platformelor sunt suficiente la început."),
          h3("Ar trebui să șterg postările slabe?"),
          p("De obicei nu. Îmbunătățește viitorul, cu excepția cazului în care o postare este dăunătoare sau greșită."),
        ],
      },
    ],
    related: { projects: ["inklabs", "kanoi"], services: ["social-media-design"] },
  },
  {
    id: "social-media-metrics",
    slug: "metrici-social-media-care-conteaza",
    title: "Metrici social media care contează (și cele pe care le poți ignora)",
    seoTitle: "Metrici social media care contează",
    description: "Like-urile fac bine, dar rareori plătesc facturile. Ce metrici social media îți spun dacă conținutul funcționează și cum le citești fără să devii obsedat.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-mistakes", alt: "Colaj de brand în roz și bleumarin, cu mostre de culoare, un pahar de cafea, o etichetă și forme" },
    intro: "Platformele sociale îți oferă numere fără sfârșit. Majoritatea sunt interesante și puține sunt utile. Trucul este să alegi un set mic, legat de ce vrei să facă conținutul, și să le citești în săptămâni, nu în ore.",
    sections: [
      {
        id: "scopul",
        heading: "Începe cu scopul",
        blocks: [
          p("Scopuri diferite cer numere diferite. Un brand nou vrea să fie văzut. Un magazin vrea clickuri și vânzări. O afacere locală vrea mesaje și apeluri. Decide întâi scopul principal pentru fiecare canal."),
        ],
      },
      {
        id: "reach",
        heading: "Reach și vizualizări",
        blocks: [
          p("Reach-ul arată câți oameni au văzut conținutul. Te ajută să înțelegi ce captează atenția: formate, subiecte, cârlige. Nu este singur o dovadă a rezultatelor."),
        ],
      },
      {
        id: "interactiune",
        heading: "Salvări, distribuiri și comentarii",
        blocks: [
          p("Salvările și distribuirile arată de obicei valoare reală, pentru că cineva a vrut să păstreze sau să trimită conținutul. Comentariile pot arăta interes și întrebări. Îți spun mai mult decât like-urile."),
        ],
      },
      {
        id: "actiune",
        heading: "Clickuri și acțiuni",
        blocks: [
          ul("Clickuri pe link și vizite pe profil.", "Mesaje și apeluri.", "Vânzări sau programări atribuite social media."),
          p("Acestea sunt cele mai apropiate de rezultatele afacerii. Unde se poate, urmărește-le cu o metodă simplă, precum un link unic sau o întrebare în formularul de programare."),
        ],
      },
      {
        id: "crestere",
        heading: "Creșterea numărului de urmăritori",
        blocks: [
          p("Creșterea contează, dar calitatea urmăritorilor contează mai mult. Zece clienți locali valorează mai mult decât o mie de urmăritori întâmplători."),
        ],
      },
      {
        id: "ignora",
        heading: "Cu ce fii atent",
        blocks: [
          ul("Vârfuri sau scăderi dintr-o singură zi.", "Compararea cu conturi mult mai mari.", "Like-urile ca singur semnal."),
        ],
      },
      {
        id: "revizuieste",
        heading: "Revizuiește lunar",
        blocks: [
          p("Alege trei metrici, notează-le în fiecare lună și adaugă ce ai postat. Tiparele apar repede. Dacă vrei ajutor să planifici conținut în funcție de rezultate, vezi serviciul meu de design pentru social media."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Care metrică este cea mai importantă?"),
          p("Cea mai apropiată de scopul tău: de obicei salvările, clickurile sau mesajele."),
          h3("Cât de des ar trebui să verific numerele?"),
          p("Săptămânal pentru o privire rapidă, lunar pentru decizii."),
          h3("Mai contează urmăritorii?"),
          p("Oarecum, dar urmăritorii implicați și relevanți contează mai mult decât totalul."),
        ],
      },
    ],
    related: { projects: ["divaz", "farmacia-farmex"], services: ["social-media-design"] },
  },
  {
    id: "what-is-art-direction",
    slug: "ce-este-directia-artistica-si-de-ce-au-brandurile-nevoie-de-ea",
    title: "Ce este direcția artistică și de ce au brandurile nevoie de ea",
    seoTitle: "Ce este direcția artistică și de ce contează",
    description: "Direcția artistică este persoana sau procesul care decide cum arată un brand în fotografii, video, design și compoziție. Ce face un director artistic și când ai nevoie de unul.",
    category: "content-creation",
    publishedAt: "2026-11-03",
    cover: { key: "journal-identity", alt: "Colaj roz cu un chip clasic în semitonuri, o schiță pe hârtie și o mână care ține un stilou" },
    intro: "Multe branduri au un designer, un fotograf și un editor video și totuși arată inconsecvent. Ce lipsește adesea este direcția artistică: cineva care stabilește ideea vizuală și se asigură că fiecare piesă o urmează.",
    sections: [
      {
        id: "definitie",
        heading: "Ce înseamnă direcția artistică",
        blocks: [
          p("Direcția artistică este conducerea creativă a unui proiect vizual. Decide conceptul, atmosfera, culorile, stilul imaginilor și cum lucrează toate împreună. Directorul artistic nu face neapărat fiecare material; îi ghidează pe cei care le fac."),
        ],
      },
      {
        id: "sarcini",
        heading: "Ce face un director artistic",
        blocks: [
          ul("Traduce strategia de brand într-o idee vizuală.", "Construiește mood boarduri și referințe.", "Dă brief fotografilor, editorilor și designerilor.", "Verifică lucrările pentru consecvență și calitate.", "Păstrează aspectul coerent pe toate canalele."),
        ],
      },
      {
        id: "exemplu",
        heading: "Un exemplu concret",
        blocks: [
          p("Pentru o campanie de modă precum IQ Fashion, direcția artistică decide paleta, stilizarea, încadrarea modelelor, cum apare tipografia pe postări și cum se simte videoul. Fără ea, aceleași haine ar putea arăta complet diferit în fiecare postare."),
        ],
      },
      {
        id: "cand",
        heading: "Când ai nevoie de ea",
        blocks: [
          ol("Lansezi un brand sau o campanie.", "Mai mulți oameni creează conținut și aspectul alunecă.", "Vrei o imagine mai clară, mai premium.", "Lucrezi simultan cu foto, video și design."),
        ],
      },
      {
        id: "cum",
        heading: "Cum funcționează într-un proiect",
        blocks: [
          ol("Descoperire: obiective, public, referințe.", "Concept: ideea vizuală și mood boardul.", "Ghid: reguli de paletă, tipografie, foto și video.", "Producție: brief și îndrumarea ședinței foto sau a designului.", "Revizuire: verificarea și ajustarea rezultatului."),
          p("Dacă vrei ajutor cu o direcție vizuală pentru brandul tău, vezi serviciul meu de creare de conținut și direcție artistică."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Direcția artistică este același lucru cu designul grafic?"),
          p("Nu tocmai. Designul grafic realizează materiale specifice. Direcția artistică stabilește ideea vizuală de ansamblu și ghidează toate materialele."),
          h3("Au nevoie și brandurile mici de ea?"),
          p("Da, într-o formă mai ușoară: un concept clar și reguli simple."),
          h3("Poate aceeași persoană să facă ambele?"),
          p("Adesea da, mai ales în echipe mici."),
        ],
      },
    ],
    related: { projects: ["iq-fashion", "kanoi"], services: ["content-creation"] },
  },
  {
    id: "visual-storytelling",
    slug: "storytelling-vizual-pentru-branduri",
    title: "Storytelling vizual pentru branduri: cum spui o poveste cu imagini",
    seoTitle: "Storytelling vizual pentru branduri",
    description: "O poveste se ține minte mai ușor decât o listă de caracteristici. Cum folosești imaginile, secvența și designul pentru a spune povestea unui brand într-o postare, o campanie sau un site.",
    category: "content-creation",
    publishedAt: "2026-11-03",
    cover: { key: "journal-premium", alt: "Colaj roz cu un luciu de buze rose, zmeură, afine, o petală și buze în semitonuri" },
    intro: "Oamenii țin minte poveștile mult după ce uită specificațiile. Storytelling-ul vizual înseamnă folosirea imaginilor, a ordinii și a designului ca cineva să simtă o poveste în câteva secunde. Funcționează pentru o postare, o campanie sau un întreg site.",
    sections: [
      {
        id: "incepe",
        heading: "Începe cu o idee",
        blocks: [
          p("Înainte să alegi imaginile, scrie povestea într-o propoziție. Ce se schimbă pentru persoană? O clinică dentară ar putea spune o poveste despre încredere, un brand de cosmetice despre un ritual, o companie tech despre învățatul prin construit."),
        ],
      },
      {
        id: "structura",
        heading: "Folosește o structură simplă",
        blocks: [
          ol("Început: o situație sau o nevoie.", "Mijloc: produsul, serviciul sau punctul de cotitură.", "Sfârșit: rezultatul sau emoția."),
          p("Într-un caruzel sau un video scurt, fiecare cadru poartă un pas."),
        ],
      },
      {
        id: "imagini",
        heading: "Alege imagini care poartă sens",
        blocks: [
          ul("Oameni și gesturi, nu doar obiecte.", "Detalii de aproape care arată calitate.", "Lumină și culoare consecvente.", "Spațiu pentru text, ca imaginea și cuvintele să lucreze împreună."),
          p("Pentru o identitate de cosmetice precum Fleurane, ilustrațiile cu ingrediente și texturile pot spune povestea produsului; pentru o clinică dentară precum Art Innova, fețele și expresiile transmit grijă."),
        ],
      },
      {
        id: "ritm",
        heading: "Controlează ritmul",
        blocks: [
          p("Variază cadrele apropiate și largi, cele liniștite și cele aglomerate. Un ritm ține oamenii cu ochii pe conținut."),
        ],
      },
      {
        id: "text",
        heading: "Lasă cuvintele să susțină, nu să repete",
        blocks: [
          p("Folosește text scurt pentru a adăuga ce imaginea nu poate arăta: un număr, un nume, o promisiune. Evită să repeți ce se vede deja."),
        ],
      },
      {
        id: "consecventa",
        heading: "Păstrează un stil recognoscibil",
        blocks: [
          p("O poveste spusă într-un limbaj vizual consecvent construiește un brand. Vezi serviciul meu de creare de conținut și direcție artistică pentru ajutor în dezvoltarea unuia."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Am nevoie de buget mare?"),
          p("Nu. O idee clară, lumină bună și un stil consecvent contează mai mult decât echipamentul."),
          h3("Cât de lungă ar trebui să fie o poveste vizuală?"),
          p("Cât are nevoie, adesea trei până la șapte cadre pentru social media."),
          h3("Pot brandurile B2B să spună povești vizuale?"),
          p("Da. Proiectele, oamenii și procesele sunt material puternic."),
        ],
      },
    ],
    related: { projects: ["art-innova", "fleurane"], services: ["content-creation"] },
  },
  {
    id: "phone-product-photography",
    slug: "fotografie-de-produs-cu-telefonul",
    title: "Fotografie de produs cu telefonul: sfaturi simple care arată profesionist",
    seoTitle: "Fotografie de produs cu telefonul: sfaturi simple",
    description: "Poți face fotografii bune de produs cu un smartphone. Sfaturi despre lumină, fundal, unghiuri și editare care fac o mare diferență.",
    category: "content-creation",
    publishedAt: "2026-11-03",
    cover: { key: "journal-mistakes", alt: "Colaj de brand în roz și bleumarin, cu mostre de culoare, un pahar de cafea, o etichetă și forme" },
    intro: "Telefoanele moderne fac fotografii foarte bune. Ce desparte imaginile de produs amatoare de cele profesioniste este rareori camera. Este lumina, fundalul, încadrarea și consecvența. Acești pași simpli te duc departe.",
    sections: [
      {
        id: "lumina",
        heading: "Începe cu lumina",
        blocks: [
          ul("Fotografiază lângă o fereastră mare, cu lumină naturală blândă.", "Evită soarele direct, care creează umbre dure.", "Folosește un carton alb sau o placă de polistiren pentru a reflecta lumina în umbre.", "Oprește luminile artificiale amestecate care dau culori ciudate."),
        ],
      },
      {
        id: "fundal",
        heading: "Alege un fundal curat",
        blocks: [
          p("O foaie simplă de hârtie sau o țesătură, ori o suprafață simplă, ține atenția pe produs. Pentru produse lucioase precum bijuteriile sau piesele de argint, ai grijă la reflexii: schimbă unghiul până când suprafața arată curată."),
        ],
      },
      {
        id: "camera",
        heading: "Sfaturi pentru cameră",
        blocks: [
          ol("Curăță obiectivul.", "Folosește un trepied sau o suprafață stabilă.", "Atinge ecranul pentru a focaliza pe produs.", "Activează grila ca să ții liniile drepte.", "Fotografiază puțin mai larg și decupează mai târziu."),
        ],
      },
      {
        id: "unghiuri",
        heading: "Fotografiază un set de unghiuri",
        blocks: [
          ul("Vedere din față.", "Vedere în trei sferturi.", "Flat lay de sus.", "Prim-plan cu detalii și textură.", "Produsul în folosire sau într-o scenă."),
        ],
      },
      {
        id: "editare",
        heading: "Editează cu blândețe",
        blocks: [
          p("Ajustează luminozitatea, contrastul și balansul de alb ca să fie culoarea corectă. Evită filtrele puternice pe produse, pentru că clienții se așteaptă ca obiectul să arate la fel când ajunge. Folosește aceleași setări de editare pentru toate pozele."),
        ],
      },
      {
        id: "consecventa",
        heading: "Păstrează setul consecvent",
        blocks: [
          p("Același fundal, aceeași lumină, aceleași unghiuri. Pentru un aspect premium precum Caterina Tomasso contează reținerea și uniformitatea. Pentru ajutor la construirea unui stil foto, vezi serviciul meu de creare de conținut."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Am nevoie de lightbox?"),
          p("Nu neapărat. O fereastră și un carton alb funcționează bine."),
          h3("Ce rezoluție să exportez?"),
          p("Suficient de mare pentru site și social media, fără compresie inutilă."),
          h3("Să folosesc modul portret?"),
          p("Uneori, dar verifică marginile. Pentru acuratețe, modul normal cu focalizare bună este adesea mai sigur."),
        ],
      },
    ],
    related: { projects: ["caterina-tomasso", "divaz"], services: ["content-creation"] },
  },
  {
    id: "video-editing-basics",
    slug: "bazele-editarii-video-pentru-social-media",
    title: "Bazele editării video pentru social media: tăieturi, subtitrări și ritm",
    seoTitle: "Bazele editării video pentru social media",
    description: "Bazele editării video scurte pentru social media: structură, tăieturi, subtitrări, sunet și export, ca videoclipurile tale să arate curat și să țină atenția.",
    category: "content-creation",
    publishedAt: "2026-11-03",
    cover: { key: "journal-feed", alt: "Telefon cu o grilă de Instagram în roz pudrat, înconjurat de fotografii beauty și o paletă de culori" },
    intro: "O montare bună este în mare parte invizibilă. Elimină ce încetinește videoul, păstrează ritmul și clarifică mesajul. Nu ai nevoie de software avansat ca să începi, doar de câteva principii.",
    sections: [
      {
        id: "structura",
        heading: "Planifică structura",
        blocks: [
          ol("Cârlig în primele secunde.", "Un mesaj principal.", "Dovadă sau detaliu.", "Un final clar sau un îndemn la acțiune."),
          p("Taie tot ce nu servește acea structură."),
        ],
      },
      {
        id: "taieturi",
        heading: "Taie cu intenție",
        blocks: [
          ul("Taie tăcerile și ezitările.", "Taie pe mișcare pentru un flux fluid.", "Variază mărimea cadrelor ca să ții interesul.", "Păstrează fiecare cadru cât timp adaugă ceva."),
        ],
      },
      {
        id: "subtitrari",
        heading: "Adaugă subtitrări",
        blocks: [
          p("Mulți oameni se uită fără sunet. Adaugă subtitrări lizibile, destul de mari pentru telefon și ținute departe de zonele interfeței. Păstrează-le corecte și potrivește fonturile și culorile brandului."),
        ],
      },
      {
        id: "sunet",
        heading: "Ai grijă de sunet",
        blocks: [
          p("Sunetul clar contează mai mult decât se crede. Folosește o înregistrare curată a vocii sau muzică la volumul potrivit și asigură-te că muzica nu acoperă vorbirea."),
        ],
      },
      {
        id: "format",
        heading: "Exportă pentru platformă",
        blocks: [
          p("Folosește vertical 9:16, 1080 x 1920 pixeli, pentru Reels, TikTok și Stories. Păstrează o margine sigură pentru text. Exportă în calitate bună, dar evită fișierele atât de mari încât se încarcă greu."),
        ],
      },
      {
        id: "brand",
        heading: "Fă-l să arate ca brandul tău",
        blocks: [
          p("Folosește cadre de intro, culori, litere și tranziții consecvente. Branduri precum Kanoi și Farmex câștigă din stiluri video recognoscibile, fiecare într-o altă atmosferă. Dacă vrei ajutor cu video și reels, vezi serviciul meu de creare de conținut."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Ce software să folosesc?"),
          p("Orice editor pe care îl cunoști bine. Principiile sunt aceleași."),
          h3("Cât de lungi ar trebui să fie videoclipurile scurte?"),
          p("Suficient de scurte ca să țină atenția: adesea sub un minut pentru social media."),
          h3("Am nevoie de muzică?"),
          p("Nu întotdeauna. Designul sonor și vorbirea clară pot fi suficiente."),
        ],
      },
    ],
    related: { projects: ["kanoi", "farmacia-farmex"], services: ["content-creation"] },
  },
  {
    id: "motion-vs-2d-animation",
    slug: "motion-graphics-vs-animatie-2d",
    title: "Motion graphics vs animație 2D: care e diferența și de care ai nevoie?",
    seoTitle: "Motion graphics vs animație 2D: de care ai nevoie?",
    description: "Termenii se suprapun, dar nu sunt identici. Cum diferă motion graphics și animația 2D, pentru ce e mai bună fiecare și cum alegi pentru proiectul tău.",
    category: "content-creation",
    publishedAt: "2026-11-03",
    cover: { key: "journal-stand-out", alt: "Colaj roz și bleumarin cu un scorpion gravat, o călimară, un ochi în semitonuri și o floare" },
    intro: "Clienții cer adesea „o animație” și înțeleg lucruri diferite. Uneori vor text și forme în mișcare pentru a explica un produs; alteori vor un personaj care merge și acționează. Sunt meșteșuguri diferite, cu costuri diferite.",
    sections: [
      {
        id: "motion",
        heading: "Motion graphics",
        blocks: [
          p("Motion graphics animă elemente grafice precum text, pictograme, grafice și forme. Sunt ideale pentru explicații, animații de logo, postări social media și prezentări de date."),
          ul("Bune pentru explicarea ideilor și proceselor.", "Eficiente pentru conținut de brand și reclame.", "Funcționează bine cu o identitate vizuală definită."),
        ],
      },
      {
        id: "doua-d",
        heading: "Animație 2D",
        blocks: [
          p("Animația 2D se concentrează pe personaje și scene desenate și animate cadru cu cadru sau cu păpuși cu schelet. Este cea mai bună pentru povești, conținut educativ și personaje care exprimă emoții."),
          ul("Bună pentru conținut narativ și bazat pe personaje.", "Ia mai mult timp și planificare.", "Funcționează bine pentru educația copiilor și mascote de brand."),
        ],
      },
      {
        id: "suprapunere",
        heading: "Unde se suprapun",
        blocks: [
          p("Multe proiecte le combină pe ambele: un personaj care merge printre grafice animate, de exemplu. Pentru conținut educativ precum lecțiile NEXTLAB, personajele și diagramele împreună ajută la înțelegere."),
        ],
      },
      {
        id: "alege",
        heading: "Cum alegi",
        blocks: [
          ol("Care este scopul: să explici, să povestești sau să vinzi?", "Cine este publicul?", "Cât de lung ar trebui să fie?", "Care sunt bugetul și termenul?", "Ai un scenariu și o identitate vizuală?"),
        ],
      },
      {
        id: "proces",
        heading: "Cum funcționează producția",
        blocks: [
          ol("Scenariu și storyboard.", "Cadre de stil și design.", "Animație.", "Sunet și muzică.", "Revizuire și export."),
          p("Dacă ai nevoie de o animație 2D sau motion graphics, vezi serviciul meu de animație 2D."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Care este mai ieftină?"),
          p("Motion graphics sunt de obicei mai rapide decât animația cu personaje, dar depinde de detalii."),
          h3("Cât de lung ar trebui să fie un explainer?"),
          p("Unu până la două minute este o lungime bună pentru majoritatea subiectelor."),
          h3("Am nevoie de scenariu mai întâi?"),
          p("Da. Un scenariu clar face totul mai rapid și mai ieftin."),
        ],
      },
    ],
    related: { projects: ["nextlab-tech", "vibrary"], services: ["2d-animation"] },
  },
  {
    id: "brief-a-video-editor",
    slug: "cum-faci-brief-unui-editor-video",
    title: "Cum faci brief unui editor video ca să primești ce ți-ai imaginat",
    seoTitle: "Cum faci brief unui editor video",
    description: "Un brief clar economisește runde de revizuiri. Ce îi spui unui editor video: scop, public, referințe, format, materiale și procesul de feedback.",
    category: "content-creation",
    publishedAt: "2026-11-03",
    cover: { key: "journal-feed", alt: "Telefon cu o grilă de Instagram în roz pudrat, înconjurat de fotografii beauty și o paletă de culori" },
    intro: "Majoritatea revizuirilor video vin din așteptări neclare, nu din montaj prost. Un brief bun durează douăzeci de minute de scris și poate economisi zile. Iată ce să incluzi.",
    sections: [
      {
        id: "scop",
        heading: "Scopul și publicul",
        blocks: [
          p("Spune ce trebuie să realizeze videoul și cine îl va urmări: să vândă un produs, să explice un proces, să promoveze un eveniment. Menționează unde va apărea, pentru că un Reel și un video pentru site se montează diferit."),
        ],
      },
      {
        id: "format",
        heading: "Format și lungime",
        blocks: [
          ul("Raport de aspect: de exemplu vertical 9:16 pentru Reels.", "Lungimea țintă.", "Formate de livrare și termen.", "Subtitrări: da sau nu, și în ce limbă."),
        ],
      },
      {
        id: "referinte",
        heading: "Referințe",
        blocks: [
          p("Trimite două sau trei videoclipuri care îți plac și spune ce îți place la fiecare: ritmul, culorile, tranzițiile, sunetul. Referințele comunică mai repede decât adjectivele. Împărtășește și ce nu vrei."),
        ],
      },
      {
        id: "materiale",
        heading: "Materiale și brand",
        blocks: [
          ul("Filmări brute în dosare organizate.", "Logo, fonturi și coduri de culoare.", "Preferințe de muzică sau sunet, cu licențe.", "Scenariu sau mesaje cheie.", "Orice text care trebuie să apară exact cum e scris."),
        ],
      },
      {
        id: "structura",
        heading: "Structură",
        blocks: [
          p("Dacă ai o structură aproximativă, împărtășește-o: cârlig, puncte principale, final. Dacă nu, cere-i editorului să propună una. Menționează îndemnul la acțiune."),
        ],
      },
      {
        id: "feedback",
        heading: "Procesul de feedback",
        blocks: [
          ol("Stabiliți numărul de runde de revizuire.", "Adună feedbackul de la toți cei care decid într-un singur mesaj.", "Dă marcaje de timp și comentarii specifice.", "Spune mai întâi ce îți place, apoi ce să schimbe."),
          p("Pentru reels și video de brand, vezi serviciul meu de creare de conținut."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Cât de detaliat ar trebui să fie un brief?"),
          p("Suficient de detaliat cât să răspundă la scop, format, referințe și materiale. O pagină este de obicei suficientă."),
          h3("Ar trebui să-i dau editorului libertate creativă?"),
          p("Da, în limitele brandului și ale scopului. Editorii buni îmbunătățesc planul."),
          h3("Câte runde de revizuire sunt normale?"),
          p("Două runde sunt o bază comună, dar stabiliți-o din timp."),
        ],
      },
    ],
    related: { projects: ["kanoi", "farmacia-farmex"], services: ["content-creation"] },
  },
  {
    id: "content-pillars",
    slug: "piloni-de-continut-cum-planifici-continutul-pe-industrie",
    title: "Piloni de conținut: cum planifici conținutul social media pentru industria ta",
    seoTitle: "Piloni de conținut: planifică conținutul pe industrie",
    description: "Pilonii de conținut sunt trei până la cinci teme recurente care organizează postările. Cum îi alegi, cu exemple pentru sănătate, mâncare, beauty și B2B.",
    category: "content-creation",
    publishedAt: "2026-11-03",
    cover: { key: "journal-identity", alt: "Colaj roz cu un chip clasic în semitonuri, o schiță pe hârtie și o mână care ține un stilou" },
    intro: "„Ce postăm azi?” este întrebarea care epuizează echipele mici. Pilonii de conținut răspund la ea din timp. Sunt o mână de teme recurente care ghidează ce publici, țin feedul echilibrat și fac planificarea mai rapidă.",
    sections: [
      {
        id: "ce",
        heading: "Ce este un pilon",
        blocks: [
          p("Un pilon este un subiect larg despre care brandul tău poate vorbi repetat din unghiuri diferite. Trei până la cinci sunt suficienți. Fiecare ar trebui să se lege de obiectivele tale și de ceva ce îi interesează pe cei din public."),
        ],
      },
      {
        id: "cum",
        heading: "Cum îi alegi",
        blocks: [
          ol("Listează întrebările și grijile publicului.", "Listează cu ce vrei să fii cunoscut.", "Grupează subiectele în trei până la cinci teme.", "Verifică dacă fiecare pilon poate produce multe postări."),
        ],
      },
      {
        id: "sanatate",
        heading: "Exemplu: sănătate și stomatologie",
        blocks: [
          ul("Educație: explică proceduri și prevenție.", "Echipă și încredere: prezintă oamenii.", "Rezultate și povești, cu permisiune.", "Informații practice: program, cum te programezi, la ce să te aștepți."),
          p("Branduri precum Art Innova și Global Medical Health au nevoie de un echilibru calm și liniștitor între informație și încredere."),
        ],
      },
      {
        id: "mancare",
        heading: "Exemplu: mâncare și beauty",
        blocks: [
          ul("Produs și detalii.", "Proces și ingrediente.", "Lifestyle și utilizare.", "Oferte și momente sezoniere."),
        ],
      },
      {
        id: "b2b",
        heading: "Exemplu: B2B și tehnic",
        blocks: [
          ul("Proiecte și rezultate.", "Expertiză și explicații.", "Echipă și proces.", "Știri din industrie cu punctul tău de vedere."),
        ],
      },
      {
        id: "calendar",
        heading: "Transformă pilonii într-un calendar",
        blocks: [
          p("Atribuie piloni zilelor sau săptămânilor, apoi umple-i cu postări specifice. Un ritm săptămânal simplu, cu o postare pe pilon, e ușor de ținut. Pentru ajutor cu un plan de conținut și un sistem de design, vezi serviciul meu de creare de conținut."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Câți piloni ar trebui să am?"),
          p("Trei până la cinci."),
          h3("Se pot schimba pilonii?"),
          p("Da. Revizuiește-i în fiecare trimestru pe baza rezultatelor."),
          h3("Limitează pilonii creativitatea?"),
          p("Dau o structură. Creativitatea se întâmplă în interiorul ei."),
        ],
      },
    ],
    related: { projects: ["art-innova", "global-medical-health"], services: ["content-creation", "social-media-design"] },
  },
  {
    id: "repurpose-content",
    slug: "cum-refolosesti-continutul",
    title: "Cum refolosești conținutul: scoate mai mult dintr-o singură idee",
    seoTitle: "Cum refolosești conținutul: mai mult dintr-o idee",
    description: "Refolosirea transformă o piesă de conținut în mai multe fără să te repeți. Un flux simplu, cu exemple pentru video, fotografii și articole.",
    category: "content-creation",
    publishedAt: "2026-11-03",
    cover: { key: "journal-premium", alt: "Colaj roz cu un luciu de buze rose, zmeură, afine, o petală și buze în semitonuri" },
    intro: "Crearea de conținut de la zero în fiecare zi este epuizantă. Refolosirea înseamnă să iei o piesă puternică și să o adaptezi la alte formate și canale. Economisește timp și ajunge la oameni care preferă alte formate, fără să pară repetitiv când e făcută bine.",
    sections: [
      {
        id: "principiu",
        heading: "Principiul",
        blocks: [
          p("Pornește de la o piesă centrală, precum un proiect, un video sau un articol. Apoi întreabă-te cum poate fi arătată diferit pe fiecare canal: mai scurt, mai vizual, mai detaliat sau mai personal."),
        ],
      },
      {
        id: "video",
        heading: "Dintr-un video",
        blocks: [
          ul("O versiune completă pentru site sau YouTube.", "O variantă verticală scurtă pentru Reels sau TikTok.", "Cadre statice pentru un caruzel.", "Citate ca postări text.", "Un Story din culise."),
        ],
      },
      {
        id: "proiect",
        heading: "Dintr-un proiect",
        blocks: [
          p("Un proiect precum instalarea unui utilaj nou pentru KDT Romania poate deveni un studiu de caz, un caruzel foto, un video scurt, o postare LinkedIn despre rezultat și un Story cu echipa."),
        ],
      },
      {
        id: "articol",
        heading: "Dintr-un articol",
        blocks: [
          ol("Transformă fiecare secțiune într-o postare sau un slide.", "Extrage un citat sau o statistică pe care o poți verifica.", "Creează un grafic de tip listă de verificare.", "Răspunde la întrebările din FAQ ca videoclipuri scurte."),
        ],
      },
      {
        id: "adapteaza",
        heading: "Adaptează, nu copia",
        blocks: [
          p("Schimbă prima linie, formatul și îndemnul la acțiune pentru fiecare canal. Păstrează aspectul consecvent, dar evită să postezi exact același material peste tot."),
        ],
      },
      {
        id: "programeaza",
        heading: "Programează și urmărește",
        blocks: [
          p("Împrăștie piesele pe săptămâni. Notează ce formate au cele mai bune rezultate. Dacă vrei ajutor la configurarea unui sistem de conținut, vezi serviciul meu de creare de conținut."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Vor vedea oamenii același conținut de două ori?"),
          p("Unii da, dar formatele și unghiurile diferite îl țin proaspăt. Majoritatea urmăritorilor nu văd tot."),
          h3("Câte piese pot obține dintr-o idee?"),
          p("Adesea cinci până la zece, în funcție de subiect."),
          h3("Strică refolosirea calitatea?"),
          p("Nu, dacă adaptezi cu grijă."),
        ],
      },
    ],
    related: { projects: ["kdt-romania", "nextlab-tech"], services: ["content-creation"] },
  },
  {
    id: "flyer-design",
    slug: "sfaturi-pentru-design-de-flyer-care-este-citit",
    title: "Sfaturi pentru design de flyer: cum faci un flyer pe care oamenii chiar îl citesc",
    seoTitle: "Sfaturi pentru design de flyer care este citit",
    description: "Un flyer are doar câteva secunde. Cum construiești o ierarhie clară, cum alegi dimensiunea și hârtia și cum eviți greșelile care trimit flyerele direct la gunoi.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-mistakes", alt: "Colaj de brand în roz și bleumarin, cu mostre de culoare, un pahar de cafea, o etichetă și forme" },
    intro: "Majoritatea flyerelor primesc o privire de o secundă sau două. În acel moment cititorul decide dacă îl păstrează. Un design bun de flyer nu înseamnă decor. Înseamnă un mesaj clar, o ierarhie puternică și un motiv să acționezi.",
    sections: [
      {
        id: "scop",
        heading: "Definește un singur scop",
        blocks: [
          p("Ce ar trebui să facă cititorul după ce vede flyerul: să viziteze, să sune, să scaneze, să revendice o ofertă? Un flyer, o acțiune principală."),
        ],
      },
      {
        id: "ierarhie",
        heading: "Construiește o ierarhie",
        blocks: [
          ol("Un titlu care spune beneficiul sau oferta.", "O singură imagine sau grafică puternică.", "Text scurt de susținere.", "Un îndemn clar la acțiune cu date de contact."),
          p("Pentru o brutărie precum Moș Ilie, o imagine apetisantă de produs cu o ofertă simplă funcționează mai bine decât o listă aglomerată cu tot ce e în meniu."),
        ],
      },
      {
        id: "lizibilitate",
        heading: "Păstrează-l lizibil",
        blocks: [
          ul("Titlu mare, text de bază lizibil.", "Contrast mare între text și fundal.", "Cel mult două fonturi.", "Spațiu alb în jurul elementelor cheie."),
        ],
      },
      {
        id: "dimensiune",
        heading: "Dimensiune și format",
        blocks: [
          p("A5 și A6 sunt dimensiuni practice pentru distribuire. A4 se potrivește afișelor și inserțiilor. Adaugă bleed, de obicei 3 mm, și ține textul în marginile sigure."),
        ],
      },
      {
        id: "hartie",
        heading: "Hârtie și tipar",
        blocks: [
          p("Hârtia mai groasă pare mai valoroasă. Pentru fluturași distribuiți manual, o gramatură medie cu tipar bun este de obicei suficientă. Cere o probă înainte de un tiraj mare."),
        ],
      },
      {
        id: "masoara",
        heading: "Fă-l măsurabil",
        blocks: [
          p("Adaugă un cod, un link unic sau o frază pe care clienții o menționează, ca să știi că flyerul a funcționat. Vezi serviciul meu de design pentru print pentru flyere potrivite brandului tău."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Ce dimensiune ar trebui să aibă un flyer?"),
          p("A5 este cea mai comună pentru distribuire manuală."),
          h3("Să includ un cod QR?"),
          p("Doar dacă duce la ceva util pe mobil și îl tipărești destul de mare ca să poată fi scanat."),
          h3("Cât text este prea mult?"),
          p("Dacă nu poate fi înțeles în câteva secunde, este prea mult."),
        ],
      },
    ],
    related: { projects: ["mos-ilie", "global-medical-health"], services: ["printed-media"] },
  },
  {
    id: "qr-codes-in-print",
    slug: "coduri-qr-in-designul-de-print",
    title: "Coduri QR în designul de print: dimensiune, plasare și greșeli de evitat",
    seoTitle: "Coduri QR în designul de print: dimensiune și plasare",
    description: "Un cod QR care nu se scanează este mai rău decât niciunul. Cât de mare ar trebui să fie, câtă zonă liberă are nevoie, unde îl pui și la ce trimiți.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-fonts", alt: "Colaj tipografic: un A mare cu serife și un a mic pe roz, cu steluțe și hârtie ruptă" },
    intro: "Codurile QR leagă tiparul de web, dar funcționează doar dacă oamenii le pot scana într-o secundă. Multe coduri tipărite eșuează din aceleași motive: prea mici, contrast slab, fără zonă liberă sau un link care nu duce nicăieri util.",
    sections: [
      {
        id: "de-ce",
        heading: "Dă oamenilor un motiv să scaneze",
        blocks: [
          p("Spune ce face codul, de exemplu „Vezi meniul”, „Fă o programare” sau „Urmărește videoul”. Un cod gol, fără explicații, este ignorat."),
        ],
      },
      {
        id: "dimensiune",
        heading: "Dimensiune și contrast",
        blocks: [
          ul("Fă codul destul de mare ca să se scaneze de la distanța așteptată. Pe o carte de vizită, păstrează-l la o dimensiune care se scanează ușor și testează-l.", "Folosește cod închis pe fundal deschis, cu contrast puternic.", "Evită culorile inversate dacă nu le-ai testat.", "Nu întinde codul."),
        ],
      },
      {
        id: "zona",
        heading: "Lasă o zonă liberă",
        blocks: [
          p("Un cod QR are nevoie de o margine goală în jur, adesea de aproximativ patru module. Nu pune text sau grafică în acea zonă."),
        ],
      },
      {
        id: "link",
        heading: "Trimite la ceva adaptat mobilului",
        blocks: [
          ul("Pagina ar trebui să se încarce repede pe telefon.", "Folosește un link scurt și stabil, ca să fie codul mai simplu.", "Gândește-te la o pagină dedicată campaniilor de print, ca să poți măsura scanările.", "Verifică dacă linkul funcționează și după tipărire."),
        ],
      },
      {
        id: "design",
        heading: "Integrează-l în compoziție",
        blocks: [
          p("Așază codul într-o locație consecventă, departe de pliuri și margini. Poți stila codul cu culorile brandului, dar testează cu atenție. Cărțile sau flyerele pentru o florărie precum Floraria Mariei pot trimite la un catalog sau la o pagină de comandă."),
        ],
      },
      {
        id: "testeaza",
        heading: "Testează înainte să tipărești",
        blocks: [
          ol("Testează pe mai multe telefoane.", "Testează în lumină normală.", "Tipărește o probă la dimensiunea reală.", "Testează din nou după tipărire."),
          p("Pentru materiale tipărite cu coduri QR funcționale, vezi serviciul meu de design pentru print."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Cât de mare ar trebui să fie un cod QR?"),
          p("Destul de mare cât să se scaneze confortabil. Testează la dimensiunea reală, pentru că dimensiunea potrivită depinde de distanță."),
          h3("Pot pune un logo în mijloc?"),
          p("Uneori, dar poate reduce fiabilitatea. Testează."),
          h3("Să folosesc un cod QR dinamic?"),
          p("Dacă vrei să schimbi destinația sau să măsori scanările, da."),
        ],
      },
    ],
    related: { projects: ["nextlab-tech", "floraria-mariei"], services: ["printed-media"] },
  },
  {
    id: "paper-and-finishes",
    slug: "hartie-si-finisaje-pentru-carti-de-vizita-si-print",
    title: "Hârtie și finisaje pentru cărți de vizită și print: cum alegi",
    seoTitle: "Hârtie și finisaje pentru cărți de vizită și print",
    description: "Cretată sau necretată, mată sau lucioasă, folie sau lac selectiv. Un ghid simplu pentru alegerea hârtiei și a finisajelor care se potrivesc brandului și bugetului tău.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-premium", alt: "Colaj roz cu un luciu de buze rose, zmeură, afine, o petală și buze în semitonuri" },
    intro: "Tiparul este fizic, deci hârtia și finisajul fac parte din mesaj. Două designuri identice pot părea ieftine sau premium în funcție de ce sunt tipărite. Iată cum alegi fără să ai nevoie de vocabularul unei tipografii.",
    sections: [
      {
        id: "gramaj",
        heading: "Gramaj",
        blocks: [
          p("Greutatea hârtiei se măsoară în grame pe metru pătrat (gsm). Hârtia mai grea pare mai solidă. Cărțile de vizită se tipăresc de obicei pe carton gros, flyerele pe hârtie mai subțire, iar broșurile undeva la mijloc. Cere tipografiei mostre ca să simți diferența."),
        ],
      },
      {
        id: "cretata",
        heading: "Cretată sau necretată",
        blocks: [
          ul("Hârtia cretată este netedă și face culorile să arate vii. Vine în variantă mată sau lucioasă.", "Hârtia necretată este mai naturală, absoarbe cerneala și are o textură mai moale. Se potrivește unui aspect calm, premium sau artizanal.", "Hârtia cretată mată reduce reflexiile și arată modern."),
        ],
      },
      {
        id: "finisaje",
        heading: "Finisaje frecvente",
        blocks: [
          ul("Laminare: o peliculă subțire de protecție, mată sau lucioasă, care face cartea mai durabilă.", "Lac selectiv: un strat lucios aplicat pe anumite zone, precum un logo.", "Folie: un strat metalic pentru logouri sau detalii.", "Ștanțare în relief: zone ridicate care adaugă textură."),
          p("Folosește finisajele speciale cu măsură. Un detaliu ales bine are mai mult efect decât mai multe care concurează."),
        ],
      },
      {
        id: "brand",
        heading: "Potrivește finisajul cu brandul",
        blocks: [
          p("Un brand de cosmetice naturale precum Fleurane poate folosi hârtie moale, tactilă, care se simte calmă și rafinată. Un boutique de argint precum Caterina Tomasso poate folosi eleganță reținută, poate cu un detaliu subtil de folie. O companie industrială poate prefera materiale durabile și curate."),
        ],
      },
      {
        id: "buget",
        heading: "Ține cont de buget",
        blocks: [
          ol("Alege mai întâi hârtia, pentru că are cel mai mare impact.", "Adaugă un singur finisaj acolo unde contează cel mai mult.", "Comandă mostre sau probe înainte de tiraje mari.", "Cere oferte cu opțiuni diferite."),
          p("Pentru ajutor la specificarea materialelor tipărite, vezi serviciul meu de design pentru print."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Care hârtie este cea mai bună pentru cărți de vizită?"),
          p("Un carton gros, de calitate bună. Cretat sau necretat depinde de atmosfera brandului."),
          h3("Mat sau lucios?"),
          p("Matul arată mai calm și lasă mai puține amprente; luciosul face culorile să iasă în evidență."),
          h3("Fac finisajele speciale o mare diferență?"),
          p("Folosite bine, da, dar câteva detalii sunt mai bune decât multe."),
        ],
      },
    ],
    related: { projects: ["fleurane", "caterina-tomasso"], services: ["printed-media"] },
  },
  {
    id: "cosmetics-label-requirements",
    slug: "cerinte-pentru-eticheta-cosmetice-in-ue",
    title: "Designul etichetelor de cosmetice în UE: ce trebuie să apară pe ambalaj",
    seoTitle: "Cerințe pentru eticheta de cosmetice în UE",
    description: "O prezentare pentru designeri a ceea ce trebuie să arate o etichetă de cosmetice din UE, conform Regulamentului 1223/2009, și cum planifici spațiul pentru ele de la început.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-identity", alt: "Colaj roz cu un chip clasic în semitonuri, o schiță pe hârtie și o mână care ține un stilou" },
    intro: "O etichetă de cosmetice trebuie să fie frumoasă și legală în același timp. Dacă o proiectezi fără să știi ce trebuie să apară, ajungi să refaci munca. Aceasta este o prezentare pentru designeri a principalelor elemente enumerate în Articolul 19 al Regulamentului UE privind produsele cosmetice (1223/2009). Nu este consultanță juridică, deci confirmă mereu cu un expert în reglementări.",
    sections: [
      {
        id: "de-ce",
        heading: "De ce planifici spațiul mai întâi",
        blocks: [
          p("Textul obligatoriu ocupă spațiu real, iar o parte din el are nevoie de o lizibilitate minimă. Dacă planifici compoziția în jurul lui de la început, eticheta pare intenționată. Dacă îl adaugi la final, designul are de suferit."),
        ],
      },
      {
        id: "elemente",
        heading: "Principalele elemente de pe etichetă",
        blocks: [
          ul("Numele și adresa persoanei responsabile din UE.", "Țara de origine pentru produsele importate.", "Conținutul nominal (greutate sau volum) la momentul ambalării.", "Data duratei minime de depozitare sau simbolul perioadei după deschidere, în funcție de produs.", "Precauții de utilizare și eventualele avertismente speciale.", "Numărul lotului sau o referință care identifică produsul.", "Funcția produsului, dacă nu reiese clar din prezentare.", "Lista ingredientelor, folosind denumirile standard."),
          p("Unele informații pot trebui să apară pe recipient și pe ambalajul exterior; altele pot fi date pe un prospect sau o etichetă însoțitoare când nu este practic să fie tipărite. Verifică detaliile pentru produsul tău."),
        ],
      },
      {
        id: "design",
        heading: "Cum proiectezi cu ele",
        blocks: [
          ol("Fă o listă cu toate elementele obligatorii pentru produs.", "Rezervă zona pentru ele, cu dimensiune și contrast suficiente.", "Alege un font care rămâne lizibil la dimensiuni mici.", "Separă textul de reglementare de cel de marketing.", "Tipărește o probă la dimensiunea reală și testează lizibilitatea."),
        ],
      },
      {
        id: "brand",
        heading: "Păstrează senzația de brand",
        blocks: [
          p("O ierarhie bună lasă numele brandului și mesajul principal să conducă, în timp ce textul de reglementare rămâne ordonat și clar. Branduri precum Fleurane sau THS Organic pot păstra un aspect calm și premium respectând regulile."),
        ],
      },
      {
        id: "verifica",
        heading: "Verifică mereu cu un expert",
        blocks: [
          p("Regulile acoperă și afirmațiile, limbile și cerințe specifice produsului. Pune eticheta finală la verificat de cineva care cunoaște regulamentul înainte de tipărire. Pentru ajutor la designul etichetelor și ambalajelor, vezi serviciile mele de design pentru print și branding."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Sunt aceste reguli la fel în toate țările UE?"),
          p("Regulamentul se aplică în toată UE, dar cerințele de limbă pentru unele informații pot depinde de țară. Verifică fiecare piață."),
          h3("Pot pune toate informațiile pe un prospect?"),
          p("Doar în cazurile în care regulamentul permite. Verifică ce elemente trebuie să fie pe ambalaj."),
          h3("Cine este persoana responsabilă?"),
          p("Persoana sau compania, stabilită în UE, responsabilă de conformitatea produsului."),
        ],
      },
    ],
    related: { projects: ["fleurane", "ths-organic"], services: ["printed-media", "branding"] },
  },
  {
    id: "brochure-catalogue-layout",
    slug: "bazele-aranjarii-in-pagina-pentru-brosuri-si-cataloage",
    title: "Aranjarea în pagină pentru broșuri și cataloage: grile, ierarhie și flux",
    seoTitle: "Aranjarea în pagină pentru broșuri și cataloage",
    description: "Cum aranjezi o broșură sau un catalog de produse ca să fie ușor de parcurs și plăcut de citit: grile, ierarhie, imagini, ritm și pregătire pentru tipar.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-fonts", alt: "Colaj tipografic: un A mare cu serife și un a mic pe roz, cu steluțe și hârtie ruptă" },
    intro: "O broșură sau un catalog se citește printr-o serie de priviri înainte de orice citit real. Aranjarea trebuie să ghideze acele priviri. O grilă clară, o ierarhie puternică și un ritm pe pagini fac diferența între un catalog pe care oamenii îl răsfoiesc și unul pe care îl lasă jos.",
    sections: [
      {
        id: "scop",
        heading: "Începe cu scopul",
        blocks: [
          p("Documentul este făcut să informeze, să vândă sau să impresioneze? Un catalog de produse are nevoie de parcurgere rapidă și comparație. O broșură de brand are nevoie de atmosferă și poveste. Decide scopul înainte de a alege aranjarea."),
        ],
      },
      {
        id: "grila",
        heading: "Folosește o grilă",
        blocks: [
          ul("Alege o grilă de coloane, de exemplu două, trei sau patru.", "Stabilește margini și spații între coloane și păstrează-le consecvente.", "Aliniază imaginile și textul la grilă.", "Folosește o grilă de linii de bază pentru text ordonat."),
          p("O grilă este ceea ce face ca multe pagini să pară un singur document."),
        ],
      },
      {
        id: "ierarhie",
        heading: "Creează o ierarhie",
        blocks: [
          ol("Titlurile paginilor și deschiderile de secțiune.", "Numele produselor sau titluri.", "Descrieri și detalii cheie.", "Prețuri, coduri și text mic."),
          p("Folosește mărimea, grosimea și culoarea pentru a separa nivelurile. Un catalog de florărie, de exemplu, poate pune în față imagini mari de produs și nume scurte, cu detalii în text mai mic."),
        ],
      },
      {
        id: "imagini",
        heading: "Tratează imaginile cu grijă",
        blocks: [
          p("Folosește fotografii de rezoluție mare, consecvente ca lumină și stil. Amestecă imagini pe toată pagina cu unele mai mici pentru ritm. Păstrează legendele aproape de imagini."),
        ],
      },
      {
        id: "flux",
        heading: "Planifică fluxul paginilor",
        blocks: [
          ul("Începe cu o copertă puternică și o pagină de cuprins clară.", "Grupează produsele sau subiectele înrudite.", "Variază densitatea paginilor: pagini aglomerate urmate de unele mai calme.", "Încheie cu date de contact și un îndemn la acțiune."),
        ],
      },
      {
        id: "tipar",
        heading: "Pregătește pentru tipar",
        blocks: [
          p("Folosește CMYK, adaugă bleed, verifică rezoluția la 300 dpi pentru imagini și ține textul departe de pliuri și tăieturi. Fii atent la numărul de pagini: broșurile necesită de obicei multipli de patru. Vezi serviciul meu de design pentru print pentru cataloage și broșuri."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Câte coloane ar trebui să folosesc?"),
          p("De la două la patru este tipic, în funcție de mărimea paginii și de conținut."),
          h3("Ce rezoluție au nevoie imaginile?"),
          p("Aproximativ 300 dpi la dimensiunea finală pentru tipar."),
          h3("Să tipăresc sau să trimit un PDF?"),
          p("Ambele pot fi utile. Un PDF e bun pentru distribuire online, tiparul pentru impact în persoană."),
        ],
      },
    ],
    related: { projects: ["regata-print", "floraria-mariei"], services: ["printed-media"] },
  },
  {
    id: "promotional-materials",
    slug: "materiale-promotionale-care-functioneaza",
    title: "Materiale promoționale care funcționează: care merită tipărite",
    seoTitle: "Materiale promoționale care funcționează",
    description: "Pixuri, genți, broșuri, bannere, stickere. Cum decizi ce articole promoționale se potrivesc brandului și publicului tău și cum le proiectezi bine.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-stand-out", alt: "Colaj roz și bleumarin cu un scorpion gravat, o călimară, un ochi în semitonuri și o floare" },
    intro: "Materialele promoționale tipărite pot întări un brand sau pot irosi un buget. Diferența ține de obicei de relevanță. Articolele pe care oamenii le păstrează, le folosesc și le asociază cu o experiență bună funcționează. Cele generice, pe care nu le vrea nimeni, nu.",
    sections: [
      {
        id: "scop",
        heading: "Începe cu scopul",
        blocks: [
          ul("Notorietate la un eveniment sau într-un magazin.", "Mulțumirea clienților.", "Susținerea unei vânzări sau a unei prezentări.", "Recomandări și clienți care revin."),
        ],
      },
      {
        id: "alege",
        heading: "Alege articole pe care oamenii chiar le folosesc",
        blocks: [
          p("Gândește-te la rutina zilnică a publicului tău. Un caiet poate se potrivi unui consultant; o geantă de pânză, unui boutique; un catalog durabil, unei companii industriale care expune utilaje la un târg."),
        ],
      },
      {
        id: "lista",
        heading: "Opțiuni frecvente",
        blocks: [
          ul("Broșuri și cataloage pentru informații.", "Stickere și etichete pentru branduri mici și magazine.", "Ambalaje, hârtie de împachetat și cărți de mulțumire pentru e-commerce.", "Bannere roll-up și panouri pentru evenimente.", "Papetărie cu brand, așa cum am discutat în ghidul meu despre papetărie."),
        ],
      },
      {
        id: "design",
        heading: "Proiectează ca pe o familie",
        blocks: [
          ol("Folosește aceleași culori, fonturi și plasare a logoului.", "Include un îndemn clar la acțiune.", "Păstrează compozițiile simple și îndrăznețe.", "Testează lizibilitatea la dimensiunea reală."),
          p("O familie ordonată de materiale face o companie mică să pară consacrată, ca în proiectul KDT Romania."),
        ],
      },
      {
        id: "calitate",
        heading: "Calitate înaintea cantității",
        blocks: [
          p("Câteva articole bine făcute bat un stoc mare de articole slabe. Comandă o mostră, verifică culorile și hârtia și începe cu cantități mici."),
        ],
      },
      {
        id: "masoara",
        heading: "Măsoară efectul",
        blocks: [
          p("Folosește coduri, linkuri sau o întrebare la plată ca să vezi ce materiale aduc rezultate. Pentru ajutor cu designul promoțional, vezi serviciile mele de design pentru print și branding."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Mai merită materialele tipărite?"),
          p("Da, pentru evenimente, afaceri locale și impresii premium, alături de canalele digitale."),
          h3("Câte articole ar trebui să comand?"),
          p("Începe mic, apoi recomandă când știi ce funcționează."),
          h3("Cum fac articolele promoționale să pară premium?"),
          p("Design bun, material bun și reținere."),
        ],
      },
    ],
    related: { projects: ["kdt-romania", "regata-print"], services: ["printed-media", "branding"] },
  },
  {
    id: "ux-vs-ui",
    slug: "ux-vs-ui-design-care-este-diferenta",
    title: "UX vs UI design: care este diferența și de ce contează amândouă",
    seoTitle: "UX vs UI design: diferența explicată",
    description: "UX înseamnă cum funcționează un produs pentru oameni, UI cum arată și cum se simte pe ecran. Cum diferă, cum lucrează împreună și ce să întrebi un designer.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-identity", alt: "Colaj roz cu un chip clasic în semitonuri, o schiță pe hârtie și o mână care ține un stilou" },
    intro: "UX și UI sunt adesea menționate împreună, de aceea se confundă. Sunt două fețe ale aceluiași produs. Una răspunde la „funcționează asta pentru oameni?”, cealaltă la „arată și se simte bine?”. Un produs bun are nevoie de ambele.",
    sections: [
      {
        id: "ux",
        heading: "Ce este designul UX",
        blocks: [
          p("Designul experienței utilizatorului ține de cum funcționează un produs pentru persoana care îl folosește. Acoperă înțelegerea utilizatorilor, maparea sarcinilor, structurarea informațiilor, planificarea fluxurilor și testarea. Întrebarea este: își pot atinge oamenii scopul ușor?"),
          ul("Cercetare de utilizatori și persona.", "Arhitectura informației și fluxuri.", "Wireframe-uri și prototipuri.", "Teste de utilizabilitate."),
        ],
      },
      {
        id: "ui",
        heading: "Ce este designul UI",
        blocks: [
          p("Designul interfeței este stratul vizual și interactiv: compoziție, culori, tipografie, butoane, pictograme, spațiere și stări. Întrebarea este: arată clar, consecvent și în stilul brandului?"),
          ul("Stil vizual și sisteme de design.", "Componente precum butoane și formulare.", "Compoziții responsive pentru ecrane diferite.", "Mișcare și feedback."),
        ],
      },
      {
        id: "impreuna",
        heading: "Cum lucrează împreună",
        blocks: [
          p("UX decide ce merge unde și de ce. UI decide cum arată. O interfață frumoasă cu un flux confuz eșuează. Un flux logic cu o interfață slabă pare nedemn de încredere. În proiecte precum Vibrary, o aplicație de citit, structura, utilizabilitatea și stilul vizual au fost proiectate împreună."),
        ],
      },
      {
        id: "exemplu",
        heading: "Un exemplu simplu",
        blocks: [
          p("Pe o pagină de comandă pentru un brand de livrare de mâncare precum Green Table, UX decide pașii de la alegerea unui plan până la plată. UI decide cum sunt prezentate farfuriile, cum arată butoanele și cum susțin culorile apetitul și claritatea."),
        ],
      },
      {
        id: "intreaba",
        heading: "Ce să întrebi un designer",
        blocks: [
          ol("Cum înțelegi utilizatorii?", "Poți arăta un flux, nu doar ecrane?", "Cum asiguri consecvența?", "Cum testezi?"),
          p("Pentru designul interfeței unei aplicații sau al unui site, vezi serviciul meu de design UX/UI."),
        ],
      },
      {
        id: "intrebari-frecvente",
        heading: "Întrebări frecvente",
        blocks: [
          h3("Poate o singură persoană să facă și UX, și UI?"),
          p("Da, mai ales la proiecte mici."),
          h3("Care ar trebui să vină primul?"),
          p("UX, pentru că structura și fluxurile modelează interfața."),
          h3("Este UX doar pentru aplicații?"),
          p("Nu. Site-urile, fluxurile de print și serviciile au și ele experiență de utilizare."),
        ],
      },
    ],
    related: { projects: ["vibrary", "green-table"], services: ["ux-ui-design"] },
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
