import React, {useState} from "react";
import {Avatar, Box, Button} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

const AvatarUploader = ({currentPhoto, onUpload}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(currentPhoto || "/default-avatar.png");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            onUpload(file);
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
                src={preview}
                alt="Avatar"
                sx={{width: 120, height: 120, mb: 2}}
            />
            <Button
                variant="outlined"
                component="label"
                startIcon={<UploadIcon/>}
                sx={{mb: 2}}
            >
                Upload Photo
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </Button>
        </Box>
    );
};

export default AvatarUploader;
