// @flow
import { createSelector } from 'reselect';
import isEqual from 'date-fns/is_equal';
import differenceInWordsStrict from 'date-fns/distance_in_words_strict';
import differenceInHours from 'date-fns/difference_in_hours';
import differenceInMinutes from 'date-fns/difference_in_minutes';
import differenceInSeconds from 'date-fns/difference_in_seconds';

export const getTimerState = state => (state.timerState ? 'Stop' : 'Play');
export const getStartTime = state => state.startTime;
export const getStopTime = state => state.stopTime;
export const getCurrentTime = state => state.currentTime;

export const getWorkedTimeNormalized = createSelector(
  [getTimerState, getStartTime, getStopTime, getCurrentTime],
  (timerState, startTime, stopTime, currentTime) => {
    let relativeTime = '00';
    if (isEqual(startTime, currentTime)) {
      relativeTime = '00';
    } else if (timerState === 'Stop' && startTime && currentTime) {
      relativeTime = differenceInWordsStrict(startTime, currentTime);
    } else if (startTime && stopTime) {
      relativeTime = differenceInWordsStrict(startTime, stopTime);
    }

    relativeTime =
      relativeTime !== '00'
        ? `${(parseInt(relativeTime.split(' ')[0], 10) < 10 ? '0' : '') +
            relativeTime.split(' ')[0] +
            relativeTime.split(' ')[1].slice()[0]}`
        : relativeTime;

    return relativeTime;
  },
);

export const getHours = createSelector(
  [getTimerState, getStartTime, getStopTime, getCurrentTime],
  (timerState, startTime, stopTime, currentTime) => {
    let hours = '00';
    if (isEqual(startTime, currentTime)) {
      hours = '00';
    } else if (timerState === 'Stop' && startTime && currentTime) {
      hours = differenceInHours(currentTime, startTime);
    } else if (startTime && stopTime) {
      hours = differenceInHours(stopTime, startTime);
    }
    return hours !== '00' ? `${hours < 10 ? '0' : ''}${hours}` : hours;
  },
);

export const getMinutes = createSelector(
  [getTimerState, getStartTime, getStopTime, getCurrentTime],
  (timerState, startTime, stopTime, currentTime) => {
    let minutes = '00';
    if (isEqual(startTime, currentTime)) {
      minutes = '00';
    } else if (timerState === 'Stop' && startTime && currentTime) {
      minutes = differenceInMinutes(currentTime, startTime);
    } else if (startTime && stopTime) {
      minutes = differenceInMinutes(stopTime, startTime);
    }
    minutes %= 60;
    return minutes !== '00' ? `${minutes < 10 ? '0' : ''}${minutes}` : minutes;
  },
);

export const getSeconds = createSelector(
  [getTimerState, getStartTime, getStopTime, getCurrentTime],
  (timerState, startTime, stopTime, currentTime) => {
    let seconds = '00';
    if (isEqual(startTime, currentTime)) {
      seconds = '00';
    } else if (timerState === 'Stop' && startTime && currentTime) {
      seconds = differenceInSeconds(currentTime, startTime);
    } else if (startTime && stopTime) {
      seconds = differenceInSeconds(stopTime, startTime);
    }
    seconds %= 60;
    return seconds !== '00' ? `${seconds < 10 ? '0' : ''}${seconds}` : seconds;
  },
);
