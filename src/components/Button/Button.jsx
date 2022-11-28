import { LoaderMore } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return <LoaderMore onClick={onClick}>Load more</LoaderMore>;
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
