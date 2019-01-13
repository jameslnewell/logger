import * as fs from 'fs';
import logger, {
  time, 
  filter, 
  CloudWatchOutputStream, 
  ConsoleOutputStream, 
  MemoryOutputStream
} from '../src';
import {a} from './module-a';
import {b} from './module-b';

logger

  // include the time in all logs
  .use(time())

  // filter all logs based on the DEBUG env var
  .use(filter(log => {
    const pattern = process.env.DEBUG;
    if (pattern) {
      return log.source && log.source.includes(pattern);
    } else {
      return true;
    }
  }))

;

// keep logs in memory in case the app fails
const memory = logger.pipe(new MemoryOutputStream());

// stream logs to cloudwatch
logger.pipe(new CloudWatchOutputStream({
  group: 'my-group', 
  stream: 'my-stream',
  cloudwatch: {region: 'ap-southeast-2'}
})).on('error', console.error);

// print the logs if we're in verbose mode
if (process.argv.includes('--verbose')) {
  logger.pipe(new ConsoleOutputStream());
}

try {
  
  // do app stuff
  a();
  b();
  
  // error
  throw new Error('Uh oh!!!');

} catch (error) {
  // write log to file on error
  logger.error(error);
  fs.writeFile(`${__dirname}/example.log`, memory, () => {});
}
