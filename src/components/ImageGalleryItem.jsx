import React from 'react';
import './styles.css';
import * as basicLightbox from 'basiclightbox';

const ImageGalleryItem = ({ url, largeImgUrl }) => {
  let instance;

  const openLightbox = () => {
    const content = `
      <div class="Overlay">
        <div class="Modal">
          <img src="${largeImgUrl}" alt="" />
        </div>
      </div>
    `;

    instance = basicLightbox.create(content);

    instance.show();

    const closeModal = () => {
      instance.close();
      document.removeEventListener('keydown', handleKeyPress);
    };

    const handleKeyPress = event => {
      if (event.keyCode === 27) {
        closeModal();
      }
    };

    const modalElement = instance.element().querySelector('.Overlay');
    modalElement.addEventListener('click', closeModal);
    document.addEventListener('keydown', handleKeyPress);
  };

  return (
    <li className="ImageGalleryItem" onClick={openLightbox}>
      <img className="ImageGalleryItem-image" src={url} alt="Not found" />
    </li>
  );
};

export default ImageGalleryItem;
