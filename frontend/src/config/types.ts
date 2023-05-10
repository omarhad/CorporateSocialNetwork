export interface User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthdate: string;
    position: string;
    location: string;
    isAdmin: boolean;
}

export interface Image {
    id: string;
    url: string;
    post: number;
}

export interface Comment {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    author: User;
    post: number;
    likes: User[];
}

export interface Post {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    author: User;
    likes: User[];
    comments: Comment[];
    images: Image[];
}

export interface CreatePostPayload {
    content: string;
    images?: { url: string }[];
}

export interface UpdatePostPayload {
    content?: string;
    images?: { id?: string; url: string }[];
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface SignupPayload {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthdate?: string;
    position?: string;
    location?: string;
}

export interface UpdateProfilePayload {
    firstName?: string;
    lastName?: string;
    birthdate?: string;
    position?: string;
    location?: string;
}

export interface CreateCommentPayload {
    content: string;
}

export interface UpdateCommentPayload {
    content?: string;
}

export interface AuthContextData {
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
}
