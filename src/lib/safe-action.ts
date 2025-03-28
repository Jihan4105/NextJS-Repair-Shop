import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    })
  },
  handleServerError(e, utils) {
    const { clientInput, metadata } = utils;
    console.error(`serverError: ${e.message}`);
    console.error(`metadata: ${metadata?.actionName}`);
    console.error(`clientInput: ${JSON.stringify(clientInput)}`);
    return e.message
  }
})