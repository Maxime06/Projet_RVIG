#pragma strict

var speed : float = 20.0;
function Start () {

}

function Update () {

// rotation verticale haut
if (Input.GetKey(KeyCode.UpArrow)) {
	transform.Rotate(speed*Time.deltaTime,0,0);
}
// rotation verticale bas
if (Input.GetKey(KeyCode.DownArrow)) {
	transform.Rotate(-speed*Time.deltaTime,0,0);
}

// rotation horizontale gauche
if (Input.GetKey(KeyCode.LeftArrow)) {
	transform.Rotate(0,speed*Time.deltaTime,0);
}

// rotation verticale bas
if (Input.GetKey(KeyCode.RightArrow)) {
	transform.Rotate(0,-speed*Time.deltaTime,0);
}
}