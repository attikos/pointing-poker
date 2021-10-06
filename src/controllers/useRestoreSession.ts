import api from '../services/api';
import useSubscribe from './useSubscribe';

const useRestoreSession = () =>{
  const [subscribe] = useSubscribe();

  const restoreSession = async ():Promise<void> => {
    const success = await api.restoreSession();

    if (success) {
      subscribe();
    }
  };

  return [restoreSession];
};

export default useRestoreSession;
