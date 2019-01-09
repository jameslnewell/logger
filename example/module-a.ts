import logger, { version } from '../src';

const log = logger.extend('module:a').use(version('0.1.5'));

export function a() {
  log.info('Module 𝘼');
}
