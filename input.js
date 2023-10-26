/*This file captures and keeps track of users input*/
export class InputHandler {
  constructor() {
    this.keys =
      []; /*This records keys that have been pressed and then erases them when the key is release*/

    /*This listens for when a key is pressed then adds it to the array*/
    window.addEventListener('keydown', (e) => {
      if (
        (e.key === 'ArrowDown' ||
          e.key === 'ArrowUp' ||
          e.key === 'ArrowLeft' ||
          e.key === 'ArrowRight' ||
          e.key === 'Enter') &&
        this.keys.indexOf(e.key) ===
          -1 /*if the keys above is pressed and it is not in the array already*/
      ) {
        this.keys.push(e.key); /*then add them to the array*/
      }
      console.log(e.key, this.keys); /*display in the console for debugging*/
    });

    /*This listens for when a key is released then removes it from the array*/
    window.addEventListener('keyup', (e) => {
      if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'Enter'
      ) {
        this.keys.splice(
          this.keys.indexOf(e.key),
          1
        ); /*if the keys above is released then remove it from the array*/
      }
      console.log(e.key, this.keys); /* display in the console for debugging*/
    });
  }
}
