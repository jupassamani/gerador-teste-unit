const data = require("../../data.js");

const gerarTeste = document.querySelector("#gerar-teste");
const linguagem = document.querySelector("#linguagem");
const btnLimpar = document.querySelector("#limpar");
const tipo = document.querySelector("#tipo");
const javaOption = document.querySelector("#java-options-select");
const spinner = document.querySelector(".spinner-border");
var botaoCopiar = document.getElementById('botao-copiar');

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
        var javaOptionValue = javaOption.value ? javaOption.value : ""; // Check if javaOption.value is null and assign an empty value if it is
        data.gerarTesteUnitario(linguagem.value, editorMetodo.getValue(), tipo.value, javaOptionValue)
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
                botaoCopiar.disabled = false;
                botaoCopiar.addEventListener('click', function() {
                    // Copiar o conteúdo da resposta para a área de transferência
                    var respostaTexto = resposta;
                    navigator.clipboard.writeText(respostaTexto)
                        .then(function() {
                            // Copiado com sucesso
                            console.log('Conteúdo copiado: ' + respostaTexto);
                        })
                        .catch(function(error) {
                            // Ocorreu um erro ao copiar
                            console.error('Erro ao copiar o conteúdo: ' + error);
                        });
                });
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
    } else if (linguagem.value === "Java") {
        editorMetodo.session.setMode("ace/mode/java");
        editorTeste.session.setMode("ace/mode/java");
    } else if (linguagem.value === "React") {
        editorMetodo.session.setMode("ace/mode/javascript");
        editorTeste.session.setMode("ace/mode/javascript");
    } else if (linguagem.value === "React TS") {
        editorMetodo.session.setMode("ace/mode/typescript");
        editorTeste.session.setMode("ace/mode/typescript");
    }
});