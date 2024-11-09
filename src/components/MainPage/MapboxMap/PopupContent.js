import React from 'react';
import { Typography } from '@mui/material';

const PopupContent = ({ title, description }) => (
    <div>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
    </div>
);

export default PopupContent;
