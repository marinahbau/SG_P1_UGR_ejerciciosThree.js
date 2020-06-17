class MyObjRevolucion extends THREE.Object3D {
    constructor(gui,titleGui, points, latheMat) {
      super();
      
      // Se crea la parte de la interfaz que corresponde al cono
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz

      this.mispuntos=points;
      
      // Ya podemos construir el Mesh
      var latheGeom = new THREE.LatheGeometry(points,3,0,1);

      this.latheObject = new THREE.Mesh(latheGeom, latheMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add (this.latheObject);
      
      // Las geometrías se crean centradas en el origen.
      
    }
   
    
    update () {
    
    }
  }