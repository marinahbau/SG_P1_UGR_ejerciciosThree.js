class MyCylinder extends THREE.Object3D {
    constructor(gui,titleGui, cylinderMat) {
      super();
      
      // Se crea la parte de la interfaz que corresponde al cono
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      // Un Mesh se compone de geometría y material
      var cylinderGeom = new THREE.CylinderGeometry (1,1,1,3);
      
      // Ya podemos construir el Mesh
      this.cylinder = new THREE.Mesh (cylinderGeom, cylinderMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add (this.cylinder);
      
      // Las geometrías se crean centradas en el origen.
      
    }
    
    createGUI (gui,titleGui) {
      // Controles para el tamaño, la orientación y la posición del cono
      this.guiControls = new function () {
        this.radio_sup = 1.0;
        this.radio_inf = 1.0;
        this.altura = 1.0;
        this.resolucion = 3.0;
        
        // Un botón para dejarlo todo en su posición inicial
        // Cuando se pulse se ejecutará esta función.
        this.reset = function () {
            this.radio_sup = 1.0;
            this.radio_inf = 1.0;
            this.altura = 1.0;
            this.resolucion = 3.0;
            that.cylinder.geometry = new THREE.CylinderGeometry(this.radio_sup ,this.radio_inf, this.altura, this.resolucion);
        }
      } 
      
      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder (titleGui);
      var that = this;
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
      
      folder.add (this.guiControls, 'radio_sup', 1.0, 5.0, 0.1).name ('Radio Superior : ').listen().onChange(function (value) {
             that.cylinder.geometry = new THREE.CylinderGeometry(value ,that.guiControls.radio_inf, that.guiControls.altura, that.guiControls.resolucion); });
      folder.add (this.guiControls, 'radio_inf', 1.0, 5.0, 0.1).name ('Radio Inferior : ').listen().onChange(function (value) {
             that.cylinder.geometry = new THREE.CylinderGeometry(that.guiControls.radio_sup ,value, that.guiControls.altura, that.guiControls.resolucion); });
      folder.add (this.guiControls, 'altura', 1.0, 5.0, 0.1).name ('Altura : ').listen().onChange(function (value) {
             that.cylinder.geometry = new THREE.CylinderGeometry(that.guiControls.radio_sup ,that.guiControls.radio_inf, value, that.guiControls.resolucion); });
      folder.add (this.guiControls, 'resolucion', 3.0, 15.0, 1.0).name ('Resolucion : ').listen().onChange(function (value) {
             that.cylinder.geometry = new THREE.CylinderGeometry(that.guiControls.radio_sup ,that.guiControls.radio_inf, that.guiControls.altura, value); });
        
 


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