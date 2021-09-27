import { IServerData, IUser } from '../interface';
import { updateAllData } from '../store/all-data-redux';
import { websocket } from '../services/socket';
import { useDispatch } from 'react-redux';
import { updateUserAC } from '../store/user-redux';
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

    api.fetchAllData();
    api.fetchUser();

    return true;
  };

  return [subscribe];
};

export default useSubscribe;
