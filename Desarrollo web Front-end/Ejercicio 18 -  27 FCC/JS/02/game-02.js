/* La clase Game se ha actualizado con una nueva clase Player y se le ha dado un nuevo mundo.
objeto que controla el mundo del juego virtual. Jugadores, PNJ, dimensiones del mundo, colisión
los mapas y todo lo relacionado con el mundo del juego se almacenan en el objeto del mundo. */
let Game = function() {
    this.world = {
      background_color:"rgba(40,48,56,0.25)",
      friction:0.9,
      gravity:3,
      player:new Game.Player(),
      height:72,
      width:128,
      collideObject:function(object) {
        if (object.x < 0) { object.x = 0; object.velocity_x = 0; }
        else if (object.x + object.width > this.width) { object.x = this.width - object.width; object.velocity_x = 0; }
        if (object.y < 0) { object.y = 0; object.velocity_y = 0; }
        else if (object.y + object.height > this.height) { object.jumping = false; object.y = this.height - object.height; object.velocity_y = 0; }
      },
      update:function() {
        this.player.velocity_y += this.gravity;
        this.player.update();
        this.player.velocity_x *= this.friction;
        this.player.velocity_y *= this.friction;
        this.collideObject(this.player);
      }
    };
    this.update = function() {
      this.world.update();
    };
  };
  Game.prototype = { constructor : Game };
  Game.Player = function(x, y) {
    this.color      = "#ff0000";
    this.height     = 16;
    this.jumping    = true;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.width      = 16;
    this.x          = 100;
    this.y          = 50;
  };
  Game.Player.prototype = {
    constructor : Game.Player,
    jump:function() {
      if (!this.jumping) {
        this.color = "#" + Math.floor(Math.random() * 16777216).toString(16);// Cambia el color por uno al azar
        /* toString(16) no agregará un 0 inicial a un valor hexadecimal, por lo que esto: #0fffff, por ejemplo,
        no es valido toString cortaría el primer 0. El siguiente código lo inserta. */
        if (this.color.length != 7) {
          this.color = this.color.slice(0, 1) + "0" + this.color.slice(1, 6);
        }
        this.jumping     = true;
        this.velocity_y -= 20;
      }
    },
    moveLeft:function()  { this.velocity_x -= 0.5; },
    moveRight:function() { this.velocity_x += 0.5; },
    update:function() {
      this.x += this.velocity_x;
      this.y += this.velocity_y;
    }
  };