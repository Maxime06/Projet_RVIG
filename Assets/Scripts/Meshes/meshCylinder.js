#pragma strict

var Cylinder : GameObject;
var radius : float = 1;
var height : float = 4;
var nbPoints : int = 8;
private var newVertices : Vector3[] = new Vector3[2*nbPoints+2];
private var newTriangles : int[] = new int[3*4*nbPoints];
var center : boolean = true;
function Start () {
}

function ValidateData () {

	if (PlayerPrefs.HasKey("cylinderRadius") && PlayerPrefs.HasKey("cylinderHeight") && PlayerPrefs.HasKey("cylindernbPoints")) {
		radius = PlayerPrefs.GetFloat("cylinderRadius");
		height = PlayerPrefs.GetFloat("cylinderHeight");
		nbPoints = PlayerPrefs.GetInt("cylindernbPoints");
		PlayerPrefs.DeleteAll();
	}

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
	(gameObject.Find("Forme").GetComponent("deformation_arrete") as MonoBehaviour).enabled = false;
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
 		newVertices[2*i+1] = q;
 		if (center) {
				newVertices[2*i] -= Vector3 (0, height/2,0);
				newVertices[2*i+1] -= Vector3 (0, height/2,0);
		}
 		uv[2*i] = Vector2(p.x, p.z);
 		uv[2*i+1] = Vector2(p.x, p.z);
	}
	newVertices[2*nbPoints] = Vector3(0,0,0);
	newVertices[2*nbPoints+1] = Vector3(0,height,0);
	if (center) {
				newVertices[2*nbPoints] -= Vector3 (0, height/2,0);
				newVertices[2*nbPoints+1] -= Vector3 (0, height/2,0);
	}
	
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
 	Cylinder.GetComponent(MeshCollider).sharedMesh = null;
 	Cylinder.GetComponent(MeshCollider).sharedMesh = newMesh;
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