// ImageCarousel.js
import React, {useState} from 'react';
import {Box, IconButton, Typography} from '@mui/material';
import {useDropzone} from 'react-dropzone';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';


const ImageCarousel = ({images, setImages, maxImages = 10}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const onDrop = (acceptedFiles) => {
        if (images.length + acceptedFiles.length <= maxImages) {
            const newImages = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );
            setImages([...images, ...newImages]);
        } else {
            alert(`You can only add up to ${maxImages} images.`);
        }
    };

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: 'image/*',
    });

    const removeImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,

    };

    return (
        <Box sx={{textAlign: 'center', mt: 2}}>
            {/* Dropzone for Adding Images */}
            <Box {...getRootProps()} sx={{border: '2px dashed grey', p: 2, borderRadius: 1}}>
                <input {...getInputProps()} />
                <Typography variant="body2" color="textSecondary">
                    Перетащите фото сюда или нажмите, чтобы выбрать файлы (макс. {maxImages} фото)
                </Typography>
                <AddPhotoAlternateIcon fontSize="large" color="primary"/>
            </Box>

            {/* Image Carousel */}
            {images.length > 0 && (
                <Slider {...settings} style={{marginTop: 16}}>
                    {images.map((image, index) => (
                        <Box key={index} sx={{position: 'relative', p: 1}}>
                            <img
                                src={image.preview}
                                alt={`Image ${index}`}
                                onClick={() => {
                                    setPhotoIndex(index);
                                    setIsOpen(true);
                                }}
                                style={{width: '100%', borderRadius: 4, cursor: 'pointer'}}
                            />
                            <IconButton
                                onClick={() => removeImage(index)}
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                }}
                            >
                                <DeleteIcon color="error"/>
                            </IconButton>
                        </Box>
                    ))}
                </Slider>
            )}

            {/* Lightbox for Image Preview */}
            {isOpen && (
                <Lightbox
                    open={isOpen}
                    close={() => setIsOpen(false)}
                    slides={images.map((image) => ({src: image.preview}))}
                    currentIndex={photoIndex}
                    onCurrentIndexChange={setPhotoIndex}
                />
            )}
        </Box>
    );
};

export default ImageCarousel;
