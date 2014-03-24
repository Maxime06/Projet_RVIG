#pragma strict
var collision : boolean = false;
var FormeFilter : MeshFilter;  
var meshTriangles : int[];
var meshVertices : Vector3[];
var min : float;
var max : float;
var closestpoint1 : Vector3 = new Vector3(0,0,0);
var closestpoint2 : Vector3 = new Vector3(0,0,0);
var farestpoint : Vector3 = new Vector3(0,0,0);
var index : int[] = new int[3];
var ray : Ray;
var hitinfo : RaycastHit;
var hitPoint : Vector3;
var triIndex : int;
var p : Vector3[] = new Vector3[3];
var newpoint1 : Vector3 = new Vector3(0,0,0);
var newpoint2 : Vector3 = new Vector3(0,0,0);
var newpoint3 : Vector3 = new Vector3(0,0,0);
var cube1 : GameObject;
var cube2 : GameObject;
var cube3 : GameObject;
var AllCubes : GameObject;
//var colors : Color[];
var profondeur : float = 2.5;
var decalage : float = 0;

function Start () {
	//on récupère l'objet possédant le maillage
	FormeFilter = gameObject.Find("Forme").GetComponent(MeshFilter); 
	// on récupère les points qui composent le mesh
	meshTriangles = FormeFilter.mesh.triangles;
	// on récupère les 3 poins composant le triangle numéro triIndex.
	meshVertices = FormeFilter.mesh.vertices;
	
	if (transform.Find("AllCubes") == null) {
		AllCubes = new GameObject("AllCubes");
	}
	else {
		AllCubes = GameObject.Find("Forme").transform.Find("AllCubes").gameObject;
	}
	AllCubes.transform.parent = FormeFilter.transform;
	//on créé les cubes
	CreateAllCubes();
	//on désactive tous les cubes
	SetCubes(false, cube1);
	SetCubes(false, cube2);
	SetCubes(false, cube3);
	//colors = new Color[meshVertices.Length];
	/*while (var c : int = 0 < meshVertices.Length) {
		colors[c] = Color.red;
	}*/
}

function Update () {
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
	// on active les cubes gris et la ligne grise quand on lache le clique
	if(Input.GetMouseButtonUp(0)) {
		GameObject.Find("Forme").transform.Find("AllCubesHelp").gameObject.SetActive(true);
		GameObject.Find("Forme").transform.Find("AllCubes").gameObject.SetActive(false);
		decalage = 0;
	}
	
}

function CheckTriangle () {
	// clique gauche
	if (Input.GetMouseButtonDown(0) && !Input.GetKey(KeyCode.LeftControl)) {
		// on créé un rayon 
		ray = gameObject.Find("Main Camera").camera.ScreenPointToRay (Input.mousePosition);
		
		var distance : float = Mathf.Infinity; 
		// si le rayon frappe un objet
		if (Physics.Raycast(ray, hitinfo, distance)){
			// get the hit point
			hitPoint = hitinfo.point;
			triIndex = hitinfo.triangleIndex;
			// on désactive les cubes gris quand on clique
			GameObject.Find("Forme").transform.Find("AllCubesHelp").gameObject.SetActive(false);
			collision = true;
		}
		else {
			Debug.Log("no collision");
			collision = false;
		}
	}
	if (Input.GetMouseButton(0)) Debug.DrawRay (ray.origin, ray.direction*100, Color.yellow);
}

function UpdateMesh () {
	if (Input.GetMouseButton(0)) {
		// tableau des trois points du triangle heurté.
		p = [meshVertices[meshTriangles[3*triIndex]],
			 meshVertices[meshTriangles[3*triIndex+1]],
			 meshVertices[meshTriangles[3*triIndex+2]]
			];
			
		//on calcule le point le plus proche et on le met dans closestpoint 
		for (var i : int = 0; i < 3; i++) {
				index[i] =  meshTriangles[3*triIndex + i];
		}
		// on modifie le point closestpoint dans le mesh
		newpoint1 = p[0];
		newpoint2 = p[1];
		newpoint3 = p[2];
		var cam = gameObject.Find("Main Camera").camera;
		// troisième paramètre : distance de la caméra 
		// donc il faut placer le z par rapport à la caméra.
		var distx12 : float = (newpoint2 - newpoint1).x; 
		var disty12 : float = (newpoint2 - newpoint1).y;
		var distz12 : float = (newpoint2 - newpoint1).z;
		var distx13 : float = (newpoint3 - newpoint1).x; 
		var disty13 : float = (newpoint3 - newpoint1).y; 
		var distz13 : float = (newpoint3 - newpoint1).z;
		newpoint1 = cam.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, decalage + Vector3.Dot((hitPoint-cam.transform.position),cam.transform.forward )));
		newpoint2 = new Vector3(newpoint1.x+distx12, newpoint1.y+disty12, newpoint1.z+distz12);
		newpoint3 = new Vector3(newpoint1.x+distx13, newpoint1.y+disty13, newpoint1.z+distz13);
		var scroll : float = Input.GetAxis("Mouse ScrollWheel");
		decalage = decalage + scroll * profondeur;
		newpoint1.z += scroll * profondeur;
		newpoint2.z += scroll * profondeur;
		newpoint3.z += scroll * profondeur;
		cube1.transform.position = newpoint1;
		cube2.transform.position = newpoint2;
		cube3.transform.position = newpoint3;
		SetCubes(true, AllCubes);
		SetCubes(true, cube1);
		SetCubes(true, cube2);
		SetCubes(true, cube3);
		/*colors[triIndex] = Color.red;
		colors[triIndex+1] = Color.red;
		colors[triIndex+2] = Color.red;*/
		
		//update mesh
		var oldMesh : Mesh = gameObject.Find("Forme").GetComponent(MeshFilter).mesh;
		var meshVertices : Vector3[] = oldMesh.vertices;
		meshVertices[index[0]] = newpoint1;
		meshVertices[index[1]] = newpoint2;
		meshVertices[index[2]] = newpoint3;
		meshVertices[index[0]+(meshVertices.Length/2)] = newpoint1;
		meshVertices[index[1]+(meshVertices.Length/2)] = newpoint2;
		meshVertices[index[2]+(meshVertices.Length/2)] = newpoint3;
		oldMesh.vertices = meshVertices;
		//oldMesh.colors = colors;
		oldMesh.RecalculateNormals();                               
		oldMesh.RecalculateBounds();
		oldMesh.Optimize();
		gameObject.Find("Forme").GetComponent(MeshCollider).sharedMesh = oldMesh; 
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