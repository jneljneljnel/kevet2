import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Single = (props) => 
  <div>
    <img src={props.occupied  ? '/assets/img/ptclosed.jpg':'/assets/img/ptopen.jpg'}/>
  </div>



const Emergency = (props) => 
  <div>
    <h2>Emergency in unit number {props.id}</h2>
  </div>

const twilio = (currentState) => {

// let sid = ACd42beff2e015d822cfdbfc2003d89dca
// let token = 9f9146e35f08ca5a6578e3e864c9b2a4
 



  console.log(currentState.emergency[0].id);
}


class App extends Component {
  state = {connected: [] , emergency:[]};
   componentDidMount() {
    fetch('/api/connected2')
      .then(res => res.json())
      .then(connected => this.setState({ connected }));
    fetch('/api/emergency')
      .then(res => res.json())
      .then(emergency => {
        this.setState({ emergency });
        this.state.emergency.length ? twilio(this.state) : '';
      });           
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to React</h1>
        </div>
        <div>
          {this.state.emergency.map(e =>
          <Emergency id={e.id}/>
        )}
        </div>
         {this.state.connected.map(conn =>
          <Single id={conn.id} occupied={conn.occupied}/>
        )}
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
