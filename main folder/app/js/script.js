/*HTML TEMPLATES
TASKnotdone <div id="1"><button id="doneTask"><img src="assets/cancel.svg"></button>Task1<button id="deleteTask"><img src="assets/delete_2.svg"></button></div>
TASKdone <div id="1"><button id="doneTask"><img src="assets/check.svg"></button>Task1<button id="deleteTask"><img src="assets/delete_2.svg"></button></div>
Button <button id="main_list"><img src="assets/medium.svg"  alt=""><h1>|  </h1>Task List</button>
empty <h2>Lista jest pusta</h2>
*/
let openList = null
let list = []
let listFolder = null
function addList(name) {
    const lists = document.getElementById("lists");
    const button = document.createElement("button");
    const emptyList = [];
    const data = JSON.stringify(emptyList);
    const filePath = path.join("app/js","data", name+".json")
    if (window.fs.fileExists(filePath))
        throw (error)
    else {
        fs.writeFile(filePath, data, (error) => {
            if (error){
                throw error
            }
        })
    }
    button.id = name;
    button.onclick = () => appearList(name);
    button.innerHTML = `
        <img src="assets/medium.svg" alt="">
        <h1>|</h1>
        ${name}`
    lists.appendChild(button);
}
function readLists() {
    const lists = document.getElementById("lists");
    const filePath = "app/js/data/";
    let filesList = fs.readdirSync(filePath);
    for (let i in filesList) {
        const fullPath = path.join(filePath, filesList[i]);
        const is_File = window.fs.isFile(fullPath)
        if (is_File) {
            fs.readFile(fullPath, (error, data) => {
                if (error) {
                    throw error
                }
                console.log(filesList[i]);
                let name = filesList[i].replace(".json", "");
                const button = document.createElement("button");
                button.id = name;
                button.onclick = () => appearList(name);
                button.innerHTML = `
                    <img src="assets/medium.svg" alt="">
                    <h1>|</h1>
                    ${name}`;
                lists.appendChild(button);
            });
        }
    }
}
function appearList(name) {
    const listButton = document.getElementById(name);
    const tasksList = document.getElementById("tasks");
    tasksList.innerHTML = ""
    let folder = null
    list = []
    if (listButton && (listButton.id === "routine" || listButton.id === "mainlist")) {
        folder = "data/default"
        const filePath = path.join("app/js/",folder+"/", name+".json")
        fs.readFile(filePath,"utf-8", (error,data)=>{
            if (error) {
                throw error
            }
            const tasks = JSON.parse(data)
            if (Array.isArray(tasks) && tasks.length === 0) {
                console.log("emptyList");
                tasksList.innerHTML = "<h2>Lista jest pusta</h2>";
            }else {
                tasks.forEach(task => {
                    const div = document.createElement("div");
                    div.id = task.ID
                    list.push(task.ID)
                    console.log(list)
                    if (task.Done) {
                        div.innerHTML = `<button id="doneTask"><img src="assets/check.svg"></button>${task.Name}<button id="deleteTask"><img src="assets/delete_2.svg"></button>`
                    }else {
                        div.innerHTML = `<button id="doneTask"><img src="assets/cancel.svg"></button>${task.Name}<button id="deleteTask"><img src="assets/delete_2.svg"></button>`
                    }
                    tasksList.appendChild(div)
                });
            }
        })
    } else {
        folder = "data"
        const filePath = path.join("app/js/",folder+"/", name+".json")
        fs.readFile(filePath,"utf-8", (error,data)=>{
            if (error) {
                throw error
            }
            const tasks = JSON.parse(data)
            if (Array.isArray(tasks) && tasks.length === 0) {
                tasksList.innerHTML = "<h2>Lista jest pusta</h2>";
            }else {
                tasks.forEach(task => {
                    const div = document.createElement("div");
                    div.id = task.ID
                    list.push(task.ID)
                    console.log(list)
                    if (task.Done) {
                        div.innerHTML = `<button id="doneTask"><img src="assets/check.svg"></button>${task.Name}<button id="deleteTask"><img src="assets/delete_2.svg"></button>`
                    }else {
                        div.innerHTML = `<button id="doneTask"><img src="assets/cancel.svg"></button>${task.Name}<button id="deleteTask"><img src="assets/delete_2.svg"></button>`
                    }
                    tasksList.appendChild(div)
                });
            }
        })
    }
    openList = name
    listFolder = folder
}
function addTask(name, idlist, folder, taskListName) {
    idlist.sort((a, b) => a - b);
    let newId = 1;
    for (let i = 0; i < idlist.length; i++) {
        if (idlist[i] !== i + 1) {
            newId = i + 1;
            break;
        }
    }
    if (newId === 1 && idlist.length > 0) {
        newId = idlist[idlist.length - 1] + 1;
    }
    const task = {
        ID: newId,
        Name: name,
        Done: false,
    };
    const filePath = path.join("app/js/",folder+"/", taskListName+".json")
    idlist.push(newId);
    fs.readFile(filePath, "utf-8", (error, data) => {
        if (error) {
            console.error("Błąd odczytu pliku:", error);
            return;
        }

        let tasks = JSON.parse(data);
        tasks.push(task);
        fs.writeFile(filePath, JSON.stringify(tasks, null, 2), (err) => {
            if (err) {
                console.log("Błąd zapisu pliku:", err);
            }
        });
        const div = document.createElement("div");
        div.id = task.ID;
        div.innerHTML = `<button id="doneTask"><img src="assets/cancel.svg"></button>${name}<button id="deleteTask"><img src="assets/delete_2.svg"></button>`;
        const tasksList = document.getElementById("tasks");
        tasksList.appendChild(div);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    let add = document.getElementById("newList")
    let addTaskB = document.getElementById("addTask")
    let addTaskText = document.getElementById("addTaskText")
    let app = document.getElementById("app")
    let alert = document.getElementById("inputAlert")
    let listInput = document.getElementById("listInput")
    let alertAccept = document.getElementById("inputAlertAccept")
    let alertCancel = document.getElementById("inputAlertCancel")
    let errorText = document.getElementById("errorAlert")
    
    readLists()
    
    add.addEventListener("click", () => {
        alert.style.display = "flex"
        errorText.innerHTML = ""
        app.style.filter = "blur(8px)";
    });
    addTaskB.addEventListener("click", () =>{
        if (addTaskText.value == "") {
            addTaskText.value = "Wartość nie może byc pusta"
        }else{
            addTask(addTaskText.value,list,listFolder,openList)
        }
        
    })
    alertAccept.addEventListener("click", () => {
        if (listInput.value == ""){
           errorText.innerHTML ="Wartość nie może byc pusta"
        } else {
            try {
                addList(listInput.value)
                alert.style.display = "none"
                app.style.filter = "none";
            }catch (error){
                errorText.innerHTML = "Błąd podczas tworzenia pliku Sprawdz czy plik nie istnieje."
            }   
        }
    })
    alertCancel.addEventListener("click", () => {
        alert.style.display = "none"
        app.style.filter = "none";
    })
});
