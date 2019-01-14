import { Log } from "./Log";

export interface Formatter {
  format(log: Log): any;
}
