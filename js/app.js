const btn = document.querySelector("#btn-enter");
const inputText = document.querySelector("#work");
const btnFilter = document.querySelectorAll(".btn");
const textFilter = document.querySelector("#text-filter");
const messageFilter = document.querySelector("#message-filter");
const info = document.querySelector("#info-task");

const myList = document.querySelector("#lista");
const myWait = document.querySelector("#wait");
const myCompleted = document.querySelector("#completed");

myWait.style.display = "none";
myCompleted.style.display = "none";

// EL localStorage se convierte en un obj (clave y valor), 
// Si no hay nada se convierte en un arr vacio
let arr = JSON.parse(localStorage.getItem("myList")) || [];

// Activer y Desactiver Button de Filtros
btnFilter.forEach(ele => {
    ele.addEventListener("click", () => {
        // Añadir Estilo Active
        document.querySelectorAll(".btn").forEach(btn => {
            btn.classList.remove("active");
        })
        ele.classList.add("active");

        if(ele.classList.contains("lista")) {
            myList.style.display = "flex";
            myWait.style.display = "none";
            myCompleted.style.display = "none";
        } else if(ele.classList.contains("wait")) {
            myList.style.display = "none";
            myWait.style.display = "flex";
            myCompleted.style.display = "none";
        } else {
            myList.style.display = "none";
            myWait.style.display = "none";
            myCompleted.style.display = "flex";
        }
    })
})

document.querySelector("#all").addEventListener("click", () => {
    renderizar();
})

document.querySelector("#pen").addEventListener("click", () => {
    renderizarPendiente();
})

document.querySelector("#com").addEventListener("click", () => {
    renderizarCompleto();
})

// Actualizar Estado Button
function updateButton () {
    document.querySelector("#all").textContent = `Todas (${arr.length})`;
    document.querySelector("#pen").textContent = `Pendientes (${myWait.childElementCount})`;
    document.querySelector("#com").textContent = `Completadas (${myCompleted.childElementCount})`;

    filterText();
    showInfo();
}

// Información 
function filterText () {
    textFilter.textContent = `${myWait.childElementCount == 0 ? "¡Todas las tareas completadas! 🎉" : `${myWait.childElementCount} tareas pendientes`}`
}
function showInfo() {
    info.textContent = `Total: ${arr.length} - Pendientes: ${myWait.childElementCount} - Completas: ${myCompleted.childElementCount}`;
}
function showMessage() {
    messageFilter.style.display = "none";
}

function clear() {
    // Eliminar Mensage Principal
    document.querySelector(".message").style.display = arr.length > 0 ? "none" : "flex";

    // Activar/Desactivar Filtros
    document.querySelector(".filter").style.display = arr.length > 0 ? "grid" : "none";

    // Activar/Desactivar Información
    document.querySelector(".info").style.display = arr.length == 0 ? "none" : "flex";
}

// Guardar Tarea
function guardar() {
    // Con JSON.stringify convertimos los datos en texto
    localStorage.setItem("myList", JSON.stringify(arr));
}

// Renderizar Tarea
function renderizar() {
    myList.innerHTML = ""
    arr.forEach((ele, index) => {
        let myDiv = document.createElement("div");
        myDiv.className = `item flex flex-column gap ${ele.completed? "finish" : ""}`
        myDiv.dataset.index = index
        myDiv.dataset.statu = ele.completed 
        myDiv.innerHTML = 
        `<div class="flex gap">
                <div class="center">
                    <button type="button" class="check center ${ele.completed ? "check-active" : ""}">
                        <i class="fa-solid fa-check check2"></i>
                    </button>
                </div>
                <input type="text" id="text-item" name="text-item" value="${ele.name}" disabled class="${ele.completed ? "tachado" : ""}">   
                <div class="item-btn flex gap center">
                    <div class="center ${ele.completed ? 'display':''}">
                        <i class="fa-solid fa-pencil icon update center"></i>
                    </div> 
                    <div class="center">
                        <i class="fa-solid fa-trash-can icon delete center"></i>
                    </div> 
                </div>
                <div class="item-btn2 flex gap center">
                    <div class="center">
                        <i class="fa-solid fa-check icon2 checkItem center"></i>
                    </div> 
                    <div class="center">
                        <i class="fa-solid fa-xmark icon2 xmarkItem center"></i>
                    </div> 
                </div>
            </div>
            <div>
                <p id="info-item">${ele.fecha} ${ele.hora + ":" + ele.min}</p>
            </div>`

        myList.appendChild(myDiv);
    })

    showMessage();
}

renderizar();

function renderizarPendiente() {
    myWait.innerHTML = "";
    arr.forEach((ele, index) => {
        if(ele.completed == false) {
            let myDiv = document.createElement("div");
            myDiv.className = `item flex flex-column gap ${ele.completed? "finish" : ""}`
            myDiv.dataset.index = index
            myDiv.dataset.statu = ele.completed 
            myDiv.innerHTML = 
            `<div class="flex gap">
                <div class="center">
                    <button type="button" class="check center ${ele.completed ? "check-active" : ""}">
                        <i class="fa-solid fa-check check2"></i>
                    </button>
                </div>
                <input type="text" id="text-item" name="text-item" value="${ele.name}" disabled class="${ele.completed ? "tachado" : ""}">   
                <div class="item-btn flex gap center">
                    <div class="center ${ele.completed ? 'display':''}">
                        <i class="fa-solid fa-pencil icon update center"></i>
                    </div> 
                    <div class="center">
                        <i class="fa-solid fa-trash-can icon delete center"></i>
                    </div> 
                </div>
                <div class="item-btn2 flex gap center">
                    <div class="center">
                        <i class="fa-solid fa-check icon2 checkItem center"></i>
                    </div> 
                    <div class="center">
                        <i class="fa-solid fa-xmark icon2 xmarkItem center"></i>
                    </div> 
                </div>
            </div>
            <div>
                <p id="info-item">${ele.fecha} ${ele.hora + ":" + ele.min}</p>
            </div>`
    
            myWait.appendChild(myDiv);
        }
    })

    messageFilter.style.display = `${myWait.childElementCount == 0 ? "flex" : "none"}`;

}

renderizarPendiente();

function renderizarCompleto() {
    myCompleted.innerHTML = "";
    arr.forEach((ele, index) => {
        if(ele.completed == true) {
            let myDiv = document.createElement("div");
            myDiv.className = `item flex flex-column gap ${ele.completed? "finish" : ""}`
            myDiv.dataset.index = index
            myDiv.dataset.statu = ele.completed 
            myDiv.innerHTML = 
            `<div class="flex gap">
                <div class="center">
                    <button type="button" class="check center ${ele.completed ? "check-active" : ""}">
                        <i class="fa-solid fa-check check2"></i>
                    </button>
                </div>
                <input type="text" id="text-item" name="text-item" value="${ele.name}" disabled class="${ele.completed ? "tachado" : ""}">   
                <div class="item-btn flex gap center">
                    <div class="center ${ele.completed ? 'display':''}">
                        <i class="fa-solid fa-pencil icon update center"></i>
                    </div> 
                    <div class="center">
                        <i class="fa-solid fa-trash-can icon delete center"></i>
                    </div> 
                </div>
                <div class="item-btn2 flex gap center">
                    <div class="center">
                        <i class="fa-solid fa-check icon2 checkItem center"></i>
                    </div> 
                    <div class="center">
                        <i class="fa-solid fa-xmark icon2 xmarkItem center"></i>
                    </div> 
                </div>
            </div>
            <div>
                <p id="info-item">${ele.fecha} ${ele.hora + ":" + ele.min}</p>
            </div>`
    
            myCompleted.appendChild(myDiv);
        }
    })

    messageFilter.style.display = `${myCompleted.childElementCount == 0 ? "flex" : "none"}`;
}

renderizarCompleto();

// Agregar Tarea
btn.addEventListener("click",() => {
    let word = inputText.value.trim();
    if(!word) return;

    let date = new Date;
    
    arr.unshift({ name: word[0].toUpperCase() + word.slice(1), completed: false, fecha: date.toLocaleDateString(), hora: date.getHours().toString().padStart(2,'0'), min: date.getMinutes().toString().padStart(2,'0') });
    
    guardar();

    renderizar();
    renderizarPendiente();

    updateButton();
    clear();
    
    inputText.value = "";
    inputText.focus();
});

updateButton();
clear();

// Mi Lista
myList.addEventListener("click", (e) => {
    // e.target es el elemento exacto donde realize click
    let myItem = e.target.closest(".item");
    let item = myItem?.dataset.index;
    if(item == undefined) return;
    
    // Activar o Desactivar Botones
    let inputItem = myItem?.querySelector("#text-item");
    let itemBtn = myItem?.querySelector(".item-btn");
    let itemBtn2 = myItem?.querySelector(".item-btn2");
    
    if(e.target.classList.contains("update")) {
        itemBtn.style.display = "none"
        itemBtn2.style.display = "flex"
        inputItem.disabled = false;
        inputItem.focus();
    } else if(e.target.classList.contains("delete")) {
        arr.splice(item, 1);
        renderizarPendiente();
        renderizarCompleto();
        renderizar();
    } else if(e.target.classList.contains("checkItem")) {
        itemBtn.style.display = "flex"
        itemBtn2.style.display = "none"
        inputItem.disabled = true;
        arr[item].name = inputItem.value;
    } else if (e.target.classList.contains("xmarkItem")) {
        itemBtn.style.display = "flex"
        itemBtn2.style.display = "none"
        inputItem.disabled = true;
        inputItem.value = arr[item].name;
    } else if((e.target.classList.contains("check") || e.target.classList.contains("check2")) && arr[item].completed == false) {
        arr[item].completed = true;
        updateButton();
        renderizarPendiente();
        renderizarCompleto();
        renderizar();
    } else {
        arr[item].completed = false;
        updateButton();
        renderizarPendiente();
        renderizarCompleto();
        renderizar();
    }
    
    guardar();
    updateButton();
    clear();
})

myWait.addEventListener("click", (e) => {
    let myItem = e.target.closest(".item");
    let item = myItem?.dataset.index;
    if(item == undefined) return;
    
    let inputItem = myItem?.querySelector("#text-item");
    let itemBtn = myItem?.querySelector(".item-btn");
    let itemBtn2 = myItem?.querySelector(".item-btn2");

    if(e.target.classList.contains("update")) {
        itemBtn.style.display = "none"
        itemBtn2.style.display = "flex"
        inputItem.disabled = false;
        
        inputItem.focus();
    } else if(e.target.classList.contains("delete")) {
        arr.splice(item, 1);
        renderizarCompleto();
        renderizarPendiente();
    } else if(e.target.classList.contains("checkItem")) {
        itemBtn.style.display = "flex"
        itemBtn2.style.display = "none"
        inputItem.disabled = true;

        arr[item].name = inputItem.value;
    } else if (e.target.classList.contains("xmarkItem")) {
        itemBtn.style.display = "flex"
        itemBtn2.style.display = "none"
        inputItem.disabled = true;

        inputItem.value = arr[item].name;
    } else if((e.target.classList.contains("check") || e.target.classList.contains("check2")) && arr[item].completed == false) {
        arr[item].completed = true;
        updateButton();
        renderizarCompleto();
        renderizarPendiente();
    } else {
        arr[item].completed = false;
        updateButton();
        renderizarCompleto();
        renderizarPendiente();
    }
    
    guardar();
    updateButton();
    clear();
})

myCompleted.addEventListener("click", (e) => {
    let myItem = e.target.closest(".item");
    let item = myItem?.dataset.index;
    if(item == undefined) return;
    
    let inputItem = myItem?.querySelector("#text-item");
    let itemBtn = myItem?.querySelector(".item-btn");
    let itemBtn2 = myItem?.querySelector(".item-btn2");

    if(e.target.classList.contains("update")) {
        itemBtn.style.display = "none"
        itemBtn2.style.display = "flex"
        inputItem.disabled = false;
        inputItem.focus();
    } else if(e.target.classList.contains("delete")) {
        arr.splice(item, 1);
        renderizarPendiente();
        renderizarCompleto();
    } else if(e.target.classList.contains("checkItem")) {
        itemBtn.style.display = "flex"
        itemBtn2.style.display = "none"
        inputItem.disabled = true;
        arr[item].name = inputItem.value;
    } else if (e.target.classList.contains("xmarkItem")) {
        itemBtn.style.display = "flex"
        itemBtn2.style.display = "none"
        inputItem.disabled = true;
        inputItem.value = arr[item].name;
    } else if((e.target.classList.contains("check") || e.target.classList.contains("check2")) && arr[item].completed == false) {
        arr[item].completed = true;
        updateButton();
        renderizarPendiente();
        renderizarCompleto();
    } else {
        arr[item].completed = false;
        updateButton();
        renderizarPendiente();
        renderizarCompleto();
    }
    
    guardar();
    updateButton();
    clear();
})

// Input Event
inputText.addEventListener("input", () => {
    if(inputText.value === "") {
        btn.style.backgroundColor = "rgba(124, 173, 247, 1)";
    } else {
        btn.style.backgroundColor = "rgba(31, 114, 238, 1)";
    }
})

// localStorage.clear();    