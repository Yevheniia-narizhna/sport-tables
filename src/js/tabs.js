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

  Object.entries(grouped).forEach(([groupName, teams]) => {
    teams.sort((a, b) => b.points - a.points);
    const table = document.createElement("table");

    const thead = `<thead><tr><th>Name</th><th>Points</th></tr></thead>`;
    const rows = teams
      .map(
        (t) => `<tr>
          <td>${t.name}<span class="tooltip">${t.description || ""}</span></td>
          <td>${t.points}</td>
        </tr>`
      )
      .join("");

    table.innerHTML = thead + `<tbody>${rows}</tbody>`;
    targetTable.appendChild(table);
  });

  cachedTables[type] = true;
};

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
