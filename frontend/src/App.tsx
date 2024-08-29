import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, CircularProgress, Card, CardContent, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { backend } from 'declarations/backend';
import NewPostForm from './components/NewPostForm';
import PostList from './components/PostList';

type Post = {
  id: bigint;
  title: string;
  body: string;
  author: string;
  timestamp: bigint;
};

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await backend.getPosts();
      setPosts(fetchedPosts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const handleNewPost = async (title: string, body: string, author: string) => {
    try {
      setLoading(true);
      await backend.createPost(title, body, author);
      await fetchPosts();
      setShowNewPostForm(false);
    } catch (error) {
      console.error('Error creating new post:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Box
        className="bg-cover bg-center h-64 flex items-center justify-center"
        sx={{
          backgroundImage: `url(https://images.unsplash.com/photo-1641965424261-5ad7c5f0b747?ixid=M3w2MzIxNTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ4OTQ5OTd8&ixlib=rb-4.0.3)`,
        }}
      >
        <Typography variant="h2" component="h1" className="text-white text-shadow-lg">
          Crypto Blog
        </Typography>
      </Box>

      <Container maxWidth="lg" className="mt-8">
        {loading ? (
          <Box className="flex justify-center">
            <CircularProgress />
          </Box>
        ) : (
          <PostList posts={posts} />
        )}
      </Container>

      <Fab
        color="primary"
        aria-label="add"
        className="fixed bottom-8 right-8"
        onClick={() => setShowNewPostForm(true)}
      >
        <AddIcon />
      </Fab>

      <NewPostForm
        open={showNewPostForm}
        onClose={() => setShowNewPostForm(false)}
        onSubmit={handleNewPost}
      />
    </div>
  );
};

export default App;
