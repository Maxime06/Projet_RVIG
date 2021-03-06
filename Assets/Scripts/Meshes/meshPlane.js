﻿#pragma strict

var Plan : GameObject;
var center : boolean = true;
var size : Vector2 = new Vector2 (10, 10);
var resolutionX : int = 10;
var resolutionZ : int = 10;
private var newVertices : Vector3[] = new Vector3[(resolutionX + 1) * (resolutionZ + 1)];
private var newTriangles : int[] = new int[resolutionX * resolutionZ * 6];
private var newUvs : Vector2[] = new Vector2[newVertices.Length];

function Start () {
}

function ValidateData () {

	if (PlayerPrefs.HasKey("planeLength") && PlayerPrefs.HasKey("planeWidth")) {
		size.x = PlayerPrefs.GetInt("planeLength");
		size.y = PlayerPrefs.GetInt("planeWidth");
		resolutionX = PlayerPrefs.GetInt("planeResX");
		resolutionZ = PlayerPrefs.GetInt("planeResZ");
		PlayerPrefs.DeleteAll();
	}

    // create Plane if don't exists
	if(gameObject.Find("Forme") == null) {
		Plan = GameObject ("Forme");
	}
	//add a meshfilter
	if(gameObject.Find("Forme").GetComponent(MeshFilter) == null) {
		Plan.AddComponent(MeshFilter);                           		
	}
	//add a meshrenderer
	if(gameObject.Find("Forme").GetComponent(MeshRenderer) == null) { 
    	Plan.AddComponent(MeshRenderer);
    	// load the resource PlaneMaterial from folder Assets/Resources
    	var mat : Material = Resources.Load("PlaneMaterial", Material);
    	Plan.renderer.material = mat;
    }									
    if(gameObject.Find("Forme").GetComponent(MeshCollider) == null) {
    	Plan.AddComponent(MeshCollider);
    }
    if (gameObject.Find("Forme") != null && gameObject.Find("Forme").GetComponent("deformation") == null) {
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
	if (gameObject.Find("Main Camera") != null && gameObject.Find("Main Camera").GetComponent("scale_deformation") == null) {
		gameObject.Find("Main Camera").AddComponent("scale_deformation");
	}
	if (gameObject.Find("Main Camera") != null && gameObject.Find("Main Camera").GetComponent("menuGoBack") == null) {
		gameObject.Find("Main Camera").AddComponent("menuGoBack");
	}
	if (gameObject.Find("Forme") != null && gameObject.Find("Forme").GetComponent("fil_de_fer") == null) {
		gameObject.Find("Forme").AddComponent("fil_de_fer");
	}
    (gameObject.Find("Forme").GetComponent("deformation") as MonoBehaviour).enabled = false;
	(gameObject.Find("Forme").GetComponent("deformation_face") as MonoBehaviour).enabled = false;
    
	// la limite peut être abaissée mais il faut éviter une taille nulle car le mesh deviendra invisible
	if (size.x < 0.1f)
		size.x = 0.1f;
	if (size.y < 0.1f)
		size.y = 0.1f;
 	resolutionX = Mathf.Clamp (resolutionX, 1, 250);
	resolutionZ = Mathf.Clamp (resolutionZ, 1, 250);
}
 
// reconstruct mesh based on size and resolution
function UpdateMesh () {
	// check 
	ValidateData();
	// update size of newVertices and newTriangles
	newVertices = new Vector3[(resolutionX + 1) * (resolutionZ + 1)];
	newTriangles = new int[resolutionX * resolutionZ * 6];
	newUvs = new Vector2[newVertices.Length];

	// int i sert juste à accéder aux éléments des tableaux simplement
	var i : int = 0;
	
	// create vertices
	for (var z : int = 0; z <= resolutionZ; z++) {
		for (var x : int = 0; x <= resolutionX; x++) {
			newVertices[i] = Vector3 (x * size.x / resolutionX, 0, z * size.y / resolutionZ);
			if (center) {
				newVertices[i] -= Vector3 (size.x / 2, 0, size.y / 2);
			}
			// le cast en float sert à éviter la division entière de 2 int
			newUvs[i] = Vector2 ((x*1.0) / resolutionX, (z*1.0) / resolutionZ);
			i++;
		}
	}
	
	i = 0;
	// create triangles
	for (z = 0; z < resolutionZ; z++) {
		for (x = 0; x < resolutionX; x++) {
			newTriangles[i + 5] =
			newTriangles[i    ] = z * (resolutionX + 1) + x;
			newTriangles[i + 1] = (z + 1) * (resolutionX + 1) + x;
			newTriangles[i + 2] =
			newTriangles[i + 3] = (z + 1) * (resolutionX + 1) + x + 1;
			newTriangles[i + 4] = z * (resolutionX + 1) + x + 1;
			i += 6;
		}
	}
	
	/*var colors : Color[] = new Color[newVertices.Length];
	var c : int = 0;
	for (c = 0; c < newVertices.Length; c++) {
		colors[c] = Color.red;
	}*/
	
	//create a new mesh, assign the vertices and triangles
    var newMesh : Mesh = new Mesh ();
    newMesh.name = "Procedural Plane";    
	newMesh.Clear ();
	// cette ligne sert à nettoyer les données du mesh
	// Unity vérifie si les indices des tris ne sont pas en dehors du tableau
	// de vertices, ce qui peut facilement se produire si on en assigne de
	// nouveaux alors que le mesh contient toujours les anciens tris
	// (vous obtiendrez une jolie exception dans ce cas !)
	newMesh.vertices = newVertices;
	newMesh.uv = newUvs;
	//newMesh.colors = colors;
	newMesh.triangles = newTriangles;
	newMesh.RecalculateNormals();                               	//recalculate normals, bounds and optimize
    newMesh.RecalculateBounds();
    newMesh.Optimize(); 
    
    (Plan.GetComponent(MeshFilter) as MeshFilter).mesh = newMesh;  	//assign the created mesh as the used mesh 
    Plan.GetComponent(MeshCollider).sharedMesh = null;
    Plan.GetComponent(MeshCollider).sharedMesh = newMesh; 
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
		newTris[j+2] = triangles[i+1]+szV;
		newTris[j+1] = triangles[i+2]+szV;
	}
	mesh.vertices = newVerts;
	mesh.uv = newUv;
	mesh.normals = newNorms;
    mesh.triangles = newTris; // assign triangles last!
}