import { Level } from "./Level";

export type Log = {
  source?: string;
  level: Level;
  data: any;
  [name: string]: any;
};
