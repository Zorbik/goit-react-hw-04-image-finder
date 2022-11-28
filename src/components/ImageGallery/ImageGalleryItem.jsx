import { ImageGalleryItemImg, ImageGalleryItems } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image }) => {
  const { webformatURL, largeImageURL, tags } = image;

  return (
    <ImageGalleryItems data-link={largeImageURL}>
      <ImageGalleryItemImg src={webformatURL} alt={tags} width="320" />
    </ImageGalleryItems>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
