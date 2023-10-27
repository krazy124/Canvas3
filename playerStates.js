//A simple enum that gives names instead of number to the different player states
const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
};

class State {
  //state contains the name of the current state (sitting,running,ect)
  constructor(state) {
    this.state = state;
  }
}

//each state will have it's own class that extends State
export class Sitting extends State {
  //constructor takes a reference to the player object so it can access the properties of the player class
  constructor(player) {
    //Because we are extending the class State we use the super key word which triggers the constructor of its parrent class
    super('SITTING');
    this.player = player;
  }
  //Sets a player up when the player enters a state
  enter() {
    this.player.frameY = 5; //The sprite frameY where the player is sitting is 5
  }
  //Reacts to user inputs depending on the player state
  handleInput(input) {
    if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
      this.player.setState(state.RUNNING);
    }
  }
}

export class Running extends State {
  //constructor takes a reference to the player object so it can access the properties of the player class
  constructor(player) {
    //Because we are extending the class State we use the super key word which triggers the constructor of its parrent class
    super('RUNNING');
    this.player = player;
  }
  //Sets a player up when the player enters a state
  enter() {
    this.player.frameY = 3; //The sprite frameY where the player is sitting is 5
  }
  //Reacts to user inputs depending on the player state
  handleInput(input) {
    if (input.includes('ArrowDown')) {
      this.player.setState(state.SITTING);
    }
  }
}
