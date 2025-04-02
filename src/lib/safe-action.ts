import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';
import type { NeonDbError } from '@neondatabase/serverless';

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    })
  },
  handleServerError(e, utils) {
    const { clientInput, metadata } = utils;

    if(e.constructor.name === "NeonDbError") {
      const { code, detail } = e as NeonDbError
      // Duplicated Unique value error code "23505"
      if(code === "23505") {
        return `Unique entry required. ${detail}`
      }
    }

    console.error(`serverError: ${e.message}`);
    console.error(`metadata: ${metadata?.actionName}`);
    console.error(`clientInput: ${JSON.stringify(clientInput)}`);
    if(e.constructor.name === "NeonDbError") {
      return "Database Error: Your data did not save."
    }
    return e.message
  }
})