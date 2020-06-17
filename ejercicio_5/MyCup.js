class MyCup extends THREE.Object3D {
    constructor(material){
        super();

        //1.2. Se crea la geometria y se transforma y orienta
        var cylinderGeom = new THREE.CylinderGeometry (3,3,5,20);
        //this.cylinder = new THREE.Mesh (cylinderGeom, material);
        
        var cylinderGeom2 = new THREE.CylinderGeometry (2.8,2.8,5,20);
        cylinderGeom2.translate(0,0.3,0);
        //this.cylinder2 = new THREE.Mesh (cylinderGeom2, material);

        var torusGeom = new THREE.TorusGeometry(2,0.2,20,20);
        torusGeom.rotateZ(Math.PI/2);
        torusGeom.translate(-2.9,0,0);
        //this.asa = new THREE.Mesh(torusGeom, material);

        //3.Se crean los nodos BSP
        var cilindro1bsp = new ThreeBSP(cylinderGeom);
        var cilindro2bsp = new ThreeBSP(cylinderGeom2);
        var torobsp = new ThreeBSP(torusGeom);

        //4.Se opera
        var resultadoAsa = torobsp.subtract(cilindro1bsp);
        var partialresult = cilindro1bsp.subtract(cilindro2bsp);
        var finalresult = partialresult.union(resultadoAsa);

        //Construimos el mesh final
        var cup = finalresult.toMesh(material);
        cup.geometry.computeFaceNormals();
        cup.geometry.computeVertexNormals();

        this.add(cup);
        

        //this.add (this.cylinder);
        //this.add(this.cylinder2);
        //this.add(this.asa);
    }

    update(){
        this.rotation.x += 0.01;
        this.rotation.y += 0.01;
        this.rotation.z += 0.01;
    }
}