import { useState } from 'react';
import { Header, Input, Button } from './Searchbar.styled';
import PropTypes from 'prop-types';

export const Searchbar = ({onSubmit}) => {
  const [search, setSearch] = useState('')

 const onFormSubmit = e => {
    e.preventDefault();
    if (search.trim() === '') {
      alert('Please, enter something');
      return;
    }
    onSubmit(search);
    reset();
    window.scrollTo(0,1)
  };

  const onInputChange = e => {
    setSearch(e.target.value.toLowerCase());
  };

  const reset = () => {
   setSearch('')
  }

  
    return (
      <Header>
        <form style={{ position: 'relative' }} onSubmit={onFormSubmit}>
          <Button type="submit">🔎</Button>

          <Input
            value={search}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={onInputChange}
          />
        </form>
      </Header>
    );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
