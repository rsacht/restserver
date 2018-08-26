const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload());

app.put('/uploads', function(req, res) {
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
                message: 'As extensões permitidas são: ' + extensoesValidas.join(', ')
            }
        });
    }

    arquivo.mv('uploads/filename.jpg', (err) => {
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