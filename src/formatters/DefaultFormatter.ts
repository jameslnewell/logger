import { inspect } from 'util';
import chalk from 'chalk';
import * as colorize from 'string-to-color';
import { Level } from '../Level';
import { Formatter } from '../Formatter';

export interface DefaultFormatterOptions {
  colors?: boolean;
}

export class DefaultFormatter implements Formatter {
  
  constructor(private options: DefaultFormatterOptions = {colors: true}) {
  }

  format(log) {
    const ctx = new chalk.constructor({enabled: this.options.colors});
    const {level, source, time, data, ...meta} = log;
    const emoji = level === Level.INFORMATION ? 'ℹ️  ' : level === Level.WARNING ? '⚠️  ' : level === Level.ERROR ? '❌ ' : '';
    const s = source ? `${ctx.hex(colorize(source)).bold(source)} ` : '';
    const t = time ? `${ctx.grey.bold(new Date(time).toISOString())} ` : '';
    const d = typeof data === 'string' ? `${data} ` : `${inspect(data)} `;
    const m = Object.keys(meta).length ? `[${Object.keys(meta).map(k => `${ctx.bold(k)}=${inspect(meta[k])}`)}] ` : '';
    return `${emoji}${s}${t}${d}${m}`;
  }
  
};
