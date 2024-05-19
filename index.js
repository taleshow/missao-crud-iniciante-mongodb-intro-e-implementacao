const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

const lista = ['java', 'kotlin', 'android']
//             0         1         2

// Endpoint Read all [GET] /personagem
app.get('/personagem', function (req, res) {
   res.send(lista.filter(Boolean))
})

// Endpoint Read By ID [GET] /personagem/:id
app.get('/personagem/:id', function (req, res) {
  // Acessamos o parametro de rota ID
  const id = req.params.id

  //acessa o item na lista usando o ID - 1
  const item = lista[id - 1]

  //enviamos o item como resposta
  res.send(item)
})

//sinaliso para o Express que estamos usando JSON no Body
app.use(express.json())

// endpoint create [post] /personagem
app.post('/personagem', function (req, res) {
  //acessamos o Body da requisicão
  const body = req.body

//acessamos a propriedade `nome` do body
const novoItem = body.nome

//checar se o `nome` esta presente no body
if(!novoItem) {
  return res.status(400).send('corpo da requisicão deve conter a propriedade `nome`.')
}

//checar se o novoItem estar na lista ou nao
if (lista.includes(novoItem)) {
  return res.status(409).send('Esse item ja existe na lista.')
}

// Adicionamos na Lista
lista.push(novoItem)

//exibimos uma mensagem de sucesso
  res.send('Item adicionado com sucesso ' + novoItem)
})

// endpoint updade [put] /personagem/:id
app.put('/personagem/:id', function (req, res) {
  //acessamos o Id dos parametros de rota
  const id = req.params.id

  //acessamos o Body da requisicão
  const body = req.body

  //acessamos a propriedade 'nome' do body
  const novoItem = body.nome

  //checar se o `nome` esta presente no body
  if(!novoItem) {
    return res.send('corpo da requisicão deve conter a propriedade `nome`.')
  }
  
  //checar se o novoItem estar na lista ou nao
  if (lista.includes(novoItem)) {
    return res.send('Esse item ja existe na lista.')
  }

  // Atualizamos na lista o novoItem pelo ID - 1
  lista[id - 1] = novoItem

  //Enviamos uma mesagem de sucesso
  res.send('Item atualizado com sucesso: ' + id + ' - ' + novoItem)

  })

  //Endpoint Delete [DELETE] /personagem/:id
  app.delete('/personagem/:id', function (req, res) {
    //acessamos o parãmetro de rota
    const id = req.params.id

    //remover o item da lista usando o ID - 1
    delete lista[id - 1]

    //Enviamos uma mensagem de sucesso
    res.send('Item removido com sucesso' + id)
  })

app.listen(3000)