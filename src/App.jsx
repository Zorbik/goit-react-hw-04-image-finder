import { useState, useEffect } from 'react';
import { fetchItems } from './components/Searchbar/API';
import { ColorRing } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, ImageGallery, Modal, Header, Box } from './components';

const App = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [status, setStatus] = useState('idle');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (search === '') return;

    (async function () {
      try {
        const { hits, totalHits } = await imageLoader(search, page);
        if (!hits.length) notify();

        setImages(prevState => [...prevState, ...hits]);
        setTotalHits(totalHits);

        setStatus('resolved');
      } catch (error) {
        console.log('error', error);
      }
    })();
  }, [search, page]);

  const onFormSubmit = async e => {
    e.preventDefault();
    const query = e.target[1].value;

    setImages([]);
    setSearch(query);
    setPage(1);
  };

  async function imageLoader(query, page) {
    setStatus('pending');
    try {
      const data = await fetchItems(query, page);
      return data;
    } catch (error) {
      console.log('error', error);
    }
  }

  const onClickLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const onImageClick = e => {
    const element = e.target.parentNode;
    if (element.nodeName !== 'LI') return;
    setUrl(element.dataset.link);
  };

  const onCloseModal = () => {
    setUrl('');
  };

  function notify() {
    toast('Sorry! We did not find any pictures!');
  }

  return (
    <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
      <Header onSubmit={onFormSubmit} />
      <ImageGallery images={images} onClick={onImageClick} />
      {status === 'pending' ? (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      ) : (
        ''
      )}
      {totalHits / 12 > page ? <Button onClick={onClickLoadMore} /> : ''}
      {url ? <Modal url={url} onCloseModal={onCloseModal} /> : ''}
      <ToastContainer />
    </Box>
  );
};

export default App;
