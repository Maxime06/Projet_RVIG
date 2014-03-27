#pragma strict

/*static */var hSliderRadius : float = 5;
var hSliderMeridian : int = 20;
var hSliderParallele : int = 20;

function OnGUI () {
	// Make a background box
	GUI.Box (Rect (10,10,180,210), "Create a Sphere");
	
	if (GUI.Button(Rect(15,15,30,18), GUIContent("<-"))) {
		Application.LoadLevel("GUIMenu");
	}

	GUI.Label(Rect (25, 35, 150, 20), "Choose a radius");
	GUI.TextField (Rect (25, 55, 60, 20), hSliderRadius.ToString(), 25);
	hSliderRadius = GUI.HorizontalSlider (Rect (100, 60, 75, 20), hSliderRadius, 0.0, 100.0);
	
	GUI.Label(Rect (25, 78, 150, 20), "Choose a number of paralleles");
	GUI.TextField (Rect (25, 100, 60, 20), hSliderMeridian.ToString(), 25);
	hSliderMeridian = GUI.HorizontalSlider (Rect (100, 105, 75, 20), hSliderMeridian, 10, 50);
	
	GUI.Label(Rect (25, 121, 150, 20), "Choose a number of meridians");
	GUI.TextField (Rect (25, 145, 60, 20), hSliderParallele.ToString(), 25);
	hSliderParallele = GUI.HorizontalSlider (Rect (100, 150, 75, 20), hSliderParallele, 10, 50);
	
	PlayerPrefs.SetFloat("sphereRadius", hSliderRadius);
	PlayerPrefs.SetInt("sphereMeridian", hSliderMeridian);
	PlayerPrefs.SetInt("sphereParallele", hSliderParallele);
	
	if (GUI.Button(Rect(25,180,150,30), GUIContent("Go"))) {
		Application.LoadLevel("drawSphere");
	}
}