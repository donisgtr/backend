/* vou importar as funcionalidades do express para aqui */
const express = require('express');

/* vou instanciar ele aqui */
const app = express();

/* provalvelmente esse dados vem de uma conexão do banco de dados */
/* jsonplaceholder.typicode.com/users */
const data = require('./data.json');

/* Resource um objeto, tem relacionamentos, uma serie de metodos

Verbos HTTP:

GET: Recebe dados de um Resource. 
POST: Envia dados ou informaçoes para serem processados por um Resource.
PUT: Atualiza os dados de um Resource.
DELETE: Delete os dados de um Resource. 

Voce precisa coloca os verbos na sua API 

O endpoint e o meu Resource, e o bloco e notas.

URI é o endereço da minha API na internet.  */


/* para usar os verbos HTTP com o express e simples. app.get(+nome do endpoint)*/

/* o express pemite usar callbacks function no verbos */

/* o express precisa usar o Json */
app.use(express.json());

app.get("/clients", function (req, res) {
    res.json(data);
});

app.get("/clients/:id", function (req, res) {
    const { id } = req.params
    const client = data.find(cli => cli.id == id)

    if(!client) return res.status(404).json();

    res.json(client);

}); 


app.post("/clients", function (req, res) {
    const { name, email } = req.body;

    // aqui precisaria criar a rotina de salvar o formulario;

    // e depois responder se deu tudo certo;

    res.json({ name, email });

});


app.put("/clients/:id", function (req, res) {
    const { id } = req.params
    const client = data.find(cli => cli.id == id)
    if(!client) return res.status(404).json();
    const { name } = req.body;
    client.name = name;
    res.json(client);
});


app.delete("/clients/:id", function (req, res) {
    const { id } = req.params
    const clientsFiltered = data.filter(client => client.id !== id);
    res.json(clientsFiltered);
});


/* vou pedir para o express ficar ouvir a porta 3000 agora */
app.listen(3000, function () {
    console.log("Server is running");
});

