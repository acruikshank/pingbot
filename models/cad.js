window.a3d = window.a3d || {};
a3d.cad = (function() {
  var camera, scene, renderer;
  var particleLight1, pointLight1;
  var particleLight2, pointLight2;
  var meshes = {};

  function init() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMapEnabled = true;
    document.body.appendChild( renderer.domElement );

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 500 );
    camera.position.z = 200;

    controls = new THREE.OrbitControls( camera );
    controls.addEventListener( 'change', function() {renderer.render( scene, camera );} );

    scene = new THREE.Scene();

    scene.add( new THREE.AmbientLight( 0x444444 ) );

    var light = new THREE.DirectionalLight(0xaaaaaa);
    light.position.set(300,-300,300);
    light.rotation.x = light.rotation.y = light.rotation.z = 0;
    light.target.position.set(0.0,0.0,0.0);
    light.target.updateMatrixWorld();
    light.castShadow = true;
    light.shadowMapWidth = 4096;
    light.shadowMapHeight = 4096;
    scene.add(light);


    // var directionalLight = new THREE.DirectionalLight( /*Math.random() * */ 0xffffff, 0.125 );

    // directionalLight.position.x = Math.random() - 0.5;
    // directionalLight.position.y = Math.random() - 0.5;
    // directionalLight.position.z = Math.random() - 0.5;

    // directionalLight.position.normalize();
    // directionalLight.castShadow = true;

    // scene.add( directionalLight );


    pointLight1 = new THREE.PointLight( 0xffffff, 1 );
    pointLight2 = new THREE.PointLight( 0xffffff, 1 );
    scene.add( pointLight1 );
    scene.add( pointLight2 );

    renderer.render( scene, camera );
    
    window.addEventListener( 'resize', onWindowResize, false );
  }

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  }

  function animate(time) {

    var timer=(time||0)*.0001;
//    requestAnimationFrame( animate );

  //        mesh.rotation.x = timer;
  //        mesh.rotation.y = timer;

    pointLight1.position.x = Math.sin( timer * 7 ) * 300;
    pointLight1.position.y = Math.cos( timer * 5 ) * 400;
    pointLight1.position.z = Math.cos( timer * 3 ) * 300;
    pointLight2.position.x = Math.sin( timer * 7 + Math.PI ) * 300;
    pointLight2.position.y = Math.cos( timer * 5 + Math.PI ) * 400;
    pointLight2.position.z = Math.cos( timer * 3 + Math.PI ) * 300;

    renderer.render( scene, camera );

  }

  function saveSTL( geometry, name ){
      var stlString = generateSTL( geometry );
    
    var blob = new Blob([stlString], {type: 'text/plain'});
    
    saveAs(blob, name+'.stl');
  }

  function stringifyVector(vec){
    return ""+vec.x+" "+vec.y+" "+vec.z;
  }

  function stringifyVertex(vec){
    return "vertex "+stringifyVector(vec)+" \n";
  }

  function generateSTL(geometry){
    var vertices = geometry.vertices;
    var tris     = geometry.faces;

    stl = "solid pixel";
    for(var i = 0; i<tris.length; i++){
      stl += ("facet normal "+stringifyVector( tris[i].normal )+" \n");
      stl += ("outer loop \n");
      stl += stringifyVertex( vertices[ tris[i].a ] );
      stl += stringifyVertex( vertices[ tris[i].b ] );
      stl += stringifyVertex( vertices[ tris[i].c ] );
      stl += ("endloop \n");
      stl += ("endfacet \n");
    }
    stl += ("endsolid");

    return stl
  }

  function addSaveButton( meshName ) {
    var btn = document.createElement('button');
    btn.setAttribute('data-mesh', meshName);
    btn.innerHTML = 'save ' + meshName;
    document.getElementById('buttons').appendChild(btn);
    btn.addEventListener('click', function() { saveSTL(meshes[meshName].geometry, meshName); });
  }

  function addMesh( mesh, meshName ) {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    /*
    var outlineMesh = new THREE.Mesh( mesh.geometry, new THREE.MeshBasicMaterial( { color: 0x000000, side: THREE.BackSide } ));
    outlineMesh.scale.multiplyScalar(1.02);
    scene.add(outlineMesh);
    */
    meshes[meshName] = mesh;
    addSaveButton( meshName );
  }

  return {init:init, animate:animate, addMesh:addMesh}
})();