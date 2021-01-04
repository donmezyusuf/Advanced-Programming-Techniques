class List {
  constructor(props) {
    const map = new Map(Object.entries(localStorage));
    this.id = map.size;
    this.editMode = true;
  }
  EditMode = (id) => {
    if (this.editMode && document.getElementById(id)) {
      let li_tag = document.getElementById(id);
      let p_tag = li_tag.childNodes[1];

      if (String(p_tag.outerHTML).charAt(1) !== "p") return;
      let str = p_tag.innerHTML;

      let container = document.createElement("div");
      container.className = "EditContainer";

      let inp = document.createElement("input");
      if(str){
        inp.setAttribute("value", str);
      }else{
        inp.setAttribute("value", "");
      }

      inp.id = id;
      inp.className = "EditInput";
      
      let closeEditButton = document.createElement("span");
      closeEditButton.className = "icon checkmark-icon"
      closeEditButton.id = id;
      closeEditButton.setAttribute("onclick", "appList.EditCloseMode(id)");

      container.appendChild(inp);
      container.appendChild(closeEditButton);

      li_tag.childNodes[1].outerHTML = container.outerHTML;
      li_tag.childNodes[1].addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          closeEditButton.click();
        }
      });

      li_tag.childNodes[1].childNodes[0].focus();

    }
    this.editMode = true;
  };

  EditCloseMode = (id) => {
    let text = document.getElementById(id).childNodes[1].childNodes[0].value;
    localStorage.setItem(id, String(text));

    let elt = document.getElementById(id);
    elt.removeChild(elt.lastElementChild);

    let add_p = document.createElement("p");
    add_p.className = "ReminderText";
    add_p.innerHTML = text;
    document.getElementById(id).appendChild(add_p);

    this.editMode = false;
  };

  AddItem = () => {
    const map = new Map(Object.entries(localStorage));
    while (map.has(String(this.id))) {
      this.id = this.id + 1;
    }

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
    for (let index = 0; index < 10; index++) {
      li.click();
    }
    

    this.id = this.id + 1;
  };

  DeleteItem = (id) => {
    document.getElementById(id).remove();
    localStorage.removeItem(id);
  };

  LoadLocalStorage = () => {
    const map = new Object(Object.entries(localStorage)).sort();

    for (let entry of map) {
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