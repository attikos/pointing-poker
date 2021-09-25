import api, { NewGameParams } from '../services/api';
import subscribe from './subscribe';

export const newGame = async (data: NewGameParams): Promise<boolean> => {
  const success = await api.newGame(data);

  if (success) {
    return subscribe();
  }

  return false;
};
