import React, { useState } from 'react';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';

const Container = () => {
  const [labelValue, setLabelValue] = useState('nature');

  const handleSubmit = value => {
    console.log('Submitted value:', value);
    setLabelValue(value);
    console.log('Submitted value:', labelValue);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery searchTerm={labelValue}></ImageGallery>
    </>
  );
};

export default Container;
