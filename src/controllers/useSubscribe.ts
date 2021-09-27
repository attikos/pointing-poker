import { IServerData, IUser } from '../interface';
import { updateAllData, initServerData } from '../store/all-data-redux';
import { websocket } from '../services/socket';
import { useDispatch } from 'react-redux';
import { updateUserAC, initialUserState } from '../store/user-redux';
import api from '../services/api';

const useSubscribe = () => {
  const dispatch = useDispatch();

  const subscribe = async ():Promise<boolean> => {
    await websocket.connect();
    websocket.subscription?.on('all-data', (data: IServerData) => {
      dispatch(updateAllData(data));
    });

    websocket.subscription?.on('user', (data:IUser) => {
      dispatch(updateUserAC(data));
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
        response(true);
        api.fetchAllData();
        api.fetchUser();
      }, DELAY_WS);
    });
  };

  return [subscribe];
};

export default useSubscribe;
