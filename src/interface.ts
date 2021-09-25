import { TNiceId, TGameStatus, TIssuePriority, TIssueStatus } from './types';

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
  game: IGame | Record<string, never>;
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
  isCurrent: boolean;
  link?: string;
  priority: TIssuePriority;
  status: TIssueStatus;
  id: number;
  updatedAt?: string;
  createdAt?: string;
}

export interface ICreateIssue {
  title: string;
  isCurrent?: boolean;
  link: string;
  priority: TIssuePriority;
}
