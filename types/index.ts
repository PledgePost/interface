export interface Content {
  coverImage?: string;
  title: string;
  value: string;
  currentAddress: any;
  ensName?: string | undefined;
  UNIXtimestamp: any;
}
export interface Comment {
  id: number;
  author: string;
  article_id: number;
  user: string;
  message: string;
  created_at: any;
}

export interface Draft {
  id: number;
  author: string;
  title: string;
  content: string;
  image?: string;
  created_at: any;
}
