const express = require ('express');
const{verificaToken} = require('../middlewares/auth');
let app = express();
let Produto = require('../models/produto');

// ===========================
// Cria um novo produto
// ===========================
app.post('/produtos', verificaToken, (req, res) =>{
    let body = req.body;
    let produto = new Produto({
        usuario: req.usuario._id,
        nome: body.nome,
        precoUni: body.precoUni,
        descricao: body.descricao,
        disponivel: body.disponivel,
        categoria: body.categoria
    });

    produto.save((err, produtoDB)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(201).json({
            ok:true,
            produto: produtoDB
        });
    });
});

// ===========================
// Atualiza um produto
// ===========================
app.put('/produtos/:id', (req, res) =>{
    let id = req.params.id;
    let body = req.body;

    Produto.findById(id, (err, produtoDB) =>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!produtoDB){
            return res.status(400).json({
                ok: false,
                err:{
                    message:'O Produto Solicitado não Existe'
                }
            });
        }

        produtoDB.nome = body.nome;
        produtoDB.precoUni = body.precoUni;
        produtoDB.descricao = body.descricao;
        produtoDB.disponivel = body.disponivel;
        produtoDB.categoria = body.categoria;

        produtoDB.save((err, produtoSalvo)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok:true,
                produto: produtoSalvo
            });
        });
    });
});


// ===========================
// Lista Produtos
// ===========================
app.put('/produtos/:id', (req, res) =>{
    let desde = req.query.desde || 0;
    desde = Number(desde);
});
module.exports = app;