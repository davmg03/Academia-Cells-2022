/* En la parte 4, se agrega la detección de colisiones y respuesta para el mapa de mosaicos. También se
corrigió el desplazamiento del mapa de mosaicos de la parte 3, donde cada valor gráfico fue compensado por
1 debido al formato de exportación del editor de mapas de mosaicos que se utiliza. Se agrega el mapa de colisión
y el objeto colisionador para manejar la colisión. También se agrega una superclase llamada Objeto
que se extenderán todos los demás objetos del juego. Tiene un montón de métodos para trabajar con
posición del objeto.*/
let Game = function() {
    this.world = new Game.World();// Todos los cambios están en la clase mundial.
    this.update = function() {
      this.world.update();
    };
  };
  Game.prototype = { constructor : Game };
  Game.World = function(friction = 0.9, gravity = 3) {
    this.collider = new Game.World.Collider();// Aquí está la nueva clase de colisionador.
    this.friction = friction;
    this.gravity  = gravity;
    this.player   = new Game.World.Player();
    this.columns   = 12;
    this.rows      = 9;
    this.tile_size = 16;
    /* Este mapa sigue siendo el mismo. Es el mapa gráfico. Sólo coloca gráficos y
    no tiene nada que ver con la colisión. */
    this.map = [48,17,17,17,49,48,18,19,16,17,35,36,
                10,39,39,39,16,18,39,31,31,31,39,07,
                10,31,39,31,31,31,39,12,05,05,28,01,
                35,06,39,39,31,39,39,19,39,39,08,09,
                02,31,31,47,39,47,39,31,31,04,36,25,
                10,39,39,31,39,39,39,31,31,31,39,37,
                10,39,31,04,14,06,39,39,03,39,00,42,
                49,02,31,31,11,39,39,31,11,00,42,09,
                08,40,27,13,37,27,13,03,22,34,09,24];
    /* Estos valores de colisión corresponden a funciones de colisión en la clase Collider.
    00 no es nada. todo lo demás se ejecuta a través de una declaración de cambio y se enruta a las
    funciones de colisión apropiadas. Estos valores particulares no son arbitrarios. su binario
    La representación se puede utilizar para describir qué lados de la baldosa tienen límites.
    0000 = 0  tile 0:    0    tile 1:   1     tile 2:    0    tile 15:    1
    0001 = 1           0   0          0   0            0   1            1   1
    0010 = 2             0              0                0                1
    1111 = 15        No walls     Wall on top      Wall on Right      four walls
    Esta representación binaria se puede usar para describir qué lados de un mosaico son los límites.
    Cada bit representa un lado: 0 0 0 0 = l b r t (izquierda abajo derecha arriba). Tenga en cuenta
    que esta es solo una forma de verlo. Podrías asignar tus valores de colisión
    de la manera que quieras. De esta forma se elegio para realizar un seguimiento de los valores 
    que representan los azulejos. No se ha probado este enfoque de representación con formas más avanzadas. */
    this.collision_map = [00,04,04,04,00,00,04,04,04,04,04,00,
                          02,00,00,00,12,06,00,00,00,00,00,08,
                          02,00,00,00,00,00,00,09,05,05,01,00,
                          00,07,00,00,00,00,00,14,00,00,08,00,
                          02,00,00,01,00,01,00,00,00,13,04,00,
                          02,00,00,00,00,00,00,00,00,00,00,08,
                          02,00,00,13,01,07,00,00,11,00,09,00,
                          00,03,00,00,10,00,00,00,08,01,00,00,
                          00,00,01,01,00,01,01,01,00,00,00,00];
    this.height   = this.tile_size * this.rows;
    this.width    = this.tile_size * this.columns;
  };
  Game.World.prototype = {
    constructor: Game.World,
    /* Esta función se ha modificado enormemente. */
    collideObject:function(object) {
      /* Let's make sure we can't leave the world boundaries. */
      if      (object.getLeft()   < 0          ) { object.setLeft(0);             object.velocity_x = 0; }
      else if (object.getRight()  > this.width ) { object.setRight(this.width);   object.velocity_x = 0; }
      if      (object.getTop()    < 0          ) { object.setTop(0);              object.velocity_y = 0; }
      else if (object.getBottom() > this.height) { object.setBottom(this.height); object.velocity_y = 0; object.jumping = false; }
      /* ¡¡¡Ahora se colisiona con algunas fichas!!! Los valores laterales se refieren a la 
      cuadrícula de mosaicos. espacios de fila y columna que ocupa el objeto en cada uno de 
      sus lados. Para la instancia inferior se refiere a la fila en el mapa de colisión que 
      la parte inferior de la que ocupa el objeto. Derecha se refiere a la columna en el mapa
      de colisión ocupada por l lado derecho del objeto. El valor se refiere al valor de una
      ficha de colisión en el mapa debajo de la fila y la columna especificadas ocupadas por el objeto. */
      let bottom, left, right, top, value;
      /* Primero se prueba la esquina superior izquierda del objeto. Se obtiene la fila y la columna.
      ocupa en el mapa de colisión, luego obtenemos el valor del mapa de colisión
      en esa fila y columna. En este caso, la fila está arriba y la columna a la izquierda. Después
      entregamos la información a la función de colisión del colisionador. */
      top    = Math.floor(object.getTop()    / this.tile_size);
      left   = Math.floor(object.getLeft()   / this.tile_size);
      value  = this.collision_map[top * this.columns + left];
      this.collider.collide(value, object, left * this.tile_size, top * this.tile_size, this.tile_size);
      /* Se debe redefinir top desde la última verificación de colisión porque el objeto puede
      se han movido desde la última verificación de colisión. Además, la razón por la que reviso las esquinas superiores
      primero es porque si el objeto se mueve hacia abajo mientras revisa la parte superior, será
      se movió hacia arriba al revisar la parte inferior, y es mejor parecer que está de pie
      en el suelo que ser empujado hacia abajo a través del suelo por el techo. */
      top    = Math.floor(object.getTop()    / this.tile_size);
      right  = Math.floor(object.getRight()  / this.tile_size);
      value  = this.collision_map[top * this.columns + right];
      this.collider.collide(value, object, right * this.tile_size, top * this.tile_size, this.tile_size);
      bottom = Math.floor(object.getBottom() / this.tile_size);
      left   = Math.floor(object.getLeft()   / this.tile_size);
      value  = this.collision_map[bottom * this.columns + left];
      this.collider.collide(value, object, left * this.tile_size, bottom * this.tile_size, this.tile_size);  
      bottom = Math.floor(object.getBottom() / this.tile_size);
      right  = Math.floor(object.getRight()  / this.tile_size);
      value  = this.collision_map[bottom * this.columns + right];
      this.collider.collide(value, object, right * this.tile_size, bottom * this.tile_size, this.tile_size);
    },
    update:function() {
      this.player.velocity_y += this.gravity;
      this.player.update();
      this.player.velocity_x *= this.friction;
      this.player.velocity_y *= this.friction;
      this.collideObject(this.player);
    }
  };
  Game.World.Collider = function() {
    /*Este es el método de enrutamiento de funciones. Básicamente, sabes cómo se ve el azulejo
    de su valor. Sabes con qué objeto quieres chocar y conoces el
    posición x e y del mosaico, así como sus dimensiones. Esta función simplemente decide
    qué funciones de colisión usar en función del valor y le permite ajustar el
    otros valores para adaptarse a la forma de mosaico específica. */
    this.collide = function(value, object, tile_x, tile_y, tile_size) {
      switch(value) { // ¿Qué valor tiene nuestra ficha?
        /* Los 15 tipos de mosaicos se pueden describir con solo 4 métodos de colisión. Estas
        los métodos se mezclan y combinan para cada mosaico único. */
        case  1: this.collidePlatformTop      (object, tile_y            ); break;
        case  2: this.collidePlatformRight    (object, tile_x + tile_size); break;
        case  3: if (this.collidePlatformTop  (object, tile_y            )) return;// Si hay una colisión, no necesitamos verificar nada más.
                 this.collidePlatformRight    (object, tile_x + tile_size); break;
        case  4: this.collidePlatformBottom   (object, tile_y + tile_size); break;
        case  5: if (this.collidePlatformTop  (object, tile_y            )) return;
                 this.collidePlatformBottom   (object, tile_y + tile_size); break;
        case  6: if (this.collidePlatformRight(object, tile_x + tile_size)) return;
                 this.collidePlatformBottom   (object, tile_y + tile_size); break;
        case  7: if (this.collidePlatformTop  (object, tile_y            )) return;
                 if (this.collidePlatformRight(object, tile_x + tile_size)) return;
                 this.collidePlatformBottom   (object, tile_y + tile_size); break;
        case  8: this.collidePlatformLeft     (object, tile_x            ); break;
        case  9: if (this.collidePlatformTop  (object, tile_y            )) return;
                 this.collidePlatformLeft     (object, tile_x            ); break;
        case 10: if (this.collidePlatformLeft (object, tile_x            )) return;
                 this.collidePlatformRight    (object, tile_x + tile_size); break;
        case 11: if (this.collidePlatformTop  (object, tile_y            )) return;
                 if (this.collidePlatformLeft (object, tile_x            )) return;
                 this.collidePlatformRight    (object, tile_x + tile_size); break;
        case 12: if (this.collidePlatformLeft (object, tile_x            )) return;
                 this.collidePlatformBottom   (object, tile_y + tile_size); break;
        case 13: if (this.collidePlatformTop  (object, tile_y            )) return;
                 if (this.collidePlatformLeft (object, tile_x            )) return;
                 this.collidePlatformBottom   (object, tile_y + tile_size); break;
        case 14: if (this.collidePlatformLeft (object, tile_x            )) return;
                 if (this.collidePlatformRight(object, tile_x            )) return;
                 this.collidePlatformBottom   (object, tile_y + tile_size); break;
        case 15: if (this.collidePlatformTop  (object, tile_y            )) return;
                 if (this.collidePlatformLeft (object, tile_x            )) return;
                 if (this.collidePlatformRight(object, tile_x + tile_size)) return;
                 this.collidePlatformBottom   (object, tile_y + tile_size); break;
      }
    }
  };
 /* Aquí es donde viven todas las funciones de colisión. */
  Game.World.Collider.prototype = {
    constructor: Game.World.Collider,
    /* Esto resolverá una colisión (si la hay) entre un objeto y la ubicación y de
    el fondo de alguna teja. Todas estas funciones son prácticamente iguales, solo ajustadas
    para diferentes lados de una baldosa y diferentes trayectorias del objeto.*/
    collidePlatformBottom:function(object, tile_bottom) {
      /* Si la parte superior del objeto está por encima de la parte inferior del mosaico y en el anterior
      enmarcar la parte superior del objeto estaba debajo de la parte inferior del mosaico, hemos entrado en
      este azulejo. Cosas bastante simples. */
      if (object.getTop() < tile_bottom && object.getOldTop() >= tile_bottom) {
        object.setTop(tile_bottom);// Mueva la parte superior del objeto a la parte inferior del mosaico.
        object.velocity_y = 0;     // Deja de moverte en esa dirección.
        return true;               // Devuelve verdadero porque hubo una colisión.
      } return false;              // Devuelve falso si no hubo colisión.
    },
    collidePlatformLeft:function(object, tile_left) {
      if (object.getRight() > tile_left && object.getOldRight() <= tile_left) {
        object.setRight(tile_left - 0.01);// -0.01 es para solucionar un pequeño problema con el redondeo
        object.velocity_x = 0;
        return true;
      } return false;
    },
    collidePlatformRight:function(object, tile_right) {
      if (object.getLeft() < tile_right && object.getOldLeft() >= tile_right) {
        object.setLeft(tile_right);
        object.velocity_x = 0;
        return true;
      } return false;
    },
    collidePlatformTop:function(object, tile_top) {
      if (object.getBottom() > tile_top && object.getOldBottom() <= tile_top) {
        object.setBottom(tile_top - 0.01);
        object.velocity_y = 0;
        object.jumping    = false;
        return true;
      } return false;
    }
   };
  /* La clase de objeto es solo un rectángulo básico con un montón de funciones prototipo.
  para ayudarnos a trabajar con el posicionamiento de este rectángulo.*/
  Game.World.Object = function(x, y, width, height) {
   this.height = height;
   this.width  = width;
   this.x      = x;
   this.x_old  = x;
   this.y      = y;
   this.y_old  = y;
  };
  Game.World.Object.prototype = {
    constructor:Game.World.Object,
    /* Estas funciones se utilizan para obtener y establecer las diferentes posiciones laterales del objeto.*/
    getBottom:   function()  { return this.y     + this.height; },
    getLeft:     function()  { return this.x;                   },
    getRight:    function()  { return this.x     + this.width;  },
    getTop:      function()  { return this.y;                   },
    getOldBottom:function()  { return this.y_old + this.height; },
    getOldLeft:  function()  { return this.x_old;               },
    getOldRight: function()  { return this.x_old + this.width;  },
    getOldTop:   function()  { return this.y_old                },
    setBottom:   function(y) { this.y     = y    - this.height; },
    setLeft:     function(x) { this.x     = x;                  },
    setRight:    function(x) { this.x     = x    - this.width;  },
    setTop:      function(y) { this.y     = y;                  },
    setOldBottom:function(y) { this.y_old = y    - this.height; },
    setOldLeft:  function(x) { this.x_old = x;                  },
    setOldRight: function(x) { this.x_old = x    - this.width;  },
    setOldTop:   function(y) { this.y_old = y;                  }
  };
  Game.World.Player = function(x, y) {
    Game.World.Object.call(this, 100, 100, 12, 12);
    this.color1     = "#404040";
    this.color2     = "#f0f0f0";
    this.jumping    = true;
    this.velocity_x = 0;
    this.velocity_y = 0;
  };
  Game.World.Player.prototype = {
    jump:function() {
      if (!this.jumping) {
        this.jumping     = true;
        this.velocity_y -= 20;
      }
    },
    moveLeft:function()  { this.velocity_x -= 0.5; },
    moveRight:function() { this.velocity_x += 0.5; },
    update:function() {
      this.x_old = this.x;
      this.y_old = this.y;
      this.x    += this.velocity_x;
      this.y    += this.velocity_y;
    }
  };
  Object.assign(Game.World.Player.prototype, Game.World.Object.prototype);
  Game.World.Player.prototype.constructor = Game.World.Player;