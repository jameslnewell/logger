import { Plugin } from '../Plugin';
import { Log } from '../Log';

export function filter(filter: (log: Log) => boolean): Plugin {
  return log => {
    if (filter(log)) {
      return log;
    } else {
      return undefined;
    }
  }
}
