import { connect } from 'react-redux';
import Lobby from './Lobby';

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};
const mapDispatchToProps = () => {
  return {
   
  };
};

const LobbyContainer = connect(mapStateToProps, mapDispatchToProps)(Lobby);

export default LobbyContainer;
