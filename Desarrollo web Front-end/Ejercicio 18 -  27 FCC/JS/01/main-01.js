/* Esta es la configuración básica o "esqueleto" del programa. Tiene tres partes principales:
el controlador, la pantalla y la lógica del juego. También tiene un motor que combina la
tres partes lógicas, por lo demás, están completamente separadas. Uno de los mas importantes
aspectos de la programación es la organización. Sin una base organizada, su código
rápidamente se volverá rebelde y difícil de mantener. Separar el código en grupos logicos
es también un principio de la programación orientada a objetos, que se presta a
código comprensible y mantenible, así como modularidad. */

/* Dado que se cargan los scripts dinámicamente desde el archivo plataforma.html, se ajusta
el archivo JavaScript principal en un detector de carga. Esto asegura que este código no se
ejecute hasta que el documento haya terminado de cargarse y tenga acceso a todas las clases. */
window.addEventListener("load", function(event) {
    "use strict";
    ///////////////////
    //// Funciones ////
    ///////////////////
    let render = function() {
      display.renderColor(game.color);
      display.render();
    };
    let update = function() {
      game.update();
    };
      /////////////////
      //// Objetos ////
      /////////////////
      /* Por lo general, se escribe las secciones lógicas en objetos literales, pero la tentación
      hacer referencia a uno dentro de otro es demasiado grande y conduce a una codificación descuidada.
      En un esfuerzo por lograr un código más limpio, se escribe clases para cada sección
      e instanciarlos aquí. */
      /* El controlador handles se usa para el input. */
      let controller = new Controller();
      /* La pantalla handles window resizing, así como en la pantalla canvas. */
      let display    = new Display(document.querySelector("canvas"));
      /* El juego eventualmente mantendrá la lógica de juego. */
      let game       = new Game();
      /* El motor es donde las tres secciones anteriores pueden interactuar.*/
      let engine     = new Engine(1000/30, render, update);
      ////////////////////
      //// INICIALIZAR ///
      ////////////////////
      window.addEventListener("resize",  display.handleResize);
      window.addEventListener("keydown", controller.handleKeyDownUp);
      window.addEventListener("keyup",   controller.handleKeyDownUp);
      display.resize();
      engine.start();
  });