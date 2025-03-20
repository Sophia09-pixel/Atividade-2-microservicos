"use strict";
var formTimes = document.getElementById('formTime');
var tabelaTimes = document.getElementById('tbTime');
var times = JSON.parse(localStorage.getItem("times") || "[]");
function salvarTimeLocalStorage() {
    var timesSalvar = JSON.stringify(times);
    localStorage.setItem("times", timesSalvar);
}
function atualizarTabelaTime() {
    tabelaTimes.innerHTML = "";
    times.forEach((t) => {
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
function salvarTimes(event) {
    event.preventDefault(); // cancelar o disparo do evento
    const novoTime = {
        id: Date.now(),
        nomeCompleto: document.getElementById('nomeCompleto').value,
        nomeCurto: document.getElementById('nomeCurto').value,
    };
    times.push(novoTime);
    atualizarTabelaTime();
    salvarTimeLocalStorage();
    formTimes.reset();
}
function editarTime(id) {
    //find = buscar um elemento em um array
    const time = times.find((t) => t.id == id);
    if (!time)
        return;
    document.getElementById("nomeCompleto").value = time.nomeCompleto;
    document.getElementById("nomeCurto").value = time.nomeCurto;
    //findIndex buscar o index do objeto
    const timeIndex = times.findIndex((t) => t.id == id);
    //validar se encontrou algum item
    if (timeIndex != -1) {
        //remover da lista
        times.splice(timeIndex, 1);
    }
    salvarTimeLocalStorage();
    atualizarTabelaTime();
}
function removerTime(id) {
    const timeIndex = times.findIndex((t) => t.id == id);
    if (timeIndex != -1) {
        times.splice(timeIndex, 1);
    }
    salvarTimeLocalStorage();
    atualizarTabelaTime();
}
formTimes.addEventListener("submit", salvarTimes);
atualizarTabelaTime();
