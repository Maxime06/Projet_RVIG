var texte;
texte = GetComponentInChildren(MeshRenderer);

function Start () {
	
}

function Update () {

}

function OnMouseEnter() {
	texte.material.color = Color.red;
}

function OnMouseExit() {
	texte.material.color = Color.white;
}
