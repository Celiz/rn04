import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useMatches } from '../../hooks/useMatches';
import { Match } from '../../types';
import { useTeams } from '../../hooks/useTeams';

const MainScreen = () => {
  const { matches, fetchMatches } = useMatches();
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [recentMatches, setRecentMatches] = useState<Match[]>([]);
  const { teams, fetchTeams} = useTeams();

  useEffect(() => {
    fetchMatches();
    fetchTeams();

  }, []);

  useEffect(() => {
    if (matches.length > 0) {
      const today = new Date();
      const upcoming = matches.filter((match) => new Date(match.date) > today);
      const recent = matches.filter((match) => new Date(match.date) <= today);
      setUpcomingMatches(upcoming);
      setRecentMatches(recent);
    }
  }, [matches]);

  const getTeamInfo = (teamId: number) => {
    const team = teams.find(team => team.id === teamId);
    return {
      name: team?.name || 'Team not found',
      shield: team?.team_shield || 'https://via.placeholder.com/50'
    };
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Próximos Partidos</Text>
        {upcomingMatches.map((match, index) => (
          <View key={index} style={[styles.card, styles.singleLineCard]}>
            <View style={styles.teamRow}>
              <Image source={{ uri: getTeamInfo(match.local_team).shield }} style={styles.teamShield} />
              <Text style={styles.teamName}>{getTeamInfo(match.local_team).name}</Text>
            </View>
            <Text style={styles.cardText}>vs</Text>
            <View style={styles.teamRow}>
              <Image source={{ uri: getTeamInfo(match.away_team).shield }} style={styles.teamShield} />
              <Text style={styles.teamName}>{getTeamInfo(match.away_team).name}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.title}>Últimos Resultados</Text>
        {recentMatches.map((match, index) => (
          <View key={index} style={[styles.card, styles.singleLineCard]}>
            <View style={styles.teamRow}>
              <Image source={{ uri: getTeamInfo(match.local_team).shield }} style={styles.teamShield} />
              <Text style={styles.teamName}>{getTeamInfo(match.local_team).name}</Text>
            </View>
            <Text style={styles.cardText}>{match.local_team_goals} - {match.away_team_goals}</Text>
            <View style={styles.teamRow}>
              <Image source={{ uri: getTeamInfo(match.away_team).shield }} style={styles.teamShield} />
              <Text style={styles.teamName}>{getTeamInfo(match.away_team).name}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  singleLineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamShield: {
    width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    marginHorizontal: 8,
  },
});

export default MainScreen;