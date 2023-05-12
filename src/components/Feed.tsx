import React, { useEffect, useState } from 'react';
import PostService from '../services/PostService';
import { Post as PostType } from '../config/types';
import Post from './Post';

const Feed: React.FC = () => {
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await PostService.fetchPosts();
            setPosts(data);
        };

        fetchPosts();
    }, []);

    return (
        <div className="feed">
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};

export default Feed;
