import { Plugin } from '../Plugin';

export function time(): Plugin {
  return log => ({...log, time: Date.now()});
}