import {version} from './version';
import { Level } from '../Level';

describe('plugin', () => {
  describe('version()', () => {

    it('should inject the version into the log', () => {
      const log = {
        level: Level.INFORMATION, 
        data: 'foobar'
      };
      expect(version()(log)).toEqual({
        ...log,
        version: require(`${__dirname}/../../package.json`).version
      });
    });

  });
});
