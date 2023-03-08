import { APIGatewayEvent, Context } from 'aws-lambda';

import { handle } from './webhook/handler';
import { logger } from './webhook/logger';

export interface Response {
  statusCode: number;
  body?: string;
}
export async function githubWebhook(event: APIGatewayEvent, context: Context): Promise<Response> {
  logger.logEventIfEnabled(event);
  logger.addContext(context);

  let result: Response;
  try {
    result = await handle(event.headers, event.body as string);
  } catch (e) {
    logger.error(`Failed to handle webhook event`, { error: e });
    result = {
      statusCode: 500,
      body: 'Check the Lambda logs for the error details.',
    };
  }
  return result;
}
