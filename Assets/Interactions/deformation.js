#pragma strict

var plan : PlaneMesh;
var meshPoints : int[];  
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
			Debug.Log("coucou");
		}
	}
	
	// on séléctionne le point ud maillage le plus proche  
	//on récupère l'objet possédant le maillage
	plan = gameObject.GetComponent("PlaneMesh") as PlaneMesh;
	print(plan.mesh.triangles); 
	// on récupère les points qui composent le mesh
	// meshpoints est un tableau contenant les indices des triangles.
	meshPoints = plan.mesh.triangles;
	// on récupère les 3 poins composant le triangle numéro triIndex.
	var meshVertices : Vector3[] = plan.mesh.vertices;
	p = [meshVertices[meshPoints[3*triIndex]],
		 meshVertices[meshPoints[3*triIndex+1]],
		 meshVertices[meshPoints[3*triIndex+2]]
		];
		var i : int;	//on calcule le point le plus proche et on le met dans closestpoint 
	for (i = 0; i < 3; int++) {
		var point : Vector3 = p[i];
		var d : float = Vector3.Distance(point, hitPoint);
			if (d <= min) { 
				min = d;
				closestpoint = point;
				//attention
				index = i;
			}
	}
	// on récupère la position de la souris en hauteur
	// on modifie le point closestpoint dans le mesh
	//plan.mesh.vertices[index] = closestpoint;
}