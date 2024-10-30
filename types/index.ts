export interface Team {
    id: string;
    name: string;
    logo_url: string;
    created_at: string;
  }
  
  export interface Player {
    id: string;
    first_name: string;
    last_name: string;
    age: number;
    position: string;
    jersey_number: number;
    team_id: string;
    photo_url?: string;
  }
  
  export interface Match {
    id: string;
    home_team_id: string;
    away_team_id: string;
    date: string;
    location: {
      latitude: number;
      longitude: number;
      address: string;
    };
    score_home?: number;
    score_away?: number;
    status: 'scheduled' | 'in_progress' | 'finished';
  }
  
  export interface Stats {
    player_id: string;
    match_id: string;
    goals: number;
    yellow_cards: number;
    red_cards: number;
  }
  
  export interface User {
    id: string;
    email: string;
    username?: string;
    role: 'admin' | 'player' | 'follower';
  }