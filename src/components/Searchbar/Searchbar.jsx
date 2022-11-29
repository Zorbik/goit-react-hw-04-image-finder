import {
  Input,
  Searchbar,
  SearchForm,
  SearchFormBtn,
} from './Searchbar.styled';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';

export const Header = ({ onSubmit }) => {
  return (
    <Searchbar>
      <SearchForm onSubmit={onSubmit}>
        <SearchFormBtn type="submit">
          <span>
            <FiSearch />
          </span>
        </SearchFormBtn>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Searchbar>
  );
};

Header.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
