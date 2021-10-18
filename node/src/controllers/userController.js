const express = require('express');

const User = require('../models/User');

const router = express.Router();

router.post('/register', async function(req, res){
    const user = new User();

    if(isValidName(req.body.name)){
        user.name = req.body.name;
    }else{
        return res.send('Nome invalido');
    };

    if(isValidCPF(req.body.cpf)){
        user.cpf = req.body.cpf;
    }else{
        return res.send('CPF invalido');
    };

    user.birthDate = req.body.birthDate;

    user.save(function(err){
        if(err){
           return res.send('Erro ao cadastrar usuário')
        };

        res.json({message: 'Usuário cadastrado com sucesso!'});
    });
});

router.get('/register', async function(req, res){
    User.find(function(err, User){
        if(err){
           return res.send('Falha ao tentar selecionar os usuários');
        };

        res.json(User);
    });
});

router.get('/register/:User_id', async function(req, res){
    User.findById(req.params.User_id, function(err, User){
        if(err){
           return res.send('Id do usuário não encontrado');
         };

        res.json(User);
    });
})

router.put('/register/:User_id', async function(req, res){
    User.findById(req.params.User_id, function(err, User){
        if(err){
           return res.send('Falha ao encontrar Id');
        };

        if(isValidName(req.body.name)){
            User.name = req.body.name;
        }else{
            return res.send('Nome invalido');
        };

        if(isValidCPF(req.body.cpf)){
            User.cpf = req.body.cpf;
        }else{
           return res.send('CPF invalido');
        };

        User.birthDate = req.body.birthDate;

        User.save(function(err){
            if(err){
               return res.send('Falha ao atualizar usuário');
            };

            res.json({message: 'Usuário atualizado com sucesso!'});
        });
    });
});

router.delete('/register/:User_id', async function(req, res){
    User.findById(req.params.User_id, function(err, User){
        if(err || User == null){
           return res.send('Falha ao encontrar Id');
        };
        User.remove({
            _id: req.params.User_id
        }, function(err){
            if(err){
               return res.send('Falha ao excluir usuário');
            };

            res.json({message:'Usuário excluido com sucesso!'});
        });
    });
});

function isValidCPF(cpf) {
    cpf = cpf.toString().replace(/[^\d]+/g,'');	
    if(cpf == '') return false;	
    // Elimina CPFs invalidos conhecidos	
    if (cpf.length != 11 || 
        cpf == "00000000000" || 
        cpf == "11111111111" || 
        cpf == "22222222222" || 
        cpf == "33333333333" || 
        cpf == "44444444444" || 
        cpf == "55555555555" || 
        cpf == "66666666666" || 
        cpf == "77777777777" || 
        cpf == "88888888888" || 
        cpf == "99999999999")
            return false;		
    // Valida 1o digito	
    add = 0;	
    for (i=0; i < 9; i ++)		
        add += parseInt(cpf.charAt(i)) * (10 - i);	
        rev = 11 - (add % 11);	
        if (rev == 10 || rev == 11)		
            rev = 0;	
        if (rev != parseInt(cpf.charAt(9)))		
            return false;		
    // Valida 2o digito	
    add = 0;	
    for (i = 0; i < 10; i ++)		
        add += parseInt(cpf.charAt(i)) * (11 - i);	
    rev = 11 - (add % 11);	
    if (rev == 10 || rev == 11)	
        rev = 0;	
    if (rev != parseInt(cpf.charAt(10)))
        return false;		
    return true;   
};

function isValidName(name) {
//cria o filtro com os caracteres
    let iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?";
    //percorre o array comparando com o filtro
    for (let i = 0; i < name.length; i++) {
        if (iChars.indexOf(name.charAt(i)) != -1) {
            return false;
        };
    };
    return true;
};

module.exports = app => app.use('/auth', router);