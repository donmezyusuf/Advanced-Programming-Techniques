class Brick_Donmez extends Animator {
  constructor() {
    super();
    this.author = "Yusuf Dönmez";
    this.desc = "Rotating and travveling brick";
    let backgroundArray = ["white","yellow","orange","red"]
    let animationArray = [
      "translate(0px, 0px)",
      "rotate(90deg)",
      "translate(0px, 200px)",
      "rotate(90deg)",
      "translate(200px, 200px)",
      "rotate(90deg)",
      "translate(200px, 0px)",
      "rotate(90deg)",
      "translate(0px, 0px)",
    ];
    this.anim = { background:backgroundArray, transform: animationArray };
    this.elt = document.createElement("hr");
    this.elt.style = "width:100px;border: none;height: 10px;background: darkblue;";
    this.time = 5000;
  }
  update() {
    console.log("updated!");
  }
}
