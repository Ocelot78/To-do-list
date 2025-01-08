function addList() {
    const lists = document.getElementById("lists");
    window.Swal.fire({
        title: "Podaj nazwę listy",
        input: "text",
        showCancelButton: true,
        inputValidator: (name) => {
            if (!name) {
                return "Nazwa nie może być pusta";
            } else {
                const button = document.createElement("button");
                button.id = name;
                button.innerHTML = `
                    <img src="assets/home.svg" alt="">
                    <h1>|</h1>
                    ${name}
                `;
                lists.appendChild(button);
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    let add = document.getElementById("newList");
    console.log(add)
    add.addEventListener("click", () => {
        console.log("click")
        addList();
    });

});
