import {name} from './name';
import { Level } from '../Level';

describe('plugin', () => {
  describe('name()', () => {

    it('should inject the name into the log', () => {
      const log = {
        level: Level.INFORMATION, 
        data: 'foobar'
      };
      expect(name('my-app')(log)).toEqual({
        ...log,
        name: 'my-app'
      });
    });

  });
});
