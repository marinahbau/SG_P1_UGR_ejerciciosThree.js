class Diamante extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();

        var material = new THREE.MeshPhongMaterial({color: 0xCF0000});
        this.Mat = new THREE.MeshNormalMaterial();
        this.Mat.flatShading = true;
        this.Mat.needsUpdate = true;

        var diamondShape = new THREE.Shape();

        diamondShape.moveTo(3,0 );
        diamondShape.lineTo(0, 5);
        diamondShape.lineTo(-3, 0);
        diamondShape.lineTo(0, -5);
        diamondShape.lineTo(3, 0);

        var extrudeSettings = {
          steps: 2,
          depth: 2,
          bevelEnabled: true,
          bevelThickness: 0.5,
          bevelSize: 1,
          bevelOffset: 0,
          bevelSegments: 1
        };

        var geometry = new THREE.ExtrudeGeometry( diamondShape, extrudeSettings );
        
        this.objeto = new THREE.Mesh( geometry, material ) ;
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