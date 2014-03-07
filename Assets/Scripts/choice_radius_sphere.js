#pragma strict
var hSliderValue : float = 1;
function Start () {

}

function Update () {

}

function OnGUI () {
		hSliderValue = GUI.HorizontalSlider (Rect (100, 100, 100, 200), hSliderValue, 0.0, 100.0);
	GUI.TextField (Rect (10, 10, 200, 20), hSliderValue.ToString(), 25);
	if (GUI.Button(Rect(50,50,50,50), GUIContent("Go"))) {
		Application.LoadLevel("draw_sphere");
	}
}

function Awake() {

DontDestroyOnLoad(this);

}
