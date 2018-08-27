const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload());

app.put('/uploads/:tipo/:id', function(req, res) {
    let tipo = req.params.tipo;
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

    arquivo.mv(`uploads/${arquivo.name}`, (err) => {
        if (err)
            return res.status(500).json({
                ok: false,
                err
            });    
        res.json({
            ok:true,
            message:'Upload de arquivo realizado com sucesso!'
        });
    });
});

module.exports = app;