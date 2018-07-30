// @flow
import {
  RESET_TIMER,
  TOGGLE_TIMER_STATE,
  SET_START_TIME,
  SET_STOP_TIME,
  SET_CURRENT_TIME,
} from './constants';

const initialState: Object = {
  timerState: false,
  startTime: null,
  stopTime: null,
  currentTime: null,
};

type State = {
  timerState: ?string,
  startTime: ?string,
  stopTime: ?string,
  currentTime: ?string,
};

const timer = (state: State = initialState, action: Object) => {
  switch (action.type) {
    case TOGGLE_TIMER_STATE:
      return {
        ...state,
        timerState: !state.timerState,
      };

    case SET_START_TIME:
      return {
        ...state,
        startTime: action.payload,
      };

    case SET_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.payload,
      };

    case SET_STOP_TIME:
      return {
        ...state,
        stopTime: action.payload,
      };

    case RESET_TIMER:
      return {
        ...state,
        startTime: null,
        currentTime: null,
        stopTime: null,
      };

    default:
      return state;
  }
};

export default timer;
