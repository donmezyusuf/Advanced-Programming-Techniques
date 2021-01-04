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

      /*
      closeEditButton.innerHTML = "Bitti";
      closeEditButton.className = "FinishEditButton";
      closeEditButton.id = id;
      closeEditButton.setAttribute("onclick", "appList.EditCloseMode(id)");
      */

      container.appendChild(inp);
      container.appendChild(closeEditButton);
      console.log(container)

      li_tag.childNodes[1].outerHTML = container.outerHTML;
      li_tag.childNodes[1].addEventListener('keypress', function (e) {
        console.log("lel")
        if (e.key === 'Enter') {
          console.log("lolololo")
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
    //console.log(localStorage)

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
    li.click();
    //console.log(li.childNodes[1].childNodes[0])

    li.childNodes[1].childNodes[0].focus();
    //console.log(li.childNodes[1].childNodes[0])

    /*
    let elm = document.getElementById(this.id).childNodes[1].childNodes[0];
    elm.value= "";

    elm.addEventListener('keypress', function (e) {
      let text = elm.value;
      console.log(value)

      if (e.key === 'Enter') {
        console.log(li)
        localStorage.setItem(this.id, String(text));

        let elt = document.getElementById(this.id);
        elt.removeChild(elt.lastElementChild);
        //console.log(elt)
    
        let add_p = document.createElement("p");
        add_p.className = "ReminderText";
        add_p.innerHTML = text;
        document.getElementById(this.id).appendChild(add_p);
    
        this.editMode = false;
      }
    });
    */

    this.id = this.id + 1;
  };

  DeleteItem = (id) => {
    console.log(document.getElementById(id));
    document.getElementById(id).remove();
    localStorage.removeItem(id);
  };

  LoadLocalStorage = () => {
    const map = new Object(Object.entries(localStorage)).sort();
    console.log(map);

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

/*
  window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
  
    switch (event.key) {
      case "Down": // IE/Edge specific value
      case "ArrowDown":
        // Do something for "down arrow" key press.
        break;
      case "Up": // IE/Edge specific value
      case "ArrowUp":
        // Do something for "up arrow" key press.
        break;
      case "Left": // IE/Edge specific value
      case "ArrowLeft":
        // Do something for "left arrow" key press.
        break;
      case "Right": // IE/Edge specific value
      case "ArrowRight":
        // Do something for "right arrow" key press.
        break;
      case "Enter":
        console.log("haha")

        // Do something for "enter" or "return" key press.
        break;
      case "Esc": // IE/Edge specific value
      case "Escape":
        // Do something for "esc" key press.
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
  
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }, true);

  */