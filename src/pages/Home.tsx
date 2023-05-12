import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import { CSSTransition } from 'react-transition-group';
import { CreatePostPayload, Post } from "../config/types";
import PostService from '../services/PostService';
interface NewPostProps {
    createPost: (payload: CreatePostPayload) => Promise<void>;
}

const NewPost: React.FC<NewPostProps> = ({createPost}) => {
    // You will need a form for payload input here, this is just a placeholder
    const payload: CreatePostPayload = {
        content: 'New Post Content',
        images: [{ url: 'url-to-image' }],
    }

    return <Button variant="contained" color="primary" onClick={() => createPost(payload)}>
        Create Post
    </Button>
}

const Home: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const posts = await PostService.fetchPosts();
            setPosts(posts);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const createPost = async (payload: CreatePostPayload) => {
        try {
            const post = await PostService.createPost(payload);
            setPosts(oldPosts => [...oldPosts, post]);
        } catch (error) {
            console.error(error);
        }
    }

    return (
      <div >
          <Container maxWidth="sm">
              <Paper>
                  <NewPost createPost={createPost} />
                  {loading ? (
                    <Typography>Loading posts...</Typography>
                  ) : (
                    <Grid container direction="column" spacing={2}>
                        {posts.map((post) => (
                          <CSSTransition
                            key={post.id}
                            timeout={300}
                            classNames="twister"
                            unmountOnExit
                          >
                              <Grid item>
                                  <Typography variant="h6">{post.content}</Typography>
                                  {/* Add buttons or forms for Update and Delete here */}
                              </Grid>
                          </CSSTransition>
                        ))}
                    </Grid>
                  )}
              </Paper>
          </Container>
      </div>
    );
};
export default Home;
