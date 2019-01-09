import logger, { version } from '../src';

const log = logger.extend('module:b').use(version('0.2.3'));

export function b() {
  log.info('Module 𝘽');
}