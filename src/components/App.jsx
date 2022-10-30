import { Component } from 'react';
import api from '../services/PixabayAPI';
import { Container } from 'style/AppContainer.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { LoadMore } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    isLoading: false,
    error: null,
    modalImageURL: null,
    isOpen: false,
    totalHits: null,
  };

  async componentDidUpdate(prevProp, prevState) {
    const { searchQuery, page } = this.state;
    if (searchQuery !== prevState.searchQuery || page !== prevState.page) {
      try {
        this.setState({ isLoading: true });

        const images = await api.fetchImages(searchQuery, page);

        // if (prevState.searchQuery === this.state.searchQuery) {
        this.setState(prevState => {
          return {
            totalHits: images.hits,
            images: [...prevState.images, ...images],
          };
        });
        // if (page === 1 && images.totalHits !== 0) {
        //   this.setState({ error: 'error' });
        // }
        // } else {
        //   this.setState({ images: images });
        // }
      } catch (error) {
        this.setState({ error: 'picture not found' });
      } finally {
        this.setState({ isLoading: false });
      }
    }
    return null;
  }

  onSubmit = searchQuery => {
    this.setState({
      searchQuery: [searchQuery.toString()],
      page: 1,
      images: [],
    });
  };

  onButtonClick = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  onItemClick = largeImageURL => {
    const modalImage = this.state.images.find(
      image => image.largeImageURL === largeImageURL
    );
    this.setState({
      modalImageURL: modalImage.largeImageURL,
      isOpen: true,
    });
  };

  onOverlayClick = e => {
    const overlay = document.getElementById('Overlay');
    if (e.target === overlay) {
      this.setState({ isOpen: false });
    }
  };

  render() {
    const { images, isLoading, isOpen, modalImageURL, totalHits, page } =
      this.state;

    const pages = Math.ceil(totalHits / 12);

    // const lastPage = page === pages;

    const showLoadMore = page === pages && !images.length && !isLoading;

    // const ShowLoadMore =
    //   images.length !== 0 && images.length !== totalHits && !isLoading;

    return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} />
        {isOpen ? (
          <Modal onClick={this.onOverlayClick} largeImageUrl={modalImageURL} />
        ) : null}
        {isLoading ? <Loader /> : null}
        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.onItemClick} />
        )}
        {/* {images.length >= 12 && <LoadMore onClick={this.onButtonClick} />} */}
        {/* {!isLoading &&
          error === '' &&
          (totalHits ? (
            <p>No more content</p>
          ) : (
            images.length !== 0 && <LoadMore handleClick={this.onButtonClick} />
          ))} */}
        {showLoadMore && <LoadMore onClick={this.onButtonClick} />}
        {/* {!isLoading && !lastPage && <LoadMore onClick={this.onButtonClick} />} */}
      </Container>
    );
  }
}
