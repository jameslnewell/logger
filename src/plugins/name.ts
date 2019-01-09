import { Plugin } from "../Plugin";

export function name(name: string): Plugin {
  return log => ({...log, name});
}
