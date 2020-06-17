class Trebol extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();

        var material = new THREE.MeshPhongMaterial( { color: 0x0000F8 } );
        this.Mat = new THREE.MeshNormalMaterial();
        this.Mat.flatShading = true;
        this.Mat.needsUpdate = true;
        var x = 0, y = 0;

        var trebolShape = new THREE.Shape();

        trebolShape.moveTo( 0, 6 );
        trebolShape.quadraticCurveTo(0,0,-6, 0);
        trebolShape.quadraticCurveTo(-12,0,-12,6);
        trebolShape.quadraticCurveTo(-12, 13, -5, 11.8);
        trebolShape.quadraticCurveTo(-6, 12.2, -6, 15);
        trebolShape.quadraticCurveTo(-6, 21, 0, 21);
        trebolShape.quadraticCurveTo(6, 21, 6, 15);
        trebolShape.quadraticCurveTo(6, 12.2, 5, 11.8);
        trebolShape.quadraticCurveTo(12, 13, 12, 6);
        trebolShape.quadraticCurveTo(12, 0, 6, 0);
        trebolShape.quadraticCurveTo(0, 0, 0, 6);
        

        var extrudeSettings = {
          steps: 2,
          depth: 2,
          bevelEnabled: true,
          bevelThickness: 0.5,
          bevelSize: 1,
          bevelOffset: 0,
          bevelSegments: 1
        };

        var geometry = new THREE.ExtrudeGeometry( trebolShape, extrudeSettings );
        
        this.objeto = new THREE.Mesh( geometry, material ) ;
        this.add( this.objeto );
        this.objeto.position.y += 3.5*3;
        this.objeto.position.z -=1;


        var pie = new Pie(gui, "Pie", material);
        pie.scale.set(5, 5, 5);
        this.add(pie);
        this.position.y -= 2.5;
        this.scale.set(0.17, 0.17, 0.17);
        



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