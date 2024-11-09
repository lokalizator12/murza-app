// ReadOnlyImageCarousel.js
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Slider from 'react-slick';
import Lightbox from 'yet-another-react-lightbox';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReadOnlyImageCarousel = ({ images }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
    };

    const handleImageClick = (index) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    return (
        <Box>
            {/* Slider for Images */}
            <Slider {...settings}>
                {images.map((imageSrc, index) => (
                    <Box key={index} onClick={() => handleImageClick(index)} sx={{ cursor: 'pointer', p: 1 }}>
                        <img src={imageSrc} alt={`Image ${index}`} style={{ width: '100%', borderRadius: 4 }} />
                    </Box>
                ))}
            </Slider>

            {/* Lightbox for Enlarged Image View */}
            {isOpen && (
                <Lightbox
                    open={isOpen}
                    close={() => setIsOpen(false)}
                    slides={images.map(src => ({ src }))}
                    currentIndex={currentIndex}
                    onCurrentIndexChange={setCurrentIndex}
                />
            )}
        </Box>
    );
};

export default ReadOnlyImageCarousel;
