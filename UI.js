export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = 'Halvetica';
  }
  draw(context) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = 'skyblue';
    context.shadowBlur = 0;
    context.font = this.fontSize + 'px ' + this.fontFamily;
    context.textAlign = 'left';
    context.fillStyle = this.game.fontColor;
    //Winning Score Text
    context.fillText('Winnig Score: ' + this.game.winningScore, 20, 25);
    //score
    context.fillText('Score: ' + this.game.score, 20, 50);
    //timer
    context.font = this.fontSize * 0.5 + 'px ' + this.fontFamily;
    context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
    //game over message
    if (this.game.gameOver) {
      context.textAlign = 'center';
      context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
      if (this.game.score > this.game.winningScore) {
        context.fillText(
          'Boo-yah!!!',
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        );
        context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
        context.fillText(
          'What are the creatures of the night afraid of? YOU!!!',
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        );
      } else {
        context.fillText(
          'Love at first bite?',
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        );
        context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
        context.fillText(
          'Nope, better luck next time!',
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        );
      }
    }
    context.restore();
  }
}
