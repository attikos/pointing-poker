import React from 'react';
import LobbyContainer from '../Lobby/LobbyContainer';
import Game from '../Game/Game';
import { RootStateOrAny, useSelector } from 'react-redux';

const PlayGame = () => {
  const allData = useSelector((state:RootStateOrAny) => state.allData);
  const { status } = allData?.game || {};

  if ( status === 'lobby' ) {
    return <LobbyContainer />;
  }

  if ( status === 'game' ) {
    return <Game />;
  }

  if ( status === 'result' ) {
    return <Game />; // TODO: Result
  }

  return <LobbyContainer />; // default page - WIP, replace with result
};

export default PlayGame;
