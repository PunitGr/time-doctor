// @flow
import { remote } from 'electron';
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import format from 'date-fns/format';

import {
  resetTimer,
  toggleTimerState,
  setStartTime,
  setStopTime,
  setCurrentTime,
  saveTimeStamp,
} from '../../store/actions';

import * as timerSelectors from '../../store/selectors';

const Time = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-family: 'Roboto Mono';
`;

const TimeCounter = styled.div`
  color: #fff;
  border-radius: 50%;
`;

const Button = styled.button`
  margin: 0;
  color: #fff;
  border: 0;
  width: 24px;
  height: 24px;
  outline: none;
  border-radius: 50%;
  background-color: #417283;
  align-items: center;
  padding: 0;
`;

const DisplayCount = styled.span`
  font-size: 16px;
  color: #fff;
`;

const DragAndDrop = styled.img.attrs({
  src: 'src/assets/dragndrop.svg',
})`
  -webkit-app-region: drag;
  width: 16px;
  height: 16px;
  margin-left: 4px;
`;

const Play = styled.img.attrs({
  src: 'src/assets/play.svg',
})`
  width: 12px;
  height: 12px;
`;

const Stop = styled.img.attrs({
  src: 'src/assets/stop.svg',
})`
  width: 12px;
  height: 12px;
`;

const Close = styled.img.attrs({
  src: 'src/assets/clear.svg',
})`
  width: 8px;
  height: 8px;
`;

const CloseButton = styled.button`
  margin: 0;
  margin-right: 4px;
  color: #fff;
  border: 0;
  width: 20px;
  height: 20px;
  outline: none;
  border-radius: 50%;
  background-color: #000;
  align-items: center;
  padding: 0;
`;

const TimerState = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => (props.isActive ? '#40C984' : '#000')};
`;

type Props = {
  timerState: string,
  hours: string,
  minutes: string,
  timeStamp: Object,
  toggleTimerState: Function,
  setStartTime: Function,
  setStopTime: Function,
  setCurrentTime: Function,
  resetTimer: Function,
  saveTimeStamp: Function,
};

class Widget extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.timer = null;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    this.props.setCurrentTime(format(new Date()));
  };

  startTimer = () => {
    clearInterval(this.timer);
    this.props.resetTimer();
    this.props.setStartTime(format(new Date()));
    this.updateCurrentTimer();
  };

  updateCurrentTimer = () => {
    this.timer = setInterval(this.tick, 1000);
  };

  stopTimer = () => {
    this.props.setStopTime(format(new Date()));
    const { timeStamp } = this.props;

    const id = timeStamp ? Object.keys(timeStamp).length : 0;
    this.props.saveTimeStamp(id);
    if (this.timer) {
      clearInterval(this.timer);
    }
  };

  toggleTimer = () => {
    this.props.toggleTimerState();
    if (this.props.timerState === 'Play') {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  };

  closeWindow = () => {
    const window = remote.getCurrentWindow();
    window.hide();
  };

  timer: any;

  renderCounter = data =>
    data
      .split('')
      .map(time => <DisplayCount isActive={this.props.timerState !== 'Play'}>{time}</DisplayCount>);

  render() {
    const { timerState } = this.props;

    return (
      <Time>
        <DragAndDrop />
        <Button isActive={timerState !== 'Play'} onClick={this.toggleTimer}>
          {timerState === 'Play' ? <Play /> : <Stop />}
        </Button>
        <TimerState isActive={timerState !== 'Play'} />
        <TimeCounter>
          {this.renderCounter(this.props.hours)}:{this.renderCounter(this.props.minutes)}
        </TimeCounter>
        <CloseButton onClick={this.closeWindow}>
          <Close />
        </CloseButton>
      </Time>
    );
  }
}

const mapStateToProps = state => ({
  timerState: timerSelectors.getTimerState(state),
  currentTime: timerSelectors.getCurrentTime(state),
  hours: timerSelectors.getHours(state),
  minutes: timerSelectors.getMinutes(state),
  timeStamp: timerSelectors.getSavedTimeStamp(state),
});

const mapDispatchToProps = dispatch => ({
  resetTimer: () => dispatch(resetTimer()),
  toggleTimerState: () => dispatch(toggleTimerState()),
  setStartTime: time => dispatch(setStartTime(time)),
  setStopTime: time => dispatch(setStopTime(time)),
  setCurrentTime: time => dispatch(setCurrentTime(time)),
  saveTimeStamp: timeStamp => dispatch(saveTimeStamp(timeStamp)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Widget);
