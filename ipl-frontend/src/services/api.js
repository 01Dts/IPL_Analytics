const API_BASE = 'http://localhost:8000/api';

export const fetchYears = async () => {
  const res = await fetch(`${API_BASE}/available-years/`);
  return res.json();
};

export const fetchMatchesPerYear = async () => {
  const res = await fetch(`${API_BASE}/matches-per-year/`);
  return res.json();
};

export const fetchMatchesWonPerTeam = async () => {
  const res = await fetch(`${API_BASE}/matches-won-per-team/`);
  return res.json();
};

export const fetchExtraRuns = async (year) => {
  const res = await fetch(`${API_BASE}/extra-runs/${year}/`);
  return res.json();
};

export const fetchTopBowlers = async (year) => {
  const res = await fetch(`${API_BASE}/top-bowlers/${year}/`);
  return res.json();
};

export const fetchMatchStats = async (year) => {
  const res = await fetch(`${API_BASE}/matches-stats/${year}/`);
  return res.json();
};
