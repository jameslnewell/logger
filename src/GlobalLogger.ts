
import {Writable} from 'stream';
import {Logger} from "./Logger";
import {name as namePlugin} from './plugins'
import { run } from './plugins/run';

export class GlobalLogger extends Logger {

  extend(name?: string): Logger {
    const logger = new Logger(this.stream);
    
    // add the name
    if (name) {
      logger.use(namePlugin(name));
    }

    // apply the plugins - including the most recent ones added to global logger
    logger.use(log => run(log, this.plugins));

    return logger;
  }

  pipe(destination: Writable): Writable {
    return this.stream.pipe(destination);
  }

}
