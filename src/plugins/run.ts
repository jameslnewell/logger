import { Log } from "../Log";
import { Plugin } from "../Plugin";

export function run(log: Log, plugins: Plugin[]): undefined | Log {
  return plugins.reduce((log, plugin) => {
    if (log) {
      return plugin(log);
    } else {
      return undefined;
    }
  }, log);
}