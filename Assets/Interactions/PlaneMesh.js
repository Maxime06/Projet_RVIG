#pragma strict

var Plan : GameObject;
var center : boolean = true;
var size : Vector2 = new Vector2 (10, 10);
var resolutionX : int = 10;
var resolutionZ : int = 10;
private var newVertices : Vector3[] = new Vector3[(resolutionX + 1) * (resolutionZ + 1)];
private var newTriangles : int[] = new int[resolutionX * resolutionZ * 6];

function Start () {

}

function ValidateData () {
    // create Plane if don't exists
	if(gameObject.Find("Forme") == null) {
		Plan = new GameObject ("Forme");
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
	var uv : Vector2[] = new Vector2[newVertices.Length];

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
			uv[i] = Vector2 ((x*1.0) / resolutionX, (z*1.0) / resolutionZ);
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
	newMesh.uv = uv;
	newMesh.triangles = newTriangles;
	newMesh.RecalculateNormals();                               	//recalculate normals, bounds and optimize
    newMesh.RecalculateBounds();
    newMesh.Optimize(); 
    
    (Plan.GetComponent(MeshFilter) as MeshFilter).mesh = newMesh;  	//assign the created mesh as the used mesh 
    Plan.GetComponent(MeshCollider).sharedMesh = newMesh; 
}

// called when the script is loaded or a value is changed in the inspector
function OnValidate () {
	if (gameObject.Find("Forme") != null && gameObject.Find("Forme").GetComponent("deformation") == null) {
		gameObject.Find("Forme").AddComponent("deformation");
	}
	UpdateMesh ();
}

function OnApplicationQuit () {
	Destroy(gameObject.Find("Forme"));
}