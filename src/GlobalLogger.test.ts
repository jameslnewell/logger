import {Stream} from './Stream';
import {GlobalLogger} from './GlobalLogger';
import { Level } from './Level';
import { MemoryOutputStream } from './outputs';
import { doesNotReject } from 'assert';

describe('GlobalLogger', () => {

  describe('.extend()', () => {
    it('should inject a name', () => {
      const stream = new Stream();
      const global = new GlobalLogger(stream);
      const logger = global.extend('foobar');
      logger.info('You are amazing!');
      expect(stream.read()).toEqual({
        level: Level.INFORMATION,
        name: 'foobar',
        data: 'You are amazing!'
      });
    });

    it('should not inject a name', () => {
      const stream = new Stream();
      const global = new GlobalLogger(stream);
      const logger = global.extend();
      logger.info('You are amazing!');
      expect(stream.read()).toEqual({
        level: Level.INFORMATION,
        data: 'You are amazing!'
      });
    });

    it('should use parent plugins added before extend', () => {
      const stream = new Stream();
      const global = new GlobalLogger(stream);
      global.use(log => ({...log, a: 1}));
      const logger = global.extend();
      logger.info('You are amazing!');
      expect(stream.read()).toEqual({
        a: 1,
        level: Level.INFORMATION,
        data: 'You are amazing!'
      });
    });

    it('should use parent plugins added after extend', () => {
      const stream = new Stream();
      const global = new GlobalLogger(stream);
      const logger = global.extend();
      global.use(log => ({...log, b: 2}));
      logger.info('You are amazing!');
      expect(stream.read()).toEqual({
        b: 2,
        level: Level.INFORMATION,
        data: 'You are amazing!'
      });
    });
  });

  describe('.pipe()', () => {
    it('should pipe to the desitination stream', (done) => {
      const stream = new Stream();
      const global = new GlobalLogger(stream);
      const memory = global.pipe(new MemoryOutputStream());
      global.info('Hello World!');
      setImmediate(() => {
        expect(memory.toString()).toContain('Hello World!');
        done();
      });
    });
  });

});
