import { useEffect } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const useGameRouter = (): void => {
  const history = useHistory();
  const game = useSelector((state: RootStateOrAny) => state.allData.game);

  useEffect(() => {
    if (game.status === 'lobby' || game.status === 'game') {
      history.push(`/${game.niceId}`);
    } else {
      history.push('/');
    }
  }, [game]);

};

export default useGameRouter;
