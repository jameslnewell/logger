import {MemoryOutputStream} from './MemoryOutputStream'
import { Level } from '../Level';

describe('MemoryOutputStream', () => {

  it('should collect logs', () => {
    const stream = new MemoryOutputStream();
    stream.write({level: Level.EMERGENCY, data: 'I need to pee!'});
    stream.write({level: Level.INFORMATION, data: 'Oops I already did!'});
    expect(stream.toString()).toContain(`I need to pee!`);
    expect(stream.toString()).toContain(`Oops I already did!`);
  });

});
