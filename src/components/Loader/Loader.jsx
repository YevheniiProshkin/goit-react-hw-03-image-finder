// import { Audio } from 'react-loader-spinner';

// export const Loader = () => {
//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 'auto',
//       }}
//     >
//       <Audio
//         height="80"
//         width="80"
//         radius="9"
//         color="green"
//         ariaLabel="loading"
//         wrapperStyle
//         wrapperClass
//       />
//     </div>
//   );
// };

import PropTypes from 'prop-types';
import RingLoader from 'react-spinners/RingLoader';
import { Spinner } from './Loader.styled';

export const Loader = ({ loading }) => {
  return (
    <Spinner>
      <RingLoader color="#fc8403" loading={loading} size={120} />
    </Spinner>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool,
};
