import { Database } from "@tableland/sdk";
const tableName: string = "article_comment_v2_420_17";
// TODO: use env variable, fix error
// const tableName = process.env.TABLE_NAME;

// TODO: add UNIX timestamp
export interface Comment {
  message_id: number;
  author: string;
  article_id: string;
  user: `0x${string}` | undefined;
  message: string;
}

export async function writeComment({ author, article_id, user, message }: any) {
  const db = new Database<Comment>();
  const { meta: insert } = await db
    .prepare(
      `INSERT INTO ${tableName} (author, article_id, user, message) VALUES (?, ?, ?, ?)`
    )
    .bind(author, article_id, user, message)
    .run();
  await insert.txn?.wait();
  const { results } = await db.prepare(`SELECT * FROM ${tableName}`).all();
  return results;
}

export async function readComments(author: string, article_id: string) {
  console.log("tableName :>> ", tableName);
  if (tableName) {
    try {
      const db = new Database<Comment>();
      const { results } = await db
        .prepare(
          `SELECT * FROM ${tableName} WHERE author = ? AND article_id = ?`
        )
        .bind(author, article_id)
        .all();
      return results;
    } catch (error) {
      console.error("Error reading comments:", error);
      throw error;
    }
  }
}
