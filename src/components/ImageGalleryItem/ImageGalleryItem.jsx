import PropTypes from 'prop-types';
import {
  Item,
  Image,
} from 'components/ImageGalleryItem/ImageGalleryItem.styled';

export const ImageGalleryItem = ({ imageUrl, onClick, largeImageURL }) => {
  return (
    <Item onClick={() => onClick(largeImageURL)}>
      <Image src={imageUrl} alt="" />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
};
