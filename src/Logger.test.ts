import {Level} from './Level';
import {Stream} from './Stream';
import {Logger} from './Logger';

describe('Logger', () => {

  describe('.use()', () => {
    it('should add a plugin', () => {
      const logger = new Logger(new Stream());
      expect(logger.plugins).toHaveLength(0);
      logger.use(log => log);
      expect(logger.plugins).toHaveLength(1);
      logger.use(() => undefined);
      expect(logger.plugins).toHaveLength(2);
    });
  });

  describe('.log()', () => {
    it('should emit the log on the stream', () => {
      const stream = new Stream();
      const logger = new Logger(stream);
      logger.log(Level.ERROR, 'Uh oh!');
      expect(stream.read()).toEqual({
        level: Level.ERROR,
        data: 'Uh oh!'
      });
    });
  });

  describe('.info()', () => {
    it('should emit the log on the stream', () => {
      const stream = new Stream();
      const logger = new Logger(stream);
      logger.info('Hey!');
      expect(stream.read()).toEqual({
        level: Level.INFORMATION,
        data: 'Hey!'
      });
    });
  });

  describe('.warn()', () => {
    it('should emit the log on the stream', () => {
      const stream = new Stream();
      const logger = new Logger(stream);
      logger.warn('Beware!');
      expect(stream.read()).toEqual({
        level: Level.WARNING,
        data: 'Beware!'
      });
    });
  });

  describe('.error()', () => {
    it('should emit the log on the stream', () => {
      const stream = new Stream();
      const logger = new Logger(stream);
      logger.error('Uh oh!');
      expect(stream.read()).toEqual({
        level: Level.ERROR,
        data: 'Uh oh!'
      });
    });
  });

});
