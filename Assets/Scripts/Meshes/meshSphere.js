#pragma strict

var Sphere : GameObject;
var parrallele : float = 20;
var meridian : float = 20;
private var newVertices : Vector3[] = new Vector3[parrallele*meridian+2];
private var newTriangles : int[]  = new int[(parrallele-1)* meridian * 6 + 2*meridian * 3];
var radius : float = 5;

function Start () {
	if (PlayerPrefs.HasKey("sphereRadius")) {
		radius = PlayerPrefs.GetFloat("sphereRadius");
		PlayerPrefs.DeleteKey("sphereRadius");
	}
}

function ValidateData () {
	// create Sphere if don't exists
	if(gameObject.Find("Forme") == null) {
		Sphere = new GameObject ("Forme");
		Sphere.transform.position = Vector3(0,0,0);
		Sphere.transform.rotation = Quaternion.identity;
	}
	//add a meshfilter
	if(gameObject.Find("Forme").GetComponent(MeshFilter) == null) {
		Sphere.AddComponent(MeshFilter);                           		
	}
	//add a meshrenderer
	if(gameObject.Find("Forme").GetComponent(MeshRenderer) == null) { 
    	Sphere.AddComponent(MeshRenderer);
    	var mat : Material = Resources.Load("PlaneMaterial", Material);
    	Sphere.renderer.material = mat;
    }									
    if(gameObject.Find("Forme").GetComponent(MeshCollider) == null) {
    	Sphere.AddComponent(MeshCollider);
    }
 /*  if (gameObject.Find("Forme") != null && gameObject.Find("Forme").GetComponent("deformation") == null) {
		gameObject.Find("Forme").AddComponent("deformation");
	}
	if (gameObject.Find("Forme") != null && gameObject.Find("Forme").GetComponent("deformation_arrete") == null) {
		gameObject.Find("Forme").AddComponent("deformation_arrete");
	}
	if (gameObject.Find("Forme") != null && gameObject.Find("Forme").GetComponent("deformation_face") == null) {
		gameObject.Find("Forme").AddComponent("deformation_face");
	}
	if (gameObject.Find("Main Camera") != null && gameObject.Find("Main Camera").GetComponent("inter") == null) {
		gameObject.Find("Main Camera").AddComponent("inter");
	}
	if (gameObject.Find("Forme") != null && gameObject.Find("Forme").GetComponent("choose_deformation") == null) {
		gameObject.Find("Forme").AddComponent("choose_deformation");
	}
	if (gameObject.Find("Forme") != null && gameObject.Find("Forme").GetComponent("assistance") == null) {
		gameObject.Find("Forme").AddComponent("assistance");
	}
	if (gameObject.Find("Forme") != null && gameObject.Find("Forme").GetComponent("PointInfo") == null) {
		gameObject.Find("Forme").AddComponent("PointInfo");
	}
	if (gameObject.Find("Forme") != null && gameObject.Find("Forme").GetComponent("scale_deformation") == null) {
		gameObject.Find("Forme").AddComponent("scale_deformation");
	}
	if (gameObject.Find("Main Camera") != null && gameObject.Find("Main Camera").GetComponent("menuGoBack") == null) {
		gameObject.Find("Main Camera").AddComponent("menuGoBack");
	}
    (gameObject.Find("Forme").GetComponent("deformation_arrete") as MonoBehaviour).enabled = false;
	(gameObject.Find("Forme").GetComponent("deformation_face") as MonoBehaviour).enabled = false;*/
}

function UpdateMesh () {
	// check 
	ValidateData();
	// update size of newVertices and newTriangles
	newVertices = new Vector3[parrallele*meridian+2];
	newTriangles = new int[(parrallele-1)* meridian * 6 + 2*meridian * 3];
	var uv : Vector2[] = new Vector2[newVertices.Length];
	
	// coord sphériques : 
	 /*rcos theta cos phi
	 rsinthethacos phi
	 r sin phi
	 */
	 newVertices[0] = Vector3(radius, 0,0);
	 uv[0] = Vector2(radius, 0);
	 var k : int = 1;
	 for (var i : int = 0; i < parrallele; i++) {
	 	for (var j : int = 0; j < meridian; j++) {
	 	var phi : float = (i/parrallele)*Mathf.PI;
	 	var theta : float = (j/meridian)*2*Mathf.PI;
	 	var c1 : float = radius * Mathf.Cos(theta) * Mathf.Cos(phi);
	 	var c2 : float = radius * Mathf.Sin(theta) * Mathf.Cos(phi);
	 	var c3 : float = radius * Mathf.Sin(phi);
	 	newVertices[k] = Vector3(c1,c2,c3);
	 	uv[k] = Vector2(newVertices[i].x, newVertices[i].z);
	 	k++;
	 	}
	 }
	 newVertices[parrallele*meridian+1] = Vector3(-radius,0,0);
	 uv[parrallele*meridian+1] = Vector2(-radius, 0);

	/* 0 -> 5 */
	for (k = 0; k < meridian-1; k++) {
			newTriangles[3*k] = 0;
			newTriangles[3*k+1] = k+1;
			newTriangles[3*k+2] = k+2;
	}
	/* 5 -> 8 */
	k = meridian-1;
	newTriangles[3*k] = 0;
	newTriangles[3*k+1] = k+1;
	newTriangles[3*k+2] = 1;
	
	for ( k = 0; k < meridian*parrallele;k++){
		for (i = 0; i < parrallele; i++) {
			for (j = 0; j < meridian; j++) {
				newTriangles[3*meridian + k    ] = i * (meridian /*+ 1*/) + j + 1;
				newTriangles[3*meridian + k + 1] = (i + 1) * (meridian/* + 1*/) + j +1;
				newTriangles[3*meridian + k + 2] =  (i + 1) * (meridian/* + 1*/) + j + 2;
				newTriangles[3*meridian + k + 3] = i * (meridian/* + 1*/) + j + 1;
				newTriangles[3*meridian + k + 4] = (i + 1) * (meridian /*+ 1*/) + j + 2;
				newTriangles[3*meridian + k + 5] = i * (meridian/* + 1*/) + j + 2;
			}
		}
	}
	
	// les triangles du dernier sommet !!!!
	var r : int = 6*(parrallele-1) * meridian;
	for (k = 0; k < meridian-1;) {
			newTriangles[r+k] = parrallele*meridian+1;
			newTriangles[r+k+1] = meridian*(parrallele-1) +k+1;
			newTriangles[r+k+2] = meridian*(parrallele-1) +k+2;
			k+=3;
	}
	k = r+meridian;
	newTriangles[k] = parrallele*meridian+1;
	newTriangles[k+1] = meridian*(parrallele-1)+ meridian;
	newTriangles[k+2] = meridian*(parrallele-1)+1;
 
   //create a new mesh, assign the vertices and triangles
    var newMesh : Mesh = new Mesh ();
    	newMesh.name = "Procedural Sphere";                              
        newMesh.Clear();
        newMesh.vertices = newVertices;
        newMesh.uv = uv;
        newMesh.triangles = newTriangles;
        newMesh.RecalculateNormals();                               	//recalculate normals, bounds and optimize
        newMesh.RecalculateBounds();
        newMesh.Optimize();                             
          
    (Sphere.GetComponent(MeshFilter) as MeshFilter).mesh = newMesh;  	//assign the created mesh as the used mesh
 	  Sphere.GetComponent(MeshCollider).sharedMesh = newMesh; 
}

// called when the script is loaded or a value is changed in the inspector
function OnValidate () {
	UpdateMesh ();
 OtherFace();
}

function OtherFace () {
    var mesh = gameObject.Find("Forme").GetComponent(MeshFilter).sharedMesh;
	var vertices = mesh.vertices;
	var uv = mesh.uv;
	var normals = mesh.normals;
	var szV = vertices.length;
	var newVerts = new Vector3[szV*2];
	var newUv = new Vector2[szV*2];
	var newNorms = new Vector3[szV*2];
	for (var j=0; j< szV; j++){
		// duplicate vertices and uvs:
		newVerts[j] = newVerts[j+szV] = vertices[j];
		newUv[j] = newUv[j+szV] = uv[j];
		// copy the original normals...
		newNorms[j] = normals[j];
		// and revert the new ones
		newNorms[j+szV] = -normals[j];
	}
	var triangles = mesh.triangles;
	var szT = triangles.length;
	var newTris = new int[szT*2]; // double the triangles
	for (var i=0; i< szT; i+=3){
		// copy the original triangle
		newTris[i] = triangles[i];
		newTris[i+1] = triangles[i+1];
		newTris[i+2] = triangles[i+2];
		// save the new reversed triangle
		j = i+szT; 
		newTris[j] = triangles[i]+szV;
		newTris[j+1] = triangles[i+1]+szV;
		newTris[j+2] = triangles[i+2]+szV;
	}
	mesh.vertices = newVerts;
	mesh.uv = newUv;
	mesh.normals = newNorms;
    mesh.triangles = newTris; // assign triangles last!
}
