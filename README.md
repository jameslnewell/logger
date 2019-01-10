# @jameslnewell/logger

[![CircleCI](https://circleci.com/gh/jameslnewell/logger/tree/master.svg?style=svg)](https://circleci.com/gh/jameslnewell/logger/tree/master)

A logging library.

## Installation

```sh
yarn add @jameslnewell/logger
```

## Usage

### Using a logger
```js
import logger from '@jameslnewell/logger';

logger.info('Server is listening on http://localhost:3000');
```

### Using an extended logger
```js
import logger from '@jameslnewell/logger';

const log = logger.extend('my-server');

log.info('Server is listening on http://localhost:3000');
```

### Adding the time to the logs
```js
import logger, {time} from '@jameslnewell/logger';

logger.use(time());
```

### Adding the version to the logs
```js
import logger, {version} from '@jameslnewell/logger';

logger.use(version());
```

### Adding a custom field to the logs
```js
import logger from '@jameslnewell/logger';

logger.use(log => ({...log, foo: 'bar'}));
```

### Filtering the logs
```js
import logger, {Level, filter} from '@jameslnewell/logger';

logger.use(filter(log => log.level === Level.error));
```

### Writing logs to the console
```js
import logger, {ConsoleOutputStream} from '@jameslnewell/logger';

logger.pipe(new ConsoleOutputStream());
```

### Writing logs to a file
```js
import logger, {FileOutputStream} from '@jameslnewell/logger';

logger.pipe(new FileOutputStream());
```

### Writing logs to a file on error
```js
import logger, {MemoryOutputStream} from '@jameslnewell/logger';

const logs = logger.pipe(new MemoryOutputStream());
try {
  // do stuff here
} catch (error) {
  logger.error(error);
  fs.WritingFileSync('app.log', logs);
}
```

### Writing logs to CloudWatch
```js
import logger, {CloudwatchOutputStream} from '@jameslnewell/logger';

logger.pipe(new CloudwatchOutputStream({
  group: 'my-group',
  stream: 'my-stream',
}));
```
