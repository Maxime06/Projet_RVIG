#pragma strict

function OnGUI () {
	// Make a background box
	GUI.Box (Rect (10,10,180,150), "Main Menu");

	// Make the first button. If it is pressed, Application.Loadlevel (1) will be executed
	if (GUI.Button (Rect (20,40,160,20), "Create a sphere")) {
		Application.LoadLevel ("menuSphere");
	}

	// Make the second button.
	if (GUI.Button (Rect (20,70,160,20), "Create a cylinder")) {
		Application.LoadLevel ("menuCylinder");
	}
	
	// Make the third button.
	if (GUI.Button (Rect (20,100,160,20), "Create a plane")) {
		Application.LoadLevel ("menuPlane");
	}
	
	// Make the fourth button.
	if (GUI.Button (Rect (20,130,160,20), "Create a parallelepipoid")) {
		Application.LoadLevel ("menuParallelepipoid");
	}
}