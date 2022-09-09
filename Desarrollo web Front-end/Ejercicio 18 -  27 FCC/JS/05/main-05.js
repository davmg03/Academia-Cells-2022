/* Cambios:
1. Se agrego una clase AssetsManager que eventualmente almacenará todos mis gráficos y sonidos.
2. La función de representación ahora dibuja el marco del jugador en lugar de un cuadrado como en la parte 4.
3. La función de cambio de tamaño ahora extiende el lienzo de visualización a la capacidad completa de la ventana gráfica.
El proyecto está empezando a volverse inmanejable a medida que crece. Afortunadamente 
la estructura de salida a bolsa está disminuyendo drásticamente la cantidad de reescrituras 
que se tienen que hacer en otras clases, pero dado que la mayor parte del código está en 
la clase Juego, las ediciones en esa clase se están volviendo bastante tediosas. 
A medida que crezca el proyecto, se tiene  que enfocar los videos más en personas
cambios e ignorar la mayor parte del código existente. */
window.addEventListener("load", function(event) {
    "use strict";
    //// Clases////
    /* El administrador de activos será responsable de cargar y almacenar gráficos para
    el juego. Debido a que solo tiene que cargar la imagen de la hoja de mosaicos en 
    este momento, es muy específico sobre lo que hace. */
    let AssetsManager = function() {
      this.tile_set_image = undefined;
    };
    AssetsManager.prototype = {
      constructor: Game.AssetsManager,
      loadTileSetImage:function(url, callback) {
        this.tile_set_image = new Image();
        this.tile_set_image.addEventListener("load", function(event) {
          callback();
        }, { once : true});
        this.tile_set_image.src = url;
      }
    };
    ///////////////////
    //// Funciones ////
    ///////////////////
    let keyDownUp = function(event) {
      controller.keyDownUp(event.type, event.keyCode);
    };
    let resize = function(event) {
      display.resize(document.documentElement.clientWidth, document.documentElement.clientHeight, game.world.height / game.world.width);
      display.render();
    };
    /* La función de renderizado utiliza ahora los nuevos métodos de visualización. Eventualmente tendré que crear
    algún tipo de administrador de objetos cuando obtengo más objetos en la pantalla. */
    let render = function() {
      display.drawMap   (assets_manager.tile_set_image,
      game.world.tile_set.columns, game.world.map, game.world.columns,  game.world.tile_set.tile_size);
      let frame = game.world.tile_set.frames[game.world.player.frame_value];
      display.drawObject(assets_manager.tile_set_image,
      frame.x, frame.y,
      game.world.player.x + Math.floor(game.world.player.width * 0.5 - frame.width * 0.5) + frame.offset_x,
      game.world.player.y + frame.offset_y, frame.width, frame.height);
      display.render();
    };
    let update = function() {
      if (controller.left.active ) { game.world.player.moveLeft ();                               }
      if (controller.right.active) { game.world.player.moveRight();                               }
      if (controller.up.active   ) { game.world.player.jump();      controller.up.active = false; }
      game.update();
    };
    /////////////////
    //// Objetos ////
    /////////////////
    let assets_manager = new AssetsManager();// ¡He aquí el nuevo administrador de activos!
    let controller     = new Controller();
    let display        = new Display(document.querySelector("canvas"));
    let game           = new Game();
    let engine         = new Engine(1000/30, render, update);
    ////////////////////
    //// Inicializar ///
    ////////////////////
    /* Esto tendrá que moverse a una función de configuración dentro de la clase Display o algo así.
    Dejarlo aquí es un poco descuidado. */
    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width  = game.world.width;
    display.buffer.imageSmoothingEnabled = false;
    /* Ahora mi imagen se carga en el administrador de activos en lugar del objeto de visualización.
    La devolución de llamada inicia el motor del juego cuando se carga el gráfico. */
    assets_manager.loadTileSetImage("./IMG/rabbit-trap.png", () => {
      resize();
      engine.start();
    });
    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup",   keyDownUp);
    window.addEventListener("resize",  resize);
  });