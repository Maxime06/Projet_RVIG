#pragma strict

var Cylinder : GameObject;
var radius : float = 5f;
var height : float = 8f;
var nbPoints : int = 8;
private var newVertices : Vector3[] = new Vector3[2*nbPoints+2];
private var newTriangles : int[] = new int[3*4*nbPoints];

function Start () {
   
}

function ValidateData () {
	// create Cylinder if don't exists
	if(gameObject.Find("Forme") == null) {
		Cylinder = new GameObject ("Forme");
	}
	//add a meshfilter
	if(gameObject.Find("Forme").GetComponent(MeshFilter) == null) {
		Cylinder.AddComponent(MeshFilter);                           		
	}
	//add a meshrenderer
	if(gameObject.Find("Forme").GetComponent(MeshRenderer) == null) { 
    	Cylinder.AddComponent(MeshRenderer);
    	var mat : Material = Resources.Load("PlaneMaterial", Material);
    	Cylinder.renderer.material = mat;
    }									
    if(gameObject.Find("Forme").GetComponent(MeshCollider) == null) {
    	Cylinder.AddComponent(MeshCollider);
    }
}
    
function UpdateMesh () {
	// check 
	ValidateData();
	// update size of newVertices and newTriangles
	newVertices = new Vector3[2*nbPoints+2];
	newTriangles = new int[3*4*nbPoints];
	var uv : Vector2[] = new Vector2[newVertices.Length];
	
	// create newVertices
    var angle : float = 2*Mathf.PI / nbPoints; 
 	for (var i : int = 0; i < nbPoints; i++) {
 		var theta : float = i * angle;
 		
 		var p : Vector3 = Vector3(radius*Mathf.Cos(theta),0,radius*Mathf.Sin(theta));
 		var q : Vector3 = Vector3(radius*Mathf.Cos(theta),height,radius*Mathf.Sin(theta));
 		
 		newVertices[2*i] = p;
 		uv[2*i] = Vector2(p.x, p.z);
 		newVertices[2*i+1] = q;
 		uv[2*i+1] = Vector2(p.x, p.z);
	}
	newVertices[2*nbPoints] = Vector3(0,0,0);
	newVertices[2*nbPoints+1] = Vector3(0,height,0);
	
	// create newTriangles
	for (var j : int = 0; j <= 2*(nbPoints-2); ) {
		newTriangles[12*j/2] = j;
		newTriangles[12*j/2+1] = j+3;
		newTriangles[12*j/2+2] = j+2;
		
		newTriangles[12*j/2+3] = j;
		newTriangles[12*j/2+4] = j+1;
		newTriangles[12*j/2+5] = j+3;
		
		newTriangles[12*j/2+6] = j+1;
		newTriangles[12*j/2+7] = 2*nbPoints+1;
		newTriangles[12*j/2+8] = j+3;
		
		newTriangles[12*j/2+9] = j+2;
		newTriangles[12*j/2+10] = 2*nbPoints;
		newTriangles[12*j/2+11] = j;
		
		j += 2;
	}
	
	var k : int = 2*(nbPoints-1);
	newTriangles[12*k/2] = k;
	newTriangles[12*k/2+1] = 1;
	newTriangles[12*k/2+2] = 0;
	
	newTriangles[12*k/2+3] = k;
	newTriangles[12*k/2+4] = k+1;
	newTriangles[12*k/2+5] = 1;
	
	newTriangles[12*k/2+6] = k+1;
	newTriangles[12*k/2+7] = 2*nbPoints+1;
	newTriangles[12*k/2+8] = 1;
	
	newTriangles[12*k/2+9] = 0;
	newTriangles[12*k/2+10] = 2*nbPoints;
	newTriangles[12*k/2+11] = k;
	
  	//create a new mesh, assign the vertices and triangles
    var newMesh : Mesh = new Mesh ();
    	newMesh.name = "Procedural Cylinder";                              
        newMesh.Clear();
        newMesh.vertices = newVertices;
        newMesh.uv = uv;
        newMesh.triangles = newTriangles;
        newMesh.RecalculateNormals();                               	//recalculate normals, bounds and optimize
        newMesh.RecalculateBounds();
        newMesh.Optimize();                             
             
    (Cylinder.GetComponent(MeshFilter) as MeshFilter).mesh = newMesh;  	//assign the created mesh as the used mesh
 
}

// called when the script is loaded or a value is changed in the inspector
function OnValidate () {
	if (gameObject.Find("Forme") != null && gameObject.Find("Forme").GetComponent("deformation") == null) {
		gameObject.Find("Forme").AddComponent("deformation");
	}
	UpdateMesh ();
}

function OnApplicationQuit () {
	Destroy(this);
}