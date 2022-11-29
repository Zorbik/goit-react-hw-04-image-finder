import { useEffect } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ url, onCloseModal }) => {
  const onOverlayClick = e => {
    if (e.target.nodeName !== 'DIV') return;
    onCloseModal();
  };

  useEffect(() => {
    window.addEventListener('keydown', onEscapeDown);
    return () => {
      window.removeEventListener('keydown', onEscapeDown);
    };
    // eslint-disable-next-line
  }, []);

  const onEscapeDown = e => {
    if (e.code !== 'Escape') return;
    onCloseModal();
  };

  return (
    <Overlay onClick={onOverlayClick}>
      <ModalWindow>
        <img src={url} alt="" />
      </ModalWindow>
    </Overlay>
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
