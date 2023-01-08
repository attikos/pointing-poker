import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import Game from '../Game/Game';
import Lobby from '../Lobby/Lobby';
import Result from '../Result/Result';
import Loading from '../Loading/Loading';

const PlayGame = (): JSX.Element => {
  const game = useSelector((state:RootStateOrAny) => state.allData.game);
  const { status } = game || {};

  if (status === 'lobby') {
    return <Lobby />;
  }

  if (status === 'game') {
    return <Game />;
  }

  if (status === 'result') {
    return <Result />;
  }

  return <Loading />;
};

export default PlayGame;
