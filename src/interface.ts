import { TGameNiceId } from './types';

export interface User {
  firstName: string;
  lastName: string;
  job: string;
  isObserver: boolean;
  foto: string;
  niceId?: TGameNiceId;
  id?: number;
  updatedAt?: string;
  createdAt?: string;
}

export interface IScores {
  issueId: number;
  userId: number;
  score: string;
  id?: number;
  updatedAt?: string;
  createdAt?: string;
}

export interface IServerData {
  game: IGame;
  members: User[];
  issues: IIssues[];
  scores: IScores[];
  usersIssues: { [key: string]: IScores };
}

export interface ValueURL {
  gameNiceId: TGameNiceId;
}
export interface IGame {
  gameNiceId?: TGameNiceId;
  diller_nice_id?: string,
  userId?: number;
  status: string;
  id?: number;
  niceId?: TGameNiceId;
  updatedAt?: string;
  createdAt?: string;
}

/**
 * Deprecated, use an User interface instead
 */
export interface IMembers {
  nice_id: string;
  first_name: string;
  last_name: string;
  is_diller: boolean;
  is_player: boolean;
  job: string;
}
export interface IIssues {
  title: string;
  nice_id: string;
  is_current: boolean;
  is_finished: boolean;
  link: string;
  priority: 'low' | 'middle' | 'high';
  id?: number;
  updatedAt?: string;
  createdAt?: string;
}
