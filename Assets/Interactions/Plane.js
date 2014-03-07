#pragma strict

public class Plane extends MonoBehaviour {
	private var mesh : Mesh;
	public var center : boolean = true; // au début du script
	// par défaut la taille est de 1, idem pour la résolution
	public var size : Vector2 = new Vector2 (1, 1);
	public var resolutionX : int = 1;
	public var resolutionY : int = 1;
	
	/// <summary>
	/// called when the script is loaded or a value is changed in the inspector
	/// </summary>
	private function OnValidate () {
		UpdateMesh ();
	}
 
	/// <summary>
	/// ensure that data is valid (ex : size is positive)
	/// </summary>
	private function ValidateData () {
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
		resolutionY = Mathf.Clamp (resolutionY, 1, 250);
	}
 
	/// <summary>
	/// reconstruct mesh based on size and resolution
	/// </summary>
	public function UpdateMesh () {
		var vertices : Vector3[] = new Vector3[(resolutionX + 1) * (resolutionY + 1)];
		var uv : Vector2[] = new Vector2[vertices.Length];
		var normals : Vector3[] = new Vector3[vertices.Length];
		var y : int;
		var x : int;
		var i : int = 0;
		ValidateData ();
		
		// int i sert juste à accéder aux éléments des tableaux simplement
		// on utilise l'opérateur <= et non < car la taille des tableaux est de (resolutionX + 1) * (resolutionY + 1)
		for (y = 0; y <= resolutionY; y++) {
			for (x = 0; x <= resolutionX; x++) {
				vertices[i] = new Vector3 (x * size.x / resolutionX, 0, y * size.y / resolutionY);
				if (center) {
					vertices[i] -= new Vector3 (size.x / 2, 0, size.y / 2);
				}
				// le cast en float sert à éviter la division entière de 2 int
				uv[i] = new Vector2 ((x*1.0) / resolutionX, (y*1.0) / resolutionY);
				// toutes les normales pointent vers le haut
				normals[i++] = Vector3.up;
			}
		}
		i = 0;
		var tris : int[] = new int[resolutionX * resolutionY * 6];
		for (y = 0; y < resolutionY; y++) {
			for (x = 0; x < resolutionX; x++) {
				tris[i + 5] =
				tris[i    ] = y * (resolutionX + 1) + x;
				tris[i + 1] = (y + 1) * (resolutionX + 1) + x;
				tris[i + 2] =
				tris[i + 3] = (y + 1) * (resolutionX + 1) + x + 1;
				tris[i + 4] = y * (resolutionX + 1) + x + 1;
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