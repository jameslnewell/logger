import {DefaultFormatter} from './DefaultFormatter'
import { Level } from '../Level';

describe('DefaultFormatter', () => {

  it('should format the message', () => {
    const formatter = new DefaultFormatter();
    const output = formatter.format({
      level: Level.ALERT,
      data: 'Heads up!'
    });
    expect(output).toContain('Heads up!');
  });

});
