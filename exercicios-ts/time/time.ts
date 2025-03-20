var formTimes = document.getElementById('formTime') as HTMLFormElement;
var tabelaTimes = document.getElementById('tbTime') as HTMLElement;
var times = JSON.parse(localStorage.getItem("times") || "[]");


interface Time {
    id: number;
    nomeCompleto: string;
    nomeCurto: string;
}


function salvarTimeLocalStorage() {
    var timesSalvar = JSON.stringify(times);
    localStorage.setItem("times", timesSalvar);
}

function atualizarTabelaTime() {
    tabelaTimes.innerHTML = "";
    times.forEach((t: Time) => {
        tabelaTimes.innerHTML += `
            <tr>
                <td>${t.nomeCompleto}</td>
                <td>${t.nomeCurto}</td>
                <td>
                    <button onclick="editarTime(${t.id})"> Editar </button>
                    <button onclick="removerTime(${t.id})"> Remover </button>
                </td>
            </tr>
        `;
    });
}

function salvarTimes(event: Event) {
    event.preventDefault(); // cancelar o disparo do evento

    const novoTime: Time = {
        id: Date.now(),
        nomeCompleto: (document.getElementById('nomeCompleto') as HTMLInputElement).value,
        nomeCurto: (document.getElementById('nomeCurto') as HTMLInputElement).value,
    };

    times.push(novoTime);
    atualizarTabelaTime();
    salvarTimeLocalStorage();
    formTimes.reset();
}

function editarTime(id: number) {
    //find = buscar um elemento em um array
    const time = times.find((t: Time) => t.id == id);

    if (!time) return;

    (document.getElementById("nomeCompleto") as HTMLInputElement).value = time.nomeCompleto;
    (document.getElementById("nomeCurto") as HTMLInputElement).value = time.nomeCurto;


    //findIndex buscar o index do objeto
    const timeIndex = times.findIndex((t: Time) => t.id == id);

    //validar se encontrou algum item
    if (timeIndex != -1) {
        //remover da lista
        times.splice(timeIndex, 1);
    }

    salvarTimeLocalStorage();
    atualizarTabelaTime();
}

function removerTime(id: number) {
    const timeIndex = times.findIndex((t: Time) => t.id == id);

    if (timeIndex != -1) {
        times.splice(timeIndex, 1);
    }

    salvarTimeLocalStorage();
    atualizarTabelaTime();
}

formTimes.addEventListener("submit", salvarTimes);
atualizarTabelaTime();