#pragma strict

function Start () {
//plan
/*// mise à jour des sommets déjà déplacé
			
			// on met à jour oldMesh avec le nouveau mesh créé
			/*var updateMesh = GameObject.Find("Forme").GetComponent(MeshFilter).mesh;
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
	    	GameObject.Find("Forme").GetComponent(MeshCollider).sharedMesh = oldMesh; */
}

function Update () {
// plan fonctionnel
/*if (GameObject.Find("Main Camera").GetComponent("meshPlane") != null) {
		if ((Input.GetKey(KeyCode.RightControl) || Input.GetKey(KeyCode.LeftControl)) && Input.GetMouseButton(0)) {
			if (!bool) {
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
			// plan ici ??????????????????????????????
		}
		if(Input.GetKeyUp(KeyCode.RightControl) || Input.GetKeyUp(KeyCode.LeftControl)) {
			mousepos = Vector2(0,0);
			bool = false;
		}
	}*/
	
	// cylindre fonctionnel
	/*if (GameObject.Find("Main Camera").GetComponent("meshCylinder") != null) {
		if ((Input.GetKey(KeyCode.RightControl) || Input.GetKey(KeyCode.LeftControl)) && Input.GetMouseButton(0)) {
			// on créé un rayon 
			ray = gameObject.Find("Main Camera").camera.ScreenPointToRay (Input.mousePosition);
			// si le rayon frappe un objet
			if (Physics.Raycast(ray, hitinfo, distance)){
				// get the hit point
				hitPoint = hitinfo.point;
				triIndex = hitinfo.triangleIndex;
				// on désactive le cube gris quand on clique
				//GameObject.Find("Forme").transform.Find("AllCubesHelp").gameObject.SetActive(false);
			}
			else {
				Debug.Log("no collision");
			}
			if (Input.GetMouseButton(0)) Debug.DrawRay (ray.origin, ray.direction*100, Color.blue);
		
			// tableau des trois points du triangle heurté.
			p = [meshVertices[meshTriangles[3*triIndex]],
				 meshVertices[meshTriangles[3*triIndex+1]],
				 meshVertices[meshTriangles[3*triIndex+2]]
				];
			
			//on calcule le point le plus proche et on le met dans closestpoint 
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
		
			//on affecte à newpoint le closest point
			newpoint = closestpoint;
			var cam = gameObject.Find("Main Camera").camera;
			// troisième paramètre : distance de la caméra 
			// donc il faut placer le z par rapport à la caméra.
			newpoint = cam.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, Vector3.Dot((hitPoint-cam.transform.position),cam.transform.forward )));
			// si pas un sommet des faces rondes
			var nbPoints = GetComponentInChildren(meshCylinder).nbPoints;
			if (index != 2*nbPoints && index != 2*nbPoints+1) {
				GetComponentInChildren(meshCylinder).radius = Mathf.Clamp(newpoint.x - closestpoint.x, 0.1, 50);
			}
			else {
				GetComponentInChildren(meshCylinder).height = Mathf.Clamp(newpoint.x - closestpoint.x, 0.1, 50);
			}
	
			// on créé le nouveau mesh à la bonne taille
			GetComponentInChildren(meshCylinder).UpdateMesh();
			GetComponentInChildren(meshCylinder).OtherFace();
		}
	}*/


}