 
class Elipse2 extends THREE.Object3D {
  constructor(gui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui);
    //Material
    var matCilindro = new THREE.MeshNormalMaterial({opacity:0.35, transparent:true, flatShading:false});
    var matEsfera = new THREE.MeshNormalMaterial({flatShading:false});

    //Hacemos la elipse
    //Curva
    var curva = new THREE.EllipseCurve(0, 0, 10, 10);
    var puntos = curva.getPoints( 50 );

    this.camino = new THREE.SplineCurve(puntos);

    this.shape = new THREE.Shape(puntos);
    this.extrudeSettings = {
      steps: 2,
      depth: 2,
      bevelEnabled: false,
    };

    var geometry = new THREE.ExtrudeBufferGeometry(this.shape, this.extrudeSettings);

    this.elipse = new THREE.Mesh(geometry, matCilindro);
    this.elipse.rotation.x -= Math.PI/2;
    this.add(this.elipse);
    
    this.geomEsfera = new THREE.SphereGeometry(1, 20, 20);
    this.esfera = new THREE.Mesh(this.geomEsfera, matEsfera);
    this.esfera.position.x += 10;
    this.esfera.position.y += 1;


    this.velocidad = Math.PI/2; //Rad/s



    var tiempo = Date.now();
    var looptime = 20000;
    this.t= (tiempo % looptime)/ looptime;


    this.esfera_ = new THREE.Object3D();
    this.esfera_.add(this.esfera);
    this.esfera_.position.y += 1;
    this.esfera_.rotation.x = Math.PI/2;
    this.add(this.esfera_);
    this.animarEsfera();
  }
  
  createGUI (gui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.extension = 1;
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.extension = 1;     
        }
    } 
    
    // Se crea una sección para los controles de la caja
    var that = this;
    gui.add(this.guiControls, 'extension', 0, 20.0, 0.1).name('Extension: ').listen().onChange(function(value){
      var curva = new THREE.EllipseCurve(0, 0, 10, 10 + (10*value));
      var puntos = curva.getPoints( 50 );
      that.camino = new THREE.SplineCurve(puntos);
      that.shape = new THREE.Shape(puntos);
      that.elipse.geometry = new THREE.ExtrudeBufferGeometry(that.shape, that.extrudeSettings);
    
    })
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    

    gui.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  animarEsfera(){
      var origen = {y: 0};
      var destino = {y: 1};
      var that = this;

      var animacion = new TWEEN.Tween(origen)
      .to(destino, 4000)
      .yoyo(false)
      .easing(TWEEN.Easing.Linear.None)
      .repeat(Infinity)
      .onUpdate(function(){ 
        var posicion = that.camino.getPointAt(origen.y);
        posicion.z = 0;
        that.esfera.position.copy(posicion);
      })
      .start();
  }

  
  update () {
  }
}