class MyPieza extends THREE.Object3D {
    constructor(material){
        super();

        //1.2. Se crea la geometria y se transforma y orienta
        var boxGeom = new THREE.BoxGeometry (5,5,2);
        var boxGeom2 = new THREE.BoxGeometry (0.5,0.5,2);
        var cilinderGeom = new THREE.CylinderGeometry(0.5,0.5,3,32);
        var piezaGeom = new THREE.BoxGeometry (5,5,2);

        var cilinderagujero1g = new THREE.CylinderGeometry(0.25,0.25,0.25,32);
        var cilinderagujero2g = new THREE.CylinderGeometry(0.25,0.4,0.25,32);
        
        cilinderagujero1g.translate(1,0.25/2+2.75,0);
        cilinderagujero2g.translate(1,-0.25/2+2.75,0);

        var cilinderagujero3g = new THREE.CylinderGeometry(0.25,0.25,0.25,32);
        var cilinderagujero4g = new THREE.CylinderGeometry(0.25,0.4,0.25,32);
        

        
        cilinderagujero3g.rotateZ(Math.PI/2);
        cilinderagujero3g.translate(-0.25/2-2.75,0,0);
        cilinderagujero4g.rotateZ(Math.PI/2);
        cilinderagujero4g.translate(0.25/2-2.75,0,0);

        boxGeom2.translate(-2.25,2.25,0);
        cilinderGeom.rotateX(Math.PI/2);
        cilinderGeom.translate(-2,2,0);
        piezaGeom.translate(-0.5,0.5,0);
        
        //3.Se crean los nodos BSP
        var cajaAux = new ThreeBSP(boxGeom);
        var cajaAux2 = new ThreeBSP(boxGeom2);
        var cilindroAux = new ThreeBSP(cilinderGeom);

        var cajaPrincipal = new ThreeBSP(piezaGeom);

        var cilinderagujero1 = new ThreeBSP(cilinderagujero1g);
        var cilinderagujero2 = new ThreeBSP(cilinderagujero2g);
        
        var cilinderagujero3 = new ThreeBSP(cilinderagujero3g);
        var cilinderagujero4 = new ThreeBSP(cilinderagujero4g);

        //4.Se opera
        var restacajas = cajaAux.subtract(cajaAux2);
        cajaAux = restacajas.union(cilindroAux);
        
        var piezaPrincipal = cajaPrincipal.subtract(cajaAux);
        var agujero_arriba = cilinderagujero1.union(cilinderagujero2);
        var agujero_abajo = cilinderagujero3.union(cilinderagujero4);
        piezaPrincipal = piezaPrincipal.subtract(agujero_arriba);
        piezaPrincipal = piezaPrincipal.subtract(agujero_abajo);
        
        
        //Construimos el mesh final
        var pieza = piezaPrincipal.toMesh(material);
        this.add(pieza);
        
    }

    update(){
        this.rotation.x += 0.01;
        this.rotation.y += 0.01;
        this.rotation.z += 0.01;
    }
}