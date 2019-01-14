import { Writable } from 'stream';
import { Log } from '../log';
import {DefaultFormatter } from '../formatters';
import { Formatter } from '../Formatter';

const defaultFormatter = new DefaultFormatter({colors: false});

export class MemoryOutputStream extends Writable {

  private logs: Log[] = [];

  constructor() {
    super({objectMode: true});
  }

  _write(chunk: any, encoding: string, callback: (error?: Error) => void) {
    this.logs.push(chunk);
    callback();
  }

  toString(formatter: Formatter = defaultFormatter) {
    return this.logs.map(event => formatter.format(event)).join('\n');
  }

}
