#pragma strict

var scriptName : String = "";
var point1 : Vector3;
var point2 : Vector3;
var point3 : Vector3;

function OnGUI() {

	if ((GameObject.Find("Forme").GetComponent("deformation") as MonoBehaviour).enabled) {
		scriptName = "Déformation par sommet";
	}
	if ((GameObject.Find("Forme").GetComponent("deformation_arrete") as MonoBehaviour).enabled) {
		scriptName = "Déformation par arrete";
	}
	if ((GameObject.Find("Forme").GetComponent("deformation_face") as MonoBehaviour).enabled) {
		scriptName = "Déformation par face";
	}
			
	GUI.Box (Rect (10,Screen.height - 80,220,70), scriptName);
	
	if ((GameObject.Find("Forme").GetComponent("deformation") as MonoBehaviour).enabled) {
		point1 = GameObject.Find("Forme").GetComponentInChildren(deformation).newpoint;
		GUI.Label(Rect (20,Screen.height - 65,200,50), "Point 1 : ("+truncate(point1.x)+","+truncate(point1.y)+","+truncate(point1.z)+")");
	}
	if ((GameObject.Find("Forme").GetComponent("deformation_arrete") as MonoBehaviour).enabled) {
		point1 = GameObject.Find("Forme").GetComponentInChildren(deformation_arrete).newpoint1;
		point2 = GameObject.Find("Forme").GetComponentInChildren(deformation_arrete).newpoint2;
		GUI.Label(Rect (20,Screen.height - 65,200,50), "Point 1 : ("+truncate(point1.x)+","+truncate(point1.y)+","+truncate(point1.z)+")");
		GUI.Label(Rect (20,Screen.height - 50,200,50), "Point 2 : ("+truncate(point2.x)+","+truncate(point2.y)+","+truncate(point2.z)+")");
	}
	if ((GameObject.Find("Forme").GetComponent("deformation_face") as MonoBehaviour).enabled) {
		point1 = GameObject.Find("Forme").GetComponentInChildren(deformation_face).newpoint1;
		point2 = GameObject.Find("Forme").GetComponentInChildren(deformation_face).newpoint2;
		point3 = GameObject.Find("Forme").GetComponentInChildren(deformation_face).newpoint3;
		GUI.Label(Rect (20,Screen.height - 65,200,50), "Point 1 : ("+truncate(point1.x)+","+truncate(point1.y)+","+truncate(point1.z)+")");
		GUI.Label(Rect (20,Screen.height - 50,200,50), "Point 2 : ("+truncate(point2.x)+","+truncate(point2.y)+","+truncate(point2.z)+")");
		GUI.Label(Rect (20,Screen.height - 35,200,50), "Point 3 : ("+truncate(point3.x)+","+truncate(point3.y)+","+truncate(point3.z)+")");
	}
}
	
function truncate(f : float) : float {
	
	return (Mathf.Round(f * 1000) / 1000);
}