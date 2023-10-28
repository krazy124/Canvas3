export class Layer {
  constructor(game, width, height, speedModifier, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
    this.x = 0;
    this.y = 0;
  }
  update() {
    if (this.x < -this.width) this.x += 0;
    else this.x -= this.game * this.speedModifier;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.height);
  }
}
export class Background {
  constructor(game) {
    this.game = game;
    this.width = 1667;
    this.height = 500;
    this.layer1Image = layer1;
    this.layer2Image = layer2;
    this.layer3Image = layer3;
    this.layer4Image = layer4;
    this.layer5Image = layer5;
  }
}
