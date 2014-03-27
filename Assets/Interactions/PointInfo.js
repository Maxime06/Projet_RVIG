#pragma strict

var scriptName : String = "";
var point1 : Vector3;
var point2 : Vector3;
var point3 : Vector3;
//le rayon 
var ray : Ray;
var hitinfo : RaycastHit;
var hitPoint : Vector3;
var triIndex : int;
var distance : float = Mathf.Infinity; 
var dist : float ;
//mesh
var mesh : Mesh;
var meshTriangles : int[];
var meshVertices : Vector3[];

var bool : boolean = false;
var aire : float;
var p : Vector3[] = new Vector3[3];
var d : float;
var index : int[] = new int[2];
function Start () {
	// on récupère le Mesh initial
	mesh = GameObject.Find("Forme").GetComponent(MeshFilter).mesh;
	// on donne à old mesh ses valeurs
	meshTriangles = mesh.triangles;
	meshVertices = mesh.vertices;
}

function Update () {
	// on récupère le Mesh initial
	mesh = GameObject.Find("Forme").GetComponent(MeshFilter).mesh;
	// on donne à old mesh ses valeurs
	meshTriangles = mesh.triangles;
	meshVertices = mesh.vertices;
	
	if (Input.GetMouseButtonDown(1)) {
		// on créé un rayon 
		ray = gameObject.Find("Main Camera").camera.ScreenPointToRay (Input.mousePosition);
		// si le rayon frappe un objet
		if (Physics.Raycast(ray, hitinfo, distance)){
			// get the hit point
			hitPoint = hitinfo.point;
			triIndex = hitinfo.triangleIndex;
			bool = true;
		}
		if (Input.GetMouseButton(1)) Debug.DrawRay (ray.origin, ray.direction*100, Color.blue);
		if(bool) {
			// tableau des trois points du triangle heurté.
			p = [meshVertices[meshTriangles[3*triIndex]],
				 meshVertices[meshTriangles[3*triIndex+1]],
				 meshVertices[meshTriangles[3*triIndex+2]]
				];
			if ((GameObject.Find("Forme").GetComponent("deformation_arrete") as MonoBehaviour).enabled) {
				var min : float = Vector3.Distance(p[0], hitPoint); 
				for (var i : int = 0; i<3; i++) {
					var vector_to_hitPoint : Vector3 = hitPoint - p[i];
					var u1 : Vector3 = p[i] - p[(i+1)%3];
					var nu1 : float = Mathf.Sqrt((u1.x)*(u1.x)+(u1.y)*(u1.y)+(u1.z)*(u1.z));
					var crossprod1 : Vector3 = Vector3.Cross(vector_to_hitPoint, u1);
					var ncp1 : float = Mathf.Sqrt((crossprod1.x)*(crossprod1.x)+(crossprod1.y)*(crossprod1.y)+(crossprod1.z)*(crossprod1.z));
					var d : float = ncp1/nu1;
					if (d <= min) { 
						min = d;
						index[0] = meshTriangles[3*triIndex + i];
						index[1] = meshTriangles[3*triIndex + i+1];
					}
				}
				dist = Vector3.Distance(meshVertices[index[0]], meshVertices[index[1]]);
				print(dist);
			}
			if ((GameObject.Find("Forme").GetComponent("deformation_face") as MonoBehaviour).enabled) {
				var a : float = Mathf.Abs(Vector3.Distance(p[0],p[1]));
				var b : float = Mathf.Abs(Vector3.Distance(p[1],p[2]));
				var c : float = Mathf.Abs(Vector3.Distance(p[2],p[0]));
				var s : float = (a+b+c)/2;
				aire = Mathf.Sqrt(s*(s-a)*(s-b)*(s-c));
				print(aire);
			}
		}
	}
	if (Input.GetMouseButtonUp(1)) {
		bool = false;
	}
}
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
		if(bool) {
			GUI.Box (Rect (Screen.width-230,Screen.height - 80,220,70), "Informations");
			GUI.Label(Rect (Screen.width - 210,Screen.height - 65,200,50), "Distance de l'arete : "+dist);
		}
		
	}
	if ((GameObject.Find("Forme").GetComponent("deformation_face") as MonoBehaviour).enabled) {
		point1 = GameObject.Find("Forme").GetComponentInChildren(deformation_face).newpoint1;
		point2 = GameObject.Find("Forme").GetComponentInChildren(deformation_face).newpoint2;
		point3 = GameObject.Find("Forme").GetComponentInChildren(deformation_face).newpoint3;
		GUI.Label(Rect (20,Screen.height - 65,200,50), "Point 1 : ("+truncate(point1.x)+","+truncate(point1.y)+","+truncate(point1.z)+")");
		GUI.Label(Rect (20,Screen.height - 50,200,50), "Point 2 : ("+truncate(point2.x)+","+truncate(point2.y)+","+truncate(point2.z)+")");
		GUI.Label(Rect (20,Screen.height - 35,200,50), "Point 3 : ("+truncate(point3.x)+","+truncate(point3.y)+","+truncate(point3.z)+")");
		if(bool) {
			GUI.Box (Rect (Screen.width-230,Screen.height - 80,220,70), "Informations");
			GUI.Label(Rect (Screen.width - 210,Screen.height - 65,200,50), "Aire de la face : "+aire);
		}
	}	
}
	
function truncate(f : float) : float {
	
	return (Mathf.Round(f * 1000) / 1000);
}