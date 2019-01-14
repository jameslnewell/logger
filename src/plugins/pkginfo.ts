import * as path from 'path';
import * as callerPath from 'caller-path';
import * as readPkgUp from 'read-pkg-up';
import { Plugin } from "../Plugin";

export function pkginfo(dir?: string): Plugin {
  // @ts-ignore - bug in read-pkg types
  const json = readPkgUp.sync({cwd: dir ? dir : path.dirname(callerPath())});
  return log => ({
    ...log, 
    package: {
      name: json.pkg.name,
      version: json.pkg.version
    }
  });
}
