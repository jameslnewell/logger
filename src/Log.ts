import { Level } from "./Level";

export type Log = {
  name?: string;
  level: Level;
  data: any;
  [name: string]: any;
};
