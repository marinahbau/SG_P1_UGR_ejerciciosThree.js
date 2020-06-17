 
class MySphere extends THREE.Object3D {
    constructor(gui,titleGui, mat) {
      super();
      
      // Se crea la parte de la interfaz que corresponde al cono
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      // Un Mesh se compone de geometría y material
      var sphereGeom = new THREE.SphereGeometry (1,3,2);
      // Como material se crea uno a partir de un color
      //var sphereMat = new THREE.MeshNormalMaterial();
      
      // Ya podemos construir el Mesh
      this.sphere = new THREE.Mesh (sphereGeom, mat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add (this.sphere);
      
      // Las geometrías se crean centradas en el origen.
      
    }
    
    createGUI (gui,titleGui) {
      // Controles para el tamaño, la orientación y la posición del cono
      this.guiControls = new function () {
        this.radio = 1.0;
        this.res_ecuador = 3.0;
        this.res_meridiano = 2.0;
        
        // Un botón para dejarlo todo en su posición inicial
        // Cuando se pulse se ejecutará esta función.
        this.reset = function () {
            this.radio = 1.0;
            this.res_ecuador = 3.0;
            this.res_meridiano = 2.0;
            that.sphere.geometry = new THREE.SphereGeometry(this.radio ,this.res_ecuador, this.res_meridiano);
        }
      } 
      
      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder (titleGui);
      var that = this;
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
      folder.add (this.guiControls, 'radio', 1.0, 5.0, 0.1).name ('Radio : ').listen().onChange(function (value) {
           that.sphere.geometry = new THREE.SphereGeometry(value ,that.guiControls.res_ecuador, that.guiControls.res_meridiano); });
          
      folder.add (this.guiControls, 'res_ecuador', 3.0, 15.0, 0.1).name ('Res. Ecuador : ').listen().onChange(function (value) {
           that.sphere.geometry = new THREE.SphereGeometry(that.guiControls.radio ,value, that.guiControls.res_meridiano); });
  
      folder.add (this.guiControls, 'res_meridiano', 2.0, 15.0, 1.0).name ('Res. Meridiano : ').listen().onChange(function (value) {
           that.sphere.geometry = new THREE.SphereGeometry(that.guiControls.radio ,that.guiControls.res_ecuador, value); });
    
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