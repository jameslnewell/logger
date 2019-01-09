import { Stream } from "./Stream";
import { Level } from "./Level";
import { Plugin } from "./Plugin";
import { run } from "./plugins/run";

export class Logger {

  public readonly plugins: Plugin[] = [];

  constructor(protected readonly stream: Stream) {
  }

  use(plugin: Plugin): Logger {
    this.plugins.push(plugin);
    return this;
  }
  
  log(level: Level, data: any): Logger {
    const log = run({level, data}, this.plugins);
    if (log) {
      this.stream.log(log)
    }
    return this;
  }

  info(data: any): Logger {
    this.log(Level.info, data);
    return this;
  }

  warn(data: any): Logger {
    this.log(Level.warning, data);
    return this;
  }

  error(data: any): Logger {
    this.log(Level.error, data);
    return this;
  }

}