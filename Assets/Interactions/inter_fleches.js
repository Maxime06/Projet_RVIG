#pragma strict

var speed : float = 20.0;
var ray : Ray;
var hitinfo : RaycastHit;
function Start () {

}

function Update () {
// clique gauche
if (Input.GetMouseButton(0)) {
// on créé un rayon 
	ray = camera.ScreenPointToRay (Input.mousePosition);
	Debug.DrawRay (ray.origin, ray.direction * 10, Color.yellow);
}
 var distance : float = 0; 
  // si le rayon frappe un objet
  if (Physics.Raycast(ray, hitinfo, distance)){
    // get the hit point:
    print(ray.GetPoint(distance));
    print(hitinfo.collider);
  }
// rotation verticale haut
if (Input.GetKey(KeyCode.UpArrow)) {
	
	// point de rotation
	// axe de roation
	// angle
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