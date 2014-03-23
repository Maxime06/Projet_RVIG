#pragma strict
var collision : boolean = false;
var FormeFilter : MeshFilter;  
var meshTriangles : int[];
var meshVertices : Vector3[];
var min : float;
var max : float;
var closestpoint1 : Vector3 = new Vector3(0,0,0);
var closestpoint2 : Vector3 = new Vector3(0,0,0);
var farestpoint : Vector3 = new Vector3(0,0,0);
var index : int[] = new int[2];
var ray : Ray;
var hitinfo : RaycastHit;
var hitPoint : Vector3;
var triIndex : int;
var p : Vector3[] = new Vector3[3];
var newpoint1 : Vector3 = new Vector3(0,0,0);
var newpoint2 : Vector3 = new Vector3(0,0,0);
var cube1 : GameObject;
var cube2 : GameObject;
var AllCubes : GameObject;
var lineRenderer : LineRenderer;

function Start () {
	//on récupère l'objet possédant le maillage
	FormeFilter = gameObject.Find("Forme").GetComponent(MeshFilter); 
	// on récupère les points qui composent le mesh
	meshTriangles = FormeFilter.mesh.triangles;
	// on récupère les 3 poins composant le triangle numéro triIndex.
	meshVertices = FormeFilter.mesh.vertices;
	
	//on créé AllCubes
	if (transform.Find("AllCubes") == null) {
		AllCubes = new GameObject("AllCubes");
	}
	AllCubes.transform.parent = FormeFilter.transform;
	
	// on créé une ligne rouge attachée à AllCubes
	lineRenderer = GameObject.Find("Forme").transform.Find("AllCubes").gameObject.AddComponent(LineRenderer);
	lineRenderer.material = new Material (Shader.Find("Particles/Additive"));
	lineRenderer.SetColors(Color.red, Color.red);
	lineRenderer.SetWidth(0.1,0.1);
	lineRenderer.SetVertexCount(2);
	//on désactive la ligne
	//(lineRenderer as MonoBehaviour).enabled = false;
	
	if (GameObject.Find("Cube1") == null) {
		cube1 = CreateCube("Cube1");
	}
	//on créé un cube
	if (GameObject.Find("Cube2") == null) {
		cube2 = CreateCube("Cube2");
	}
	
	
	//on désactive AllCubes
	SetCubes(false, AllCubes);	
	

}

function Update () {
	CheckTriangle();
	if (collision) {
		UpdateMesh();
	}
	// on active les cubes gris et la ligne grise quand on lache le clique
	if(Input.GetMouseButtonUp(0)) {
		GameObject.Find("Forme").transform.Find("AllCubesHelp").gameObject.SetActive(true);
		GameObject.Find("Forme").transform.Find("AllCubes").gameObject.SetActive(false);
	}
}

function CheckTriangle () {
	// clique gauche
	if (Input.GetMouseButtonDown(0)) {
		// on créé un rayon 
		ray = gameObject.Find("Main Camera").camera.ScreenPointToRay (Input.mousePosition);
		
		var distance : float = Mathf.Infinity; 
		// si le rayon frappe un objet
		if (Physics.Raycast(ray, hitinfo, distance)){
			// get the hit point
			hitPoint = hitinfo.point;
			triIndex = hitinfo.triangleIndex;
			// on désactive les cubes gris et la ligne grise quand on clique
			GameObject.Find("Forme").transform.Find("AllCubesHelp").gameObject.SetActive(false);
			collision = true;
		}
		else {
			Debug.Log("no collision");
			collision = false;
		}
	}
	if (Input.GetMouseButton(0)) Debug.DrawRay (ray.origin, ray.direction*100, Color.yellow);
}

function UpdateMesh () {
	if (Input.GetMouseButton(0)) {
		// tableau des trois points du triangle heurté.
		p = [meshVertices[meshTriangles[3*triIndex]],
			 meshVertices[meshTriangles[3*triIndex+1]],
			 meshVertices[meshTriangles[3*triIndex+2]]
			];
			
		//on calcule le point le plus proche et on le met dans closestpoint 
		max = Vector3.Distance(p[0], hitPoint);
		for (var i : int = 0; i < 3; i++) {
			var point : Vector3 = p[i];
			var d : float = Vector3.Distance(point, hitPoint);
				if (d >= max) { 
					max = d;
					farestpoint = point;
				}
		}
		var p2 : Vector3[] = new Vector3[2];
		var k : int = 0;
		for(i=0; i < 3; i++) {
			if (p[i] != farestpoint) {
				p2[k] = p[i];
				index[k] = meshTriangles[3*triIndex + i];
				k++;
			}
		}
		// on modifie le point closestpoint dans le mesh
		newpoint1 = p2[0];
		newpoint2 = p2[1];
		var cam = gameObject.Find("Main Camera").camera;
		// troisième paramètre : distance de la caméra 
		// donc il faut placer le z par rapport à la caméra.
		var distx : float = (newpoint1 - newpoint2).x; 
		var disty : float = (newpoint1 - newpoint2).y; 
		var distz : float = (newpoint1 - newpoint2).z; 
		newpoint1 = cam.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, Vector3.Dot((hitPoint-cam.transform.position),cam.transform.forward )));
		newpoint2 = new Vector3(newpoint1.x+distx, newpoint1.y+disty, newpoint1.z+distz);
		cube1.transform.position = newpoint1;
		cube2.transform.position = newpoint2;
		lineRenderer.SetPosition(0, cube1.transform.position);
		lineRenderer.SetPosition(1, cube2.transform.position);
		SetCubes(true, AllCubes);	
		//update mesh
		var oldMesh : Mesh = gameObject.Find("Forme").GetComponent(MeshFilter).mesh;
		var meshVertices : Vector3[] = oldMesh.vertices;
		meshVertices[index[1]] = newpoint1;
		meshVertices[index[0]] = newpoint2;
		meshVertices[index[1]+(meshVertices.Length/2)] = newpoint1;
		meshVertices[index[0]+(meshVertices.Length/2)] = newpoint2;
		oldMesh.vertices = meshVertices;
		oldMesh.RecalculateNormals();                               
		oldMesh.RecalculateBounds();
		oldMesh.Optimize();
		gameObject.Find("Forme").GetComponent(MeshCollider).sharedMesh = oldMesh; 
	}
}

function SetCubes (b : boolean, cube : GameObject) {
	cube.SetActive(b);
}

function CreateCube (cubename : String) : GameObject {
	var cube : GameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
	cube.name = cubename;
	cube.transform.parent = AllCubes.transform;
	cube.renderer.material.color = Color.red;
	cube.transform.localScale = Vector3(0.1,0.1,0.1);
	return cube;
}