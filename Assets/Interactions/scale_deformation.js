#pragma strict
var speed : float = 0.01;
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
var bool :boolean = false;
var mousepos : Vector2 = new Vector2(1,1);
var size : Vector2;
var sizex_default : float;
var sizey_default : float;
var oldMesh : Mesh;
function Start () {
	size = GetComponentInChildren(meshPlane).size;
	oldMesh = GameObject.Find("Forme").GetComponent(MeshFilter).mesh;
	sizex_default = size.x;
	sizey_default = size.y;
}

function Update () {
	
	if ((Input.GetKey(KeyCode.RightControl) || Input.GetKey(KeyCode.LeftControl)) && Input.GetMouseButton(0)) {
		if (!bool) {
			print("coucou");
			mousepos = Input.mousePosition;
			bool = true;
		}
		else {
			var mouse : Vector2 = new Vector2(mousepos.x - Input.mousePosition.x, mousepos.y - Input.mousePosition.y);
			size.x = sizex_default + mouse.x*speed;
			size.y = sizey_default + mouse.y*speed;
		}
		GetComponentInChildren(meshPlane).size = size;
		// on créé le nouveau mesh à la bonne taille
		GetComponentInChildren(meshPlane).UpdateMesh();
		// on modifie la position des sommets de l'ancien (qui contient les précéentes déformations)
		var meshVertices : Vector3[] = oldMesh.vertices;
		for (var i : int = 0; i < meshVertices.Length; i++) {
			meshVertices[i].x = meshVertices[i].x*size.x;
			meshVertices[i].y = meshVertices[i].y*size.y;
		}
		oldMesh.vertices = meshVertices;
			
	}
	if(Input.GetKeyUp(KeyCode.RightControl) || Input.GetKeyUp(KeyCode.LeftControl)) {
		mousepos = Vector2(0,0);
	}
	
}/*
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
}*/
