#pragma strict

//@MenuItem ("GameObject/Create Other/Parallelepipoid")                  		//add it to the menu
 
public var newVertices : Vector3[];
public var newTriangles : int[];
public var height : float = 2f;
public var width : float = 1.5;
public var length : float = 4f;
 
function Start () {
 
    var Parallelepipoid : GameObject = new GameObject ("Parallelepipoid");  	//create an empty gameobject with that name
 
    Parallelepipoid.AddComponent(MeshFilter);                           		//add a meshfilter
    Parallelepipoid.AddComponent(MeshRenderer);									//add a meshrenderer
    Parallelepipoid.AddComponent(MeshCollider);
    Parallelepipoid.renderer.material = new Material(Shader.Find("Specular"));
    Parallelepipoid.renderer.material.color = Color.green;
    
 
    var p0 : Vector3 = Vector3(0,0,0);                              			//the eight points that make a parallelepipoid
    var p1 : Vector3 = Vector3(1*width,0,0);
    var p2 : Vector3 = Vector3(1*width,1*height,0);
    var p3 : Vector3 = Vector3(0,1*height,0);
    var p4 : Vector3 = Vector3(0,0,1*length);
    var p5 : Vector3 = Vector3(1*width,0,1*length);
    var p6 : Vector3 = Vector3(1*width,1*height,1*length);
    var p7 : Vector3 = Vector3(0,1*height,1*length);
 
    newVertices = [
	    p0,p1,p2,p3,p4,p5,p6,p7
	];
 
	newTriangles = [  
	    0,2,1,
	    0,3,2,
	    0,1,4,
	    1,5,4,
	    1,2,6,
	    1,6,5,
	    2,3,6,
	    3,7,6,
	    0,4,3,
	    3,4,7,
	    4,5,6,
	    4,6,7
	];
 
    var newMesh : Mesh = new Mesh ();                               			//create a new mesh, assign the vertices and triangles
        newMesh.vertices = newVertices;
        newMesh.triangles = newTriangles;
        newMesh.RecalculateNormals();                               			//recalculate normals, bounds and optimize
        newMesh.RecalculateBounds();
        newMesh.Optimize();                             
             
    (Parallelepipoid.GetComponent(MeshFilter) as MeshFilter).mesh = newMesh;  	//assign the created mesh as the used mesh
 
}