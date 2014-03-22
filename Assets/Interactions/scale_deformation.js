#pragma strict

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
var AllCubes : GameObject;
var cube : GameObject;
function Start () {
}

function Update () {
	if ((Input.GetKey(KeyCode.RightControl) || Input.GetKey(KeyCode.LeftControl)) && Input.GetMouseButton(0)) {
		var Plan = GameObject.Find("Main Camera").GetComponent("meshPlane");
		print(Vector2(Input.GetAxis("Mouse X"), Input.GetAxis("Mouse Y")).x);
		print(Vector2(Input.GetAxis("Mouse X"), Input.GetAxis("Mouse Y")).y);
	}
	//CheckTriangle();
//	UpdateMesh();
	
}

function CheckTriangle () {
	// clique gauche
	if (Input.GetMouseButtonDown(0)) {
		// on créé un rayon 
		ray = gameObject.Find("Main Camera").camera.ScreenPointToRay (Input.mousePosition);
		
		var distance : float = Mathf.Infinity; 
		// si le rayon frappe un objet
		if (Physics.Raycast(ray, hitinfo, distance)){
			// get the hit point
			hitPoint = hitinfo.point;
			triIndex = hitinfo.triangleIndex;
		}
		else {
			Debug.Log("no collision");
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
	newpoint = cam.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, (hitPoint.z- cam.transform.position.z)));
	cube.transform.position = newpoint;
	SetCube(true);
	var oldMesh : Mesh = gameObject.Find("Forme").GetComponent(MeshFilter).mesh;
	var meshVertices : Vector3[] = oldMesh.vertices;
	meshVertices[index] = newpoint;
	meshVertices[index+(meshVertices.Length/2)] = newpoint;
	oldMesh.vertices = meshVertices;
	oldMesh.RecalculateNormals();                               
    oldMesh.RecalculateBounds();
    oldMesh.Optimize();
    gameObject.Find("Forme").GetComponent(MeshCollider).sharedMesh = oldMesh; 
	}
}

function SetCube (b : boolean) {
	cube.SetActive(b);
}