import {Stream} from './Stream';
import { Level } from './Level';

describe('Stream', () => {

  describe('.log()', () => {
    it('should push data', () => {
      const stream = new Stream();
      expect(stream.read()).toBeNull();
      stream.log({level: Level.NOTICE, data: 'The sky is blue'});
      expect(stream.read()).toEqual({level: Level.NOTICE, data: 'The sky is blue'});
    });
  });

});
