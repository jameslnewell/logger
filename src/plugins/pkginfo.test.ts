import {pkginfo} from './pkginfo';
import { Level } from '../Level';

describe('plugin', () => {
  describe('pkginfo()', () => {

    it('should read and inject the package information into the log when called without a dirname', () => {
      const manifest = require(`${__dirname}/../../package.json`);
      const log = {
        level: Level.INFORMATION, 
        data: 'foobar'
      };
      expect(pkginfo()(log)).toEqual({
        ...log,
        package: {
          name: manifest.name,
          version: manifest.version
        }
      });
    });

    it('should read and inject the package information into the log when called with a dirname', () => {
      const manifest = require(`${__dirname}/__fixtures__/package.json`);
      const log = {
        level: Level.INFORMATION, 
        data: 'foobar'
      };
      expect(pkginfo(`${__dirname}/__fixtures__`)(log)).toEqual({
        ...log,
        package: {
          name: manifest.name,
          version: manifest.version
        }
      });
    });

  });
});
