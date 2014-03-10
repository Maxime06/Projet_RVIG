#pragma strict

@MenuItem ("GameObject/Create Other/Cube")                  		//add it to the menu
 
static function CreateCube () {
 
    var Cube : GameObject = new GameObject ("Cube");  				//create an empty gameobject with that name
 
    Cube.AddComponent(MeshFilter);                           		//add a meshfilter
 
    var p0 : Vector3 = Vector3(0,0,0);                              //the four points that make a tetrahedron
    var p1 : Vector3 = Vector3(1f,0,0);
    var p2 : Vector3 = Vector3(1f,1f,0);
    var p3 : Vector3 = Vector3(0,1f,0);
    var p4 : Vector3 = Vector3(0,0,1f);                              //the four points that make a tetrahedron
    var p5 : Vector3 = Vector3(1f,0,1f);
    var p6 : Vector3 = Vector3(1f,1f,1f);
    var p7 : Vector3 = Vector3(0,1f,1f);
 
    var newVertices : Vector3[] = [
	    p0,p1,p2,
	    p0,p2,p3,
	    p0,p1,p4,
	    p1,p4,p5,
	    p1,p2,p6,
	    p1,p5,p6,
	    p2,p3,p6,
	    p3,p6,p7,
	    p0,p3,p4,
	    p3,p4,p7,
	    p4,p5,p6,
	    p4,p6,p7
	];
 
	var newTriangles : int[] = [  
	    0,1,2,
	    0,2,3,
	    0,1,4,
	    1,4,5,
	    1,2,6,
	    1,5,6,
	    2,3,6,
	    3,6,7,
	    0,3,4,
	    3,4,7,
	    4,5,6,
	    4,6,7
	];
 
    var newMesh : Mesh = new Mesh ();                               //create a new mesh, assign the vertices and triangles
        newMesh.vertices = newVertices;
        newMesh.triangles = newTriangles;
        newMesh.RecalculateNormals();                               //recalculate normals, bounds and optimize
        newMesh.RecalculateBounds();
        newMesh.Optimize();                             
             
    (Cube.GetComponent(MeshFilter) as MeshFilter).mesh = newMesh;  //assign the created mesh as the used mesh
 
}