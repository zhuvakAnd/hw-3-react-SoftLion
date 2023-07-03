import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScrollDetector from 'tools/ScrollDetector';
import ImageGalleryItem from './ImageGalleryItem';
import { Puff } from 'react-loader-spinner';

const apiKey = '37978044-090673ca5eb3a08f2e80e75bb';
const perPage = 12;

const ImageGallery = ({ searchTerm }) => {
  const [imgData, setImgData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  const handlePageIncrement = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    setPage(1);
    setIsLastPage(false);
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const nextPage = page;
        const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
          searchTerm
        )}&page=${nextPage}&per_page=${perPage}&image_type=photo&orientation=horizontal`;

        const response = await axios.get(apiUrl);
        const data = response.data.hits.map(item => ({
          id: item.id,
          webformatURL: item.webformatURL,
          largeImageURL: item.largeImageURL,
        }));
        nextPage === 1
          ? setImgData([...data])
          : setImgData(prevData => [...prevData, ...data]);
        setIsLastPage(
          nextPage >= Math.floor(response.data.totalHits / perPage)
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isLastPage) {
      fetchData();
    }
  }, [searchTerm, page, isLastPage]);

  return (
    <>
      <ul className="ImageGallery">
        {imgData.map((item, index) => (
          <ImageGalleryItem
            key={`${item.id}-${index}`}
            url={item.webformatURL}
            largeImgUrl={item.largeImageURL}
          />
        ))}
      </ul>
      {isLoading ? (
        <>
          <h1>Loading...</h1>
          <Puff color="#00BFFF" height={100} width={100} />
        </>
      ) : isLastPage ? (
        <h1>End of page</h1>
      ) : (
        <button onClick={handlePageIncrement} className="Button">
          Load more
        </button>
      )}
      <ScrollDetector onScrollToBottom={handlePageIncrement} />
    </>
  );
};

export default ImageGallery;
