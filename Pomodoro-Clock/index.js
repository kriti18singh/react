class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var p = this.props.playState;
    var cname= (p == false) ? 'glyphicon glyphicon-play' : 'glyphicon glyphicon-pause';
    return(
      <div >
        <h5>Controls</h5>
        <button id='start_stop' onClick={this.props.clickHandler}><i className={cname}></i></button>
        <button id='reset' onClick={this.props.resetHandler}><i className='glyphicon glyphicon-refresh'></i></button>
       </div> 
    )
  }
}

class Length extends React.Component {
  constructor(props) {
    super(props);
  } 
  render() {
    return (
      <div className='length-div'>
        <p id={this.props.id}>{this.props.name} Length</p>
        <button className='btn' id={this.props.btni_id} name='btn-i' onClick={this.props.increment}>+</button>
        <p className='stride' id={this.props.strid}>{this.props.startValue}</p>
        <button className='btn' id={this.props.btnd_id} name='btn-d' onClick={this.props.decrement}>-</button>
       </div> 
    )
  }
}

function zeroPad(number, size = 2) {
  let s = String(number);
  while (s.length < size) { s = '0' + s;}
  return s;
}

function timeFormat(miliseconds) {
  let remaining = miliseconds / 1000;
  //const hh = parseInt( remaining / 3600, 10 );
  //remaining %= 3600;
  const mm = parseInt( remaining / 60, 10 );
  const ss = parseInt( remaining % 60, 10 );
  //const S  = parseInt( (miliseconds % 1000) / 100, 10 );
  return `${ zeroPad( mm ) }:${ zeroPad( ss ) }`;
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cycle : 'sessionTime',
      sessionTime : 25,
      breakTime : 5,
      currentTime:25*60000,
      timerId: false
    }
    this.incrementSessionTime = this.incrementSessionTime.bind(this);
    this.incrementBreakTime = this.incrementBreakTime.bind(this);
    this.decrementSessionTime = this.decrementSessionTime.bind(this);
    this.decrementBreakTime = this.decrementBreakTime.bind(this);
    this.playOrPause = this.playOrPause.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.reset = this.reset.bind(this);
  }
  incrementSessionTime() {
    this.setState((prevState) => {
      var s = prevState.sessionTime + 1;
      console.log("s = " + s);
      var t = prevState.timerId==false ? s*60000 :  prevState.currentTime;
      if(s < 61)
        return (
        {
          sessionTime : s,
          currentTime : t
        }
      )
    });
  }
  incrementBreakTime() {
    this.setState((prevState) => {
      var s = prevState.breakTime + 1;
      if(s < 61)
        return (
        {breakTime : prevState.breakTime + 1}
      )
    });
  }
  decrementSessionTime() {
    this.setState((prevState) => {
      var s = prevState.sessionTime - 1;
      console.log("s = " + s);
      var t = prevState.timerId==false ? s*60000 :  prevState.currentTime;
      if(s > 0 )
        return (
        {
          sessionTime : s,
          currentTime : t
        }
      )
    });
  }
  decrementBreakTime() {
    this.setState((prevState) => {
      if(prevState.breakTime-1 > 0)
        return (
        {
          breakTime : prevState.breakTime - 1
        }
      )
    });
  }
  reset() {
    console.log("reset");
    if(this.state.timerId !== 0 && this.state.timerId !== false) {
      clearInterval(this.state.timerId);
    }
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    this.setState({
      cycle : 'sessionTime',
      sessionTime : 25,
      breakTime : 5,
      currentTime:25*60000,
      timerId: false
    });
  }
  updateTime() {
    console.log("updateTime called")
    //if(this.state.timerId == 0 || this.state.timerId === false) {
      //console.log("update time returning");
      //return;
    //}
    this.setState((prevState) => {
      const currentState = Object.assign(prevState);
      const stillActive = (prevState.currentTime - 1000) >= 0;
      const nextCycle = prevState.cycle === 'sessionTime' ? 'breakTime' : 'sessionTime';

      console.log("setting state " + prevState.currentTime);
      if(prevState.currentTime-1000 == 0) {
        console.log("setting state1");
        document.getElementById("beep").play();
      }
      
      currentState.currentTime = stillActive ? currentState.currentTime - 1000 : currentState[nextCycle] * 60000;
      currentState.cycle = stillActive ? currentState.cycle : nextCycle;
      if (this.timerID) {
        currentState.timerId = this.timerID;
      }
      
      console.log("current state " + JSON.stringify(currentState));
      return currentState;
      
    })
    
  }
  playOrPause() {
    console.log("playOrPause " + this.state.timerId);
    if(this.state.timerId !== 0 && this.state.timerId !== false) {
      //console.log("playOrPause clearing interval");
      clearInterval(this.state.timerId);
      this.timerID=0;
      this.setState({
          //currentTime: this.state.sessionTime,
          timerId: false,
          //cycle: 'sessionTime'
      });
      return;
    } else {
      
      this.timerID = setInterval(() => this.updateTime(), 1000);
      this.setState({
        timerId : this.timerID
      })
    }
  }
  
  render() {
    //console.log(" current time = " + this.state.currentTime);
    const t = timeFormat(this.state.currentTime);
    //console.log(" t= " + t);
    return(
      <div className='center'>
        
        <div style={{display: 'block'}}>
          <div className='bsf'>
            <Length  
              id='break-label' 
              btni_id='break-increment'
              btnd_id='break-decrement'
              strid='break-length'
              name='break' 
              startValue={this.state.breakTime} 
              increment={this.incrementBreakTime} 
              decrement={this.decrementBreakTime}
            />
            <Footer playState={this.state.timerId} clickHandler={this.playOrPause} resetHandler={this.reset} />
            <Length 
              id='session-label'
              btni_id='session-increment'
              btnd_id='session-decrement'
              strid='session-length'
              name='session'  
              startValue={this.state.sessionTime} 
              increment={this.incrementSessionTime}
              decrement={this.decrementSessionTime}
            />
            
          </div>
          <br />
          <br />
          
          <div className='clock'>
            <p id='timer-label'>{this.state.cycle}</p>
            <p id='time-left'>{t}</p>
          </div>  
          <audio id="beep" src = "http://soundbible.com/grab.php?id=96&type=mp3"></audio>
        </div>  
        
       </div> 
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'))