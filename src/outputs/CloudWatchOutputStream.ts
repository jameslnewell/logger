import { Writable } from 'stream';
import {CloudWatchLogs} from 'aws-sdk';
import { Log } from '../log';

export interface CloudWatchOutputStreamOptions {
  group: string;
  stream: string;
  debounce?: number;
  cloudwatch?: CloudWatchLogs.ClientConfiguration;
}

export class CloudWatchOutputStream extends Writable {

  private logs: Log[] = [];
  private timeout: NodeJS.Timeout = null;
  private sequence: string = undefined;
  private cloudwatch: CloudWatchLogs = undefined;

  constructor(private options: CloudWatchOutputStreamOptions) {
    super({objectMode: true});
    this.cloudwatch = new CloudWatchLogs(options.cloudwatch);
  }

  _putEvents = async () => {
    try {
      
      // exit if there are no events
      if (!this.logs.length) {
        return;
      }

      // get the next log sequence
      if (!this.sequence) {
        const output = await this.cloudwatch.describeLogStreams({
          logGroupName: this.options.group,
          logStreamNamePrefix: this.options.stream,
          limit: 1
        }).promise();
        if (output.logStreams && output.logStreams.length) {
          this.sequence = output.logStreams[0].uploadSequenceToken;
        }
      }

      // send the queued events
      const output = await this.cloudwatch.putLogEvents({
        sequenceToken: this.sequence,
        logGroupName: this.options.group,
        logStreamName: this.options.stream,
        logEvents: this.logs.sort((a, b) => (a.time > b.time ? 1 : -1)).map(log => ({
          timestamp: log.time,
          message: JSON.stringify(log)
        }))
      }).promise();
      this.sequence = output.nextSequenceToken;

      // clear the queued events
      this.logs = [];
    } catch (error) {
      this.emit('error', error);
    }
  }

  _write(chunk: any, encoding: string, callback: (error?: Error) => void) {
    this.logs.push(chunk);
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this._putEvents, this.options.debounce || 250);
    callback();
  }

}
