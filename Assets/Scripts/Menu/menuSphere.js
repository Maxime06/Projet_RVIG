#pragma strict

static var hSliderRadius : float = 1;

function OnGUI () {
	// Make a background box
	GUI.Box (Rect (10,10,180,150), "Create a Sphere");
	
	if (GUI.Button(Rect(15,15,30,18), GUIContent("<-"))) {
		Application.LoadLevel("GUIMenu");
	}

	GUI.TextField (Rect (25, 50, 150, 20), hSliderRadius.ToString(), 25);
	hSliderRadius = GUI.HorizontalSlider (Rect (25, 110, 85, 20), hSliderRadius, 0.0, 100.0);
	
	PlayerPrefs.SetFloat("sphereRadius", hSliderRadius);
	
	if (GUI.Button(Rect(125,90,50,50), GUIContent("Go"))) {
		Application.LoadLevel("drawSphere");
	}
}