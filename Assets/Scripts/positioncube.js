#pragma strict

var c : float = 1;
function Start () {

var dhg = GameObject.CreatePrimitive(PrimitiveType.Cube);
dhg.transform.localPosition = Vector3(-(1/2)*c,(1/2)*c, -(1/2)*c);

}

function Update () {

}