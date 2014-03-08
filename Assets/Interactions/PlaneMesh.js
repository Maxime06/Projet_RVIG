#pragma strict

public class PlaneMesh extends MonoBehaviour {
	var mesh : Mesh;
	var center : boolean = true; // au début du script
	// par défaut la taille est de 1, idem pour la résolution
	var size : Vector2 = new Vector2 (10, 10);
	var resolutionX : int = 10;
	var resolutionZ : int = 10;
	
	/// <summary>
	/// called when the script is loaded or a value is changed in the inspector
	/// </summary>
	function OnValidate () {
		UpdateMesh ();
	}
 
	/// <summary>
	/// ensure that data is valid (ex : size is positive)
	/// </summary>
	function ValidateData () {
		if (mesh == null) {
			// si le meshfilter ne contient pas de mesh, on en crée un
			if (gameObject.GetComponent(MeshFilter).sharedMesh == null)
				gameObject.GetComponent(MeshFilter).sharedMesh = new Mesh ();
			// on récupère le mesh du meshfilter
			mesh = gameObject.GetComponent(MeshFilter).sharedMesh;
			mesh.name = "Procedural Plane";
		}
 
		// la limite peut être abaissée mais il faut éviter une taille nulle car le mesh deviendra invisible
		if (size.x < 0.1f)
			size.x = 0.1f;
		if (size.y < 0.1f)
			size.y = 0.1f;
 
		resolutionX = Mathf.Clamp (resolutionX, 1, 250);
		resolutionZ = Mathf.Clamp (resolutionZ, 1, 250);
	}
 
	/// <summary>
	/// reconstruct mesh based on size and resolution
	/// </summary>
	function UpdateMesh () {
		var vertices : Vector3[] = new Vector3[(resolutionX + 1) * (resolutionZ + 1)];
		var uv : Vector2[] = new Vector2[vertices.Length];
		var normals : Vector3[] = new Vector3[vertices.Length];
		var z : int;
		var x : int;
		var i : int = 0;
		ValidateData ();
		
		// int i sert juste à accéder aux éléments des tableaux simplement
		// on utilise l'opérateur <= et non < car la taille des tableaux est de (resolutionX + 1) * (resolutionY + 1)
		for (z = 0; z <= resolutionZ; z++) {
			for (x = 0; x <= resolutionX; x++) {
				vertices[i] = new Vector3 (x * size.x / resolutionX, 0, z * size.y / resolutionZ);
				if (center) {
					vertices[i] -= new Vector3 (size.x / 2, 0, size.y / 2);
				}
				// le cast en float sert à éviter la division entière de 2 int
				uv[i] = new Vector2 ((x*1.0) / resolutionX, (z*1.0) / resolutionZ);
				// toutes les normales pointent vers le haut
				normals[i++] = Vector3.up;
			}
		}
		i = 0;
		var tris : int[] = new int[resolutionX * resolutionZ * 6];
		for (z = 0; z < resolutionZ; z++) {
			for (x = 0; x < resolutionX; x++) {
				tris[i + 5] =
				tris[i    ] = z * (resolutionX + 1) + x;
				tris[i + 1] = (z + 1) * (resolutionX + 1) + x;
				tris[i + 2] =
				tris[i + 3] = (z + 1) * (resolutionX + 1) + x + 1;
				tris[i + 4] = z * (resolutionX + 1) + x + 1;
				i += 6;
			}
		}
		mesh.Clear ();
		// cette ligne sert à nettoyer les données du mesh
		// Unity vérifie si les indices des tris ne sont pas en dehors du tableau
		// de vertices, ce qui peut facilement se produire si on en assigne de
		// nouveaux alors que le mesh contient toujours les anciens tris
		// (vous obtiendrez une jolie exception dans ce cas !)
		mesh.vertices = vertices;
		mesh.uv = uv;
		mesh.normals = normals;
		mesh.SetIndices (tris, MeshTopology.Triangles, 0);
		// identique à mesh.triangles = tris; ou mesh.SetTriangles (tris, 0);
		// 0 est l'index du submesh
		mesh.RecalculateBounds ();
	}
}