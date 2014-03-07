#pragma strict

var points : Vector2[,];
var Lx : float;
var Lz : float;
var nbPx : int = 100;
var nbPz : int = 100;
var interx : float;
var interz : float;
var orix : float;
var oriz : float;
var scale : Vector3;

function Start () {
	// récupération de la longueur et la largeur du plan
	scale = transform.localScale;
	Lx = scale.x;
	Lz = scale.z;
	// calcul intervalles entre points
	interx = Lx/nbPx;
	interz = Lz/nbPz;
	//calcul de l'origine en haut à gauche
	orix = -(1/2)*Lx;
	oriz = (1/2)*Lz;

	// création des points
	for (var i = 0; i < nbPx; i++) {
		for (var j = 0; j < nbPz; j++) {
			points[i,j] = Vector2(orix + i*interx, oriz - j*interz);
		}
	}
}

function Update () {

}