import {filter} from './filter';
import { Level } from '../Level';

describe('plugin', () => {
  describe('filter()', () => {

    it('should return undefined when the filter is not matched', () => {
      const log = {
        level: Level.INFORMATION, 
        data: 'foobar'
      };
      expect(filter(() => false)(log)).toBeUndefined();
    });

    it('should return the log when the filter is matched', () => {
      const log = {
        level: Level.INFORMATION, 
        data: 'foobar'
      };
      expect(filter(() => true)(log)).toEqual(log);
    });

  });
});
