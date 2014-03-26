#pragma strict

var FormeFilter : MeshFilter;  
var meshTriangles : int[];
var meshVertices : Vector3[];
var ff : GameObject;
var lineRenderer : LineRenderer;
var line : GameObject;
var bool : boolean = false;
private var points : Vector3[] = new Vector3[3];
function Start () {
}

function Update () {
	if(Input.GetKey(KeyCode.F)) {
		bool = !bool;
	}
	if (bool) {
		//on récupère l'objet possédant le maillage
		FormeFilter = GameObject.Find("Forme").GetComponent(MeshFilter); 
		// on récupère les points qui composent le mesh
		meshTriangles = FormeFilter.mesh.triangles;
		// on récupère les 3 poins composant le triangle numéro triIndex.
		meshVertices = FormeFilter.mesh.vertices;
		if(GameObject.Find("Forme").transform.Find("ff") == null) {
			ff = new GameObject("ff");
			ff.transform.parent =  GameObject.Find("Forme").transform;
		}
		else {
			ff = GameObject.Find("Forme").transform.Find("ff").gameObject;
		}
		//GameObject.Find("Forme").transform.Find("ff").gameObject.SetActive(true);
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
		   		var name : String = "line"+i+j;
		   		if (GameObject.Find("Forme").transform.Find("ff").transform.Find(name) == null) {
		   			line = new GameObject(name);
		   			line.transform.parent = GameObject.Find("Forme").transform.Find("ff").transform;
		   		lineRenderer = line.AddComponent(LineRenderer);
				lineRenderer.material = new Material (Shader.Find("Particles/Additive"));
				lineRenderer.SetColors(Color.red, Color.red);
				lineRenderer.SetWidth(0.1,0.1);
				lineRenderer.SetVertexCount(2);
		   		}
		   		else {
		   			line = GameObject.Find("Forme").transform.Find("ff").transform.Find(name).gameObject;
		   		}
		   		
				lineRenderer.SetPosition(0, points[j]);
				lineRenderer.SetPosition(1, points[(j+1)%3]);
		   	}
		}
	}
	else {
//		GameObject.Find("Forme").transform.Find("ff").gameObject.SetActive(false);
		if (GameObject.Find("Forme").transform.Find("ff") != null) {
			Destroy(GameObject.Find("Forme").transform.Find("ff").gameObject);
		}
	}
}