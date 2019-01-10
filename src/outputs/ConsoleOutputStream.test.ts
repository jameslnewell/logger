import {ConsoleOutputStream} from './ConsoleOutputStream'
import { Level } from '../Level';

describe('ConsoleOutputStream', () => {
  const output = jest.spyOn(console, 'log');

  beforeEach(() => output.mockReset());

  it('should ouput logs', () => {
    const stream = new ConsoleOutputStream();
    stream.write({level: Level.EMERGENCY, data: 'I need to pee!'});
    stream.write({level: Level.INFORMATION, data: 'Oops I already did!'});
    expect(output).toBeCalledWith(expect.stringContaining(`I need to pee!`));
    expect(output).toBeCalledWith(expect.stringContaining(`Oops I already did!`));
  });

});
