import { Web3Storage } from "web3.storage";
import { File } from "web3.storage";
import { v4 } from "uuid";

const uuid = v4();
const token: string = process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN as string;
function getAccessToken() {
  return token.toString();
}

export function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

export function makeFileObjects(obj: any, address: any) {
  const buffer = Buffer.from(JSON.stringify(obj));

  // Organize files within a folder named after the user's address
  const files = [new File([buffer], `pledgepost:${address}`)];

  return files;
}

export async function storeFiles(files: File[]) {
  const client: Web3Storage = makeStorageClient();
  if (!client) return;
  try {
    const cid = await client.put(files);
    console.log("✅ stored files with cid:", cid);
    return cid;
  } catch (e) {
    console.log("❌ failed to store files:", e);
  }
}
