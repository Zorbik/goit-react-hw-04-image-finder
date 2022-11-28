import { Component } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscapeDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscapeDown);
  }

  onOverlayClick = e => {
    if (e.target.nodeName !== 'DIV') return;
    this.props.onCloseModal();
  };

  onEscapeDown = e => {
    if (e.code !== 'Escape') return;
    this.props.onCloseModal();
  };

  render() {
    return (
      <Overlay onClick={this.onOverlayClick}>
        <ModalWindow>
          <img src={this.props.url} alt="" />
        </ModalWindow>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};
