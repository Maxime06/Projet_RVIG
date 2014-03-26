#pragma strict

var FormeFilter : MeshFilter;  
var meshTriangles : int[];
var meshVertices : Vector3[];
private var points : Vector3[] = new Vector3[3];
class fil_de_fer extends Editor {
function Start () {

}

function Update () {
	if(Input.GetKey(KeyCode.F)) {
		//on récupère l'objet possédant le maillage
		FormeFilter = GameObject.Find("Forme").GetComponent(MeshFilter); 
		// on récupère les points qui composent le mesh
		meshTriangles = FormeFilter.mesh.triangles;
		// on récupère les 3 poins composant le triangle numéro triIndex.
		meshVertices = FormeFilter.mesh.vertices;
		
		OnSceneGUI();
	}
}

function OnSceneGUI () {
	for(var i : int = 0; i < (meshTriangles.Length/3); i++) {
		var indexPoint1 : int = meshTriangles[3*i];
		var indexPoint2 : int = meshTriangles[3*i+1];
		var indexPoint3 : int = meshTriangles[3*i+2];
		var Point1 : Vector3 = meshVertices[indexPoint1];
		var Point2 : Vector3 = meshVertices[indexPoint2];
		var Point3 : Vector3 = meshVertices[indexPoint3];
		points[0] = Point1;
		points[1] = Point2;
		points[2] = Point3;
	   	for (var j : int = 0; j < 3; j++) {
	   		Handles.DrawLine(points[j], points[j%3]);
	   	}
	}
}
}