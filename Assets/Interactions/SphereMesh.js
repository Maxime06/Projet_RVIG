﻿#pragma strict

//@MenuItem ("GameObject/Create Other/Parallelepipoid")                  		//add it to the menu
var Sphere : GameObject;
var parrallele : float = 200;
var meridian : float = 200;
private var newVertices : Vector3[] = new Vector3[(parrallele+1)*(meridian+1)];
private var newTriangles : int[]  = new int[parrallele * meridian * 6];
var radius : int = 5;

function Start () {

}

function ValidateData () {
	// create Cylinder if don't exists
	if(gameObject.Find("Forme") == null) {
		Sphere = new GameObject ("Forme");
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
}

function UpdateMesh () {
	// check 
	ValidateData();
	// update size of newVertices and newTriangles
	newVertices = new Vector3[(parrallele+1)*(meridian+1)];
	newTriangles = new int[parrallele * meridian * 6];
	var uv : Vector2[] = new Vector2[newVertices.Length];
	
	// coord sphériques : 
	 /*rcos theta cos phi
	 rsinthethacos phi
	 r sin phi
	 */
	 var k : int = 0;
	 for (var i : int = 0; i <= parrallele; i++) {
	 	for (var j : int = 0; j <= meridian; j++) {
	 	var theta : float = (i/parrallele)*2*Mathf.PI;
	 	var phi : float = (j/meridian)*2*Mathf.PI;
	 	var c1 : float = radius * Mathf.Cos(theta) * Mathf.Cos(phi);
	 	var c2 : float = radius * Mathf.Sin(theta) * Mathf.Cos(phi);
	 	var c3 : float = radius * Mathf.Sin(phi);
	 	newVertices[k] = Vector3(c1,c2,c3);
	 	uv[k] = Vector2(newVertices[i].x, newVertices[i].z);
	 	k++;
	 	}
	 }

	k = 0;
	for (i = 0; i < parrallele; i++) {
		for (j = 0; j < meridian; j++) {
			newTriangles[k + 5] =
			newTriangles[k    ] = i * (meridian + 1) + j;
			newTriangles[k + 1] = (i + 1) * (meridian + 1) + j;
			newTriangles[k + 2] =
			newTriangles[k + 3] = (i + 1) * (meridian + 1) + j + 1;
			newTriangles[k + 4] = i * (meridian + 1) + j + 1;
			k += 6;
		}
	}
 
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
 
}

// called when the script is loaded or a value is changed in the inspector
function OnValidate () {
	if (gameObject.Find("Forme") != null && gameObject.Find("Forme").GetComponent("deformation") == null) {
		gameObject.Find("Forme").AddComponent("deformation");
	}
	UpdateMesh ();
	OtherFace();
}

function OnApplicationQuit () {
	Destroy(this);
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