import * as path from 'path';
import * as callerPath from 'caller-path';
import * as readPkg from 'read-pkg';
import { Plugin } from "../Plugin";

export function version(): Plugin {
  const json = readPkg.sync(path.dirname(callerPath()));
  return log => ({...log, version: json.version});
}
