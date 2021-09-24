import { IGame } from '../interface';
import { TGameStatus } from '../types';

const UPDATE_GAME = 'UPDATE_GAME';
const UPDATE_GAME_STATUS = 'UPDATE_GAME_STATUS';

const init: IGame = {
  status: 'lobby',
  userId: 125,
  id: 125,
  niceId: 'HHH111',
  updatedAt: 'a',
  createdAt: 'a',
};

export const updateGameAC = (value: IGame): {
  type: string;
  value: IGame;
} => ({
  type: UPDATE_GAME,
  value,
});

// export const updateGameStatusAC = (value: string): {
//   type: string;
//   value: string;
// } => ({
//   type: UPDATE_GAME_STATUS,
//   value,
// });

const gameReducer = (
  state: IGame = init,
  action: {
    type: string;
    value: TGameStatus;
  }): IGame => {
  let stateCopy;
  switch (action.type) {
    // case UPDATE_GAME:
    //   stateCopy = {
    //     ...state,
    //     game: action.value,
    //   };
    //   return stateCopy;
    case UPDATE_GAME_STATUS:
      stateCopy = {
        ...state,
        status: action.value,
      };
      return stateCopy;
    default:
      return state;
  }
};
export default gameReducer;
