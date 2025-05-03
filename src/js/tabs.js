import { fetchTeams, splitHomeAway } from "./api";

let cachedTables = { general: false, home: false, away: false };

const renderTable = async (type, targetTable) => {
  const data = await fetchTeams();
  let grouped = {};

  if (type === "home" || type === "away") {
    const split = splitHomeAway(data);
    const selected = split[type];
    selected.forEach((team) => {
      if (!grouped[team.group]) grouped[team.group] = [];
      grouped[team.group].push(team);
    });
  } else {
    data.forEach((team) => {
      if (!grouped[team.group]) grouped[team.group] = [];
      grouped[team.group].push(team);
    });
  }

  targetTable.innerHTML = "";

  // const headers = ["Игры", "В", "Н", "П", "З-П", "Форма", "Очки"];

  const headers = [
    `<span class="header-full">Игры</span><span class="header-short">И</span>`,
    `<span class="header-full">В</span><span class="header-short">В</span>`,
    `<span class="header-full">Н</span><span class="header-short">Н</span>`,
    `<span class="header-full">П</span><span class="header-short">П</span>`,
    `<span class="header-full">З-П</span><span class="header-short">З-П</span>`,
    `<span class="header-full">Форма</span>`,
    `<span class="header-full">Очки</span><span class="header-short">О</span>`,
  ];

  const icons = {
    W: `<svg class="icon-td">
            <use href="/symbol-defs.svg#icon-Frame9428" />
          </svg>`,
    D: `<svg class="icon-td">
            <use href="/symbol-defs.svg#icon-Frame9401" />
          </svg>`,
    L: `<svg class="icon-td">
            <use href="/symbol-defs.svg#icon-Frame9425" />
          </svg>`,
  };

  Object.entries(grouped).forEach(([groupName, teams]) => {
    teams.sort((a, b) => b.points - a.points);
    const table = document.createElement("table");
    table.classList.add("group-table", `group-${groupName}`);

    const thead = `<thead>
    <tr class="head-tabl">
      <th class="group-th" colspan="3">ГРУПА ${groupName}</th>
      ${headers
        .map((h, index) => `<th class="tabl-${index}">${h}</th>`)
        .join("")}
    </tr>
  </thead>`;
    const rows = teams
      .map((t, index) => {
        const formHtml = t.form.map((letter) => icons[letter]).join(" ");
        const rankClass =
          index + 1 === 1
            ? "first"
            : index + 1 === 2
            ? "second"
            : index + 1 === 3
            ? "third"
            : "last";

        return `<tr>
        <td> <span class="rank-td ${rankClass}">${
          index + 1
        }<span class="tooltip">Лига чемпионов</span></span></td>
          <td class="logo-td"><img src="${t.logo}" alt="${t.name.charAt(
          0
        )}" width="30" /></td>
          <td class="team-name-td">${t.name}</td>
          <td class="games-td">${t.games}</td>
          <td class="wins-td">${t.wins}</td>
          <td class="draws-td">${t.draws}</td>
          <td class="loses-td">${t.loses}</td>
          <td class="score-td">${t.scored}-${t.conceded}</td>
          <td class="form-td">${formHtml}</td>
          <td class="points-td">${t.points}</td>
        </tr>`;
      })
      .join("");

    table.innerHTML = thead + `<tbody>${rows}</tbody>`;
    targetTable.appendChild(table);
  });

  cachedTables[type] = true;
};

// const renderTable = async (type, targetTable) => {
//   const data = await fetchTeams();
//   let grouped = {};

//   if (type === "home" || type === "away") {
//     const split = splitHomeAway(data);
//     const selected = split[type];
//     selected.forEach((team) => {
//       if (!grouped[team.group]) grouped[team.group] = [];
//       grouped[team.group].push(team);
//     });
//   } else {
//     data.forEach((team) => {
//       if (!grouped[team.group]) grouped[team.group] = [];
//       grouped[team.group].push(team);
//     });
//   }

//   targetTable.innerHTML = "";

//   Object.entries(grouped).forEach(([groupName, teams]) => {
//     teams.sort((a, b) => b.points - a.points);
//     const table = document.createElement("table");

//     const thead = `<thead><tr><th>Name</th><th>Points</th></tr></thead>`;
//     const rows = teams
//       .map(
//         (t) => `<tr>
//           <td>${t.name}<span class="tooltip">${t.description || ""}</span></td>
//           <td>${t.points}</td>
//         </tr>`
//       )
//       .join("");

//     table.innerHTML = thead + `<tbody>${rows}</tbody>`;
//     targetTable.appendChild(table);
//   });

//   cachedTables[type] = true;
// };

document.addEventListener("DOMContentLoaded", async () => {
  const generalTab = document.querySelector('.tab[data-type="general"]');
  generalTab.classList.add("active");

  const generalTable = document.getElementById("general-table");
  if (!cachedTables.general) {
    await renderTable("general", generalTable);
  }

  generalTable.classList.remove("hidden");

  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", async () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const type = tab.dataset.type;
      const targetTable = document.getElementById(`${type}-table`);

      if (!cachedTables[type]) {
        await renderTable(type, targetTable);
      }

      document.querySelectorAll(".table-wrapper").forEach((table) => {
        table.classList.add("hidden");
      });

      targetTable.classList.remove("hidden");
    });
  });
});
