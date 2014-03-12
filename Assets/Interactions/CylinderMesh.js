#pragma strict
 
public var radius : float = 5f;
public var height : float = 8f;
public var nbPoints : int = 8;
private var newVertices : Vector3[]=new Vector3[2*nbPoints+2];
private var newTriangles : int[] = new int[3*4*nbPoints];
function Start () {
 
    var Cylinder : GameObject = new GameObject ("Cylinder");  	//create an empty gameobject with that name
 
    Cylinder.AddComponent(MeshFilter);                           		//add a meshfilter
    Cylinder.AddComponent(MeshRenderer);									//add a meshrenderer
    Cylinder.AddComponent(MeshCollider);
    Cylinder.renderer.material = new Material(Shader.Find("Specular"));
    Cylinder.renderer.material.color = Color.green;
    var angle : float = 2*Mathf.PI / nbPoints; 
 	for (var i : int = 0; i < nbPoints; i++) {
 		var theta : float = i * angle;
 		
 		var p : Vector3 = Vector3(radius*Mathf.Cos(theta),0,radius*Mathf.Sin(theta));
 		var q : Vector3 = Vector3(radius*Mathf.Cos(theta),height,radius*Mathf.Sin(theta));
 		
 		newVertices[2*i] = p;
 		newVertices[2*i+1] = q;
	}
	newVertices[2*nbPoints] = Vector3(0,0,0);
	newVertices[2*nbPoints+1] = Vector3(0,height,0);
	
	for (var j : int = 0; j <= 2*(nbPoints-2); ) {
		newTriangles[12*j/2] = j;
		newTriangles[12*j/2+1] = j+2;
		newTriangles[12*j/2+2] = j+3;
		
		newTriangles[12*j/2+3] = j;
		newTriangles[12*j/2+4] = j+3;
		newTriangles[12*j/2+5] = j+1;
		
		newTriangles[12*j/2+6] = j+1;
		newTriangles[12*j/2+7] = j+3;
		newTriangles[12*j/2+8] = 2*nbPoints+1;
		
		newTriangles[12*j/2+9] = j+2;
		newTriangles[12*j/2+10] = j;
		newTriangles[12*j/2+11] = 2*nbPoints;
		
		j += 2;
	}
	
	var k : int = 2*(nbPoints-1);
	newTriangles[12*k/2] = k;
	newTriangles[12*k/2+1] = 0;
	newTriangles[12*k/2+2] = 1;
	
	newTriangles[12*k/2+3] = k;
	newTriangles[12*k/2+4] = 1;
	newTriangles[12*k/2+5] = k+1;
	
	newTriangles[12*k/2+6] = k+1;
	newTriangles[12*k/2+7] = 1;
	newTriangles[12*k/2+8] = 2*nbPoints+1;
	
	newTriangles[12*k/2+9] = 0;
	newTriangles[12*k/2+10] = k;
	newTriangles[12*k/2+11] = 2*nbPoints;
 
    var newMesh : Mesh = new Mesh ();                               	//create a new mesh, assign the vertices and triangles
        newMesh.Clear();
        newMesh.vertices = newVertices;
        newMesh.triangles = newTriangles;
        newMesh.RecalculateNormals();                               	//recalculate normals, bounds and optimize
        newMesh.RecalculateBounds();
        newMesh.Optimize();                             
             
    (Cylinder.GetComponent(MeshFilter) as MeshFilter).mesh = newMesh;  	//assign the created mesh as the used mesh
 
}