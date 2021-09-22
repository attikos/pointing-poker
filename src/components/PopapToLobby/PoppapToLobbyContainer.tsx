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
  const routerHandler = (history: any, { game }: { game: IGame }) => {
    if (game.status === 'lobby' || game.status === 'game') {
      history.push(`/${game.niceId}`);
    } else {
      history.push('/');
    }
  };

  return {
    async handleSubmit(values: { history: any, user: User, gameNiceId: TGameNiceId }) {
      console.log('handleSubmitvalues:', values );
      // dispatch(updateUserAC(values.user))
      // props.setActive(true);

      const success = await api.newGame(values);
      if (success) {
        console.log('success' );
        await websocket.connect();
        websocket.subscription?.on('all-data', (data: IServerData) => {

          console.log('!!!! all-data', data);
          dispatch(updateAllData(data));
          routerHandler(history, data);
        });
        websocket.emit('getAllData');
      }
    },
    openTheLobby(id: TGameNiceId, status: string, history: any) {
      console.log('openTheLobby');
      if (status === 'lobby') {
        history.push(`/${id}`);
      }
    },

    getIinitials(firstName: string, lastName: string) {
      if (firstName && lastName) {
        return firstName[0].toUpperCase() + lastName[0].toUpperCase();
      }
      if (firstName && !lastName) {
        return firstName[0].toUpperCase();
      }
      if (!firstName) {
        return '';
      }
      return '';
    },
  };
};

const PoppapToLobbyContainer = connect(mapStateToProps, mapDispatchToProps)(PoppapToLobby);

export default PoppapToLobbyContainer;
