#pragma strict

var hSliderLength : int = 10;
var hSliderWidth : int = 10;
var hSliderResX : int = 10;
var hSliderResZ : int = 10;

function OnGUI () {
	// Make a background box
	GUI.Box (Rect (10,10,180,250), "Create a Plane");
	
	if (GUI.Button(Rect(15,15,30,18), GUIContent("<-"))) {
		Application.LoadLevel("GUIMenu");
	}

	GUI.Label(Rect (25, 33, 150, 22), "Choose a length");
	GUI.TextField (Rect (25, 55, 60, 20), hSliderLength.ToString(), 25);
	hSliderLength = GUI.HorizontalSlider (Rect (100, 60, 75, 20), hSliderLength, 5, 50);
	
	GUI.Label(Rect (25, 78, 150, 22), "Choose a width");
	GUI.TextField (Rect (25, 100, 60, 20), hSliderWidth.ToString(), 25);
	hSliderWidth = GUI.HorizontalSlider (Rect (100, 105, 75, 20), hSliderWidth, 5, 50);
	
	GUI.Label(Rect (25, 121, 150, 22), "Choose a resolution in X");
	GUI.TextField (Rect (25, 145, 60, 20), hSliderResX.ToString(), 25);
	hSliderResX = GUI.HorizontalSlider (Rect (100, 150, 75, 20), hSliderResX, 1, 30);
	
	GUI.Label(Rect (25, 165, 150, 22), "Choose a resolution in Z");
	GUI.TextField (Rect (25, 190, 60, 20), hSliderResZ.ToString(), 25);
	hSliderResZ = GUI.HorizontalSlider (Rect (100, 195, 75, 20), hSliderResZ, 1, 30);
	
	PlayerPrefs.SetInt("planeLength", hSliderLength);
	PlayerPrefs.SetInt("planeWidth", hSliderWidth);
	PlayerPrefs.SetInt("planeResX", hSliderResX);
	PlayerPrefs.SetInt("planeResZ", hSliderResZ);
	
	if (GUI.Button(Rect(25,220,150,30), GUIContent("Go"))) {
		Application.LoadLevel("drawPlane");
	}
}