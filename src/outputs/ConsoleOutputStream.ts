import { Writable } from 'stream';
import {DefaultFormatter} from '../formatters'
import { Formatter } from '../formatter';

const defaultOptions = {
  formatter: new DefaultFormatter()
};

export interface ConsoleOutputStreamOptions {
  formatter?: Formatter;
}

export class ConsoleOutputStream extends Writable {

  constructor(private options: ConsoleOutputStreamOptions = defaultOptions) {
    super({objectMode: true});
  }

  _write(chunk: any, encoding: string, callback: (error?: Error) => void) {
    const output = console.log;
    output(this.options.formatter.format(chunk));
    callback();
  }

}
