#pragma strict

// attributs du plan
var size : Vector2;
var sizex_default : float;
var sizey_default : float;
//attributs du cylindre : 
var cyl_height : float;
var cyl_radius : float;
//attributs du para 
var par_length : float;
var par_height : float;
var par_width : float;
//attributs sphère
var sph_radius : float;

//les mesh
var InitMesh : Mesh;
var oldMesh : Mesh;
var meshTriangles : int[];
var meshVertices : Vector3[];
var meshUvs : Vector2[];

//le rayon 
var ray : Ray;
var hitinfo : RaycastHit;
var hitPoint : Vector3;
var triIndex : int;
var distance : float = Mathf.Infinity; 

// les points
var closestpoint : Vector3 = new Vector3(0,0,0);
var newpoint : Vector3 = new Vector3(0,0,0);

var profondeur : float = 2.5;
var min : float;
var index : int;


var bool : boolean = false;
var p : Vector3[] = new Vector3[3];

// on récupère les variables que l'on va modifier
/* 
plan : size en x et y
cylindre : height et radius
parallélépipède : length, width, height
sphère : radius
*/
function Start () {
	if (GameObject.Find("Main Camera").GetComponent("meshPlane") != null) {
		size = GetComponentInChildren(meshPlane).size;
		sizex_default = size.x;
		sizey_default = size.y;
	}
	if (GameObject.Find("Main Camera").GetComponent("meshCylinder") != null) {
		cyl_height = GetComponentInChildren(meshCylinder).height;
		cyl_radius = GetComponentInChildren(meshCylinder).radius;
	}
	if (GameObject.Find("Main Camera").GetComponent("meshParallelepipoid") != null) {
		par_height = GetComponentInChildren(meshParallelepipoid).height;
		par_length = GetComponentInChildren(meshParallelepipoid).length;
		par_width = GetComponentInChildren(meshParallelepipoid).width;
	}
	if (GameObject.Find("Main Camera").GetComponent("meshSphere") != null) {
		sph_radius = GetComponentInChildren(meshSphere).radius;
	}
	// on récupère le Mesh initial
	InitMesh = GameObject.Find("Forme").GetComponent(MeshFilter).mesh;
	// on donne à old mesh ses valeurs
	oldMesh = InitMesh;
	meshTriangles = oldMesh.triangles;
	meshVertices = oldMesh.vertices;
	meshUvs = oldMesh.uv;
}

function Update () {

	if ((Input.GetKey(KeyCode.RightControl) || Input.GetKey(KeyCode.LeftControl)) && Input.GetMouseButton(0)) {
	
		// on créé un rayon 
		ray = gameObject.Find("Main Camera").camera.ScreenPointToRay (Input.mousePosition);
		// si le rayon frappe un objet
		if (Physics.Raycast(ray, hitinfo, distance)){
			// get the hit point
			hitPoint = hitinfo.point;
			triIndex = hitinfo.triangleIndex;
			bool = true;
		}
		if (Input.GetMouseButton(0)) Debug.DrawRay (ray.origin, ray.direction*100, Color.blue);
		if(bool) {
		// tableau des trois points du triangle heurté.
		p = [meshVertices[meshTriangles[3*triIndex]],
			 meshVertices[meshTriangles[3*triIndex+1]],
			 meshVertices[meshTriangles[3*triIndex+2]]
			];
		
		//on calcule le point le plus proche et on le met dans closestpoint 
		if ((closestpoint.x == 0) && (closestpoint.y == 0) && (closestpoint.z == 0)) {
			min = Vector3.Distance(p[0], hitPoint);
			for (var i : int = 0; i < 3; i++) {
				var point : Vector3 = p[i];
				var d : float = Vector3.Distance(point, hitPoint);
					if (d <= min) { 
						min = d;
						closestpoint = point;
						index = meshTriangles[3*triIndex + i];
					}
			}
		}
		var cam = gameObject.Find("Main Camera").camera;
		// troisième paramètre : distance de la caméra 
		// donc il faut placer le z par rapport à la caméra.
		newpoint = cam.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, Vector3.Dot((hitPoint-cam.transform.position),cam.transform.forward )));
		var scroll : float = Input.GetAxis("Mouse ScrollWheel");
		//le plan
		if (GameObject.Find("Main Camera").GetComponent("meshPlane") != null) {
			size.x = sizex_default + Mathf.Clamp(newpoint.x - closestpoint.x, -sizex_default+0.1, 50);
			size.y = sizey_default + Mathf.Clamp(newpoint.y - closestpoint.y, -sizey_default+0.1, 50);
			GetComponentInChildren(meshPlane).size = size;
			// on créé le nouveau mesh à la bonne taille
			GetComponentInChildren(meshPlane).UpdateMesh();
			GetComponentInChildren(meshPlane).OtherFace();
		}
		// le cylindre
		if  (GameObject.Find("Main Camera").GetComponent("meshCylinder") != null) {
			var nbPoints = GetComponentInChildren(meshCylinder).nbPoints;
			GetComponentInChildren(meshCylinder).radius =  cyl_radius + Mathf.Clamp(newpoint.x - closestpoint.x, -cyl_radius+0.1, 50);
			GetComponentInChildren(meshCylinder).height = GetComponentInChildren(meshCylinder).height + Mathf.Clamp(scroll*profondeur,-cyl_height+0.1, 50);
			// on créé le nouveau mesh à la bonne taille
			GetComponentInChildren(meshCylinder).UpdateMesh();
			GetComponentInChildren(meshCylinder).OtherFace();
		}
		// le parallélépipède
		if  (GameObject.Find("Main Camera").GetComponent("meshParallelepipoid") != null) {
			GetComponentInChildren(meshParallelepipoid).height = par_height + Mathf.Clamp(newpoint.y - closestpoint.y, -par_length+0.1, 50);
			GetComponentInChildren(meshParallelepipoid).length = GetComponentInChildren(meshParallelepipoid).length + Mathf.Clamp(scroll*profondeur, -par_length+0.1, 50);
			GetComponentInChildren(meshParallelepipoid).width = par_width + Mathf.Clamp(newpoint.x - closestpoint.x, -par_width+0.1, 50);
			// on créé le nouveau mesh à la bonne taille
			GetComponentInChildren(meshParallelepipoid).UpdateMesh();
			GetComponentInChildren(meshParallelepipoid).OtherFace();
		
		}
		// la sphère
		if  (GameObject.Find("Main Camera").GetComponent("meshSphere") != null) {
			GetComponentInChildren(meshSphere).radius = sph_radius + Mathf.Clamp(newpoint.x - closestpoint.x, -sph_radius+0.1, 50);
			GetComponentInChildren(meshSphere).UpdateMesh();
			GetComponentInChildren(meshSphere).OtherFace();
		
		}
	}
	}
	//quand on lache on remet closestpoint à 0
	if ((Input.GetKeyUp(KeyCode.RightControl) || Input.GetKeyUp(KeyCode.LeftControl)) || Input.GetMouseButtonUp(0)) {
		closestpoint = Vector3(0,0,0);
		bool = false;
		if (GameObject.Find("Main Camera").GetComponent("meshPlane") != null) {
			size = GetComponentInChildren(meshPlane).size;
			sizex_default = size.x;
			sizey_default = size.y;
		}
		if (GameObject.Find("Main Camera").GetComponent("meshCylinder") != null) {
			cyl_height = GetComponentInChildren(meshCylinder).height;
			cyl_radius = GetComponentInChildren(meshCylinder).radius;
		}
		if (GameObject.Find("Main Camera").GetComponent("meshParallelepipoid") != null) {
			par_height = GetComponentInChildren(meshParallelepipoid).height;
			par_length = GetComponentInChildren(meshParallelepipoid).length;
			par_width = GetComponentInChildren(meshParallelepipoid).width;
		}
		if (GameObject.Find("Main Camera").GetComponent("meshSphere") != null) {
			sph_radius = GetComponentInChildren(meshSphere).radius;
		}
		// on récupère le Mesh initial
		InitMesh = GameObject.Find("Forme").GetComponent(MeshFilter).mesh;
		// on donne à old mesh ses valeurs
		oldMesh = InitMesh;
		meshTriangles = oldMesh.triangles;
		meshVertices = oldMesh.vertices;
		meshUvs = oldMesh.uv;
	}
	
}