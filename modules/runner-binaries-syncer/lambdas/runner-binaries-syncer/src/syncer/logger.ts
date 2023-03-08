import { Logger } from '@aws-lambda-powertools/logger';

export const logger = new Logger({
  serviceName: 'webhook',
});

export class LogFields {
  static fields: { [key: string]: string } = {};

  public static print(): { data: { [key: string]: string } } {
    return { data: LogFields.fields };
  }
}
