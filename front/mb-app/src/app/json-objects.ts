export class Author {
  id: number;
  email: string;
  username: string;
  enabled: boolean;
  tagline: string;
  password: string;
  confirm_password: string;
  is_online: boolean;
  avatarimage: Avatar;
}

export class Avatar {
  picture: string;
  picture_for_profile: string;
  picture_for_preview: string;
}

export class Post {
  id: number;
  author: Author;
  content: string;
  comments: number[];
  post_images: Image[];
  draft: boolean;
  created_at: Date;
}

export class Comment {
  id: number;
  author: Author;
  parent_post: number;
  content: string;
  comment_images: Image[];
  created_at: Date;
}

export class Chat {
  id: number;
  members: Author[];
  messages: number[];
  updated_at: number;
  unreadMsgs?: number[];
}

export class ChatMessage {
  id: number;
  author: Author;
  chat: number;
  content: string;
  checked: boolean;
  created_at: number;
}

export class Image {
  id: number;
  author: number;
  parent_post: number;
  parent_comment: number;
  picture: string;
  picture_for_post: string;
  picture_for_preview: string;
}
