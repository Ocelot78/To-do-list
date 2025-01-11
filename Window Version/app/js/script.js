/*HTML TEMPLATES
TASKnotdone <div id="1"><button id="doneTask"><img src="assets/cancel.svg"></button>Task1<button id="deleteTask"><img src="assets/delete_2.svg"></button></div>
TASKdone <div id="1"><button id="doneTask"><img src="assets/check.svg"></button>Task1<button id="deleteTask"><img src="assets/delete_2.svg"></button></div>
Button <button id="main_list"><img src="assets/medium.svg"  alt=""><h1>|  </h1>Task List</button>
*/
function addList(name) {
    const lists = document.getElementById("lists");
    const button = document.createElement("button");
    const emptylist = {};
    const data = JSON.stringify(emptylist);
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
    button.onclick = appearList(name)
    button.innerHTML = `
        <img src="assets/medium.svg" alt="">
        <h1>|</h1>
        ${name}`
    lists.appendChild(button);
}
function readlists() {
    const lists = document.getElementById("lists");
    const filePath = "app/js/data/";
    let fileslist = fs.readdirSync(filePath);
    for (let i in fileslist) {
        const fullPath = path.join(filePath, fileslist[i]);
        const is_File = window.fs.isFile(fullPath)
        if (is_File) {
            fs.readFile(fullPath, (error, data) => {
                if (error) {
                    throw error
                }
                console.log(fileslist[i]);
                let name = fileslist[i].replace(".json", "");
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
    if (listButton && (listButton.id === "routine" || listButton.id === "mainlist")) {
        folder = "data/default"
        const filePath = path.join("app/js/",folder+"/", name+".json")
        fs.readFile(filePath,"utf-8", (error,data)=>{
            if (error) {
                throw error
            }
            const tasks = JSON.parse(data)
            console.log(tasks)
            //Is empty not working
            if (Array.isArray(tasks) && tasks.length === 0) {
                console.log("emptylist");
                tasksList.innerHTML = "<h2>Lista jest pusta</h2>";
            }else {
                //works fine
                tasks.forEach(task => {
                    const div = document.createElement("div");
                    div.id = task.ID
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
            console.log(tasks)
        })
    }
}
document.addEventListener("DOMContentLoaded", () => {
    let add = document.getElementById("newList");
    let app = document.getElementById("app")
    let alert = document.getElementById("inputAlert");
    let listInput = document.getElementById("listInput")
    let alertAccept = document.getElementById("inputAlertAccept");
    let alertCancel = document.getElementById("inputAlertCancel");
    let errorText = document.getElementById("errorAlert")
    readlists()

    add.addEventListener("click", () => {
        alert.style.display = "flex"
        errorText.innerHTML = ""
        app.style.filter = "blur(8px)";
    });
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
