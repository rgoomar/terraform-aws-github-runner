import { logger } from './syncer/logger';
import { sync } from './syncer/syncer';

// eslint-disable-next-line
export async function handler(event: any, context: any): Promise<void> {
  logger.logEventIfEnabled(event);
  logger.addContext(context);

  try {
    await sync();
  } catch (e) {
    if (e instanceof Error) {
      logger.warn(`Ignoring error: ${e.message}`);
    }
    logger.debug('Ignoring error', { error: e });
  }
}
