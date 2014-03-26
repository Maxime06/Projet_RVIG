#pragma strict

var speed : float = 50.0;
var rotationSpeed : float = 50.0;
var target : Transform;
var minDistance : float = 5; //Min distance of the camera from the target
var maxDistance : float = 20;
var distance : float = 10.0;
var ray : Ray;
var hitinfo : RaycastHit;
var hitPoint : Vector3;
var triIndex : int;
var p : Vector3[] = new Vector3[3];
var closestpoint : Vector3 = new Vector3(0,0,0);
var primitive : GameObject;
var bool : boolean = false;
var locked : boolean = false;
function Start () {
	
}

function Update () {
	if (gameObject.Find("Forme")!=null) {
		// clique gauche + alt gauche
		if (Input.GetKeyDown(KeyCode.Z)) {
			if(bool) {
				locked = false;
			}
			bool = !bool;
		}
		// on créé un rayon 
		ray = gameObject.Find("Main Camera").camera.ScreenPointToRay (Input.mousePosition);
		var meshVertices : Vector3[] = gameObject.Find("Forme").GetComponent(MeshFilter).mesh.vertices;
		var meshTriangles : int[] = gameObject.Find("Forme").GetComponent(MeshFilter).mesh.triangles;
		var distance : float = Mathf.Infinity; 
		// si z activé
		if (bool) {
			//si pas de cible lockée
			if (!locked) {
				// si ray frappe objet
				if (Physics.Raycast(ray, hitinfo, distance)){
					hitPoint = hitinfo.point;
					triIndex = hitinfo.triangleIndex;
					if (Input.GetMouseButton(0)) Debug.DrawRay (ray.origin, ray.direction*100, Color.green);
					// tableau des trois points du triangle heurté.
					p = [meshVertices[meshTriangles[3*triIndex]],
						 meshVertices[meshTriangles[3*triIndex+1]],
						 meshVertices[meshTriangles[3*triIndex+2]]
						];
					//on calcule le point le plus proche et on le met dans closestpoint 
					var min : float = Vector3.Distance(p[0], hitPoint);
					for (var i : int = 0; i < 3; i++) {
						var point : Vector3 = p[i];
						var d : float = Vector3.Distance(point, hitPoint);
							if (d <= min) { 
								min = d;
								closestpoint = point;
							}
					}
					// on attribut à primitive le closestpoint
					if (GameObject.Find("Primitive") == null) {
						primitive = new GameObject("Primitive");
					}
					else {
						primitive = GameObject.Find("Primitive");
					}
					primitive.transform.position = closestpoint;
					target = primitive.transform;
					locked = true;
				} //fin ray
			} // fin locked
		} //fin z activé
		else {
			target = gameObject.Find("Forme").transform;
		}
		transform.LookAt(target);
		transform.RotateAround (target.position, target.up, Input.GetAxis("Horizontal") * rotationSpeed * Time.deltaTime);
		transform.RotateAround (target.position, transform.right, Input.GetAxis("Vertical") * rotationSpeed * Time.deltaTime);
		
			/*if (Application.platform == RuntimePlatform.OSXPlayer) {
			
				if (Input.GetKey(KeyCode.P)) {
					transform.Translate(speed * Time.deltaTime * Vector3.back);
				}
				if (Input.GetKey(KeyCode.M)) {
					transform.Translate(speed * Time.deltaTime * Vector3.forward);
				}
			}
			else {*/
				
			if (Input.GetKey(KeyCode.M)) {
				var test : Transform = camera.transform;
				test.Translate(Vector3.back * speed * Time.deltaTime);
				//print(test.position);
				distance =  Vector3.Distance(test.transform.position, target.transform.position);
				print(distance);
				if (distance < maxDistance) {
					transform.Translate(speed * Time.deltaTime * Vector3.back);
				}
			}
			if (Input.GetKey(KeyCode.P)) {
				var test2 : Transform = camera.transform;
				test2.transform.Translate(Vector3.forward * speed * Time.deltaTime);
				//print(test2.position);
				distance =  Vector3.Distance(test2.transform.position, target.transform.position);
			    print(distance);
				if (distance > minDistance) {
					transform.Translate(speed * Time.deltaTime * Vector3.forward);
				}
			}
		//}
	}// fin du gameobject null
}