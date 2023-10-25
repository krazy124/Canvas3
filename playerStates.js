//this is a simple enum that gives names instead of number tothe different player states
const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
};

class State {
  constructor(state) {
    this.state = state; //converted state to a class property
  }
}

//each state will have it's own class that extends State
export class Sitting extends State {
  //constructor takes a refernce to the player object so it can access the properties of the player class
  constructor(player) {
    //Because we are extending the class State we use the super key word
    super('SITTING');
    this.player = player;
  }
  enter() {
    this.player.frameY = 0;
  }
  handleInput(input) {}
}
