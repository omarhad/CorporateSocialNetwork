import api from '../config/api';
import { Post, CreatePostPayload, UpdatePostPayload } from '../config/types';

const PostService = {
    async fetchPosts(): Promise<Post[]> {
        try {
            const response = await api.get<Post[]>('/posts');
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    async createPost(payload: CreatePostPayload): Promise<Post> {
        try {
            const response = await api.post<Post>('/posts', payload);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to create post');
        }
    },

    async updatePost(id: string, payload: UpdatePostPayload): Promise<Post> {
        try {
            const response = await api.put<Post>(`/posts/${id}`, payload);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to update post');
        }
    },

    async deletePost(id: string): Promise<void> {
        try {
            await api.delete(`/posts/${id}`);
        } catch (error) {
            console.error(error);
            throw new Error('Failed to delete post');
        }
    },

    async fetchPostById(id: string): Promise<Post> {
        try {
            const response = await api.get<Post>(`/posts/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch post by id');
        }
    },
};

export default PostService;