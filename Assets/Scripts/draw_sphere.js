#pragma strict

var o : SphereRadiusValue;


function Start () {
		o = GameObject.Find("slider").GetComponent("SphereRadiusValue") as SphereRadiusValue;
		o.enabled = false;
        var sphere = GameObject.CreatePrimitive(PrimitiveType.Sphere);
        print(o.val);
        sphere.transform.localScale = Vector3(o.val,o.val,o.val);
        sphere.transform.position =  Vector3(0, 1.5, 0);
}

function Update () {
	
}