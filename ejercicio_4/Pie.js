class Pie extends THREE.Object3D {
    constructor(gui, titleGui, _material) {
        super();
        this.puntos = [];
        this.puntos.push(new THREE.Vector3(0.0, 0.0, 0.0));
        this.puntos.push(new THREE.Vector3(1.5, 0.0, 0.0));
        this.puntos.push(new THREE.Vector3(0.2, 0.5, 0.0));
        this.puntos.push(new THREE.Vector3(0.2, 3.5, 0.0));
        this.puntos.push(new THREE.Vector3(0.0, 3.5, 0.0));
        
        
        
        

        this.Geom = new THREE.LatheGeometry(this.puntos, 20, 0, 2*Math.PI);
        this.objeto = new THREE.Mesh(this.Geom, _material);

        this.add(this.objeto);

    }


    update(resolucion, angulo) {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      
    }
}