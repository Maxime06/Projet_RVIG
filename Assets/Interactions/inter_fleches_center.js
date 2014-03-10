#pragma strict

var speed : float = 20.0;
function Start () {

}

function Update () {
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