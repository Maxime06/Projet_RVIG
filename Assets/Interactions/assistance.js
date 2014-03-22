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
var cube : GameObject;

function Start () {
	//on récupère l'objet possédant le maillage
	FormeFilter = gameObject.Find("Forme").GetComponent(MeshFilter); 
	// on récupère les points qui composent le mesh
	meshTriangles = FormeFilter.mesh.triangles;
	// on récupère les 3 poins composant le triangle numéro triIndex.
	meshVertices = FormeFilter.mesh.vertices;
	//on créé un cube
	if (transform.Find("CubeHelp")==null) {
		cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
		cube.name = "CubeHelp";
		cube.transform.parent = FormeFilter.transform;
		cube.renderer.material.color = Color.red;
		cube.transform.localScale = Vector3(0.1,0.1,0.1);
	}
	SetCube(false);
}

function Update () {

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
	 Debug.DrawRay (ray.origin, ray.direction*100, Color.yellow);

	//dans le cas d'une déformation d'un sommet
	if ((GameObject.Find("Forme").GetComponent("deformation") as MonoBehaviour).enabled) {// tableau des trois points du triangle heurté.
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
		cube.transform.position = closestpoint;
		SetCube(true);
	}
	
	//dans le cas d'une déformation d'une arrete
	if ((GameObject.Find("Forme").GetComponent("deformation_arrete") as MonoBehaviour).enabled) {
	}
	
	//dans le cas d'une déformation d'une face
	if ((GameObject.Find("Forme").GetComponent("deformation_face") as MonoBehaviour).enabled) {
	}
}


function SetCube (b : boolean) {
	cube.SetActive(b);
}