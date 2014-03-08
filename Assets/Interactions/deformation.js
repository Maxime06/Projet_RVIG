#pragma strict

var plan : PlaneMesh;
var meshPoints : Vector3[];  
var min : float = 10000;
var closestpoint : Vector3 = new Vector3(0,0,0);
var index : int;

function Start () {

}

function Update () {
	if (Input.GetMouseButton(0)) {
		// conversion point 2D de la souris en point 3D
		var mousePos = Input.mousePosition;
		mousePos.z = 1; // select distance = 1 units from the camera
		
		// ????????????????????????????????
		var pos = Vector3(0,0,0); 
		// ????????????????????????????????
		
		//Debug.Log(camera.ScreenToWorldPoint(mousePos));
		
		// on séléctionne le point ud maillage le plus proche  
		//on récupère l'objet possédant le maillage
		plan = gameObject.GetComponent("PlaneMesh") as PlaneMesh;
		print(plan.mesh.vertices); 
		// on récupère les points qui composent le mesh
		meshPoints = plan.mesh.vertices;
		// on cherche le point du mesh le plus proche du point cliqué
		var length = meshPoints.Length;
		for ( var i = 0; i < length; i++) {
			var point : Vector3 = meshPoints[i];
			var d : float = Vector3.Distance(pos, point);
			if (d <= min) { 
				min = d;
				closestpoint = point;
				index = i;
			}
		}
		// à chaque frame, on met à jour la position du point du maillage
		// il faut mettre à jour l'attribut mesh dans la classe PlaneMesh aussi je pense
		plan.mesh.vertices[index] = closestpoint;
		
	}
}