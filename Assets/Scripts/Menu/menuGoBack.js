#pragma strict

function OnGUI () {
	// Make a background box
	if (GUI.Button (Rect (10,10,160,20), "Go back to Main Menu")) {
		
		Application.LoadLevel ("GUIMenu");
	}
}