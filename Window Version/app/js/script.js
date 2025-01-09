function addList(name) {
    const lists = document.getElementById("lists");
    const button = document.createElement("button");
    const emptylist = {};
    const data = JSON.stringify(emptylist);
    const filePath = path.join("app/js","data", name+".json")
    fs.access(filePath, fs.constans.F_OK, (err) => {
        if (err) {
            throw err
        } else {
            fs.writeFile(filePath, data, (error) => {
                if (error){
                    throw error
                }
            })
        }
    })
    button.id = name;
    button.innerHTML = `
        <img src="assets/medium.svg" alt="">
        <h1>|</h1>
        ${name}`
    lists.appendChild(button);
}

document.addEventListener("DOMContentLoaded", () => {
    let add = document.getElementById("newList");
    let alert = document.getElementById("inputAlert");
    let listInput = document.getElementById("listInput")
    let alertAccept = document.getElementById("inputAlertAccept");
    let alertCancel = document.getElementById("inputAlertCancel");
    let errorText = document.getElementById("errorAlert")
    add.addEventListener("click", () => {
        alert.style.display = 'flex'
        errorText.innerHTML = ""
    });
    alertAccept.addEventListener("click", () => {
        if (listInput.value == ""){
           errorText.innerHTML ="Wartość nie może byc pusta"
        } else {
            try {
                addList(listInput.value)
            }catch (err){
                errorText.innerHTML = "Błąd podczas tworzenia pliku Sprawdz czy plik nie istnieje."
            }   
        }
    })
    alertCancel.addEventListener("click", () => {
        alert.style.display = "none"
    })
});
