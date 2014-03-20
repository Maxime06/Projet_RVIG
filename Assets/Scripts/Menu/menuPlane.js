#pragma strict

var hSliderLength : int = 1;
var hSliderWidth : int = 1;

function OnGUI () {
	// Make a background box
	GUI.Box (Rect (10,10,180,160), "Create a Plane");
	
	if (GUI.Button(Rect(15,15,30,18), GUIContent("<-"))) {
		Application.LoadLevel("GUIMenu");
	}

	GUI.Label(Rect (25, 33, 150, 22), "Choose a length");
	GUI.TextField (Rect (25, 55, 60, 20), hSliderLength.ToString(), 25);
	hSliderLength = GUI.HorizontalSlider (Rect (100, 60, 75, 20), hSliderLength, 0.0, 100.0);
	
	GUI.Label(Rect (25, 78, 150, 22), "Choose a width");
	GUI.TextField (Rect (25, 100, 60, 20), hSliderWidth.ToString(), 25);
	hSliderWidth = GUI.HorizontalSlider (Rect (100, 105, 75, 20), hSliderWidth, 0.0, 100.0);
	
	PlayerPrefs.SetInt("planeLength", hSliderLength);
	PlayerPrefs.SetInt("planeWidth", hSliderWidth);
	
	if (GUI.Button(Rect(25,130,150,30), GUIContent("Go"))) {
		Application.LoadLevel("drawPlane");
	}
}