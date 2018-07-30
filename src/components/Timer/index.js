// @flow
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
} from '../../store/actions';

import * as timerSelectors from '../../store/selectors';

const Counter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  background-color: ${props => (props.isActive ? '#40C984' : '#8f9ba9')};
  color: #fff;
  width: 100%;
  padding: 16px;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
`;

const Logo = styled.img.attrs({
  src: 'src/assets/int_td.png',
})`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const Play = styled.img.attrs({
  src: 'src/assets/play.svg',
})`
  width: 24px;
  height: 24px;
`;

const Stop = styled.img.attrs({
  src: 'src/assets/stop.svg',
})`
  width: 24px;
  height: 24px;
`;

const Time = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto Mono';
`;

const Footer = styled.div`
  background-color: #edf0f5;
  color: #8f9ba9;
  width: 100%;
  padding: 16px;
  font-weight; 500;
`;

const TimeCounter = styled.div`
  color: ${props => (props.isActive ? '#40C984' : '#8f9ba9')};
  padding: 8px;
  border-radius: 50%;
`;

const Button = styled.button`
  margin: 0;
  padding: 0;
  border-radius: 50%;
  background-color: ${props => (props.isActive ? '#40C984' : '#8f9ba9')};
  margin-left: 24px;
  border: 0;
  font-size: 24px;
  outline: none;
  width: 56px;
  height: 56px;
  cursor: pointer;
  align-items: center;
`;

const DisplayCount = styled.span`
  padding: 8px;
  line-height: 1.5;
  font-size: 24px;
  color: #fff;
  background-color: ${props => (props.isActive ? '#40C984' : '#8f9ba9')};
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 4px;
`;

type Props = {
  timerState: string,
  workedTime: string,
  hours: string,
  minutes: string,
  seconds: string,
  toggleTimerState: Function,
  setStartTime: Function,
  setStopTime: Function,
  setCurrentTime: Function,
  resetTimer: Function,
};

class Timer extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.timer = null;
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  tick = () => {
    this.props.setCurrentTime(format(new Date()));
  };

  startTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.props.resetTimer();
    this.props.setStartTime(format(new Date()));
    this.updateCurrentTimer();
  };

  updateCurrentTimer = () => {
    this.timer = setInterval(this.tick, 1000);
  };

  stopTimer = () => {
    this.props.setStopTime(format(new Date()));
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

  timer: any;

  renderCounter = data =>
    data
      .split('')
      .map(time => <DisplayCount isActive={this.props.timerState !== 'Play'}>{time}</DisplayCount>);

  render() {
    const { timerState, workedTime } = this.props;

    return (
      <Counter>
        <Header isActive={timerState === 'Play'}>
          <Logo />
          <span>Time Doctor</span>
        </Header>
        <Time>
          <TimeCounter isActive={timerState === 'Play'}>
            {this.renderCounter(this.props.hours)}:{this.renderCounter(this.props.minutes)}:
            {this.renderCounter(this.props.seconds)}
            <Button isActive={timerState === 'Play'} onClick={this.toggleTimer}>
              {timerState === 'Play' ? <Play /> : <Stop />}
            </Button>
          </TimeCounter>
        </Time>
        <Footer>Worked Today: {workedTime}</Footer>
      </Counter>
    );
  }
}

const mapStateToProps = state => ({
  startTime: timerSelectors.getStartTime(state),
  stopTime: timerSelectors.getStopTime(state),
  timerState: timerSelectors.getTimerState(state),
  currentTime: timerSelectors.getCurrentTime(state),
  workedTime: timerSelectors.getWorkedTimeNormalized(state),
  hours: timerSelectors.getHours(state),
  minutes: timerSelectors.getMinutes(state),
  seconds: timerSelectors.getSeconds(state),
});

const mapDispatchToProps = dispatch => ({
  resetTimer: () => dispatch(resetTimer()),
  toggleTimerState: () => dispatch(toggleTimerState()),
  setStartTime: time => dispatch(setStartTime(time)),
  setStopTime: time => dispatch(setStopTime(time)),
  setCurrentTime: time => dispatch(setCurrentTime(time)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timer);
