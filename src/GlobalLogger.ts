
import {Writable} from 'stream';
import {Logger} from "./Logger";
import {run} from './plugins/run';

export class GlobalLogger extends Logger {

  extend(source?: string): Logger {
    const logger = new Logger(this.stream);
    
    // add the source
    if (source) {
      logger.use(log => ({...log, source}));
    }

    // apply the plugins - including the most recent ones added to global logger
    logger.use(log => run(log, this.plugins));

    return logger;
  }

  pipe(destination: Writable): Writable {
    return this.stream.pipe(destination);
  }

}
