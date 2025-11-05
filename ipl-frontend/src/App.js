import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import ChartCard from './components/ChartCard';
import {
  fetchYears,
  fetchMatchesPerYear,
  fetchMatchesWonPerTeam,
  fetchExtraRuns,
  fetchTopBowlers,
  fetchMatchStats,
} from './services/api';
import { TEAM_COLORS } from './constants/teamColors';
import { styles } from './styles/styles';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const App = () => {
  const [years, setYears] = useState([]);
  const [matchesPerYear, setMatchesPerYear] = useState([]);
  const [matchesWonData, setMatchesWonData] = useState([]);
  const [extraRuns, setExtraRuns] = useState([]);
  const [topBowlers, setTopBowlers] = useState([]);
  const [matchStats, setMatchStats] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2017');
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    (async () => {
      const [years, matchesPerYear, matchesWon] = await Promise.all([
        fetchYears(),
        fetchMatchesPerYear(),
        fetchMatchesWonPerTeam(),
      ]);
      setYears(years);
      setMatchesPerYear(matchesPerYear);
      transformMatchesWon(matchesWon);
      if (years.length > 0) setSelectedYear(years.at(-1).toString());
    })();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      (async () => {
        const [extra, bowlers, stats] = await Promise.all([
          fetchExtraRuns(selectedYear),
          fetchTopBowlers(selectedYear),
          fetchMatchStats(selectedYear),
        ]);
        setExtraRuns(extra);
        setTopBowlers(
          bowlers.map(b => ({ ...b, economy: parseFloat(b.economy).toFixed(2) }))
        );
        setMatchStats(stats);
      })();
    }
  }, [selectedYear]);

  const transformMatchesWon = data => {
    const teams = [...new Set(data.map(d => d.winner))];
    const seasons = [...new Set(data.map(d => d.season))].sort();
    const transformed = seasons.map(season => {
      const seasonData = { season };
      teams.forEach(team => {
        const record = data.find(d => d.season === season && d.winner === team);
        seasonData[team] = record ? record.wins : 0;
      });
      return seasonData;
    });
    setMatchesWonData(transformed);
  };

  return (
    <div style={styles.body}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={styles.container}>
        {activeTab === 'home' && (
          <>
            <h2 style={{ ...styles.pageTitle, textAlign: 'center', marginBottom: '2rem' }}>
              IPL Overview - All Seasons
            </h2>

            <ChartCard
              title="📊 Matches Played Per Year"
              colorStyle={styles.headerBlue}
              description="Total number of IPL matches played each season"
            >
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={matchesPerYear}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="season" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="matches" fill="#0d6efd" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard
              title="🏆 Matches Won by Teams Over Years"
              colorStyle={styles.headerGreen}
              description="Stacked bar chart showing wins per team across all seasons"
            >
              <ResponsiveContainer width="100%" height={500}>
                <BarChart data={matchesWonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="season" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {matchesWonData[0] &&
                    Object.keys(matchesWonData[0])
                      .filter(k => k !== 'season')
                      .map((team, idx) => (
                        <Bar
                          key={team}
                          dataKey={team}
                          stackId="a"
                          fill={TEAM_COLORS[team] || `hsl(${idx * 30}, 70%, 50%)`}
                        />
                      ))}
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </>
        )}

        {activeTab === 'year-stats' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h2 style={styles.pageTitle}>📅 Year-wise Statistics</h2>
              <select
                style={styles.select}
                value={selectedYear}
                onChange={e => setSelectedYear(e.target.value)}
              >
                {years.map(y => (
                  <option key={y} value={y}>
                    Season {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Yearly Charts */}
            <ChartCard
              title={`⚠️ Extra Runs Conceded Per Team (${selectedYear})`}
              colorStyle={styles.headerRed}
              description="Total extra runs conceded by bowling teams"
            >
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={extraRuns}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="bowling_team"
                    angle={-45}
                    textAnchor="end"
                    height={120}
                    interval={0}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="extra_runs" fill="#dc3545" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard
              title={`🎯 Top 10 Economical Bowlers (${selectedYear})`}
              colorStyle={styles.headerGreen}
              description="Bowlers with best economy rates"
            >
              <ResponsiveContainer width="100%" height={450}>
                <BarChart data={topBowlers} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="bowler" type="category" width={180} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="economy" fill="#198754" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard
              title={`⚔️ Matches Played vs Matches Won (${selectedYear})`}
              colorStyle={styles.headerInfo}
              description="Team performance comparison"
            >
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={matchStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="team"
                    angle={-45}
                    textAnchor="end"
                    height={120}
                    interval={0}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="played" fill="#0dcaf0" />
                  <Bar dataKey="won" fill="#198754" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </>
        )}
      </div>

      <footer style={styles.footer}>
        <p style={{ margin: 0 }}>IPL Analytics Dashboard © 2024 | Data source: Kaggle IPL Dataset</p>
      </footer>
    </div>
  );
};

export default App;
