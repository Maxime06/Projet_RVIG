#pragma strict

var hSliderRadius : float = 1;
var hSliderHeight : float = 1;
var hSlidernbPoints : int = 8;

function OnGUI () {
	// Make a background box
	GUI.Box (Rect (10,10,180,220), "Create a Cylinder");
	
	if (GUI.Button(Rect(15,15,30,18), GUIContent("<-"))) {
		Application.LoadLevel("GUIMenu");
	}

	GUI.Label(Rect (25, 35, 150, 20), "Choose a radius");
	GUI.TextField (Rect (25, 55, 60, 20), hSliderRadius.ToString(), 25);
	hSliderRadius = GUI.HorizontalSlider (Rect (100, 60, 75, 20), hSliderRadius, 0.0, 100.0);
	
	GUI.Label(Rect (25, 78, 150, 22), "Choose a height");
	GUI.TextField (Rect (25, 100, 60, 20), hSliderHeight.ToString(), 25);
	hSliderHeight = GUI.HorizontalSlider (Rect (100, 105, 75, 20), hSliderHeight, 0.0, 100.0);
	
	GUI.Label(Rect (25, 121, 150, 20), "Choose number of points");
	GUI.TextField (Rect (25, 145, 60, 20), hSlidernbPoints.ToString(), 25);
	hSlidernbPoints = GUI.HorizontalSlider (Rect (100, 150, 75, 20), hSlidernbPoints, 8, 50);
	
	PlayerPrefs.SetFloat("cylinderRadius", hSliderRadius);
	PlayerPrefs.SetFloat("cylinderHeight", hSliderHeight);
	PlayerPrefs.SetInt("cylindernbPoints", hSlidernbPoints);
	
	if (GUI.Button(Rect(25,180,150,30), GUIContent("Go"))) {
		Application.LoadLevel("drawCylinder");
	}
}