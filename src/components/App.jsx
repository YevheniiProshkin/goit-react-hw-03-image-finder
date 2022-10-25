// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 140,
//         color: '#010101',
//       }}
//     >
//       👀 in progress
//     </div>
//   );
// };

import { Component } from 'react';
import api from '../services/PixabayAPI';
import { Container } from 'style/Base.styled';
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
  };

  async componentDidUpdate(prevProp, prevState) {
    const { searchQuery, page } = this.state;
    if (searchQuery !== prevState.searchQuery || page !== prevState.page) {
      try {
        this.setState({ isLoading: true });
        const images = await api.fetchImages(searchQuery, page);
        if (prevState.searchQuery === this.state.searchQuery) {
          this.setState(prevState => {
            return { images: [...prevState.images, ...images] };
          });
        } else {
          this.setState({ images: images });
        }
      } catch (error) {
        this.setState({ error: 'picture not found 🤷‍♀️' });
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
    });
  };

  onButtonClick = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  onItemClick = id => {
    const modalImage = this.state.images.find(image => image.id === id);
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
    const { images, isLoading, isOpen, modalImageURL } = this.state;
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
        {images.length >= 12 && <LoadMore onClick={this.onButtonClick} />}
      </Container>
    );
  }
}
