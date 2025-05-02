export async function fetchTeams() {
  const res = await fetch("https://63ee0ec0388920150dd83e3c.mockapi.io/teams");
  const data = await res.json();
  return data;
}
export function splitHomeAway(teams) {
  return {
    home: teams.map((team) => ({
      ...team,
      points: Math.floor(team.points * 0.6),
    })),
    away: teams.map((team) => ({
      ...team,
      points: Math.floor(team.points * 0.4),
    })),
  };
}
