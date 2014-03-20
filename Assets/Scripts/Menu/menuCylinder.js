#pragma strict

var hSliderRadius : float = 1;
var hSliderHeight : float = 1;

function OnGUI () {
	// Make a background box
	GUI.Box (Rect (10,10,180,160), "Create a Cylinder");
	
	if (GUI.Button(Rect(15,15,30,18), GUIContent("<-"))) {
		Application.LoadLevel("GUIMenu");
	}

	GUI.Label(Rect (25, 35, 150, 20), "Choose a radius");
	GUI.TextField (Rect (25, 55, 60, 20), hSliderRadius.ToString(), 25);
	hSliderRadius = GUI.HorizontalSlider (Rect (100, 60, 75, 20), hSliderRadius, 0.0, 100.0);
	
	GUI.Label(Rect (25, 78, 150, 22), "Choose a height");
	GUI.TextField (Rect (25, 100, 60, 20), hSliderHeight.ToString(), 25);
	hSliderHeight = GUI.HorizontalSlider (Rect (100, 105, 75, 20), hSliderHeight, 0.0, 100.0);
	
	PlayerPrefs.SetFloat("cylinderRadius", hSliderRadius);
	PlayerPrefs.SetFloat("cylinderHeight", hSliderHeight);
	
	if (GUI.Button(Rect(25,130,150,30), GUIContent("Go"))) {
		Application.LoadLevel("drawCylinder");
	}
}