#pragma strict

//public class MeshDeform extends MonoBehaviour {
// 
//    public var relativeVelocity : Vector3;
// 
//    public function Update () {
// 
//       transform.Translate(relativeVelocity * Time.deltaTime);
//    }
// 
//    public function OnCollisionEnter (Collision collision) {
// 
//       var mf : MeshFilter = collision.collider.GetComponent(MeshFilter);
//       var mesh : Mesh = mf.mesh;
// 
//       var vertices : Vector3[] = mesh.vertices;
//       var hitPoint : Vector3 = transform.InverseTransformPoint(collision.contacts[0].point);
//       var hitRadius : float= relativeVelocity.magnitude;
//       var hitDir : Vector3 = transform.InverseTransformDirection(-collision.contacts[0].normal);
// 
//       var i : int = 0;
//        while (i < vertices.Length) {
//            var distance : float = Vector3.Distance(vertices[i], hitPoint);
//            var dir : Vector3 = (vertices[i] - hitPoint);
//            if(dir.magnitude < hitRadius){
//               var amount : float = 1 - dir.magnitude / hitRadius;
//               var vertMove : Vector3 = hitDir * amount;
//               vertices[i] += vertMove;
//         }
//         i++;
//       }
// 
//        mesh.vertices = vertices;
//        mesh.RecalculateBounds();
//    }
//}