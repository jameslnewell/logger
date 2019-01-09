import { Log } from "./Log";

export type Plugin = (log: Log) => undefined | Log;
