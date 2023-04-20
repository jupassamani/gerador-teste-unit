const data = require("../../data.js");

const gerarTeste = document.querySelector("#gerar-teste");
const linguagem = document.querySelector("#linguagem");
const btnLimpar = document.querySelector("#limpar");
const spinner = document.querySelector(".spinner-border");

var editorMetodo = ace.edit("editor-metodo");
// editorMetodo.setTheme("ace/theme/monokai");
// editorMetodo.setTheme("ace/theme/dracula");
editorMetodo.setTheme("ace/theme/chrome");
editorMetodo.session.setMode("ace/mode/python");

var editorTeste = ace.edit("editor-teste");
// editorTeste.setTheme("ace/theme/monokai");
// editorTeste.setTheme("ace/theme/tomorrow_night_blue");
editorTeste.setTheme("ace/theme/clouds");
editorTeste.session.setMode("ace/mode/python");

gerarTeste.addEventListener('click', function() {
    let index = 0;
    console.log(editorMetodo.getValue() === "");
    editorTeste.setValue("");

    
    if (editorMetodo.getValue() != "") {
        this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;&nbsp;Gerando...';
        this.disabled = true;
        data.gerarTesteUnitario(linguagem.value, editorMetodo.getValue())
            .then((body) => {
                // bodyJson = JSON.parse(body)
                console.log('aqui')
                console.log(body.data)
                let resposta = body.data.choices[0].text
    
                var intervalId = setInterval(function(){
                    if(index === resposta.length - 1){
                       clearInterval(intervalId);
                    }
                    
                    editorTeste.setValue(editorTeste.getValue() + resposta[index]);
                
                    index++;
                }, 20);

                this.innerHTML = 'Gerar Teste Unitário';
                this.disabled = false;
            });
    }
});

btnLimpar.addEventListener('click', function() {
    editorMetodo.setValue("");
    editorTeste.setValue("");
});

linguagem.addEventListener('change', function() {
    if (linguagem.value === "Python 3") {
        editorMetodo.session.setMode("ace/mode/python");
        editorTeste.session.setMode("ace/mode/python");
    } else if (linguagem.value === "CSharp") {
        editorMetodo.session.setMode("ace/mode/csharp");
        editorTeste.session.setMode("ace/mode/csharp");
    }
});