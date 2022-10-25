import PropTypes from 'prop-types';
import { Container, Button } from 'components/Button/Button.styled';

export const LoadMore = ({ onClick }) => {
  return (
    <Container>
      <Button onClick={onClick}>Load more</Button>
    </Container>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
