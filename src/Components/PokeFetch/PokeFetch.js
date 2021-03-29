import React, { Component } from 'react'
import './PokeFetch.css';

class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      
      isRunning: false,
      seconds: 10,
      isVisible: false
    }
  }

  countDown(){
    if (this.state.isRunning === true && this.state.seconds > 0){
      this.setState((prevState) => ({seconds: prevState.seconds - 1})); //grabs the previous state then decrements by one
      console.log(this.state.seconds)
    }
  }

  /*
    called a soon as component is mounted
    good place to initiate API calls 
    allows for setState() which will update state and cause another rendering but will happen before browser updates UI
      • not recommended though bc usually only used for special cases
  */
  componentDidMount() { 
    console.log('Component Did Mount')
    this.interval = setInterval(() => this.countDown(), 1000);
    console.log(this.interval);
  }

  /*
    invoked on update
      update DOM on state change (so this is where the state change logic goes)
      setState() can be called but needs logic to check state changes from previous state (or else there would be an infinite loop)
  */
  componentDidUpdate() {
    //check if timer === 0 and if visibility is false; trigger visibility to be true
    console.log('Component updated')
    if (this.state.seconds === 0 && this.state.isVisible === false){
      this.setState({isVisible: true});
    }
  }

  /*
    called before component is unmounted and deleted
      any clean up actions need to do, this is where to do it
      clear the timer here, cancel api calls
  */
  componentWillUnmount() {
    console.log('Component Unmounted')
    //use this for any JS timers to clear timers
    clearInterval(this.interval); //clear the interval in this component
  }

  resetComponent() {
    this.setState({
      isRunning: false,
      isVisible: false,
      seconds: 10
    })
  }

  fetchPokemon() {
    this.resetComponent();

    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          isRunning: true
        })
      })
      .catch((err) => console.log(err))
  }

  //for timer, do a ternary on the inline styling for brightness, if timer is 0 then set the style to brightness 100%

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'}>{this.state.seconds}</h1>
        <div className={'pokeWrap'}>
          {
            this.state.isVisible === true? 
            ( 
              <div>
                <img className={'pokeImg'} src={this.state.pokeSprite}/> 
                <h1 className={'pokeName'}>{this.state.pokeName}</h1>
              </div>
            ) : ( 
              <div>
                <img className={'pokeImg'} src={this.state.pokeSprite} style={{filter: "brightness(0%)"}}/> 
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default PokeFetch;