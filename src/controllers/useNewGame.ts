import api, { NewGameParams } from '../services/api';
import useSubscribe from './useSubscribe';

export const useNewGame = () => {
  const [subscribe] = useSubscribe();

  const newGame = async (data: NewGameParams): Promise<boolean> => {
    const success = await api.newGame(data);

    if (success) {
      return subscribe();
    }

    return false;
  };

  return [newGame];
};
