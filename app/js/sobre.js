const { ipcRenderer, shell } = require('electron');
const process = require('process');

let linkFechar = document.querySelector("#link-fechar");
let linkLinkedin = document.querySelector("#link-linkedin");

linkFechar.addEventListener('click', function () {
    ipcRenderer.send('fechar-janela-sobre');
});


linkLinkedin.addEventListener('click', function () {
    shell.openExternal("https://www.linkedin.com/in/wesleymauricio/");
})