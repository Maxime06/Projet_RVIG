class FloatEditor extends EditorWindow {
	var val : float = 1;

	function init() {
		var window = GetWindow(FloatEditor);
			window.position = Rect(0, 0, 210, 30);
			window.Show();
	}

	function OnGUI () {
		val = EditorGUI.FloatField (Rect(3,3,150, 20),"Radius :", val);
		if(GUI.Button(Rect(160,3,45,20),"Aller")) {
			Application.LoadLevel("draw_sphere");
		}
	}
	function Awake() {

// Do not destroy this game object:

DontDestroyOnLoad(this);

}
}