class MyTuerca extends THREE.Object3D {
    constructor(material){
        super();

        //1.2. Se crea la geometria y se transforma y orienta

        var cilinderGeom = new THREE.CylinderGeometry(4,4,3,6);
        var esferaGeom = new THREE.SphereGeometry(4.15,16,16);

        var cilindroagujerog = new THREE.CylinderGeometry(2,2,3,32);
       
        
      //  toroGeom.translate(0,2,0);
       

        var toro = new THREE.Mesh(toroGeom,material);
        //3.Se crean los nodos BSP
        var cilindrobsp = new ThreeBSP(cilinderGeom);
        var esferabsp = new ThreeBSP(esferaGeom);
        var cilindroagujero = new ThreeBSP(cilindroagujerog);
        

        //4.Se opera
        var piezaPrincipal = esferabsp.intersect(cilindrobsp);
        piezaPrincipal = piezaPrincipal.subtract(cilindroagujero);
        
        //Proceso completo para las muescas
        for(var i=0; i<10; i++){
            var toroGeom = new THREE.TorusGeometry(2,0.15,16,16);
            toroGeom.rotateX(Math.PI/2);
            toroGeom.translate(0,1.5-0.15-0.3*i,0);
            var toromuesca = new ThreeBSP(toroGeom);
            piezaPrincipal = piezaPrincipal.subtract(toromuesca);
        }
        
        
        //Construimos el mesh final
        var pieza = piezaPrincipal.toMesh(material);
        this.add(pieza);
        this.add(toro);
    }

    update(){
        this.rotation.x += 0.01;
        this.rotation.y += 0.01;
        this.rotation.z += 0.01;
    }
}