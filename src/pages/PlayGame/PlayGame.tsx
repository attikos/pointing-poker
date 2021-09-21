import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import LobbyContainer from '../Lobby/LobbyContainer';
import Game from '../Game/Game';

const PlayGame = () => {
  const allData = useSelector((state:RootStateOrAny) => state.allData);
  const { status } = allData?.game || {};

  if (status === 'lobby') {
    return <LobbyContainer />;
  }

  if (status === 'game') {
    return <Game />;
  }

  if (status === 'result') {
    return <Game />; // TODO: Result
  }

  return <LobbyContainer />; // default page - WIP, replace with result
};

export default PlayGame;
