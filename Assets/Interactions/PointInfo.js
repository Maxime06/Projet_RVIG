#pragma strict
var ArialFont : Font;
function Start () {
	ArialFont = Resources.GetBuiltinResource(typeof(Font), "Arial.ttf");
}

function Update () {
	//var point : Vector3 = gameObject.Find("Forme").GetComponent("deformation").newpoint;
if (gameObject.Find("text") == null) {
		var text = new GameObject("text"); 
		text.AddComponent(MeshRenderer);
		text.AddComponent(TextMesh);
		text.GetComponent(TextMesh).text = "Hello World";
		text.GetComponent(MeshRenderer).renderer.material = Resources.GetBuiltinResource(typeof(Material), "FontMaterial");
		text.GetComponent(TextMesh).font = ArialFont;
		
		}
	}