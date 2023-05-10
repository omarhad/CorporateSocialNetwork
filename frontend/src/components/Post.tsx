import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Post as PostType } from '../config/types';

interface PostProps {
    post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {post.author.firstName} {post.author.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {post.content}
                </Typography>
                {/* Ajoutez d'autres éléments pour afficher les images, les commentaires, les likes, etc. */}
            </CardContent>
        </Card>
    );
};

export default Post;

