const axios = require('axios');

module.exports = {
    gerarTesteUnitario(linguagem, metodo) {
      let attPrompt = `"#${linguagem}\n${metodo}\n# Gerar teste unitario e testes mutantes\n\n#"`

    //   var options = {
    //     'method': 'POST',
    //     'url': 'https://api.openai.com/v1/completions',
    //     'headers': {
    //       'Content-Type': 'application/json',
    //       'Authorization': 'Bearer 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'
    //     },
    //     body: JSON.stringify({
    //       "model": "text-davinci-003",
    //       "prompt": attPrompt,
    //       "temperature": 0,
    //       "max_tokens": 182,
    //       "top_p": 1,
    //       "frequency_penalty": 0,
    //       "presence_penalty": 0,
    //       "stop": [
    //         "###"
    //       ]
    //     })
      
    //   };
      
    //   return new Promise(function (resolve, reject) {
    //       request(options, function (error, response) {
    //           if (error) reject(error);
    //           console.log(response);
    //           console.log(error);
    //           resolve(response.body);
    //       });
    //     });

        var data = JSON.stringify({
            "model": "text-davinci-003",
            "prompt": attPrompt,
            "temperature": 0,
            "max_tokens": 500,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0,
            "stop": [
              "###"
            ]
        });
        var config = {
            method: 'post',
            url: 'https://api.openai.com/v1/completions',
            headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer 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'
          },
            data: data
        };

        return new Promise(function (resolve, reject) {
          axios(config)
              .then(function (response) {
                  console.log(response);
                  resolve(response)
              })
              .catch(function (error) {
                  console.log(error);
              });
        });
    }
}