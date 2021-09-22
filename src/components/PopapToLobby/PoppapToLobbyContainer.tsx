import { connect } from 'react-redux';
// import { updateUserAC } from '../../store/popapLobby-redux';
import { updateAllData } from '../../store/all-data-redux';
import PoppapToLobby from './PoppapToLobby';
import {
  User, TGameNiceId, IGame, IServerData,
} from '../../interface';
import api from '../../services/api';
import { websocket } from '../../services/socket';

const mapStateToProps = (state: any) => ({ state });

const mapDispatchToProps = (
  dispatch: (arg0: { type: string; value: IServerData }) => void,
  // props: {
  //   setActive: (arg0: boolean) => void;
  // },
) => {
  

  return {

  };
};

const PoppapToLobbyContainer = connect(mapStateToProps, mapDispatchToProps)(PoppapToLobby);

export default PoppapToLobbyContainer;
