/* Se cometío un pequeño error la primera vez que se escribio esta clase de motor. en lugar de llamar
window.requestAnimationFrame antes de actualizar la lógica del juego, se mando a llamar después. Esto
significaba que incluso si se intentaba detener el bucle del juego desde dentro de la lógica del juego, la RAF
Todavía lo llamara después de que solicité una parada. Para arreglar esto, simplemente se mueve la solicitud
a la parte superior de la función del bucle del juego, que es Engine.run. */
let Engine = function(time_step, update, render) {
    this.accumulated_time        = 0;
    this.animation_frame_request = undefined,
    this.time                    = undefined,
    this.time_step               = time_step,
    this.updated = false;
    this.update = update;
    this.render = render;
    this.run = function(time_stamp) {
      /* Se mueve esta línea de la parte inferior de esta función a la parte superior. Esta es mejor
      de todos modos, porque asegura que si la lógica del juego se prolonga demasiado, se generará un nuevo cuadro.
      ya se pide antes de que pasen 30 o 60 frames y me falta una petición por completo.
      Esto podría causar una "espiral de la muerte" para mi CPU, pero como tengo el cuadro cayendo
      declaración de seguridad if, esto probablemente no bloqueará la computadora del usuario. */
      this.animation_frame_request = window.requestAnimationFrame(this.handleRun);
      this.accumulated_time += time_stamp - this.time;
      this.time = time_stamp;  
      /* Esta es la declaración if de seguridad. */
      if (this.accumulated_time >= this.time_step * 3) {
        this.accumulated_time = this.time_step;
      }
      while(this.accumulated_time >= this.time_step) {
        this.accumulated_time -= this.time_step;
        this.update(time_stamp);
        this.updated = true;
      }
      if (this.updated) {
        this.updated = false;
        this.render(time_stamp);
      }
    };
    this.handleRun = (time_step) => { this.run(time_step); };
  };
  Engine.prototype = {
    constructor:Engine,
    start:function() {
      this.accumulated_time = this.time_step;
      this.time = window.performance.now();
      this.animation_frame_request = window.requestAnimationFrame(this.handleRun);
    },
    stop:function() { window.cancelAnimationFrame(this.animation_frame_request); }
  };