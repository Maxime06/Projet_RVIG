#pragma strict

var speed : float = 50.0;
var rotationSpeed : float = 50.0;
var target : Transform;
var minDistance = 5; //Min distance of the camera from the target
var maxDistance = 20;
var distance : float = 10.0;

function Start () {
	
}

function Update () {
	if (gameObject.Find("Forme")!=null) {
		target = gameObject.Find("Forme").transform;
	transform.LookAt(target);
	transform.RotateAround (target.position, target.up, Input.GetAxis("Horizontal") * rotationSpeed * Time.deltaTime);
	transform.RotateAround (target.position, transform.right, Input.GetAxis("Vertical") * rotationSpeed * Time.deltaTime);
	
	if (Input.GetKey(KeyCode.KeypadMinus)) {
		/*target.transform.Translate(Vector3.back * speed * Time.deltaTime);
		distance =  Vector3.Distance(target.transform.position, camera.transform.position);
		distance = Mathf.Clamp(distance, minDistance, maxDistance);
		if (distance != maxDistance) {*/
			transform.Translate(speed * Time.deltaTime * Vector3.back);
		//}
	}
	if (Input.GetKey(KeyCode.KeypadPlus)) {
		/*transform.Translate(Vector3.forward * speed * Time.deltaTime);
		distance =  Vector3.Distance(target.transform.position, camera.transform.position);
	    distance = Mathf.Clamp(distance, minDistance, maxDistance);*/
		/*target.transform.Translate(Vector3.forward * speed * Time.deltaTime);
		distance =  Vector3.Distance(target.transform.position, camera.transform.position);
		distance = Mathf.Clamp(distance, minDistance, maxDistance);
		if (distance != minDistance) {*/
			transform.Translate(speed * Time.deltaTime * Vector3.forward);
		//}
	}
	}
}