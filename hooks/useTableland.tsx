import { Database } from "@tableland/sdk";
const commentTable: string = "article_comment_v3_0_1_420_19";
const draftTable: string = "draft_article_v1_420_18";
// TODO: use env variable, fix error
// const commentTable = process.env.TABLE_NAME;

// TODO: add UNIX timestamp
export interface Comment {
  message_id: number;
  author: string;
  article_id: string;
  user: `0x${string}` | undefined;
  message: string;
  timestamp: number;
}
interface Draft {
  id: number;
  user: `0x${string}` | undefined;
  content: string;
}

export async function writeComment({
  author,
  article_id,
  user,
  message,
  timestamp,
}: any) {
  const db = new Database<Comment>();
  const { meta: insert } = await db
    .prepare(
      `INSERT INTO ${commentTable} (author, article_id, user, message, timestamp) VALUES (?, ?, ?, ?, ?)`
    )
    .bind(author, article_id, user, message, timestamp)
    .run();
  await insert.txn?.wait();
  const { results } = await db.prepare(`SELECT * FROM ${commentTable}`).all();
  return results;
}

export async function readComments(author: string, article_id: string) {
  if (commentTable) {
    try {
      const db = new Database<Comment>();
      const { results } = await db
        .prepare(
          `SELECT * FROM ${commentTable} WHERE author = ? AND article_id = ?`
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

export async function storeDraft({ user, content }: any) {
  const db = new Database<Draft>();
  const { meta: insert } = await db
    .prepare(`INSERT INTO ${draftTable} (user, content) VALUES (?, ?)`)
    .bind(user, content)
    .run();
  await insert.txn?.wait();
  const { results } = await db.prepare(`SELECT * FROM ${draftTable}`).all();
  return results;
}

export async function getDrapf(user: string) {
  if (draftTable) {
    try {
      const db = new Database<Draft>();
      const { results } = await db
        .prepare(`SELECT * FROM ${draftTable} WHERE user = ?`)
        .bind(user)
        .all();
      return results;
    } catch (error) {
      console.error("Error getting draft:", error);
      throw error;
    }
  }
}
