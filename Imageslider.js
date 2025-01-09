import React, { useState } from 'react';

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;


    const newTranslateValue = isFirstSlide
      ? -(slides.length - 1) * 100
      : translateValue + 100;

    setCurrentIndex(newIndex);
    setTranslateValue(newTranslateValue);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;


    const newTranslateValue = isLastSlide
      ? 0
      : translateValue - 100;

    setCurrentIndex(newIndex);
    setTranslateValue(newTranslateValue);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '400px',
        overflow: 'hidden',
        borderRadius: '10px',
      }}
    >
      <div
        onClick={goToPrevious}
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translate(0, -50%)',
          fontSize: '30px',
          cursor: 'pointer',
          zIndex: 1,
          color: '#dc1313',
        }}
      >
        ❮
      </div>


      <div
        onClick={goToNext}
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translate(0, -50%)',
          fontSize: '30px',
          cursor: 'pointer',
          zIndex: 1,
          color: '#dc1313',
        }}
      >
        ❯
      </div>
      <div
        style={{
          display: 'flex',
          transform: `translateX(${translateValue}%)`,
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url(${slide.url})`,
              height: '450px',
              width: '90%',
              marginTop:'10px',
              marginLeft:'5%',
              marginRight:'5%',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              flexShrink: 0,
            }}></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
