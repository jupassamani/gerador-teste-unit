const { ipcRenderer, shell } = require('electron');
const process = require('process');

let linkFechar = document.querySelector("#link-fechar");
let linkLinkedin = document.querySelector("#link-linkedin");
let linkLinkedinJu = document.querySelector("#link-linkedin-ju");

linkFechar.addEventListener('click', function () {
    ipcRenderer.send('fechar-janela-sobre');
});


linkLinkedin.addEventListener('click', function () {
    shell.openExternal("https://www.linkedin.com/in/wesleymauricio/");
})

linkLinkedinJu.addEventListener('click', function () {
    shell.openExternal("https://www.linkedin.com/in/julia-passamani/");
})