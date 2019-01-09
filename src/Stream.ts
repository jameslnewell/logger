import { Readable } from 'stream';
import {Log} from './Log';

export class Stream extends Readable {

  constructor() {
    super({objectMode: true});
  }

  log(log: Log) {
    this.push(log);
  }

  _read() {
  }

}
