import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import Game from '../Game/Game';
import Lobby from '../Lobby/Lobby';

interface Props {
  userRole: string;
}
const PlayGame = ({ userRole }: Props): JSX.Element => {
  const allData = useSelector((state:RootStateOrAny) => state.allData);
  const { status } = allData?.game || {};
  console.log('userRolePlayGame', userRole);
  if (status === 'lobby') {
    return <Lobby userRole={userRole}/>;
  }

  if (status === 'game') {
    return <Game />;
  }

  if (status === 'result') {
    return <Game />; // TODO: Result
  }

  return <Lobby  userRole={userRole}/>; // default page - WIP, replace with result
};

export default PlayGame;
