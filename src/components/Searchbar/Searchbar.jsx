import {
  Input,
  Searchbar,
  SearchForm,
  SearchFormBtn,
} from './Searchbar.styled';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';

export const Header = ({ onChange, onSubmit }) => {
  return (
    <Searchbar>
      <SearchForm onSubmit={onSubmit}>
        <SearchFormBtn type="submit">
          <span>
            <FiSearch />
          </span>
        </SearchFormBtn>

        <Input
          onChange={onChange}
          className="input"
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
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
