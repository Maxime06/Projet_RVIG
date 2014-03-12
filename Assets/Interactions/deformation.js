#pragma strict
/*
var plan : PlaneMesh;
var meshTriangles : int[];  
var min : float = 10000;
var closestpoint : Vector3 = new Vector3(0,0,0);
var index : int;

var ray : Ray;
var hitinfo : RaycastHit;
var hitPoint : Vector3;
var triIndex : int;
var p : Vector3[] = new Vector3[3];

function Start () {

}

function Update () {
// clique gauche
	if (Input.GetMouseButton(0)) {
		// on créé un rayon 
		ray = gameObject.Find("Main Camera").camera.ScreenPointToRay (Input.mousePosition);
		Debug.DrawRay (ray.origin, ray.direction * 10, Color.yellow);
		var distance : float = Mathf.Infinity; 
		// si le rayon frappe un objet
		if (Physics.Raycast(ray, hitinfo, distance)){
			// get the hit point
			hitPoint = hitinfo.point;
			triIndex = hitinfo.triangleIndex;
		    print(hitPoint);
		    print(triIndex);
		}
		else {
			Debug.Log("no collision");
		}
	}
// on séléctionne le point du maillage le plus proche  
	//on récupère l'objet possédant le maillage
	plan = gameObject.GetComponent("PlaneMesh") as PlaneMesh; 
	// on récupère les points qui composent le mesh
	// meshpoints est un tableau contenant les indices des triangles.
	meshTriangles = plan.mesh.triangles;
	// on récupère les 3 poins composant le triangle numéro triIndex.
	var meshVertices : Vector3[] = plan.mesh.vertices;
	p = [meshVertices[meshTriangles[3*triIndex]],
		 meshVertices[meshTriangles[3*triIndex+1]],
		 meshVertices[meshTriangles[3*triIndex+2]]
		];
	//on calcule le point le plus proche et on le met dans closestpoint 
	for (var i : int = 0; i < 3; i++) {
		var point : Vector3 = p[i];
		var d : float = Vector3.Distance(point, hitPoint);
			if (d <= min) { 
				min = d;
				closestpoint = point;
				//attention
				index = triIndex + i;
			}
	}
	// on récupère la position de la souris en hauteur
	// on modifie le point closestpoint dans le mesh
	var mesh2 : Mesh = plan.mesh;
	var newpoint : Vector3 = closestpoint;
	newpoint.y = Input.mousePosition.y;
	mesh2.vertices[index] = newpoint;
	plan.mesh = mesh2;
	plan.mesh.RecalculateBounds();	
}*/