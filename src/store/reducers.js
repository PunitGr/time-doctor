// @flow
import {
  RESET_TIMER,
  TOGGLE_TIMER_STATE,
  SET_START_TIME,
  SET_STOP_TIME,
  SET_CURRENT_TIME,
  SAVE_TIMESTAMP,
} from './constants';

const initialState: Object = {
  timerState: false,
  startTime: null,
  stopTime: null,
  currentTime: null,
  timeStampObject: null,
};

type State = {
  timerState: ?string,
  startTime: ?string,
  stopTime: ?string,
  currentTime: ?string,
  timeStampObject: Object,
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

    case SAVE_TIMESTAMP:
      return {
        ...state,
        timeStampObject: {
          ...state.timeStampObject,
          [action.payload]: {
            startTime: state.startTime,
            stopTime: state.stopTime,
          },
        },
      };

    default:
      return state;
  }
};

export default timer;
