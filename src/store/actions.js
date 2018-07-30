// @flow

import {
  RESET_TIMER,
  TOGGLE_TIMER_STATE,
  SET_START_TIME,
  SET_STOP_TIME,
  SET_CURRENT_TIME,
  SAVE_TIMESTAMP,
} from './constants';

export const resetTimer = () => ({ type: RESET_TIMER });

export const toggleTimerState = () => ({ type: TOGGLE_TIMER_STATE });

export const setStartTime = (time: ?string) => ({ type: SET_START_TIME, payload: time });

export const setCurrentTime = (time: ?string) => ({ type: SET_CURRENT_TIME, payload: time });

export const setStopTime = (time: ?string) => ({ type: SET_STOP_TIME, payload: time });

export const saveTimeStamp = (timeStampObject: Object) => ({
  type: SAVE_TIMESTAMP,
  payload: timeStampObject,
});
