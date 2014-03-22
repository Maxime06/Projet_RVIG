#pragma strict

var FormeFilter_assist : MeshFilter;  
var meshTriangles_assist : int[];
var meshVertices_assist : Vector3[];
var min_assist : float;
var max_assist : float;
var closestpoint_assist : Vector3 = new Vector3(0,0,0);
var farestpoint_assist : Vector3 = new Vector3(0,0,0);
var index_assist : int[] = new int[3];
var i : int;
var d : float;
var point_assist : Vector3;

var ray_assist : Ray;
var hitinfo_assist : RaycastHit;
var hitPoint_assist : Vector3;
var triIndex_assist : int;
var p_assist : Vector3[] = new Vector3[3];
var cube1_assist : GameObject;
var cube2_assist : GameObject;
var cube3_assist : GameObject;
var AllCubesHelp : GameObject;
var lineRenderer : LineRenderer;

function Start () {
	if (transform.Find("AllCubesHelp") == null) {
		AllCubesHelp = new GameObject("AllCubesHelp");
	}
	//on récupère l'objet possédant le maillage
	FormeFilter_assist = gameObject.Find("Forme").GetComponent(MeshFilter); 
	// on récupère les points qui composent le mesh
	meshTriangles_assist = FormeFilter_assist.mesh.triangles;
	// on récupère les 3 poins composant le triangle numéro triIndex.
	meshVertices_assist = FormeFilter_assist.mesh.vertices;
	//on créé les 3 cubes
	if (transform.Find("CubeHelp1")==null) {
		cube1_assist = CreateCube("CubeHelp1");
	}
	if (transform.Find("CubeHelp2")==null) {
		cube2_assist = CreateCube("CubeHelp2");
	}
	if (transform.Find("CubeHelp3")==null) {
		cube3_assist = CreateCube("CubeHelp3");
	}
	SetCubes(false, cube1_assist);
	SetCubes(false, cube2_assist);
	SetCubes(false, cube3_assist);
	
	AllCubesHelp.transform.parent = FormeFilter_assist.transform;
	/*lineRenderer = gameObject.AddComponent(LineRenderer);
	lineRenderer.material = new Material (Shader.Find("Particles/Additive"));
	lineRenderer.SetColors(Color.grey, Color.grey);
	lineRenderer.SetWidth(0.1,0.1);
	lineRenderer.SetVertexCount(2);*/
	// ici ne pas l'afficher
}

function Update () {
	
	// on créé un rayon 
	ray_assist = gameObject.Find("Main Camera").camera.ScreenPointToRay (Input.mousePosition);
	
	var distance : float = Mathf.Infinity; 
	// si le rayon frappe un objet
	if (Physics.Raycast(ray_assist, hitinfo_assist, distance) && !Input.GetMouseButton(0)) {
		// get the hit point
		hitPoint_assist = hitinfo_assist.point;
		triIndex_assist = hitinfo_assist.triangleIndex;
	}
	else {
		Debug.Log("no collision");
	}
	 Debug.DrawRay (ray_assist.origin, ray_assist.direction*100, Color.red);

	//dans le cas d'une déformation d'un sommet
	if ((GameObject.Find("Forme").GetComponent("deformation") as MonoBehaviour).enabled) {// tableau des trois points du triangle heurté.
		p_assist = [meshVertices_assist[meshTriangles_assist[3*triIndex_assist]],
			 meshVertices_assist[meshTriangles_assist[3*triIndex_assist+1]],
			 meshVertices_assist[meshTriangles_assist[3*triIndex_assist+2]]
			];
			
		//on calcule le point le plus proche et on le met dans closestpoint 
		min_assist = Vector3.Distance(p_assist[0], hitPoint_assist);
		for (i = 0; i < 3; i++) {
			point_assist = p_assist[i];
			d = Vector3.Distance(point_assist, hitPoint_assist);
				if (d <= min_assist) { 
					min_assist = d;
					closestpoint_assist = point_assist;
					index_assist[0] = meshTriangles_assist[3*triIndex_assist + i];
				}
		}
		index_assist[1] = 0;
		index_assist[2] = 0;
		cube1_assist.transform.position = closestpoint_assist;
		SetCubes(true, cube1_assist);
	}
	
	//dans le cas d'une déformation d'une arrete
	/*if ((GameObject.Find("Forme").GetComponent("deformation_arrete") as MonoBehaviour).enabled) {
		// tableau des trois points du triangle heurté.
		p_assist = [meshVertices_assist[meshTriangles_assist[3*triIndex_assist]],
			 meshVertices_assist[meshTriangles_assist[3*triIndex_assist+1]],
			 meshVertices_assist[meshTriangles_assist[3*triIndex_assist+2]]
			];
			
		//on calcule le point le plus proche et on le met dans closestpoint 
		max_assist = Vector3.Distance(p_assist[0], hitPoint_assist);
		for (i = 0; i < 3; i++) {
			point_assist = p_assist[i];
			d = Vector3.Distance(point_assist, hitPoint_assist);
				if (d >= max_assist) { 
					max_assist = d;
					farestpoint_assist = point_assist;
				}
		}
		var p2_assist : Vector3[] = new Vector3[2];
		var k : int = 0;
		for(i=0; i < 3; i++) {
			if (p_assist[i] != farestpoint_assist) {
				p2_assist[k] = p_assist[i];
				index_assist[k] = meshTriangles_assist[3*triIndex_assist + i];
				k++;
			}
		}
		index_assist[2] = 0;
		// on modifie le point closestpoint dans le mesh
		cube1_assist.transform.position = p2_assist[0];
		cube2_assist.transform.position = p2_assist[1];
		lineRenderer.SetPosition(0, cube1_assist.transform.position);
		lineRenderer.SetPosition(1, cube2_assist.transform.position);
		SetCubes(true, cube1_assist);
		SetCubes(true, cube2_assist);
	}*/
	
	//dans le cas d'une déformation d'une face
	/*if ((GameObject.Find("Forme").GetComponent("deformation_face") as MonoBehaviour).enabled) {
		// tableau des trois points du triangle heurté.
		p_assist = [meshVertices[meshTriangles[3*triIndex]],
			 meshVertices[meshTriangles[3*triIndex+1]],
			 meshVertices[meshTriangles[3*triIndex+2]]
			];
			
		//on calcule le point le plus proche et on le met dans closestpoint 
		for (i = 0; i < 3; i++) {
				index[i] =  meshTriangles[3*triIndex + i];
		}
		// on modifie le point closestpoint dans le mesh
		cube1.transform.position = p_assist[0];
		cube2.transform.position = p_assist[1];
		cube3.transform.position = p_assist[2];
		SetCubes(true, cube1);
		SetCubes(true, cube2);
		SetCubes(true, cube3);
		
	//	colors[index] = colorT;
	}*/
}


function SetCubes (b : boolean, cube : GameObject) {
	cube.SetActive(b);
}


function CreateCube (cubename : String) : GameObject {
	var cube : GameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
	cube.name = cubename;
	cube.transform.parent = AllCubesHelp.transform;
	cube.renderer.material.color = Color.grey;
	cube.transform.localScale = Vector3(0.1,0.1,0.1);
	return cube;
}