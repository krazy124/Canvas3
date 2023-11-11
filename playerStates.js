import { Dust, Fire, Splash } from './particles.js';

//A simple enum that gives names instead of number to the different player states
const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  ROLLING: 4,
  DIVING: 5,
  HIT: 6,
};

class State {
  //state contains the name of the current state (sitting,running,ect)
  constructor(state, game) {
    this.state = state;
    this.game = game;
  }
}

//each state will have it's own class that extends State
export class Sitting extends State {
  //constructor takes a reference to the player object so it can access the properties of the player class
  constructor(game) {
    //Because we are extending the class State we use the super key word which triggers the constructor of its parrent class
    super('SITTING', game);
  }
  //Sets a player up when the player enters a state
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 8;
    this.game.player.frameY = 5; //The sprite frameY where the player is sitting is 5
  }
  //Reacts to user inputs depending on the player state
  handleInput(input) {
    if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
      this.game.player.setState(states.RUNNING, 1); //Switch Player to running state if Left or Right is pressed
    } else if (input.includes('ArrowUp')) {
      this.game.player.setState(states.JUMPING, 1); //Switch player jumping state if ArrowUp is pressed
    } else if (input.includes(' ')) {
      this.game.player.setState(states.ROLLING, 2);
    }
  }
}

export class Running extends State {
  //constructor takes a reference to the player object so it can access the properties of the player class
  constructor(game) {
    //Because we are extending the class State we use the super key word which triggers the constructor of its parrent class
    super('RUNNING', game);
  }
  //Sets a player up when the player enters a state
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 8;
    this.game.player.frameY = 3; //The sprite frameY where the player is sitting is 5
  }
  //Reacts to user inputs depending on the player state
  handleInput(input) {
    this.game.particles.unshift(
      new Dust(
        this.game,
        this.game.player.x + this.game.player.width * 0.6,
        this.game.player.y + this.game.player.height * 0.88
      )
    );
    if (input.includes('ArrowDown')) {
      this.game.player.setState(states.SITTING, 0);
    } else if (input.includes('ArrowUp')) {
      this.game.player.setState(states.JUMPING, 1);
    } else if (input.includes(' ')) {
      this.game.player.setState(states.ROLLING, 2); //Switch player jumping state if ArrowUp is pressed
    }
  }
}

export class Jumping extends State {
  //constructor takes a reference to the player object so it can access the properties of the player class
  constructor(game) {
    //Because we are extending the class State we use the super key word which triggers the constructor of its parrent class
    super('JUMPING', game);
  }
  //Sets a player up when the player enters a state
  enter() {
    this.game.player.frameX = 0;
    if (this.game.player.onGround()) this.game.player.vy -= 25.5; //If the player is ont he ground, begin a jump
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 1; //Change the sprite image to a jumping image frame
  }
  //Reacts to user inputs depending on the player state
  handleInput(input) {
    if (this.game.player.vy > this.game.player.weight) {
      //Listens for the player to begins his descent
      this.game.player.setState(states.FALLING, 1); //Change to falling state
    } else if (input.includes(' ')) {
      this.game.player.setState(states.ROLLING, 2); //Switch player jumping state if ArrowUp is pressed
    } else if (input.includes('ArrowDown')) {
      this.game.player.setState(states.DIVING, 0);
    }
  }
}

export class Falling extends State {
  //constructor takes a reference to the player object so it can access the properties of the player class
  constructor(game) {
    //Because we are extending the class State we use the super key word which triggers the constructor of its parrent class
    super('FALLING', game);
  }
  //Sets a player up when the player enters a state
  enter() {
    this.game.player.frameX = 0;
    if (this.game.player.onGround()) this.game.player.vy -= 28.5;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 2; //Changes the sprite frame to a falling image
  }
  //Reacts to user inputs depending on the player state
  handleInput(input) {
    if (this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1);
    } else if (input.includes('ArrowDown')) {
      this.game.player.setState(states.DIVING, 0);
    }
  }
}
export class Rolling extends State {
  //constructor takes a reference to the player object so it can access the properties of the player class
  constructor(game) {
    //Because we are extending the class State we use the super key word which triggers the constructor of its parrent class
    super('ROLLING', game);
  }
  //Sets a player up when the player enters a state
  enter() {
    this.game.player.frameX = 0;
    this.maxFrame = 6;
    this.game.player.frameY = 6; //Changes the sprite frame to a falling image
  }
  //Reacts to user inputs depending on the player state
  handleInput(input) {
    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width * 0.6,
        this.game.player.y + this.game.player.height * 0.88
      )
    );
    if (!input.includes(' ') && this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1);
    } else if (!input.includes(' ') && !this.game.player.onGround()) {
      this.game.player.setState(states.FALLING, 1);
    } else if (
      input.includes(' ') &&
      input.includes('ArrowUp') &&
      this.game.player.onGround()
    ) {
      this.game.player.vy -= 27;
    } else if (input.includes('ArrowDown') && !this.game.player.onGround()) {
      this.game.player.setState(states.DIVING, 0);
    }
  }
}
export class Diving extends State {
  //constructor takes a reference to the player object so it can access the properties of the player class
  constructor(game) {
    //Because we are extending the class State we use the super key word which triggers the constructor of its parrent class
    super('DIVING', game);
  }
  //Sets a player up when the player enters a state
  enter() {
    this.game.player.frameX = 0;
    this.maxFrame = 6;
    this.game.player.frameY = 6; //Changes the sprite frame to a falling image
    this.game.player.vy = 25;
  }
  //Reacts to user inputs depending on the player state
  handleInput(input) {
    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width * 0.6,
        this.game.player.y + this.game.player.height * 0.88
      )
    );
    if (this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1);
      for (let i = 0; i < 30; i++) {
        this.game.particles.unshift(
          new Splash(this.game, this.game.player.x, this.game.player.y)
        );
      }
    } else if (input.includes(' ') && this.game.player.onGround()) {
      this.game.player.setState(states.ROLLING, 2);
    }
  }
}

export class Hit extends State {
  //constructor takes a reference to the player object so it can access the properties of the player class
  constructor(game) {
    //Because we are extending the class State we use the super key word which triggers the constructor of its parrent class
    super('HIT', game);
  }
  //Sets a player up when the player enters a state
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 10;
    this.game.player.frameY = 4;
  }
  //Reacts to user inputs depending on the player state
  handleInput(input) {
    if (this.game.player.frameX >= 10 && this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1);
    } else if (this.game.player.frameX >= 10 && !this.game.player.onGround()) {
      this.game.player.setState(states.FALLING, 1);
    }
  }
}
