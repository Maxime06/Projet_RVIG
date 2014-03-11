#pragma strict

//@MenuItem ("GameObject/Create Other/Parallelepipoid")                  		//add it to the menu

var parrallele : float = 200;
var meridian : float = 200;
private var newVertices : Vector3[] = new Vector3[(parrallele+1)*(meridian+1)];
private var newTriangles : int[]  = new int[parrallele * meridian * 6];
var radius : int = 5;

function Start () {
 
    var Sphere : GameObject = new GameObject ("Sphere");  	//create an empty gameobject with that name
 
    Sphere.AddComponent(MeshFilter);                           		//add a meshfilter
    Sphere.AddComponent(MeshRenderer);									//add a meshrenderer
    Sphere.AddComponent(MeshCollider);
    Sphere.renderer.material = new Material(Shader.Find("Specular"));
    Sphere.renderer.material.color = Color.green;
    
 
 // coord sphériques : 
 /*rcos theta cos phi
 rsinthethacos phi
 r sin phi
 */
 var k : int = 0;
 var l : int = 0;
 for (var i : int = 0; i <= parrallele; i++) {
 	for (var j : int = 0; j <= meridian; j++) {
 	var theta : float = (i/parrallele)*2*Mathf.PI;
 	var phi : float = (j/meridian)*2*Mathf.PI;
 	var c1 : float = radius * Mathf.Cos(theta) * Mathf.Cos(phi);
 	var c2 : float = radius * Mathf.Sin(theta) * Mathf.Cos(phi);
 	var c3 : float = radius * Mathf.Sin(phi);
 	newVertices[k] = Vector3(c1,c2,c3);
 	k++;
 	}
 }


	for (i = 0; i < parrallele; i++) {
		for (j = 0; j < meridian; j++) {
			newTriangles[l + 5] =
			newTriangles[l    ] = i * (meridian + 1) + j;
			newTriangles[l + 1] = (i + 1) * (meridian + 1) + j;
			newTriangles[l + 2] =
			newTriangles[l + 3] = (i + 1) * (meridian + 1) + j + 1;
			newTriangles[l + 4] = i * (meridian + 1) + j + 1;
			l += 6;
		}
	}
 
    var newMesh : Mesh = new Mesh (); 
    newMesh.Clear();                              			//create a new mesh, assign the vertices and triangles
    newMesh.vertices = newVertices;
    newMesh.triangles = newTriangles;
    newMesh.RecalculateNormals();                               			//recalculate normals, bounds and optimize
    newMesh.RecalculateBounds();
    newMesh.Optimize();                             
             
    (Sphere.GetComponent(MeshFilter) as MeshFilter).mesh = newMesh;  	//assign the created mesh as the used mesh

}