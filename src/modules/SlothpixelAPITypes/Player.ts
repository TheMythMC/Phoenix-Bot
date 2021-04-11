export interface Player {
  uuid: string;
  username: string;
  name_history: string[];
  online: boolean;
  rank: string;
  rank_plus_color: string;
  rank_formatted: string;
  prefix: string;
  karma: number;
  exp: number;
  level: number;
  achievement_points: number;
  quests_completed: number;
  total_kills: number;
  total_wins: number;
  total_coins: number;
  mc_version: string;
  first_login: number;
  last_login: number;
  last_logout: number;
  last_game: string;
  language: string;
  gifts_sent: number;
  gifts_received: number;
  is_contributor: boolean;
  rewards: {
    streak_current: number;
    streak_best: number;
    claimed: number;
    claimed_daily: number;
    tokens: number;
  };
  voting: {
    votes_today: number;
    total_votes: number;
    last_vote: number;
  };
  links: {
    TWITTER: string;
    YOUTUBE: string;
    INSTAGRAM: string;
    TWITCH: string;
    DISCORD: string;
    HYPIXEL: string;
  };
  stats: {
    Arcade: {
      [key: string]: any;
    }; // idk wat to do with these; we are probs gonna make custom types for them later down the line
    Arena: {
      [key: string]: any;
    };
    Warlords: {
      [key: string]: any;
    };
    BedWars: {
      [key: string]: any;
    };
    BuildBattle: {
      [key: string]: any;
    };
    Duels: {
      [key: string]: any;
    };
    TKR: {
      [key: string]: any;
    };
    Blitz: {
      [key: string]: any;
    };
    CvC: {
      [key: string]: any;
    };
    MurderMystery: {
      [key: string]: any;
    };
    Pit: {
      [key: string]: any;
    };
    Smash: {
      [key: string]: any;
    };
    SkyWars: {
      [key: string]: any;
    };
    TNT: {
      [key: string]: any;
    };
    MegaWalls: {
      [key: string]: any;
    };
  };
}
