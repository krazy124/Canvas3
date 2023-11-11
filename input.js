/*This file captures and keeps track of users input*/
export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = []; //This records keys that have been pressed and then erases them when the key is release
    //This listens for when a key is pressed then adds it to the array
    window.addEventListener('keydown', (e) => {
      if (
        (e.key === 'ArrowDown' ||
          e.key === 'ArrowUp' ||
          e.key === 'ArrowLeft' ||
          e.key === 'ArrowRight' ||
          e.key === ' ') &&
        this.keys.indexOf(e.key) === -1
      ) {
        //if the keys above is pressed and it is not in the array already
        this.keys.push(e.key); //then add to the array
      } else if (e.key === 'd') this.game.debug = !this.game.debug;
    });

    //This listens for when a key is released then removes it from the array
    window.addEventListener('keyup', (e) => {
      if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === ' '
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1); //if the keys above is released then remove it from the array
      }
    });
  }
}
