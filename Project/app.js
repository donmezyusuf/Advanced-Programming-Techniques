class List {
  constructor(props) {
    const map = new Map(Object.entries(localStorage));
    this.id = map.size;
    this.editMode = true;
  }
  EditMode = (id) => {
    if(this.editMode){
      console.log("Edit")
      let li_tag = document.getElementById(id);
      let p_tag = li_tag.childNodes[1];
  
      if(String(p_tag.outerHTML).charAt(1) !== "p")
        return;
      let str = p_tag.innerHTML;
  
      //console.log(str);
  
      let container = document.createElement("div");
      container.className = "EditContainer";
  
      let inp = document.createElement("input");
      inp.setAttribute("value", str);
      inp.id = id;
      inp.className = "EditInput";
      let closeEditButton = document.createElement("button");
      closeEditButton.innerHTML = "Bitti";
      closeEditButton.className = "FinishEditButton";
      closeEditButton.id = id;
      closeEditButton.setAttribute("onclick","appList.EditCloseMode(id)");
  
      container.appendChild(inp);
      container.appendChild(closeEditButton);
  
      //console.log(container);
      li_tag.childNodes[1].outerHTML = container.outerHTML;
      this.editMode=false;
      //console.log(document.getElementById(id));
    }

  };

  EditCloseMode = (id) => {
    let text = document.getElementById(id).childNodes[1].childNodes[0].value;
    localStorage.setItem(id, text);
    //console.log(localStorage)

    let elt = document.getElementById(id);
    elt.removeChild(elt.lastElementChild);
    console.log(document.getElementById(id));

    let add_p = document.createElement("p");
    add_p.className="ReminderText";
    add_p.innerHTML=text;
    document.getElementById(id).appendChild(add_p);
    

  };

  AddItem = () => {
    const map = new Map(Object.entries(localStorage));
    while( map.has(this.id)){
      this.id = this.id + 1;
    }

    let li = document.createElement("li");
    li.className = "ReminderItem";
    li.setAttribute("id",this.id);
    li.setAttribute("onclick", "appList.EditMode(id)");

    let iconButton = document.createElement("button");
    iconButton.className = "iconContainer";

    let iconSpan = document.createElement("span");
    iconSpan.className = "icon checkmark-icon";

    iconButton.appendChild(iconSpan);

    let text_p = document.createElement("p");
    text_p.className = "ReminderText";

    text_p.innerHTML = "";

    li.appendChild(iconButton);
    li.appendChild(text_p);

    document.getElementById("ReminderUL").appendChild(li);
    this.id = this.id + 1;
  };
}
localStorage.clear();
let appList = new List();
