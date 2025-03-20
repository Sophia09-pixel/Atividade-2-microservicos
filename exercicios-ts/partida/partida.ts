var formPartida = document.getElementById('formPartida') as HTMLFormElement;
var tabelaPartidas = document.getElementById('tbPartida') as HTMLElement;
var partidas = JSON.parse(localStorage.getItem("partidas") || "[]");
var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]");
var campeonatosOption = document.getElementById("campeonato");

interface Partida {
    id: number;
    timeMandante: string;
    timeVisitante: string;
    campeonato: string;
    dataPartida: string;
}

campeonatos.forEach((campeonato: Campeonato) => {
    var option = document.createElement("option");
    option.value = campeonato.nome.toString();
    option.textContent = campeonato.nome;
    campeonatosOption?.appendChild(option);
});

function salvarPartidaLocalStorage() {
    var partidasSalvar = JSON.stringify(partidas);
    localStorage.setItem("partidas", partidasSalvar);
}

function atualizarTabelaPartida() {
    tabelaPartidas.innerHTML = "";
    partidas.forEach((p: Partida) => {
        tabelaPartidas.innerHTML += `
            <tr>
                <td>${p.timeMandante}</td>
                <td>${p.timeVisitante}</td>
                <td>${p.campeonato}</td>
                <td>${p.dataPartida}</td>
                <td>
                    <button onclick="editarPartida(${p.id})"> Editar </button>
                    <button onclick="removerPartida(${p.id})"> Remover </button>
                </td>
            </tr>
        `;
    });
}

function salvarPartida(event: Event) {
    event.preventDefault(); // cancelar o disparo do evento

    const novaPartida: Partida = {
        id: Date.now(),
        timeMandante: (document.getElementById('timeMandante') as HTMLInputElement).value,
        timeVisitante: (document.getElementById('timeVisitante') as HTMLInputElement).value,
        campeonato: (document.getElementById('campeonato') as HTMLSelectElement).value,
        dataPartida: (document.getElementById('dataPartida') as HTMLInputElement).value,
    };

    partidas.push(novaPartida);
    atualizarTabelaPartida();
    salvarPartidaLocalStorage();
    formPartida.reset();
}

function editarPartida(id: number) {
    //find = buscar um elemento em um array
    const partida = partidas.find((p: Partida) => p.id == id);

    if (!partida) return;

    (document.getElementById("timeMandante") as HTMLInputElement).value = partida.timeMandante;
    (document.getElementById("timeVisitante") as HTMLInputElement).value = partida.timeVisitante;
    (document.getElementById("campeonato") as HTMLSelectElement).value = partida.campeonato;
    (document.getElementById("dataPartida") as HTMLInputElement).value = partida.dataPartida;

    //findIndex buscar o index do objeto
    const partIndex = partidas.findIndex((p: Partida) => p.id == id);

    //validar se encontrou algum item
    if (partIndex != -1) {
        //remover da lista
        partidas.splice(partIndex, 1);
    }

    salvarPartidaLocalStorage();
    atualizarTabelaPartida();
}

function removerPartida(id: number) {
    const partida = partidas.find((p: Partida) => p.id == id);

    if (!partida) return;
    const partIndex = partidas.findIndex((p: Partida) => p.id == id);

    if (partIndex != -1) {
        partidas.splice(partIndex, 1);
    }

    salvarPartidaLocalStorage();
    atualizarTabelaPartida();
}

formPartida.addEventListener("submit", salvarPartida);
atualizarTabelaPartida();