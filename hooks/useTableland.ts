import { Database } from "@tableland/sdk";

const tableName: string = "article_comment_420_15";

interface Comment {
  message_id: number;
  article_id: string;
  user: string;
  message: string;
}

export async function writeComment({ article_id, user, message }: Comment) {
  const db = new Database<Comment>();
  const { meta: insert } = await db
    .prepare(
      `INSERT INTO ${tableName} (article_id, user, message) VALUES (?, ?, ?)`
    )
    .bind(article_id, user, message)
    .run();
  await insert.txn?.wait();
  const { results } = await db.prepare(`SELECT * FROM ${tableName}`).all();
  return results;
}

export async function readComments(article_id: string) {
  try {
    const db = new Database<Comment>();
    const { results } = await db
      .prepare(`SELECT * FROM ${tableName} WHERE article_id = ? `)
      .bind(article_id)
      .all();
    return results;
  } catch (error) {
    console.error("Error reading comments:", error);
    throw error;
  }
}
