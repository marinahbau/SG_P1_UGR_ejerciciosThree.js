class Corazon extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();

        var material = new THREE.MeshPhongMaterial({color: 0xCF0000});
        this.Mat = new THREE.MeshNormalMaterial();
        this.Mat.flatShading = true;
        this.Mat.needsUpdate = true;
        var x = 0, y = 0;

        var heartShape = new THREE.Shape();

        heartShape.moveTo( x + 5, y + 5 );
        heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
        heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
        heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
        heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
        heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
        heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

        var extrudeSettings = {
          steps: 2,
          depth: 2,
          bevelEnabled: true,
          bevelThickness: 0.5,
          bevelSize: 1,
          bevelOffset: 0,
          bevelSegments: 1
        };

        var geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
        
        this.objeto = new THREE.Mesh( geometry, material ) ;
        this.objeto.position.set(5, 10, -1);
        this.objeto.rotation.z = Math.PI;
        this.add( this.objeto );

    }


    update(resolucion, angulo) {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      this.rotation.y += 0.01;
      
    }
}