import {time} from './time';
import { Level } from '../Level';

const nowSpy = jest.spyOn(Date, 'now');

describe('plugin', () => {
  describe('time()', () => {

    beforeEach(() => {
      nowSpy.mockReturnValue(111111);
    });

    afterEach(() => {
      nowSpy.mockRestore();
    });

    it('should inject the time into the log', () => {
      const log = {
        level: Level.INFORMATION, 
        data: 'foobar'
      };
      expect(time()(log)).toEqual({
        ...log,
        time: 111111
      });
    });

  });
});
