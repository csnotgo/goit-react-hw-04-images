import { useEffect, useState } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { fetchImages } from 'Services/ImageApi';
import Notiflix from 'notiflix';

export const App = () => {
  const [searchRequest, setSearchRequest] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchRequest) {
      return;
    }
    setStatus('pending');
    fetchImages(searchRequest, page)
      .then(response => {
        if (response.status === 400) {
          return Promise.reject(
            new Error(
              `We're sorry, but you've reached the end of search results.`
            )
          );
        }
        return response.json();
      })
      .then(data => {
        const hits = data.hits;
        setGallery([...gallery, ...hits]);
        setStatus('resolved');
        Notiflix.Notify.success(`We found ${data.totalHits} pictures`);

        if (hits.length === 0) {
          return Promise.reject(new Error(`no results found ${searchRequest}`));
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchRequest, page]);

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onSubmitSearchRequest = word => {
    setSearchRequest(word);
    setPage(1);
    setGallery([]);
  };

  return (
    <div>
      <Searchbar onSubmit={onSubmitSearchRequest}></Searchbar>
      <ImageGallery
        status={status}
        gallery={gallery}
        error={error}
        onLoadMore={onLoadMore}
      ></ImageGallery>
    </div>
  );
};
