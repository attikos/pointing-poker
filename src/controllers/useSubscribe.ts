import { IServerData, IUser } from '../interface';
import { updateAllData, initServerData } from '../store/all-data-redux';
import { websocket } from '../services/socket';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAC, initialUserState } from '../store/user-redux';
import api from '../services/api';
import { RootState } from '../store/store-redux';

const useSubscribe = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userData);

  const subscribe = async ():Promise<boolean> => {
    dispatch(updateAllData(initServerData));
    dispatch(updateUserAC(initialUserState));

    await websocket.connect();

    websocket.subscription?.on('all-data', (data: IServerData) => {
      dispatch(updateAllData(data));
    });

    websocket.subscription?.on('user', (data:IUser) => {
      dispatch(updateUserAC(data));
    });

    websocket.subscription?.on('user-dropped', (TNiceId) => {

      // TODO - получить доступ к редактсу из обработчика событий. Иначе - userData пустой
      console.log('user-dropped', TNiceId);
      console.log('userData.niceId', userData.niceId);

      if (userData.niceId === TNiceId) {
        websocket.close();
        dispatch(updateAllData(initServerData));
        dispatch(updateUserAC(initialUserState));
      }
    });

    websocket.subscription?.on('close', () => {
      dispatch(updateAllData(initServerData));
      dispatch(updateUserAC(initialUserState));
    });

    websocket.ws?.on('close', () => {
      dispatch(updateAllData(initServerData));
      dispatch(updateUserAC(initialUserState));
    });

    return new Promise( response => {
      const DELAY_WS = 200;
      setTimeout(() => {
        api.fetchAllData();
        api.fetchUser();
        response(true);
      }, DELAY_WS);
    });
  };

  return [subscribe];
};

export default useSubscribe;
