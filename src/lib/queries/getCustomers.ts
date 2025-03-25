import { db } from "@/db"
import { customers } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getCustomer(id: number) {
  // .select to SELECT, .from to use schema, eq to "=""
  const customer = await db.select()
    .from(customers)
    .where(eq(customers.id, id))

  return customer[0]
}

