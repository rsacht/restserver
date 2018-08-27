const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const Usuario = require('../models/usuario');

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
        imagemUsuario(id, res);
    });
});

function imagemUsuario(id, res){
    Usuario.findById(id, (err, usuarioDB) =>{
        if(err){
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
            })
        }
    });
}

module.exports = app;