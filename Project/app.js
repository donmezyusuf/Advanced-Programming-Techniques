class List {
  constructor(props) {
    const map = new Map(Object.entries(localStorage));
    this.id = map.size;
    this.editMode = true;
  }
  EditMode = (id) => {
    if (this.editMode && document.getElementById(id)) {
      console.log("Edit");
      let li_tag = document.getElementById(id);
      let p_tag = li_tag.childNodes[1];

      if (String(p_tag.outerHTML).charAt(1) !== "p") return;
      let str = p_tag.innerHTML;

      //console.log(str);

      let container = document.createElement("div");
      container.className = "EditContainer";

      let inp = document.createElement("input");
      inp.setAttribute("value", str);
      inp.id = id;
      inp.className = "EditInput";
      let closeEditButton = document.createElement("span");
      closeEditButton.className = "icon checkmark-icon"
      closeEditButton.id = id;
      closeEditButton.setAttribute("onclick", "appList.EditCloseMode(id)");
      /*
      closeEditButton.innerHTML = "Bitti";
      closeEditButton.className = "FinishEditButton";
      closeEditButton.id = id;
      closeEditButton.setAttribute("onclick", "appList.EditCloseMode(id)");
      */


      container.appendChild(inp);
      container.appendChild(closeEditButton);

      //console.log(container);
      li_tag.childNodes[1].outerHTML = container.outerHTML;
      //console.log(document.getElementById(id));
    }
    this.editMode = true;
  };

  EditCloseMode = (id) => {
    let text = document.getElementById(id).childNodes[1].childNodes[0].value;
    localStorage.setItem(id, String(text));
    //console.log(localStorage)

    let elt = document.getElementById(id);
    elt.removeChild(elt.lastElementChild);
    console.log(document.getElementById(id));

    let add_p = document.createElement("p");
    add_p.className = "ReminderText";
    add_p.innerHTML = text;
    document.getElementById(id).appendChild(add_p);

    this.editMode = false;
  };

  AddItem = () => {
    const map = new Map(Object.entries(localStorage));
    console.log(map)
    while (map.has(String(this.id))) {
      this.id = this.id + 1;
      console.log("arttırdı")
    }
    console.log(this.id)

    let li = document.createElement("li");
    li.className = "ReminderItem";
    li.setAttribute("id", this.id);
    li.setAttribute("onclick", "appList.EditMode("+this.id+")");

    let iconButton = document.createElement("button");
    iconButton.className = "iconContainer";

    let iconSpan = document.createElement("span");
    iconSpan.className = "icon cross-icon";
    iconSpan.setAttribute("onclick", "appList.DeleteItem(" + this.id + ")");

    iconButton.appendChild(iconSpan);

    let text_p = document.createElement("p");
    text_p.className = "ReminderText";

    text_p.innerHTML = "";

    li.appendChild(iconButton);
    li.appendChild(text_p);

    document.getElementById("ReminderUL").appendChild(li);
    this.id = this.id + 1;
  };

  DeleteItem = (id) => {
    console.log(document.getElementById(id));
    document.getElementById(id).remove();
    localStorage.removeItem(id);
  };

  LoadLocalStorage = () => {
    const map = new Map(Object.entries(localStorage));
    for (let entry of map) {
      console.log(entry);
      let li = document.createElement("li");
      li.className = "ReminderItem";
      li.setAttribute("id", entry[0]);
      li.setAttribute("onclick", "appList.EditMode(id)");

      let iconButton = document.createElement("button");
      iconButton.className = "iconContainer";

      let iconSpan = document.createElement("span");
      iconSpan.className = "icon cross-icon";
      iconSpan.setAttribute("onclick", "appList.DeleteItem(" + entry[0] + ")");
      iconButton.appendChild(iconSpan);

      let text_p = document.createElement("p");
      text_p.className = "ReminderText";

      text_p.innerHTML = entry[1];

      li.appendChild(iconButton);
      li.appendChild(text_p);
  
      document.getElementById("ReminderUL").appendChild(li);
    }
  };
}
  let appList;
  appList = new List();
  appList.LoadLocalStorage();


