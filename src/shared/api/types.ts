export type User = {
  id: number;
  username: string;
  avatar: string;
}

export type OpenGame = {
  id: number;
  title: string;
  maxGamers: number;
  start?: string;
  master: User;
  gamersNames: string[];
}