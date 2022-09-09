/* Este es un bucle de juego de paso de tiempo fijo. Se puede utilizar para cualquier juego y asegurará
ese estado del juego se actualiza a la misma velocidad en diferentes dispositivos, lo cual es importante
para un juego uniforme. Imagina jugar tu juego favorito en un teléfono nuevo y de repente está 
funcionando a una velocidad diferente. Eso sería una mala experiencia de usuario, por lo que arreglamos
con un bucle de juego de paso fijo. Además, puede hacer cosas como la caída de fotogramas e interpolación 
con un bucle de paso fijo, que permite que su juego juegue y se vea suave en dispositivos más lentos en 
lugar de congelarse o retrasarse hasta el punto de no poder jugar */
let Engine = function(time_step, update, render) {
    this.accumulated_time        = 0;// Cantidad de tiempo acumulado desde la última actualización.
    this.animation_frame_request = undefined,// referencia a la AFR
    this.time                    = undefined,// La marca de tiempo más reciente de la ejecución del bucle.
    this.time_step               = time_step,// 1000/30 = 30 cuadros por segundo
    this.updated = false;// Si se ha llamado o no a la función de actualización desde el último ciclo.
    this.update = update;// La función de actualización
    this.render = render;// La función de renderizado
    this.run = function(time_stamp) {// Este es un ciclo del ciclo del juego.
      this.accumulated_time += time_stamp - this.time;
      this.time = time_stamp;
      /* Si el dispositivo es demasiado lento, las actualizaciones pueden tardar más que nuestro 
      intervalo de tiempo. Si este es el caso, podría congelar el juego y sobrecargar la CPU.
      Para prevenir esto, capturamos una espiral de memoria temprano y nunca permitimos que pasen 
      tres fotogramas completos sin una actualización. Esto no es lo ideal, pero al menos el 
      usuario no bloqueará su CPU. */
      if (this.accumulated_time >= this.time_step * 3) {
        this.accumulated_time = this.time_step;
      }
      /* Ya que solo podemos actualizar cuando la pantalla está lista para dibujar y 
      solicitar AnimationFrame llama a la función de ejecución, necesitamos realizar 
      un seguimiento de cuánto tiempo ha pasado. Nosotros al almacenar ese tiempo 
      acumulado y probar para ver si ha pasado suficiente tiempo para justificar una 
      actualización. Recuerde, queremos actualizar cada vez que hayamos acumulado un 
      determinado tiempo. Valor de tiempo, si se han acumulado varios pasos de tiempo, 
      debemos actualizar un tiempo para que cada uno de ellos se mantenga al día. */
      while(this.accumulated_time >= this.time_step) {
        this.accumulated_time -= this.time_step;
        this.update(time_stamp);
        this.updated = true;// Si el juego se ha actualizado, debemos dibujarlo nuevamente.
      }
      /*Esto nos permite dibujar solo cuando el juego se ha actualizado. */
      if (this.updated) {
        this.updated = false;
        this.render(time_stamp);
      }
      this.animation_frame_request = window.requestAnimationFrame(this.handleRun);
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