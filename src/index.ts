export * from './Level';
export * from './Log';
export * from './Stream';
export * from './Plugin';
export * from './Logger';
export * from './plugins';
export * from './formatters';
export * from './outputs';

import {GlobalLogger} from './GlobalLogger';
import { Stream } from './Stream';

export default new GlobalLogger(new Stream);
