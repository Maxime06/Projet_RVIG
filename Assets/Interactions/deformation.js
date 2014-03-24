#pragma strict
var collision : boolean = false;
var FormeFilter : MeshFilter;  
var meshTriangles : int[];
var meshVertices : Vector3[];
var min : float;
var closestpoint : Vector3 = new Vector3(0,0,0);
var index : int;

var ray : Ray;
var hitinfo : RaycastHit;
var hitPoint : Vector3;
var triIndex : int;
var p : Vector3[] = new Vector3[3];
var newpoint : Vector3 = new Vector3(0,0,0);
var cube1 : GameObject;
var cube2 : GameObject;
var cube3 : GameObject;
var AllCubes : GameObject;
function Start () {
	//on récupère l'objet possédant le maillage
	FormeFilter = gameObject.Find("Forme").GetComponent(MeshFilter); 
	// on récupère les points qui composent le mesh
	meshTriangles = FormeFilter.mesh.triangles;
	// on récupère les 3 poins composant le triangle numéro triIndex.
	meshVertices = FormeFilter.mesh.vertices;
	
	if (transform.Find("AllCubes") == null) {
		AllCubes = GameObject("AllCubes");
	}
	else {
		AllCubes = GameObject.Find("Forme").transform.Find("AllCubes").gameObject;
	}
	AllCubes.transform.parent = FormeFilter.transform;
	//on créé les cubes
	CreateAllCubes();
	SetCubes(false, AllCubes);
	
}

function Update () {
	//(GameObject.Find("Forme").GetComponent(MeshCollider) as MonoBehaviour).enabled = true;
	if (GameObject.Find("Forme").transform.Find("AllCubes").GetComponent(LineRenderer) != null) {
		GameObject.Find("Forme").transform.Find("AllCubes").GetComponent(LineRenderer).enabled = false;
	}
	if (GameObject.Find("Forme").transform.Find("AllCubesHelp").GetComponent(LineRenderer) != null) {
		GameObject.Find("Forme").transform.Find("AllCubesHelp").GetComponent(LineRenderer).enabled = false;
	}
	CheckTriangle();
	if (collision) {
		UpdateMesh();
	}
	// on active le cube gris quand on lache le clique
	if(Input.GetMouseButtonUp(0)) {
		GameObject.Find("Forme").transform.Find("AllCubesHelp").gameObject.SetActive(true);
		GameObject.Find("Forme").transform.Find("AllCubes").gameObject.SetActive(false);
	}
	
}

function CheckTriangle () {
	// clique gauche
	if (Input.GetMouseButtonDown(0) && !Input.GetKey(KeyCode.RightControl)) {
		// on créé un rayon 
		ray = gameObject.Find("Main Camera").camera.ScreenPointToRay (Input.mousePosition);
		
		var distance : float = Mathf.Infinity; 
		// si le rayon frappe un objet
		if (Physics.Raycast(ray, hitinfo, distance)){
			// get the hit point
			hitPoint = hitinfo.point;
			triIndex = hitinfo.triangleIndex;
			print(triIndex);
			// on désactive le cube gris quand on clique
			GameObject.Find("Forme").transform.Find("AllCubesHelp").gameObject.SetActive(false);
			collision = true;
		}
		else {
			//Debug.Log("no collision");
			collision = false;
		}
	}
	if (Input.GetMouseButton(0)) Debug.DrawRay (ray.origin, ray.direction*100, Color.yellow);
}

function UpdateMesh () {
if (Input.GetMouseButton(0) && !Input.GetKey(KeyCode.RightControl)) {
	// tableau des trois points du triangle heurté.
	p = [meshVertices[meshTriangles[3*triIndex]],
		 meshVertices[meshTriangles[3*triIndex+1]],
		 meshVertices[meshTriangles[3*triIndex+2]]
		];
		
	//on calcule le point le plus proche et on le met dans closestpoint 
	min = Vector3.Distance(p[0], hitPoint);
	for (var i : int = 0; i < 3; i++) {
		var point : Vector3 = p[i];
		var d : float = Vector3.Distance(point, hitPoint);
			if (d <= min) { 
				min = d;
				closestpoint = point;
				index = meshTriangles[3*triIndex + i];
			}
	}
	// on modifie le point closestpoint dans le mesh
	newpoint = closestpoint;
	var cam = gameObject.Find("Main Camera").camera;
	// troisième paramètre : distance de la caméra 
	// donc il faut placer le z par rapport à la caméra.
	newpoint = cam.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, Vector3.Dot((hitPoint-cam.transform.position),cam.transform.forward )));
	//newpoint.z += Input.GetAxis("Mouse ScrollWheel");
	cube1.transform.position = newpoint;
	SetCubes(true, AllCubes);
	SetCubes(true, cube1);
	SetCubes(false, cube2);
	SetCubes(false, cube3);
	var oldMesh : Mesh = gameObject.Find("Forme").GetComponent(MeshFilter).mesh;
	var meshVertices : Vector3[] = oldMesh.vertices;
	meshVertices[index] = newpoint;
	meshVertices[index+(meshVertices.Length/2)] = newpoint;
	oldMesh.vertices = meshVertices;
	oldMesh.RecalculateNormals();                               
    oldMesh.RecalculateBounds();
    oldMesh.Optimize();
     gameObject.Find("Forme").GetComponent(MeshCollider).sharedMesh = null;
   gameObject.Find("Forme").GetComponent(MeshCollider).sharedMesh = oldMesh; 
	//(gameObject.Find("Forme").GetComponent(MeshCollider) as MonoBehaviour).enabled = false;
	}
}

function SetCubes (b : boolean, cube : GameObject) {
	cube.SetActive(b);
}

function CreateCube (cubename : String) : GameObject {
	var cube : GameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
	cube.name = cubename;
	cube.transform.parent = AllCubes.transform;
	cube.renderer.material.color = Color.red;
	cube.transform.localScale = Vector3(0.1,0.1,0.1);
	return cube;
}

function CreateAllCubes () {
	if (GameObject.Find("Forme").transform.Find("AllCubes").transform.Find("Cube1") == null) {
		cube1 = CreateCube("Cube1");
	}
	else {
		cube1 = GameObject.Find("Forme").transform.Find("AllCubes").transform.Find("Cube1").gameObject;
	}
	if (GameObject.Find("Forme").transform.Find("AllCubes").transform.Find("Cube2") == null) {
		cube2 = CreateCube("Cube2");
	}
	else {
		cube2 = GameObject.Find("Forme").transform.Find("AllCubes").transform.Find("Cube2").gameObject;
	}
	if (GameObject.Find("Forme").transform.Find("AllCubes").transform.Find("Cube3") == null) {
		cube3 = CreateCube("Cube3");
	}
	else {
		cube3 = GameObject.Find("Forme").transform.Find("AllCubes").transform.Find("Cube3").gameObject;
	}
}