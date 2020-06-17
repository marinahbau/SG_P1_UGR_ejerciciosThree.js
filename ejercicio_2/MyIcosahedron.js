 
class MyIcosahedron extends THREE.Object3D {
    constructor(gui,titleGui, icoMat) {
      super();
      
      // Se crea la parte de la interfaz que corresponde al cono
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      // Un Mesh se compone de geometría y material
      var icoGeom = new THREE.IcosahedronGeometry (1,0);
      
      // Ya podemos construir el Mesh
      this.ico = new THREE.Mesh (icoGeom, icoMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add (this.ico);
      
      // Las geometrías se crean centradas en el origen.
      
    }
    
    createGUI (gui,titleGui) {
      // Controles para el tamaño, la orientación y la posición del cono
      this.guiControls = new function () {
        this.radio = 1.0;
        this.subdivision = 0.0;
        
        // Un botón para dejarlo todo en su posición inicial
        // Cuando se pulse se ejecutará esta función.
        this.reset = function () {
          this.radio = 1.0;
          this.subdivision = 0.0;
          that.ico.geometry = new THREE.IcosahedronGeometry(this.radio ,this.subdivision);
        }
      } 
      
      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder (titleGui);
      var that = this;
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
      folder.add (this.guiControls, 'radio', 1.0, 5.0, 0.1).name ('Radio : ').listen().onChange(function (value) {
           that.ico.geometry = new THREE.IcosahedronGeometry(value ,that.guiControls.subdivision); });
          
      folder.add (this.guiControls, 'subdivision', 0.0, 3.0, 1.0).name ('Subdivision : ').listen().onChange(function (value) {
           that.ico.geometry = new THREE.IcosahedronGeometry(that.guiControls.radio ,value); });
  
      folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }
    
    update () {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      
      //Animacion para la rotacion en los tres ejes
      this.rotation.x += 0.01;
      this.rotation.y += 0.01;
      this.rotation.z += 0.01;
    }
  }