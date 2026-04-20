const BASE = "/stars-not-wars";

const copy = {
  en: {
    navDashboard: "Dashboard",
    navGithub: "GitHub",
    navLanguage: "Українською",
    heroKicker: "Civilization Data Project + Open Research Lab",
    heroTitle: "Stars Not Wars",
    heroText:
      "Humanity is burning too much of its future on war and too little on life, science, and long-term civilization. This project makes that visible.",
    exploreDashboard: "Explore Dashboard",
    readManifesto: "Read the Manifesto",
    whatTitle: "What is this?",
    whatText:
      "A Civilization Data Project and Open Research Lab exploring how humanity spends its resources: on destruction or on life.",
    coreTitle: "Core question",
    coreText: "How does humanity spend its energy: on destruction or on the future?",
    whyTitle: "Why now",
    whyText:
      "We live in a moment of extraordinary human capability — and extraordinary waste. If civilization can measure what it destroys, it can also begin to choose differently.",
    dashboardPreviewTitle: "Dashboard",
    dashboardPreviewText:
      "The dashboard will grow into a research space with indicators, charts, comparisons, and data snapshots.",
    openDashboard: "Open Dashboard",
    widgetMilitary: "Global military spending",
    widgetMilitaryNote: "Latest full-year estimate",
    widgetSecond: "Military spending per second",
    widgetSecondNote: "Derived from annual total",
    widgetRd: "Global R&D spending",
    widgetRdNote: "Placeholder until a stable source is selected",
    widgetLife: "World life expectancy",
    widgetLifeNote: "Placeholder until a stable source is selected",
    dashboardTitle: "Dashboard",
    dashboardText:
      "The first living data layer of Stars Not Wars. For now it uses a tiny local JSON snapshot. Later it will be generated from public sources.",
    trendTitle: "World trend",
    spendersTitle: "Top military spenders",
    footer:
      "This is an early static prototype. Some values are placeholders until source pipelines are added.",
  },
  uk: {
    navDashboard: "Дашборд",
    navGithub: "GitHub",
    navLanguage: "English",
    heroKicker: "Civilization Data Project + Open Research Lab",
    heroTitle: "Stars Not Wars",
    heroText:
      "Людство спалює занадто велику частину свого майбутнього на війну і занадто малу — на життя, науку та довгий цивілізаційний розвиток. Цей проєкт робить це видимим.",
    exploreDashboard: "Відкрити дашборд",
    readManifesto: "Прочитати маніфест",
    whatTitle: "Що це?",
    whatText:
      "Civilization Data Project і Open Research Lab, що досліджує, як людство витрачає свої ресурси: на руйнування чи на життя.",
    coreTitle: "Головне питання",
    coreText: "На що людство витрачає свою енергію: на руйнування чи на майбутнє?",
    whyTitle: "Чому зараз",
    whyText:
      "Ми живемо в момент надзвичайної людської спроможності — і надзвичайного марнотратства. Якщо цивілізація може виміряти те, що вона руйнує, вона може почати обирати інакше.",
    dashboardPreviewTitle: "Дашборд",
    dashboardPreviewText:
      "Дашборд поступово стане дослідницьким простором з індикаторами, графіками, порівняннями та дата-зрізами.",
    openDashboard: "Відкрити дашборд",
    widgetMilitary: "Глобальні військові витрати",
    widgetMilitaryNote: "Остання повна річна оцінка",
    widgetSecond: "Військові витрати за секунду",
    widgetSecondNote: "Розраховано з річної суми",
    widgetRd: "Глобальні витрати на R&D",
    widgetRdNote: "Плейсхолдер до вибору стабільного джерела",
    widgetLife: "Світова тривалість життя",
    widgetLifeNote: "Плейсхолдер до вибору стабільного джерела",
    dashboardTitle: "Дашборд",
    dashboardText:
      "Перший живий дата-шар Stars Not Wars. Поки що він використовує маленький локальний JSON-зріз. Пізніше він генеруватиметься з публічних джерел.",
    trendTitle: "Світовий тренд",
    spendersTitle: "Топ військових витрат",
    footer:
      "Це ранній статичний прототип. Частина значень є плейсхолдерами до додавання дата-пайплайнів.",
  },
};

function getLang() {
  return window.location.pathname.includes("/uk") ? "uk" : "en";
}

function isDashboard() {
  return window.location.pathname.includes("/dashboard");
}

function money(value) {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function number(value, digits = 1) {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en", {
    maximumFractionDigits: digits,
  }).format(value);
}

async function loadJson(path) {
  const response = await fetch(`${BASE}${path}`);
  if (!response.ok) throw new Error(`Failed to load ${path}`);
  return response.json();
}

function renderHeader(lang) {
  const t = copy[lang];
  const isUk = lang === "uk";

  return `
    <header class="header">
      <div class="container nav">
        <a class="brand" href="${BASE}${isUk ? "/uk/" : "/"}">🛰️ Stars Not Wars</a>
        <nav class="nav-links">
          <a href="${BASE}${isUk ? "/uk/dashboard/" : "/dashboard/"}">${t.navDashboard}</a>
          <a href="https://github.com/StepanenkoR/stars-not-wars" target="_blank" rel="noreferrer">${t.navGithub}</a>
          <a href="${BASE}${isUk ? "/" : "/uk/"}">${t.navLanguage}</a>
        </nav>
      </div>
    </header>
  `;
}

function statCard(title, value, note, warning = "") {
  return `
    <div class="card stat-card">
      <div class="stat-label">${title}</div>
      <div class="stat-value">${value}</div>
      <div class="stat-note">${note}</div>
      ${warning ? `<div class="warning">${warning}</div>` : ""}
    </div>
  `;
}

async function renderHome(lang) {
  const t = copy[lang];
  const isUk = lang === "uk";
  const snapshot = await loadJson("/data/snapshot.json");

  document.documentElement.lang = lang;
  document.title = "Stars Not Wars";

  document.querySelector("#app").innerHTML = `
    ${renderHeader(lang)}

    <main class="container main">
      <section class="hero">
        <div class="kicker">${t.heroKicker}</div>
        <h1>${t.heroTitle}</h1>
        <p>${t.heroText}</p>

        <div class="actions">
          <a class="button primary" href="${BASE}${isUk ? "/uk/dashboard/" : "/dashboard/"}">${t.exploreDashboard}</a>
          <a class="button secondary" href="https://github.com/StepanenkoR/stars-not-wars" target="_blank" rel="noreferrer">${t.readManifesto}</a>
        </div>
      </section>

      <section class="grid stats-grid">
        ${statCard(
          t.widgetMilitary,
          `$${money(snapshot.world.military_spending_usd)}`,
          `${t.widgetMilitaryNote}, ${snapshot.year}`
        )}

        ${statCard(
          t.widgetSecond,
          `$${money(snapshot.world.military_spending_per_second_usd)}`,
          t.widgetSecondNote
        )}

        ${statCard(
          t.widgetRd,
          snapshot.world.rd_spending_usd ? `$${money(snapshot.world.rd_spending_usd)}` : "—",
          t.widgetRdNote,
          snapshot.world.rd_spending_usd ? "" : "source needed"
        )}

        ${statCard(
          t.widgetLife,
          snapshot.world.life_expectancy_years ? `${number(snapshot.world.life_expectancy_years, 1)} years` : "—",
          t.widgetLifeNote,
          snapshot.world.life_expectancy_years ? "" : "source needed"
        )}
      </section>

      <section class="grid two-col">
        <div class="card">
          <h2>${t.whatTitle}</h2>
          <p>${t.whatText}</p>
        </div>

        <div class="card">
          <h2>${t.coreTitle}</h2>
          <p>${t.coreText}</p>
        </div>
      </section>

      <section class="card">
        <h2>${t.whyTitle}</h2>
        <p>${t.whyText}</p>
      </section>

      <section class="card" style="margin-top: 16px;">
        <h2>${t.dashboardPreviewTitle}</h2>
        <p>${t.dashboardPreviewText}</p>
        <div class="actions">
          <a class="button primary" href="${BASE}${isUk ? "/uk/dashboard/" : "/dashboard/"}">${t.openDashboard}</a>
        </div>
      </section>

      <footer class="footer">${t.footer}</footer>
    </main>
  `;
}

async function renderDashboard(lang) {
  const t = copy[lang];
  const isUk = lang === "uk";
  const data = await loadJson("/data/dashboard.json");

  document.documentElement.lang = lang;
  document.title = lang === "uk" ? "Дашборд · Stars Not Wars" : "Dashboard · Stars Not Wars";

  document.querySelector("#app").innerHTML = `
    ${renderHeader(lang)}

    <main class="container main">
      <section class="hero">
        <div class="kicker">${t.heroKicker}</div>
        <h1>${t.dashboardTitle}</h1>
        <p>${t.dashboardText}</p>
      </section>

      <section class="grid dashboard-grid">
        <div class="card">
          <h2>${t.trendTitle}</h2>
          <div class="chart-box">
            <canvas id="trendChart"></canvas>
          </div>
        </div>

        <div class="card">
          <h2>${t.spendersTitle}</h2>
          <div class="chart-box">
            <canvas id="spendersChart"></canvas>
          </div>
        </div>
      </section>

      <footer class="footer">${t.footer}</footer>
    </main>
  `;

  renderCharts(data);
}

function renderCharts(data) {
  const trendCanvas = document.querySelector("#trendChart");
  const spendersCanvas = document.querySelector("#spendersChart");

  new Chart(trendCanvas, {
    type: "line",
    data: {
      labels: data.world_trend.map((row) => row.year),
      datasets: [
        {
          label: "Military spending",
          data: data.world_trend.map((row) => row.military_usd),
          borderWidth: 2,
          tension: 0.25,
        },
        {
          label: "R&D spending",
          data: data.world_trend.map((row) => row.rd_usd),
          borderWidth: 2,
          tension: 0.25,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => `${context.dataset.label}: $${money(context.raw)}`,
          },
        },
      },
      scales: {
        y: {
          ticks: {
            callback: (value) => `$${money(value)}`,
          },
        },
      },
    },
  });

  new Chart(spendersCanvas, {
    type: "bar",
    data: {
      labels: data.top_military_spenders.map((row) => row.name),
      datasets: [
        {
          label: "Military spending",
          data: data.top_military_spenders.map((row) => row.value),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => `$${money(context.raw)}`,
          },
        },
      },
      scales: {
        y: {
          ticks: {
            callback: (value) => `$${money(value)}`,
          },
        },
      },
    },
  });
}

async function main() {
  const lang = getLang();

  try {
    if (isDashboard()) {
      await renderDashboard(lang);
    } else {
      await renderHome(lang);
    }
  } catch (error) {
    document.querySelector("#app").innerHTML = `
      <main class="container main">
        <section class="card">
          <h1>Something went wrong</h1>
          <p>Could not load the static prototype data.</p>
        </section>
      </main>
    `;
    console.error(error);
  }
}

main();
