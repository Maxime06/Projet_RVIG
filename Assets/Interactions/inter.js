#pragma strict

var speed : float = 100.0;
var rotationSpeed : float = 100.0;
var distance : float = 10.0;
var target : Transform;
var camera : Transform;

function Start () {
	
}

function Update () {
	target = gameObject.Find("Forme").transform;
	transform.LookAt(target);
	transform.RotateAround (target.position, target.up, Input.GetAxis("Horizontal") * rotationSpeed * Time.deltaTime);
	transform.RotateAround (target.position, transform.right, Input.GetAxis("Vertical") * rotationSpeed * Time.deltaTime);
	if (Input.GetKey(KeyCode.KeypadMinus))
		transform.Translate(Vector3.back * speed * Time.deltaTime);
	if (Input.GetKey(KeyCode.KeypadPlus))
		transform.Translate(Vector3.forward * speed * Time.deltaTime);
}