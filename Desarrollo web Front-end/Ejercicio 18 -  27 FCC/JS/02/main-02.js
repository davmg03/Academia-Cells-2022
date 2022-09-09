/* En la parte 2, se agrega un personaje de jugador a la pantalla. se crea el mundo
con límites con detección de colisión, y se agrega entrada de teclado para mover el
jugador alrededor. Su color cambia cada vez que salta. */
/* Cambios desde la última parte: sacar los controladores de eventos del componente
archivos Cualquier funcionalidad que pueda necesitar dos o más componentes para comunicarse
debe estar en el archivo principal. La función de cambio de tamaño, por ejemplo, no debería estar en
Pantalla, porque necesita información del Juego para dimensionar el lienzo en pantalla.
Como regla general, cualquier cosa que haga que dos componentes se comuniquen debe ser
en el archivo principal porque queremos reducir las referencias internas entre componentes
cuanto más se pueda. Deben comunicarse a través de métodos públicos que toman primitivas. */
window.addEventListener("load", function(event) {
    "use strict";
    ///////////////////
    //// Funciones ////
    ///////////////////
    /* Esto solía estar en la clase Controlador, pero se muebe al archivo principal.
    La razón es que más adelante en el desarrollo podría necesitar hacer algo con
    mostrar o procesar directamente en un evento de entrada además de actualizar el controlador.
    Para evitar hacer referencia a esos componentes dentro de la lógica del controlador, se mueven
    todos los controladores de eventos aquí, al archivo principal. */
    let keyDownUp = function(event) {
      controller.keyDownUp(event.type, event.keyCode);
    };
    /*También se saca este controlador de Display desde la parte 1 de esta serie. La razón
    es que  se  necesita hacer referencia al juego, así como a la pantalla para cambiar 
    el tamaño del lienzo de acuerdo a las dimensiones del mundo del juego. No se debe hacer 
    referencia al juego dentro de la clase, así que se mueve el método de cambio de tamaño 
    al archivo principal. */
    let resize = function(event) {
      display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.height / game.world.width);
      display.render();
    };
    let render = function() {
      display.fill(game.world.background_color);// Clear background to game's background color.
      display.drawRectangle(game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height, game.world.player.color);
      display.render();
    };
    let update = function() {
      if (controller.left.active)  { game.world.player.moveLeft();  }
      if (controller.right.active) { game.world.player.moveRight(); }
      if (controller.up.active)    { game.world.player.jump(); controller.up.active = false; }
      game.update();
    };
    /////////////////
    //// Objetos ////
    /////////////////
    let controller = new Controller();
    let display    = new Display(document.querySelector("canvas"));
    let game       = new Game();
    let engine     = new Engine(1000/30, render, update);
    ////////////////////
    //// Inicializar ///
    ////////////////////
    /* Esto es muy importante. El lienzo del búfer debe ser píxel por píxel igual al tamaño 
    como las dimensiones del mundo para escalar correctamente los gráficos. Todo el juego sabe
    sobre la ubicación del jugador y las dimensiones del mundo. Tenemos que decirle a la 
    pantalla que coincida con ellos. */
    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;
    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup",   keyDownUp);
    window.addEventListener("resize",  resize);
    resize();
    engine.start();
  });