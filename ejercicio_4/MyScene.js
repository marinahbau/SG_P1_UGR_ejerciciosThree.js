
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
    constructor (myCanvas) {
      super();
      
      // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
      this.renderer = this.createRenderer(myCanvas);
      
      // Se añade a la gui los controles para manipular los elementos de esta clase
      this.gui = this.createGUI ();
      
      // Construimos los distinos elementos que tendremos en la escena
      
      // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
      // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
      this.createLights ();
      
      // Tendremos una cámara con un control de movimiento con el ratón
      this.createCamera ();
      
      
      // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
      this.axis = new THREE.AxesHelper (10);
      this.add (this.axis);
  
      
      //Creamos el material
      this.Mat = new THREE.MeshNormalMaterial();
      this.Mat.flatShading = this.guiControls.sombreado;
      this.Mat.needsUpdate = true;
  
      this.figuras = new THREE.Object3D();
      
      
      // Por último creamos el modelo.
      this.corazon = new Corazon(this.gui, "Controles Corazon"); 
      this.corazon_ = new THREE.Object3D();
      this.corazon_.add(this.corazon);
      this.corazon.scale.set(0.2,0.2,0.2);
      this.corazon_.position.set(4, -4, 0);
      this.figuras.add(this.corazon_);
      
      
      this.diamante = new Diamante(this.gui, "Controles Diamante");
      this.diamante_ = new THREE.Object3D();
      this.diamante_.add(this.diamante);
      this.diamante.scale.set(0.4, 0.4, 0.2);
      this.diamante_.position.set(-4, 4, 0);
      this.figuras.add(this.diamante_);
      
  
      this.pica = new Pica(this.gui, "pica");
      this.pica_ = new THREE.Object3D();
      this.pica_.add(this.pica);
      this.pica_.position.set(4, 4, 0);
      this.figuras.add(this.pica_);
      
  
      this.trebol = new Trebol(this.gui, "trebol");
      this.trebol_ = new THREE.Object3D();
      this.trebol_.add(this.trebol);
      this.trebol_.position.set(-4, -4, 0);
      this.figuras.add(this.trebol_);
     
      this.add(this.figuras);
      
      this.columna1 = new ColumnaCorazon(this.gui, "columna1");
      this.columna1_ = new THREE.Object3D();
      this.columna1_.add(this.columna1);
      this.columna1_.position.x -= 12;
      this.add(this.columna1_);
  
  
      this.columna2 = new ColumnaTrebol(this.gui, "columna2");
      this.columna2_ = new THREE.Object3D();
      this.columna2_.add(this.columna2);
      this.columna2_.position.x += 12;
      this.add(this.columna2_);
  
  
      
  
    }
  
    
    createCamera () {
      // Para crear una cámara le indicamos
      //   El ángulo del campo de visión en grados sexagesimales
      //   La razón de aspecto ancho/alto
      //   Los planos de recorte cercano y lejano
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      // También se indica dónde se coloca
      this.camera.position.set (0, 0, 20);
      // Y hacia dónde mira
      var look = new THREE.Vector3 (0,0,0);
      this.camera.lookAt(look);
      this.add (this.camera);
      
      // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
      this.cameraControl = new THREE.TrackballControls (this.camera, this.renderer.domElement);
      // Se configuran las velocidades de los movimientos
      this.cameraControl.rotateSpeed = 5;
      this.cameraControl.zoomSpeed = -2;
      this.cameraControl.panSpeed = 0.5;
      // Debe orbitar con respecto al punto de mira de la cámara
      this.cameraControl.target = look;
    }
    
    createGUI () {
      // Se crea la interfaz gráfica de usuario
      var gui = new dat.GUI();
      
      // La escena le va a añadir sus propios controles. 
      // Se definen mediante una   new function()
      // En este caso la intensidad de la luz y si se muestran o no los ejes
      this.guiControls = new function() {
        // En el contexto de una función   this   alude a la función
        this.lightIntensity = 0.5;
        this.axisOnOff = true;
        this.sombreado = true;
        this.animacion = true;
        
      }
  
      // Se crea una sección para los controles de esta clase
      var folder = gui.addFolder ('Luz y Ejes');
  
      var that = this;
      gui.add(this.guiControls, 'sombreado').name('Sombreado : ').listen();
      
      // Se le añade un control para la intensidad de la luz
      folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');
      
      // Y otro para mostrar u ocultar los ejes
      folder.add (this.guiControls, 'axisOnOff').name ('Mostrar ejes : ');
      gui.add(this.guiControls, 'animacion');
  
      
      return gui;
    }
  
    
    
    createLights () {
      // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
      // La luz ambiental solo tiene un color y una intensidad
      // Se declara como   var   y va a ser una variable local a este método
      //    se hace así puesto que no va a ser accedida desde otros métodos
      var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
      // La añadimos a la escena
      this.add (ambientLight);
      
      // Se crea una luz focal que va a ser la luz principal de la escena
      // La luz focal, además tiene una posición, y un punto de mira
      // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
      // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
      this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
      this.spotLight.position.set( 60, 60, 40 );
      this.add (this.spotLight);
    }
    
    createRenderer (myCanvas) {
      // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
      
      // Se instancia un Renderer   WebGL
      var renderer = new THREE.WebGLRenderer();
      
      // Se establece un color de fondo en las imágenes que genera el render
      renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
      
      // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      // La visualización se muestra en el lienzo recibido
      $(myCanvas).append(renderer.domElement);
      
      return renderer;  
    }
    
    getCamera () {
      // En principio se devuelve la única cámara que tenemos
      // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
      return this.camera;
    }
    
    setCameraAspect (ratio) {
      // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
      // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
      this.camera.aspect = ratio;
      // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
      this.camera.updateProjectionMatrix();
    }
    
    onWindowResize () {
      // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
      // Hay que actualizar el ratio de aspecto de la cámara
      this.setCameraAspect (window.innerWidth / window.innerHeight);
      
      // Y también el tamaño del renderizador
      this.renderer.setSize (window.innerWidth, window.innerHeight);
    }
  
    update () {
      // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
      
      // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
      // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
      requestAnimationFrame(() => this.update())
      this.Mat.flatShading = this.guiControls.sombreado; 
      this.Mat.needsUpdate = true; 
  
      // Se actualizan los elementos de la escena para cada frame
      // Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui
      this.spotLight.intensity = this.guiControls.lightIntensity;
      
      // Se muestran o no los ejes según lo que idique la GUI
      this.axis.visible = this.guiControls.axisOnOff;
      
      // Se actualiza la posición de la cámara según su controlador
      this.cameraControl.update();
      
      // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
      this.renderer.render (this, this.getCamera());
  
      if(this.guiControls.animacion){
        this.corazon.update();
        this.diamante.update();
        this.pica.update();
        this.trebol.update();
        this.columna1.update();
        this.columna2.update();
  
        //Rotaciones
        this.rotar();
      }
  
    }
  
    rotar(){
      var alpha = 0.01;
      //que roten todas
      this.figuras.rotation.z += alpha;
  
      //Que se corrija la rotacion de las figuras
      this.corazon_.rotation.z -= alpha;
      this.diamante_.rotation.z -= alpha;
      this.trebol_.rotation.z -= alpha;
      this.pica_.rotation.z -= alpha;
  
    }
  
  }
  
  
  
  
  /// La función   main
  $(function () {
    
    // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
    var scene = new MyScene("#WebGL-output");
  
    // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
    window.addEventListener ("resize", () => scene.onWindowResize());
    
    // Que no se nos olvide, la primera visualización.
    scene.update();
  });
  