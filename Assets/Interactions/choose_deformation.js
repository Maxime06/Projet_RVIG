#pragma strict

function Start () {

}

function Update () {
	//deformation
	if (Input.GetKeyDown(KeyCode.Alpha1)) {
		if(gameObject.Find("Forme").GetComponent("deformation_face") != null) {
			(gameObject.Find("Forme").GetComponent("deformation_face") as MonoBehaviour).enabled = false;
			Destroy(GameObject.Find("Forme").transform.Find("AllCubesHelp").gameObject);
			Destroy(GameObject.Find("Forme").transform.Find("AllCubes").gameObject);
		}
		if(gameObject.Find("Forme").GetComponent("deformation_arrete") != null) {
			(gameObject.Find("Forme").GetComponent("deformation_arrete") as MonoBehaviour).enabled = false;
			Destroy(GameObject.Find("Forme").transform.Find("AllCubesHelp").gameObject);
			Destroy(GameObject.Find("Forme").transform.Find("AllCubes").gameObject);
		}
		(gameObject.Find("Forme").GetComponent("deformation") as MonoBehaviour).enabled = true;
	}
	// deformation arrete
	if (Input.GetKey(KeyCode.Alpha2)) {
		if(gameObject.Find("Forme").GetComponent("deformation_face") != null) {
			(gameObject.Find("Forme").GetComponent("deformation_face") as MonoBehaviour).enabled = false;
			Destroy(GameObject.Find("Forme").transform.Find("AllCubesHelp").gameObject);
			Destroy(GameObject.Find("Forme").transform.Find("AllCubes").gameObject);
		}
		if(gameObject.Find("Forme").GetComponent("deformation") != null) {
			(gameObject.Find("Forme").GetComponent("deformation") as MonoBehaviour).enabled = false;
			Destroy(GameObject.Find("Forme").transform.Find("AllCubesHelp").gameObject);
			Destroy(GameObject.Find("Forme").transform.Find("AllCubes").gameObject);
		}
		(gameObject.Find("Forme").GetComponent("deformation_arrete") as MonoBehaviour).enabled = true;
	}
	// deformation face
	if (Input.GetKey(KeyCode.Alpha3)) {
		if(gameObject.Find("Forme").GetComponent("deformation_arrete") != null) {
			(gameObject.Find("Forme").GetComponent("deformation_arrete") as MonoBehaviour).enabled = false;
			Destroy(GameObject.Find("Forme").transform.Find("AllCubesHelp").gameObject);
			Destroy(GameObject.Find("Forme").transform.Find("AllCubes").gameObject);
		}
		if(gameObject.Find("Forme").GetComponent("deformation") != null) {
			(gameObject.Find("Forme").GetComponent("deformation") as MonoBehaviour).enabled = false;
			Destroy(GameObject.Find("Forme").transform.Find("AllCubesHelp").gameObject);
			Destroy(GameObject.Find("Forme").transform.Find("AllCubes").gameObject);
		}
		(gameObject.Find("Forme").GetComponent("deformation_face") as MonoBehaviour).enabled = true;
	}
}