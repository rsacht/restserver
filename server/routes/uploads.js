const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const Usuario = require('../models/usuario');
const fs = require('fs');
const path = require('path');

// default options
app.use(fileUpload());

app.put('/uploads/:destinatario/:id', function(req, res) {
    let destinatario = req.params.destinatario;
    let id = req.params.id;

    if (!req.files){
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'Não há arquivos para upload.'
            }
        });
    }
    //Validação do Destinatário do Arquivo
    let destValidos = ['produtos', 'usuarios'];

    if(destValidos.indexOf(destinatario) < 0){
        return res.status(400).json({
            ok: false,
            err:{
                message: 'Os destinatários permitidos são: ' + destValidos.join(', ')
            }
        });
    }
    let arquivo = req.files.arquivo;
    let nomeCortado = arquivo.name.split('.');
    let extensao = nomeCortado[nomeCortado.length -1];

    //Extensões de arquivos permitidas
    let extensoesValidas = ['png','jpg','jpeg','gif'];

    if(extensoesValidas.indexOf(extensao) < 0){
        return res.status(400).json({
            ok: false,
            err:{
                message: 'As extensões permitidas são: ' + extensoesValidas.join(', '),
                ext: extensao
            }
        });
    }

    //Mudando o nome do arquivo 
    //Deve ser único para não subscrever o mais antigo
    let nomeArquivo = `${id}-${new Date().getMilliseconds()}.${extensao}`;

    arquivo.mv(`uploads/${destinatario}/${nomeArquivo}`, (err) => {
        if (err)
            return res.status(500).json({
                ok: false,
                err
            });    
        //A imagem é carregada aqui
        imagemUsuario(id, res, nomeArquivo);
    });
});

function imagemUsuario(id, res, nomeArquivo){
    Usuario.findById(id, (err, usuarioDB) =>{
        if(err){
            excluirArquivo(nomeArquivo, 'usuarios');
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message: 'Este usuário não existe!'
                }
            });
        }

        excluirArquivo(usuarioDB.img, 'usuarios');

        //Atualiza o Nome da Imagem no Banco de Dados
        usuarioDB.img = nomeArquivo;
        usuarioDB.save((err, usuarioAtualizado)=>{
            res.json({
                ok:true,
                usuario: usuarioAtualizado,
                img: nomeArquivo
            });
        });
    });
}

function excluirArquivo(nomeArquivo, destinatario){
    //Excluindo a Imagem Anterior do Usuário
    //Define o caminho do arquivo anterior com base no nome da imagem no banco de dados
    let pathImagem = path.resolve(__dirname, `../../uploads/${destinatario}/${nomeArquivo}`);
    //Verifica se a imagem existe no servidor
    if(fs.existsSync(pathImagem)){
        //Se sim, exclui a imagem
        fs.unlinkSync(pathImagem);
    }
}

module.exports = app;