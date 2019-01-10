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
    const {level, name, time, data, ...meta} = log;
    const emoji = level === Level.INFORMATION ? 'ℹ️  ' : level === Level.WARNING ? '⚠️  ' : level === Level.ERROR ? '❌ ' : '';
    const n = name ? `${ctx.hex(colorize(name)).bold(name)} ` : '';
    const t = time ? `${ctx.grey.bold(new Date(time).toISOString())} ` : '';
    const d = typeof data === 'string' ? `${data} ` : `${inspect(data)} `;
    const m = Object.keys(meta).length ? `[${Object.keys(meta).map(k => `${ctx.bold(k)}=${inspect(meta[k])}`)}] ` : '';
    return `${emoji}${n}${t}${d}${m}`;
  }
  
};
