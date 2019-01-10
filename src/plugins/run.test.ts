import {run} from './run';
import { Level } from '../Level';

describe('plugin', () => {
  describe('run()', () => {
    

    it('should return the same log when there are no plugins', () => {
      const log = {
        level: Level.INFORMATION, 
        data: 'foobar'
      };
      expect(run(log, [])).toEqual({
        ...log
      });
    });

    it('should return a modified log when there is a plugin', () => {
      const log = {
        level: Level.INFORMATION, 
        data: 'foobar'
      };
      expect(run(log, [log => ({...log, foo: 'bar'})])).toEqual({
        ...log,
        foo: 'bar'
      });
    });

    it('should return undefined when there is a filter', () => {
      const log = {
        level: Level.INFORMATION, 
        data: 'foobar'
      };
      expect(run(log, [() => undefined])).toBeUndefined();
    });

  });
});
