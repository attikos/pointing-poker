import api from '../services/api';
import subscribe from './subscribe';

const restoreSession = async (): Promise<void> => {
  const success = await api.restoreSession();

  if (success) {
    subscribe();
  }
};

export default restoreSession;
