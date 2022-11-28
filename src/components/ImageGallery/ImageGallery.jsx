import { ImageGalleryItem, Box } from '../../components';
import { ImageGalleryList } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <Box as="main">
      <ImageGalleryList onClick={onClick}>
        {images.map(image => (
          <ImageGalleryItem key={image.id} image={image} />
        ))}
      </ImageGalleryList>
    </Box>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
