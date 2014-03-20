#pragma strict

var hSliderLength : float = 1;
var hSliderWidth : float = 1;
var hSliderHeight : float = 1;

function OnGUI () {
	// Make a background box
	GUI.Box (Rect (10,10,180,205), "Create a Parallelepipoid");
	
	if (GUI.Button(Rect(15,15,30,18), GUIContent("<-"))) {
		Application.LoadLevel("GUIMenu");
	}

	GUI.Label(Rect (25, 33, 150, 22), "Choose a length");
	GUI.TextField (Rect (25, 55, 60, 20), hSliderLength.ToString(), 25);
	hSliderLength = GUI.HorizontalSlider (Rect (100, 60, 75, 20), hSliderLength, 0.0, 100.0);
	
	GUI.Label(Rect (25, 78, 150, 22), "Choose a width");
	GUI.TextField (Rect (25, 100, 60, 20), hSliderWidth.ToString(), 25);
	hSliderWidth = GUI.HorizontalSlider (Rect (100, 105, 75, 20), hSliderWidth, 0.0, 100.0);
	
	GUI.Label(Rect (25, 123, 150, 22), "Choose a height");
	GUI.TextField (Rect (25, 145, 60, 20), hSliderHeight.ToString(), 25);
	hSliderHeight = GUI.HorizontalSlider (Rect (100, 150, 75, 20), hSliderHeight, 0.0, 100.0);
	
	PlayerPrefs.SetFloat("parallelepipoidLength", hSliderLength);
	PlayerPrefs.SetFloat("parallelepipoidWidth", hSliderWidth);
	PlayerPrefs.SetFloat("parallelepipoidHeight", hSliderHeight);
	
	if (GUI.Button(Rect(25,175,150,30), GUIContent("Go"))) {
		Application.LoadLevel("drawParallelepipoid");
	}
}