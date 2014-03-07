#pragma strict
var val : float;
var o : choice_radius_sphere;

function Start () {

}

function Update () {
	//on récupère le script
 	o = GameObject.Find("choice_text").GetComponent("choice_radius_sphere") as choice_radius_sphere;
 	// on save la valeur du slider
 	val = o.hSliderValue;
}

function Awake() {

DontDestroyOnLoad(this);

}