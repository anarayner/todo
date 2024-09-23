import React from 'react';
import { Typography, Box } from '@mui/material';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Box>
      <Typography variant="h6" color="error">
        {message}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
