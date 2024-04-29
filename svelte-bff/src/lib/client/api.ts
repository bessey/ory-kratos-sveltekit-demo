/**
 * Generated by orval v6.28.2 🍺
 * Do not edit manually.
 * API
 * OpenAPI spec version: 0.1.0
 */
import { createInstance } from './axios/api';
export type ReadPostParams = {
q?: string | null;
};

export type ValidationErrorLocItem = string | number;

export interface ValidationError {
  loc: ValidationErrorLocItem[];
  msg: string;
  type: string;
}

export type PostStatus = typeof PostStatus[keyof typeof PostStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PostStatus = {
  draft: 'draft',
  published: 'published',
} as const;

export interface PostUpdate {
  /**
   * @minLength 10
   * @maxLength 1000000
   */
  body: string;
  status: PostStatus;
  /**
   * @minLength 3
   * @maxLength 100
   */
  title: string;
}

export type PostUpdatedAt = string | null;

export type PostId = number | null;

export type PostCreatedAt = string | null;

export interface Post {
  body: string;
  created_at?: PostCreatedAt;
  id?: PostId;
  status: PostStatus;
  tenant_id: number;
  title: string;
  updated_at?: PostUpdatedAt;
}

export interface HTTPValidationError {
  detail?: ValidationError[];
}





  /**
 * @summary Read Posts
 */
export const readPosts = (
    
 ) => {
      return createInstance<Post[]>(
      {url: `/posts`, method: 'GET'
    },
      );
    }
  
/**
 * @summary Create Post
 */
export const createPost = (
    postUpdate: PostUpdate,
 ) => {
      return createInstance<Post>(
      {url: `/posts`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postUpdate
    },
      );
    }
  
/**
 * @summary Read Post
 */
export const readPost = (
    postId: string,
    params?: ReadPostParams,
 ) => {
      return createInstance<Post>(
      {url: `/posts/${postId}`, method: 'GET',
        params
    },
      );
    }
  
/**
 * @summary Update Post
 */
export const updatePost = (
    postId: string,
    postUpdate: PostUpdate,
 ) => {
      return createInstance<Post>(
      {url: `/posts/${postId}`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: postUpdate
    },
      );
    }
  
export type ReadPostsResult = NonNullable<Awaited<ReturnType<typeof readPosts>>>
export type CreatePostResult = NonNullable<Awaited<ReturnType<typeof createPost>>>
export type ReadPostResult = NonNullable<Awaited<ReturnType<typeof readPost>>>
export type UpdatePostResult = NonNullable<Awaited<ReturnType<typeof updatePost>>>