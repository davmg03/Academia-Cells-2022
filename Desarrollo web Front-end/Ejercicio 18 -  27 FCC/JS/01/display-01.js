/* Display contiene el controlador de eventos de cambio de tamaño de pantalla y 
   también maneja dibujar colores en el búfer y luego en la pantalla. */
let Display = function(canvas) {
    this.buffer  = document.createElement("canvas").getContext("2d"),
    this.context = canvas.getContext("2d");
    this.renderColor = function(color) {
      this.buffer.fillStyle = color;
      this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    };
    this.render = function() { this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height); };
    this.resize = function(event) {
      let height, width;
      height = document.documentElement.clientHeight;
      width  = document.documentElement.clientWidth;
      this.context.canvas.height = height - 32;
      this.context.canvas.width = width - 32;
      this.render();
    };
    this.handleResize = (event) => { this.resize(event); };
  };
  Display.prototype = {
    constructor : Display
  };