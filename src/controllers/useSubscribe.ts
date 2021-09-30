import { IServerData, IUser } from '../interface';
import { updateAllData, initServerData } from '../store/all-data-redux';
import { websocket } from '../services/socket';
import { useDispatch } from 'react-redux';
import { updateUserAC, initialUserState } from '../store/user-redux';
import api from '../services/api';

const useSubscribe = () => {
  const dispatch = useDispatch();

  const subscribe = async ():Promise<boolean> => {
    console.log('clear storage 1');

    dispatch(updateAllData(initServerData));
    dispatch(updateUserAC(initialUserState));

    await websocket.connect();
    websocket.subscription?.on('all-data', (data: IServerData) => {
      dispatch(updateAllData(data));
    });

    websocket.subscription?.on('user', (data:IUser) => {
      dispatch(updateUserAC(data));
    });

    websocket.subscription?.on('close', () => {
      console.log('clear storage 2');
      dispatch(updateAllData(initServerData));
      dispatch(updateUserAC(initialUserState));
    });

    websocket.ws?.on('close', () => {
      console.log('clear storage 3');
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
