#pragma strict

var FormeFilter : MeshFilter;  
var ff : GameObject;
var lineRenderer : LineRenderer;
var line : GameObject;
var bool : boolean = false;

private var meshTriangles : int[];
private var meshVertices : Vector3[];
private var points : Vector3[] = new Vector3[3];
// un vector de points 3D toutes les 2 cases on a une arrete
private var coord_points : Vector3[];

function Start () {
	if(GameObject.Find("Main Camera").GetComponent(meshPlane) != null) {
		var resolutionX : int = GameObject.Find("Main Camera").GetComponentInChildren(meshPlane).resolutionX;
		var resolutionZ : int = GameObject.Find("Main Camera").GetComponentInChildren(meshPlane).resolutionZ;
		var nbAretesVert : int = resolutionZ*(resolutionX+1);
		var nbAretesHor : int = resolutionX*(resolutionZ+1);
		var nbDiagos : int = resolutionX * resolutionZ;
		coord_points = new Vector3[2*(nbDiagos+nbAretesVert+nbAretesHor)];
	}
	if(GameObject.Find("Main Camera").GetComponent(meshCylinder) != null) {
		var cyl_nbPoints : int = GameObject.Find("Main Camera").GetComponentInChildren(meshCylinder).nbPoints;
		coord_points = new Vector3[2*6*cyl_nbPoints];
	}
	if(GameObject.Find("Main Camera").GetComponent(meshParallelepipoid) != null) {
		var par_nbAretes : int = 12;
		var par_nbDiagos : int = 6;
		coord_points = new Vector3[2*(par_nbAretes+par_nbDiagos)];
	}/*
	if(GameObject.Find("Main Camera").GetComponent(meshSphere) != null) {
		coord_points = new Vector3[];
	}*/

}



function Update () {
	if(Input.GetKeyDown(KeyCode.F)) {
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
		GameObject.Find("Forme").transform.Find("ff").gameObject.SetActive(true);
		var k : int = 0;
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
		   		var p1 : Vector3 = points[j];
		   		var p2 : Vector3 = points[(j+1)%3];
		   		var v : Vector3[] = new Vector3[2];
		   		v[0] = p1;
		   		v[1] = p2;
		   		var name : String = "line"+i+j;
		   		// si line name existe pas 
		   		if (GameObject.Find("Forme").transform.Find("ff").transform.Find(name) == null) {
		   			// on vérifie qu'une autre ligne ne va pas avoir déjà ces coordonnées
		   			var appartient : boolean = false;
		   			for (var l : int = 0; l < (coord_points.length/2); l++) {
		   				//si arrete p1-> p2 correspond aux case 2l et 2l+1
		   				if(((v[0] == coord_points[2*l]) && (v[1] == coord_points[2*l+1])) || 
		   					((v[1] == coord_points[2*l]) && (v[0] == coord_points[2*l+1]))) {
		   					appartient = true;
		   				}
		   			}
		   			//si l'arrete pas encore créée
		   			if(!appartient) {
		   				line = new GameObject(name);
		   				line.transform.parent = GameObject.Find("Forme").transform.Find("ff").transform;
		   				lineRenderer = line.AddComponent(LineRenderer);
						lineRenderer.material = new Material (Shader.Find("Particles/Additive"));
						lineRenderer.SetColors(Color.green, Color.green);
						lineRenderer.SetWidth(0.1,0.1);
						lineRenderer.SetVertexCount(2);
						coord_points[2*k] = p1;
						coord_points[2*k+1] = p2;
						k++;
						lineRenderer.SetPosition(0, p1);
						lineRenderer.SetPosition(1, p2);
		   			}
		   		}
		   		else {
		   			line = GameObject.Find("Forme").transform.Find("ff").transform.Find(name).gameObject;
		   			lineRenderer = line.GetComponent(LineRenderer);
		   			lineRenderer.SetPosition(0, p1);
					lineRenderer.SetPosition(1, p2);
		   		}
				
		   	}
		}
	}
	else {
		if (GameObject.Find("Forme").transform.Find("ff") != null) {
		GameObject.Find("Forme").transform.Find("ff").gameObject.SetActive(false);
		}
	}
}