import { TNiceId, TGameStatus, TIssuePriority } from './types';

export interface IUser {
  firstName: string;
  lastName: string;
  job: string;
  isObserver: boolean;
  isDiller: boolean;
  token?:string;
  foto?: string;
  niceId?: TNiceId;
  id?: number;
  updatedAt?: string;
  createdAt?: string;
}

export interface IScore {
  issueId: number;
  userId: number;
  score: string;
  id?: number;
  updatedAt?: string;
  createdAt?: string;
}

export interface IServerData {
  game: IGame;
  members: IUser[];
  issues: IIssue[];
  scores: IScore[];
  usersIssues: { [key: string]: IScore };
}

export interface ValueURL {
  gameNiceId: TNiceId;
}
export interface IGame {
  userId?: number;
  status: TGameStatus;
  id?: number;
  niceId?: TNiceId;
  updatedAt?: string;
  createdAt?: string;
}

export interface IIssue {
  title: string;
  niceId: string;
  isCurrent: boolean;
  isFinished?: boolean;
  link: string;
  priority: TIssuePriority;
  id?: number;
  updatedAt?: string;
  createdAt?: string;
}
