#pragma strict

//@MenuItem ("GameObject/Create Other/Parallelepipoid")                  		//add it to the menu

var parrallele : float = 20;
var meridian : float = 20;
private var newVertices : Vector3[] = new Vector3[parrallele*meridian];
var newTriangles : int[]  = new int[parrallele * meridian * 6*6];
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
 for (var i : int = 0; i < parrallele; i++) {
 	for (var j : int = 0; j < meridian; j++) {
 	var theta : float = (i/parrallele)*2*Mathf.PI;
 	var phi : float = (j/meridian)*2*Mathf.PI;
 	var c1 : float = radius * Mathf.Cos(theta) * Mathf.Cos(phi);
 	var c2 : float = radius * Mathf.Sin(theta) * Mathf.Cos(phi);
 	var c3 : float = radius * Mathf.Sin(phi);
 	newVertices[k] = Vector3(c1,c2,c3);
 	k++;
 	}
 }


	for (var z : int  = 0; z < parrallele; z++) {
		for (var x : int = 0; x < meridian; x++) {
			
			newTriangles[l    ] = (z -1)* meridian + x;
			newTriangles[l + 1] = (z -1) * meridian + 1 +x;;
			newTriangles[l + 2] = z*meridian+x+1;
			newTriangles[l + 3] = (z-1)*meridian+1+x;
			newTriangles[l + 4] = z* meridian +x;
			newTriangles[l + 5] = z*meridian +x+1;
			l += 6;
		}
	}
 
    var newMesh : Mesh = new Mesh ();                               			//create a new mesh, assign the vertices and triangles
        newMesh.vertices = newVertices;
        newMesh.triangles = newTriangles;
        newMesh.RecalculateNormals();                               			//recalculate normals, bounds and optimize
        newMesh.RecalculateBounds();
        newMesh.Optimize();                             
             
    (Sphere.GetComponent(MeshFilter) as MeshFilter).mesh = newMesh;  	//assign the created mesh as the used mesh

}