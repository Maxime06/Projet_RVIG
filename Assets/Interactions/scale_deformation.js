#pragma strict
var speed : float = 0.01;
var FormeFilter : MeshFilter;  
var meshTriangles : int[];
var meshVertices : Vector3[];
var meshUvs : Vector2[];
var min : float;
var closestpoint : Vector3 = new Vector3(0,0,0);
var index : int;

var ray : Ray;
var hitinfo : RaycastHit;
var hitPoint : Vector3;
var triIndex : int;
var p : Vector3[] = new Vector3[3];
var newpoint : Vector3 = new Vector3(0,0,0);
var AllCubes : GameObject;
var cube : GameObject;
var bool :boolean = false;
var mousepos : Vector2 = new Vector2(1,1);
var size : Vector2;
var sizex_default : float;
var sizey_default : float;
var oldMesh : Mesh;
var mouse : Vector2;
var InitMesh : Mesh;
function Start () {
	size = GetComponentInChildren(meshPlane).size;
	InitMesh = GameObject.Find("Forme").GetComponent(MeshFilter).mesh;
	oldMesh = InitMesh;
	meshTriangles = oldMesh.triangles;
	meshVertices = oldMesh.vertices;
	meshUvs = oldMesh.uv;
	sizex_default = size.x;
	sizey_default = size.y;
}

function Update () {
	
	if ((Input.GetKey(KeyCode.RightControl) || Input.GetKey(KeyCode.LeftControl)) && Input.GetMouseButton(0)) {
		if (!bool) {
			print("coucou");
			mousepos = Input.mousePosition;
			bool = true;
		}
		else {
			mouse = new Vector2(mousepos.x - Input.mousePosition.x, mousepos.y - Input.mousePosition.y);
			size.x = sizex_default + mouse.x*speed;
			size.y = sizey_default + mouse.y*speed;
		}
		// on sauvegarde le mesh deformé
		oldMesh = GameObject.Find("Forme").GetComponent(MeshFilter).mesh;
		// on met à jour la taille du mesh
		GetComponentInChildren(meshPlane).size = size;
		// on créé le nouveau mesh à la bonne taille
		GetComponentInChildren(meshPlane).UpdateMesh();
		GetComponentInChildren(meshPlane).OtherFace();
		
		// mise à jour des sommets déjà déplacé
		
		// on met à jour oldMesh avec le nouveau mesh créé
		var updateMesh = GameObject.Find("Forme").GetComponent(MeshFilter).mesh;
		// on modifie la position des sommets de l'ancien (qui contient les précédentes déformations)
		//var newMesh : Mesh = new Mesh();
		var newVertices : Vector3[] = new Vector3[updateMesh.vertices.length];
		for (var i : int = 0; i < meshVertices.Length; i++) {
			// le vecteur entre le point initial et le point déformé avant le scale
			var DiffInitOld : Vector3 = InitMesh.vertices[i] - oldMesh.vertices[i];
			var proportionX : float = sizex_default - size.x;
			var proportionY : float = sizey_default - size.y;

			newVertices[i].x = updateMesh.vertices[i].x + DiffInitOld.x*proportionX;
			newVertices [i].y = updateMesh.vertices[i].y + DiffInitOld.y;
			newVertices[i].z = updateMesh.vertices[i].z + DiffInitOld.z*proportionY;
		}
		oldMesh.Clear();
		oldMesh.triangles = updateMesh.triangles;
		oldMesh.vertices = newVertices;
		oldMesh.uv = updateMesh.uv;
		oldMesh.RecalculateNormals();                               
	    oldMesh.RecalculateBounds();
	    oldMesh.Optimize(); 
	    GameObject.Find("Forme").GetComponent(MeshFilter).mesh = oldMesh; 
	    GameObject.Find("Forme").GetComponent(MeshCollider).sharedMesh = null;
    	GameObject.Find("Forme").GetComponent(MeshCollider).sharedMesh = oldMesh; 
	}
	if(Input.GetKeyUp(KeyCode.RightControl) || Input.GetKeyUp(KeyCode.LeftControl)) {
		mousepos = Vector2(0,0);
		bool = false;
	}
	
}