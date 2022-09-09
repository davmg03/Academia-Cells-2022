/* Cambios:
  1. La función de actualización ahora verifica cada cuadro para game.world.door. si una puerta
     se selecciona, el motor del juego se detiene y se carga el nivel de la puerta.
  2. Cuando el juego se inicializa por primera vez en la parte inferior de este archivo, game.world es
     cargado usando sus valores predeterminados definidos en su constructor.
  3. La clase AssetsManager se ha cambiado para cargar imágenes y json.*/
window.addEventListener("load", function(event) {
    "use strict";
    //// CONSTANTES ////
    /* Cada zona tiene una URL similar a: zoneXX.json, donde XX es la zona actual
    identificador Al cargar zonas, uso el identificador de zona de game.world con estos
    dos constantes para construir una URL que apunte al archivo de zona apropiado. */
    /* Actualicé esto después de hacer el video. Decidí mover los archivos de zona a
    la carpeta 06 porque no volveré a usar estos niveles en futuras partes. */
    let ZONE_PREFIX = "./JS/06/zone";
    let ZONE_SUFFIX = ".json";
    /////////////////
    //// Clases ////
    /////////////////
    let AssetsManager = function() {
      this.tile_set_image = undefined;
    };
    AssetsManager.prototype = {
      constructor: Game.AssetsManager,
      /*Solicita un archivo y entrega a la función de devolución de llamada el contenido de ese archivo
      analizado por JSON.parse. */
      requestJSON:function(url, callback) {
        let request = new XMLHttpRequest();
        request.addEventListener("load", function(event) {
          callback(JSON.parse(this.responseText));
        }, { once:true });
        request.open("GET", url);
        request.send();
      },
      /* Crea una nueva imagen y establece su atributo src en la URL especificada. Cuando
      la imagen se carga, se llama a la función de devolución de llamada. */
      requestImage:function(url, callback) {
        let image = new Image();
        image.addEventListener("load", function(event) {
          callback(image);
        }, { once:true });
        image.src = url;
      },
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
    let render = function() {
      display.drawMap   (assets_manager.tile_set_image,
      game.world.tile_set.columns, game.world.graphical_map, game.world.columns,  game.world.tile_set.tile_size);
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
      /* Esta instrucción if comprueba si el jugador ha seleccionado una puerta.
      Si el jugador choca con una puerta, la selecciona. Luego se para el motor
      y el assets_manager carga el nivel de la puerta. */
      if (game.world.door) {
        engine.stop();
        /* Aquí estoy solicitando el archivo JSON para usar para completar el objeto game.world. */
        assets_manager.requestJSON(ZONE_PREFIX + game.world.door.destination_zone + ZONE_SUFFIX, (zone) => {
          game.world.setup(zone);
          engine.start();
        });
        return;
      }
    };
    /////////////////
    //// Objetos ////
    /////////////////
    let assets_manager = new AssetsManager();
    let controller     = new Controller();
    let display        = new Display(document.querySelector("canvas"));
    let game           = new Game();
    let engine         = new Engine(1000/30, render, update);
    ////////////////////
    //// Inicializar ///
    ////////////////////
    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width  = game.world.width;
    display.buffer.imageSmoothingEnabled = false;
    assets_manager.requestJSON(ZONE_PREFIX + game.world.zone_id + ZONE_SUFFIX, (zone) => {
      game.world.setup(zone);
      assets_manager.requestImage("./IMG/rabbit-trap.png", (image) => {
        assets_manager.tile_set_image = image;
        resize();
        engine.start();
      });
    });
    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup"  , keyDownUp);
    window.addEventListener("resize" , resize);
  });