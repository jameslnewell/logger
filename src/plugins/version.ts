import { Plugin } from "../Plugin";

export function version(version: string): Plugin {
  // TODO: look up callstack and look up package.json
  return log => ({...log, version});
}
