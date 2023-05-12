import api from '../config/api';
import { Comment, CreateCommentPayload, UpdateCommentPayload } from '../config/types';

const CommentService = {
    async fetchComments(postId: string): Promise<Comment[]> {
        try {
            const response = await api.get<Comment[]>(`/post/${postId}/comments`);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    async createComment(postId: string, payload: CreateCommentPayload): Promise<Comment> {
        try {
            const response = await api.post<Comment>(`/post/${postId}/comments`, payload);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    async updateComment(commentId: string, payload: UpdateCommentPayload): Promise<Comment> {
        try {
            const response = await api.put<Comment>(`/comment/${commentId}`, payload);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    async deleteComment(commentId: string): Promise<void> {
        try {
            await api.delete(`/comment/${commentId}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

export default CommentService;
