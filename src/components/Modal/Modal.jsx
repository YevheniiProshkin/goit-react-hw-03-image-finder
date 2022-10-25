import PropTypes from 'prop-types';
import { Overlay, Window } from 'components/Modal/Modal.styled';

export const Modal = ({ largeImageUrl, onClick }) => {
  return (
    <Overlay id="Overlay" onClick={onClick}>
      <Window>
        <img src={largeImageUrl} alt="" />
      </Window>
    </Overlay>
  );
};

Modal.propTypes = {
  largeImageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
