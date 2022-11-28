import { Component } from 'react';
import { fetchItems } from './components/Searchbar/API';
import { ColorRing } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, ImageGallery, Modal, Header, Box } from './components';

class App extends Component {
  state = {
    images: [],
    search: '',
    page: 1,
    totalHits: null,
    status: 'idle',
    url: '',
  };

  async componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (prevState.page < page) {
      try {
        const { hits } = await this.imageLoader(search, page);
        this.setState({
          images: [...prevState.images, ...hits],
          status: 'resolved',
        });
      } catch (error) {
        console.log('error', error);
      }
    }
  }

  onFormSubmit = async e => {
    e.preventDefault();
    const query = e.target[1].value;

    try {
      const { hits, totalHits } = await this.imageLoader(query, 1);
      if (!hits.length) this.notify();
      this.setState({
        images: hits,
        search: query,
        page: 1,
        totalHits: totalHits,
        status: 'resolved',
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  imageLoader = async (query, page) => {
    this.setState({ status: 'pending' });
    const data = await fetchItems(query, page);
    return data;
  };

  handleInputChange = e => {
    const { value } = e.target;
    this.setState({ search: value });
  };
  onClickLoadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  onImageClick = e => {
    const element = e.target.parentNode;
    if (element.nodeName !== 'LI') return;
    this.setState({ url: element.dataset.link });
  };

  onCloseModal = () => {
    this.setState({ url: '' });
  };
  notify = () => toast('Sorry! We did not find any pictures!');

  render() {
    const { images, totalHits, page, status, url } = this.state;
    return (
      <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
        <Header
          onSubmit={this.onFormSubmit}
          onChange={this.handleInputChange}
        />
        <ImageGallery images={images} onClick={this.onImageClick} />
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
        {totalHits / 12 > page ? <Button onClick={this.onClickLoadMore} /> : ''}
        {url ? <Modal url={url} onCloseModal={this.onCloseModal} /> : ''}
        <ToastContainer />
      </Box>
    );
  }
}

export default App;
