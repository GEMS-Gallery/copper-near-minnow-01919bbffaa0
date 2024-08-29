import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

type NewPostFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string, body: string, author: string) => void;
};

type FormData = {
  title: string;
  body: string;
  author: string;
};

const NewPostForm: React.FC<NewPostFormProps> = ({ open, onClose, onSubmit }) => {
  const { control, handleSubmit, reset } = useForm<FormData>();

  const onSubmitForm = (data: FormData) => {
    onSubmit(data.title, data.body, data.author);
    reset();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Post</DialogTitle>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <DialogContent>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{ required: 'Title is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Title"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="body"
            control={control}
            defaultValue=""
            rules={{ required: 'Body is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Body"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="author"
            control={control}
            defaultValue=""
            rules={{ required: 'Author is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Author"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Create Post
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewPostForm;
