import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Backdrop, Content } from './Modal.styled';

const modalPortal = document.getElementById('modal-root');

export const Modal = ({children, onClose}) => {

    return createPortal(
      <Backdrop onClick={onClose}>
        <Content>{children}</Content>
      </Backdrop>,
      modalPortal
    );
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};
