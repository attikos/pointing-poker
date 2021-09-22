import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import Game from '../Game/Game';
import Lobby from '../Lobby/Lobby';

const PlayGame = (): JSX.Element => {
  const allData = useSelector((state:RootStateOrAny) => state.allData);
  const { status } = allData?.game || {};

  if (status === 'lobby') {
    return <Lobby />;
  }

  if (status === 'game') {
    return <Game />;
  }

  if (status === 'result') {
    return <Game />; // TODO: Result
  }

  return <Lobby />; // default page - WIP, replace with result
};

export default PlayGame;
