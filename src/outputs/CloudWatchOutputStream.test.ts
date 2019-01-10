import * as AWS from 'aws-sdk';
import * as AWSMock from 'aws-sdk-mock';
import {CloudWatchOutputStream} from './CloudWatchOutputStream';
import { Level } from '../Level';

AWSMock.setSDKInstance(AWS);

describe('CloudWatchOutputStream', () => {

  beforeEach(() => jest.useFakeTimers());
  afterEach(() => AWSMock.restore('CloudWatchLogs'));

  it('should put queued logs when instanciated and the stream has not already been written to', () => {
    expect.assertions(1);
    const time = Date.now();

    AWSMock.mock('CloudWatchLogs', 'describeLogStreams', (params, callback) => {
      callback(null, {
        logStreams: []
      });
    });

    AWSMock.mock('CloudWatchLogs', 'putLogEvents', (params, callback) => {
      expect(params).toEqual({
        sequenceToken: undefined,
        logGroupName: 'foo',
        logStreamName: 'bar',
        logEvents: [
          {
            timestamp: time,
            message: JSON.stringify({level: Level.CRITICAL, time, data: 'Uh oh!'})
          }
        ]
      });
      callback(null, {
        nextSequenceToken: '1111'
      });
    });

    const cloudwatch = new CloudWatchOutputStream({
      group: 'foo', 
      stream: 'bar'
    });
    
    cloudwatch.write({
      level: Level.CRITICAL, 
      time, 
      data: 'Uh oh!'
    });
    
    jest.runAllTimers();
  });

  it('should put queued logs when instanciated and the stream has already been written to', () => {
    expect.assertions(1);
    const time = Date.now();

    AWSMock.mock('CloudWatchLogs', 'describeLogStreams', (params, callback) => {
      callback(null, {
        logStreams: [
          {
            uploadSequenceToken: '1111'
          }
        ]
      });
    });

    AWSMock.mock('CloudWatchLogs', 'putLogEvents', (params, callback) => {
      expect(params).toEqual({
        sequenceToken: '1111',
        logGroupName: 'foo',
        logStreamName: 'bar',
        logEvents: [
          {
            timestamp: time,
            message: JSON.stringify({level: Level.CRITICAL, time, data: 'Uh oh!'})
          }
        ]
      });
      callback(null, {
        nextSequenceToken: '2222'
      });
    });

    const cloudwatch = new CloudWatchOutputStream({
      group: 'foo', 
      stream: 'bar'
    });

    cloudwatch.write({
      level: Level.CRITICAL, 
      time, 
      data: 'Uh oh!'
    });
    
    jest.runAllTimers();
  });

  it('should put sorted queued logs when there are multiple logs', () => {
    expect.assertions(1);
    const time1 = Date.now()+100;
    const time2 = Date.now();

    AWSMock.mock('CloudWatchLogs', 'describeLogStreams', (params, callback) => {
      callback(null, {
        logStreams: [
          {
            uploadSequenceToken: '1111'
          }
        ]
      });
    });

    AWSMock.mock('CloudWatchLogs', 'putLogEvents', (params, callback) => {
      expect(params).toEqual({
        sequenceToken: '1111',
        logGroupName: 'foo',
        logStreamName: 'bar',
        logEvents: [
          {
            timestamp: time2,
            message: JSON.stringify({level: Level.INFORMATION, time: time2, data: 'Its cold!'})
          },
          {
            timestamp: time1,
            message: JSON.stringify({level: Level.CRITICAL, time: time1, data: 'Uh oh!'})
          }
        ]
      });
      callback(null, {
        nextSequenceToken: '2222'
      });
    });

    const cloudwatch = new CloudWatchOutputStream({
      group: 'foo', 
      stream: 'bar'
    });

    cloudwatch.write({
      level: Level.CRITICAL, 
      time: time1, 
      data: 'Uh oh!'
    });
    
    cloudwatch.write({
      level: Level.INFORMATION, 
      time: time2, 
      data: 'Its cold!'
    });
    
    jest.runAllTimers();
  });

});
