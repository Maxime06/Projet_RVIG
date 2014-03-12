#pragma strict

//@MenuItem ("GameObject/Create Other/Parallelepipoid")                  		//add it to the menu
var Parallelepipoid : GameObject;
private var newVertices : Vector3[] = new Vector3[8];
private var newTriangles : int[] = new int[3*12];
var height : float = 2f;
var width : float = 1.5;
var length : float = 4f;
 
function Start () {   
 
}

function ValidateData () {
	// create Parallelepipoid if don't exists
	if(gameObject.Find("Forme") == null) {
		Parallelepipoid = new GameObject ("Forme");
	}
	//add a meshfilter
	if(gameObject.Find("Forme").GetComponent(MeshFilter) == null) {
		Parallelepipoid.AddComponent(MeshFilter);                           		
	}
	//add a meshrenderer
	if(gameObject.Find("Forme").GetComponent(MeshRenderer) == null) { 
    	Parallelepipoid.AddComponent(MeshRenderer);
    	var mat : Material = Resources.Load("PlaneMaterial", Material);
    	Parallelepipoid.renderer.material = mat;
    }									
    if(gameObject.Find("Forme").GetComponent(MeshCollider) == null) {
    	Parallelepipoid.AddComponent(MeshCollider);
    }
}

function UpdateMesh () {
	// check 
	ValidateData();
	var uv : Vector2[] = new Vector2[newVertices.Length];
	
	var p0 : Vector3 = Vector3(0,0,0);                              			//the eight points that make a parallelepipoid
    var p1 : Vector3 = Vector3(1*width,0,0);
    var p2 : Vector3 = Vector3(1*width,1*height,0);
    var p3 : Vector3 = Vector3(0,1*height,0);
    var p4 : Vector3 = Vector3(0,0,1*length);
    var p5 : Vector3 = Vector3(1*width,0,1*length);
    var p6 : Vector3 = Vector3(1*width,1*height,1*length);
    var p7 : Vector3 = Vector3(0,1*height,1*length);
 
 	newVertices = [p0,p1,p2,p3,p4,p5,p6,p7];
	
	for (var i : int = 0; i < 8; i++) {
		uv[i] = Vector2(newVertices[i].x, newVertices[i].z);
	}
	
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
    	newMesh.name = "Procedural Parallelepipoid";
    	newMesh.Clear();
        newMesh.vertices = newVertices;
        newMesh.uv = uv;
        newMesh.triangles = newTriangles;
        newMesh.RecalculateNormals();                               			//recalculate normals, bounds and optimize
        newMesh.RecalculateBounds();
        newMesh.Optimize();                             
             
    (Parallelepipoid.GetComponent(MeshFilter) as MeshFilter).mesh = newMesh;  	//assign the created mesh as the used mesh

}

// called when the script is loaded or a value is changed in the inspector
function OnValidate () {
	UpdateMesh ();
}

function OnApplicationQuit () {
	Destroy(this);
}