import { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({path, tags, largeImg}) => {
  const [isOpen, setIsOpen] = useState(false)

  const togleModal = () => {
    setIsOpen(!isOpen)
    // this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };

    return (
      <>
        <Image>
          <img
            src={path}
            alt={tags}
            width="360"
            height="260"
            onClick={togleModal}
          />
        </Image>
        {isOpen && (
          <Modal onClose={togleModal}>
            <img src={largeImg} alt={tags} width="900" height="650" />
          </Modal>
        )}
      </>
    );
}

ImageGalleryItem.propTypes = {
  path: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
};
