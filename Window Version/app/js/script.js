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
    button.innerHTML = `
        <img src="assets/medium.svg" alt="">
        <h1>|</h1>
        ${name}`
    lists.appendChild(button);
}
function readlists() {
    const lists = document.getElementById("lists");
    const filePath = "app/js/data/"
    let fileslist = fs.readdirSync(filePath)
    for (let i in fileslist) {
        fs.readFile(filePath+fileslist[i], (error, data) => {
            if (error) {
                throw (error)
            }
            console.log(fileslist[i])
            let name = fileslist[i] 
            name = name.replace(".json","")
            const button = document.createElement("button");
            button.id = name;
            button.innerHTML = `
                <img src="assets/medium.svg" alt="">
                <h1>|</h1>
                ${name}`
            lists.appendChild(button); 
        })
    }
}
function readlist(name,folder) {
    const filePath = "app/js/"+folder+"/"+name+".json"
    fs.readFile(filePath,"utf-8", (error,data)=>{
        if (error) {
            throw error
        }
        const tasks = JSON.parse(data)
        console.log(tasks)
    })
}
readlist("routine","default")
function appearList(name, data) {
    let listButton = document.getElementById(name+".json")
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
