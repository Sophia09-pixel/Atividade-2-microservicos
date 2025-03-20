"use strict";
var formPartida = document.getElementById('formPartida');
var tabelaPartidas = document.getElementById('tbPartida');
var partidas = JSON.parse(localStorage.getItem("partidas") || "[]");
var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]");
var campeonatosOption = document.getElementById("campeonato");
campeonatos.forEach((campeonato) => {
    var option = document.createElement("option");
    option.value = campeonato.nome.toString();
    option.textContent = campeonato.nome;
    campeonatosOption === null || campeonatosOption === void 0 ? void 0 : campeonatosOption.appendChild(option);
});
function salvarPartidaLocalStorage() {
    var partidasSalvar = JSON.stringify(partidas);
    localStorage.setItem("partidas", partidasSalvar);
}
function atualizarTabelaPartida() {
    tabelaPartidas.innerHTML = "";
    partidas.forEach((p) => {
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
function salvarPartida(event) {
    event.preventDefault(); // cancelar o disparo do evento
    const novaPartida = {
        id: Date.now(),
        timeMandante: document.getElementById('timeMandante').value,
        timeVisitante: document.getElementById('timeVisitante').value,
        campeonato: document.getElementById('campeonato').value,
        dataPartida: document.getElementById('dataPartida').value,
    };
    partidas.push(novaPartida);
    atualizarTabelaPartida();
    salvarPartidaLocalStorage();
    formPartida.reset();
}
function editarPartida(id) {
    //find = buscar um elemento em um array
    const partida = partidas.find((p) => p.id == id);
    if (!partida)
        return;
    document.getElementById("timeMandante").value = partida.timeMandante;
    document.getElementById("timeVisitante").value = partida.timeVisitante;
    document.getElementById("campeonato").value = partida.campeonato;
    document.getElementById("dataPartida").value = partida.dataPartida;
    //findIndex buscar o index do objeto
    const partIndex = partidas.findIndex((p) => p.id == id);
    //validar se encontrou algum item
    if (partIndex != -1) {
        //remover da lista
        partidas.splice(partIndex, 1);
    }
    salvarPartidaLocalStorage();
    atualizarTabelaPartida();
}
function removerPartida(id) {
    const partida = partidas.find((p) => p.id == id);
    if (!partida)
        return;
    const partIndex = partidas.findIndex((p) => p.id == id);
    if (partIndex != -1) {
        partidas.splice(partIndex, 1);
    }
    salvarPartidaLocalStorage();
    atualizarTabelaPartida();
}
formPartida.addEventListener("submit", salvarPartida);
atualizarTabelaPartida();
