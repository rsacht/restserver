const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload());

app.put('/upload', function(req, res) {
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

    arquivo.mv('/uploads/filename.jpg', (err) => {
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