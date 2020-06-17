class Satelites extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      //this.createGUI(gui,titleGui);
  
      //Materiales a usar
      var texture = new THREE.TextureLoader().load('../imgs/cara.jpg');
      var texturemundo = new THREE.TextureLoader().load('../imgs/tierra.jpg');
      var materialCara = new THREE.MeshPhongMaterial ({map: texture});
      var materialMundo = new THREE.MeshPhongMaterial ({map: texturemundo});

      var sphereGeom = new THREE.SphereGeometry(3,20,20);
      this.tierra = new THREE.Mesh(sphereGeom,materialMundo);

      this.satelites = [];
      this.satelitesnodo = new THREE.Object3D();
      for(var i=0; i<3; i++){
        var sphereGeomsat = new THREE.SphereGeometry(2,20,20);
        this.satelites.push(new THREE.Mesh(sphereGeomsat,materialCara));
        this.satelites[i].position.x += (i+1)*6;
        this.satelitesnodo.add(this.satelites[i]);
      }
      this.satelites[0].rotation.y += Math.PI; //El satelite 0 mira siempre a la tierra
      this.satelites[1].rotation.y -= Math.PI/4; //Quitamos 45 grados para que empiece mirando a camara
      this.satelitesnodo.add(this.tierra);
      this.add(this.satelitesnodo);
      this.satelitesnodo.position.y += 3;

    }
    
    createGUI (gui,titleGui) {
      
    }
    
    update () {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
        
      this.satelitesnodo.rotation.y += 0.01;
      this.satelites[1].rotation.y -= 0.01; //El satelite 1 mira siempre a camara, contrarresta el movimiento
      this.satelites[2].rotation.y += 0.01; //El satelite 2 gira sobre si mismo
      
    }
  }