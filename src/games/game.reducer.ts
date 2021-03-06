import {AnyAction} from 'redux';
import {PlayerActionTypes} from '../players/player.actions';
import {GameState} from '../store/state';
import {GameActionTypes} from './game.actions';

const initialState:GameState = {
  round: 1,
  dealerId: null,
  settings: {
    useDealer: true,
  }
};

export default function GameReducer(state = initialState, action:AnyAction):GameState {
  switch (action.type) {
    case PlayerActionTypes.DELETE:
      if (action.player.id === state.dealerId) {
        return {
          ...state,
          dealerId: null,
        };
      } else {
        return state;
      }
    case GameActionTypes.END_ROUND:
      return {
        ...state,
        round: state.round + 1,
      };
    case GameActionTypes.REMATCH:
      return {
        ...state,
        round: 1,
      };
    case GameActionTypes.SET_DEALER:
      return {
        ...state,
        dealerId: action.dealerId,
      };
    case GameActionTypes.UPDATE_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.settings,
        },
      };
    default:
      return state;
  }
}
