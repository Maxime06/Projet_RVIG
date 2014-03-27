#pragma strict

var FormeFilter_assist : MeshFilter;  
var meshTriangles_assist : int[];
var meshVertices_assist : Vector3[];
var min_assist : float;
var max_assist : float;
var closestpoint_assist : Vector3 = new Vector3(0,0,0);
var farestpoint_assist : Vector3 = new Vector3(0,0,0);
var index_mil_assist : int = 0;
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
var lineRenderer_assist : LineRenderer;

function Update () {
	//on récupère l'objet possédant le maillage
	FormeFilter_assist = gameObject.Find("Forme").GetComponent(MeshFilter); 
	// on récupère les points qui composent le mesh
	meshTriangles_assist = FormeFilter_assist.mesh.triangles;
	// on récupère les 3 poins composant le triangle numéro triIndex.
	meshVertices_assist = FormeFilter_assist.mesh.vertices;
	
	if (transform.Find("AllCubesHelp") == null) {
		AllCubesHelp = GameObject("AllCubesHelp");
	}
	else {
		AllCubesHelp = GameObject.Find("Forme").transform.Find("AllCubesHelp").gameObject;
	}
	AllCubesHelp.transform.parent = FormeFilter_assist.transform;
	//on créé les 3 cubes
	CreateAllCubes_assist();
	SetCubes(false, AllCubesHelp);
	
	/*SetCubes(false, cube1_assist);
	SetCubes(false, cube2_assist);
	SetCubes(false, cube3_assist);*/
	
	if(GameObject.Find("Forme").transform.Find("AllCubesHelp").gameObject.GetComponent(LineRenderer) == null) {
		lineRenderer_assist = GameObject.Find("Forme").transform.Find("AllCubesHelp").gameObject.AddComponent(LineRenderer);
	} 
	else {
		lineRenderer_assist = GameObject.Find("Forme").transform.Find("AllCubesHelp").gameObject.GetComponent(LineRenderer);
	}
	lineRenderer_assist.material = new Material (Shader.Find("Particles/Additive"));
	lineRenderer_assist.SetColors(Color.grey, Color.grey);
	lineRenderer_assist.SetWidth(0.1,0.1);
	lineRenderer_assist.SetVertexCount(2);

	// on créé un rayon 
	ray_assist = gameObject.Find("Main Camera").camera.ScreenPointToRay (Input.mousePosition);
	
	var distance : float = Mathf.Infinity; 
	// si le rayon frappe un objet
	if (Physics.Raycast(ray_assist, hitinfo_assist, distance) && !Input.GetMouseButton(0)) {
		SetCubes(true, AllCubesHelp);
		// get the hit point
		hitPoint_assist = hitinfo_assist.point;
		triIndex_assist = hitinfo_assist.triangleIndex;
	}
	else {
	//	Debug.Log("no collision");
		SetCubes(false, AllCubesHelp);
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
				}
		}
		cube1_assist.transform.position = closestpoint_assist;
		//SetCubes(true, AllCubesHelp);
		SetCubes(true, cube1_assist);
		SetCubes(false, cube2_assist);
		SetCubes(false, cube3_assist);
	}
	
	//dans le cas d'une déformation d'une arrete
	if ((GameObject.Find("Forme").GetComponent("deformation_arrete") as MonoBehaviour).enabled) {
		// tableau des trois points du triangle heurté.
		p_assist = [meshVertices_assist[meshTriangles_assist[3*triIndex_assist]],
			 meshVertices_assist[meshTriangles_assist[3*triIndex_assist+1]],
			 meshVertices_assist[meshTriangles_assist[3*triIndex_assist+2]]
			];
		
		/*min_assist = Vector3.Distance(p_assist[0], hitPoint_assist); 
		for (var i : int = 0; i<3; i++) {
			var vector_to_hitPoint : Vector3 = hitPoint_assist - p_assist[i];
			var u1 : Vector3 = p_assist[i] - p_assist[(i+1)%3];
			var nu1 : float = Mathf.Sqrt((u1.x)*(u1.x)+(u1.y)*(u1.y)+(u1.z)*(u1.z));
			var crossprod1 : Vector3 = Vector3.Cross(vector_to_hitPoint, u1);
			var ncp1 : float = Mathf.Sqrt((crossprod1.x)*(crossprod1.x)+(crossprod1.y)*(crossprod1.y)+(crossprod1.z)*(crossprod1.z));
			var d : float = ncp1/nu1;
				if (d <= min_assist) { 
					min_assist = d;
					index_mil_assist = i;
				}
			}				
		*/								
																																	
		// on créé trois points qui sont les milieux de chaque aretes
		var milieux_assist : Vector3[] = new Vector3[3];
		for (var i : int = 0; i < 3; i++) {
			milieux_assist[i] = p_assist[i] - p_assist[(i+1)%3];
		}
		
		// on sélectionne l'arrete dont lecentre est le plus proche de hitpoint
		min_assist = Vector3.Distance(milieux_assist[0], hitPoint_assist);
		for (i = 0; i < 3; i++) {
			var point_mil_assist : Vector3 = milieux_assist[i];
			d = Vector3.Distance(point_mil_assist, hitPoint_assist);
				if (d <= min_assist) { 
					min_assist = d;
					index_mil_assist = i;
				}
		}
		//index_assist[0] = meshTriangles_assist[3*triIndex_assist + index_mil_assist];
		//index_assist[1] = meshTriangles_assist[3*triIndex_assist + (index_mil_assist+1)%3];		
		//on calcule le point le plus loin et on le met dans farestpoint 
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
				//index_assist[k] = meshTriangles_assist[3*triIndex_assist + i];
				k++;
			}
		}
		// on modifie le point closestpoint dans le mesh
		cube1_assist.transform.position = p_assist[index_mil_assist];
		cube2_assist.transform.position = p_assist[(index_mil_assist+1)%3];
		lineRenderer_assist.SetPosition(0, cube1_assist.transform.position);
		lineRenderer_assist.SetPosition(1, cube2_assist.transform.position);
		//SetCubes(true, AllCubesHelp);
		SetCubes(true, cube1_assist);
		SetCubes(true, cube2_assist);
		SetCubes(false, cube3_assist);
		
	}
	//dans le cas d'une déformation d'une face
	if ((GameObject.Find("Forme").GetComponent("deformation_face") as MonoBehaviour).enabled) {
		// tableau des trois points du triangle heurté.
		p_assist = [meshVertices_assist[meshTriangles_assist[3*triIndex_assist]],
			 meshVertices_assist[meshTriangles_assist[3*triIndex_assist+1]],
			 meshVertices_assist[meshTriangles_assist[3*triIndex_assist+2]]
			];

		// on modifie le point closestpoint dans le mesh
		cube1_assist.transform.position = p_assist[0];
		cube2_assist.transform.position = p_assist[1];
		cube3_assist.transform.position = p_assist[2];
		//SetCubes(true, AllCubesHelp);
		SetCubes(true, cube1_assist);
		SetCubes(true, cube2_assist);
		SetCubes(true, cube3_assist);
		
	//	colors[index] = colorT;
	}
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

function CreateAllCubes_assist () {
	if (GameObject.Find("Forme").transform.Find("AllCubesHelp").transform.Find("CubeHelp1") == null) {
		cube1_assist = CreateCube("CubeHelp1");
	}
	else {
		cube1_assist = GameObject.Find("Forme").transform.Find("AllCubesHelp").transform.Find("CubeHelp1").gameObject;
	}
	if (GameObject.Find("Forme").transform.Find("AllCubesHelp").transform.Find("CubeHelp2") == null) {
		cube2_assist = CreateCube("CubeHelp2");
	}
	else {
		cube2_assist = GameObject.Find("Forme").transform.Find("AllCubesHelp").transform.Find("CubeHelp2").gameObject;
	}
	if (GameObject.Find("Forme").transform.Find("AllCubesHelp").transform.Find("CubeHelp3") == null) {
		cube3_assist = CreateCube("CubeHelp3");
	}
	else {
		cube3_assist = GameObject.Find("Forme").transform.Find("AllCubesHelp").transform.Find("CubeHelp3").gameObject;
	}
}