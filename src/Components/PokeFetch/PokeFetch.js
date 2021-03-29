import React, { Component } from 'react'
import './PokeFetch.css';

class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      timeLeft: 0
    }
  }

  startTimer = () => {
    this.setState({
      timer: 10
    })

  }

  decrement() {
    if (this.state.timer > 0) {
      this.setState({
        timer: this.state.timer - 1
      })
    }
  }

  setInterval() {
    setInterval(() => this.decrement(), 1000)
  }

  /*
    called a soon as component is mounted
    good place to initiate API calls 
    allows for setState() which will update state and cause another rendering but will happen before browser updates UI
      • not recommended though bc usually only used for special cases
  */
  componentDidMount() { 
    
  }

  /*
    invoked on update
      update DOM on state change (so this is where the state change logic goes)
      setState() can be called but needs logic to check state changes from previous state (or else there would be an infinite loop)
  */
  componentDidUpdate(prevState) {
    //check if timer === 0 and if visibility is false; trigger visibility to be true
    
  }

  /*
    called before component is unmounted and deleted
      any clean up actions need to do, this is where to do it
      clear the timer here, cancel api calls
  */
  componentWillUnmount() {
    
  }

  fetchPokemon() {
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
        })
      })
      .catch((err) => console.log(err))
  }

  //for timer, do a ternary on the inline styling for brightness, if timer is 0 then set the style to brightness 100%

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >Timer Display</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} src={this.state.pokeSprite} style={{filter: "brightness(0%)"}}/>
          <h1 className={'pokeName'}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;