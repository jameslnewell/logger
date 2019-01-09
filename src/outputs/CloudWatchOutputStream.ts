import { Writable } from 'stream';
import {CloudWatchLogs} from 'aws-sdk';
import { Log } from '../log';

export interface CloudWatchOutputStreamOptions {
  group: string;
  stream: string;
}

export class CloudWatchOutputStream extends Writable {

  private logs: Log[] = [];
  private timeout: NodeJS.Timeout = null;
  private sequence: string = undefined;
  private cloudwatch: CloudWatchLogs = new CloudWatchLogs({region: 'ap-southeast-2'});

  constructor(private options: CloudWatchOutputStreamOptions) {
    super({objectMode: true});
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
        logEvents: this.logs.map(log => ({
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
    this.timeout = setTimeout(this._putEvents, 250);
    callback();
  }

}
