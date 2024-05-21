const express = require('express');
const { MongoClient, Collection, ObjectId } = require('mongodb');

// preparamos as informacões de acesso ao banco de dados
const dbUrl =
  'mongodb+srv://admin:ra7em1he5@cluster0.uaufxov.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const dbName = 'mongodb-intro-e-implementacao'

//declarmos a funcao main
async function main() {
  // realizamos a coneccão com o banco de dados
  const client = new MongoClient(dbUrl);
  console.log("conectando ao banco de dados...");
  await client.connect()
  console.log("banco de dados conectado com sucesso");

const db = client.db(dbName)
const collection = db.collection('personagem')

  const app = express()

  app.get('/', function (req, res) {
    res.send("Hello World");
  });

  const lista = ["java", "kotlin", "Android"]
  //             0         1         2

  // Endpoint Read all [GET] /personagem
  app.get('/personagem', async function (req, res) {
    // acessamos a lista de itens na collection do MongoDB
      const itens = await collection.find().toArray()

    // Enviamos a lista de itens como resultado
    res.send(itens)
  })

  // Endpoint Read By ID [GET] /personagem/:id
  app.get("/personagem/:id", async function (req, res) {
    // Acessamos o parametro de rota ID
    const id = req.params.id;

    //acessa o item na collection usando o ID
const item = await collection.findOne({ _id: new ObjectId(id)})

//chegar se o item obtido e existente
if (!item){
  return res.status(404).send('item nao escontrado')
}


    //enviamos o item como resposta
    res.send(item);
  });

  //sinaliso para o Express que estamos usando JSON no Body
  app.use(express.json());

  // endpoint create [post] /personagem
  app.post("/personagem", async function (req, res) {
    //acessamos o Body da requisicão
    const novoItem = req.body;

   

    //checar se o `nome` esta presente no body
    if (!novoItem || !novoItem.nome) {
      return res.status(400).send("corpo da requisicão deve conter a propriedade `nome`.");
    }

    //checar se o novoItem estar na lista ou nao
    // if (lista.includes(novoItem)) {
    //   return res.status(409).send("Esse item ja existe na lista.");
    // }

    // Adicionamos na collection
    await collection.insertOne(novoItem)

    //exibimos uma mensagem de sucesso
    res.status(201).send(novoItem);
  });

  // endpoint updade [put] /personagem/:id
  app.put("/personagem/:id", function (req, res) {
    //acessamos o Id dos parametros de rota
    const id = req.params.id;

    //acessamos o Body da requisicão
    const body = req.body;

    //acessamos a propriedade 'nome' do body
    const novoItem = body.nome;

    //checar se o `nome` esta presente no body
    if (!novoItem) {
      return res.send("corpo da requisicão deve conter a propriedade `nome`.");
    }

    //checar se o novoItem estar na lista ou nao
    if (lista.includes(novoItem)) {
      return res.send("Esse item ja existe na lista.");
    }

    // Atualizamos na lista o novoItem pelo ID - 1
    lista[id - 1] = novoItem;

    //Enviamos uma mesagem de sucesso
    res.send("Item atualizado com sucesso: " + id + " - " + novoItem);
  });

  //Endpoint Delete [DELETE] /personagem/:id
  app.delete("/personagem/:id", function (req, res) {
    //acessamos o parãmetro de rota
    const id = req.params.id;

    //remover o item da lista usando o ID - 1
    delete lista[id - 1];

    //Enviamos uma mensagem de sucesso
    res.send("Item removido com sucesso" + id);
  });

  app.listen(3000);
}
//executamos a funcao main()
main();
