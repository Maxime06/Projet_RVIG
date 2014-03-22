#pragma strict

function Start () {

}

function Update () {
	//deformation
	if (Input.GetKey(KeyCode.Alpha1)) {
		if(gameObject.Find("Forme").GetComponent("deformation_face") != null) {
			Destroy(gameObject.Find("Forme").GetComponent("deformation_face"));
			Destroy(transform.Find("AllCubes"));
		}
		if(gameObject.Find("Forme").GetComponent("deformation_arrete") != null) {
			Destroy(gameObject.Find("Forme").GetComponent("deformation_arrete"));
			Destroy(transform.Find("AllCubes"));
		}
		gameObject.Find("Forme").AddComponent("deformation");
	}
	// deformation arrete
	if (Input.GetKey(KeyCode.Alpha2)) {
		if(gameObject.Find("Forme").GetComponent("deformation_face") != null) {
			Destroy(gameObject.Find("Forme").GetComponent("deformation_face"));
			Destroy(transform.Find("AllCubes"));
		}
		if(gameObject.Find("Forme").GetComponent("deformation") != null) {
			Destroy(gameObject.Find("Forme").GetComponent("deformation"));
			Destroy(transform.Find("AllCubes"));
		}
		gameObject.Find("Forme").AddComponent("deformation_arrete");
	}
	// deformation face
	if (Input.GetKey(KeyCode.Alpha3)) {
		if(gameObject.Find("Forme").GetComponent("deformation_arrete") != null) {
			Destroy(gameObject.Find("Forme").GetComponent("deformation_arrete"));
			Destroy(transform.Find("AllCubes"));
		}
		if(gameObject.Find("Forme").GetComponent("deformation") != null) {
			Destroy(gameObject.Find("Forme").GetComponent("deformation"));
			Destroy(transform.Find("AllCubes"));
		}
		gameObject.Find("Forme").AddComponent("deformation_face");
	}
}