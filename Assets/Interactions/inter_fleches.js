

var speed : float = 20.0;
var ray : Ray;
var hitinfo : RaycastHit;
var hitPoint : Vector3;
var triIndex : int;
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
	
	
	
	// rotation verticale haut
	if (Input.GetKey(KeyCode.UpArrow)) {	
		transform.RotateAround(Vector3.zero,Vector3.right,speed*Time.deltaTime);
	}
	// rotation verticale bas
	if (Input.GetKey(KeyCode.DownArrow)) {
		transform.RotateAround(Vector3.zero,Vector3.right,-speed*Time.deltaTime);
	}
	// rotation horizontale gauche
	if (Input.GetKey(KeyCode.LeftArrow)) {
		transform.RotateAround(Vector3.zero,Vector3.up,speed*Time.deltaTime);
	}
	// rotation verticale bas
	if (Input.GetKey(KeyCode.RightArrow)) {
		transform.RotateAround(Vector3.zero,Vector3.up,-speed*Time.deltaTime);
	}
}