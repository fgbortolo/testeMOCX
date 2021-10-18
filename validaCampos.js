      $("#cpf").mask("000.000.000-00");

      function isValidName() {
          //cria o filtro com os caracteres
            let iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?";
            //percorre o array comparando com o filtro
            for (var i = 0; i < document.getElementById("name").value.length; i++) {
                if (iChars.indexOf(document.getElementById("name").value.charAt(i)) != -1) {
                    return false
                }
            }
            
            return true;
        }
        

        function isValidCPF() {
        let cpf = document.getElementById("cpf").value;	
            cpf = cpf.replace(/[^\d]+/g,'');	
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
                return false	
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
            if (rev != parseInt(cpf.charAt(10))){
                return false;
            }else{
                return true;   
            }
            
        }

        // Example starter JavaScript for disabling form submissions if there are invalid fields
        (function () {
            'use strict'

            let forms = document.querySelectorAll('.needs-validation')
            Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
        
                form.classList.add('was-validated')
                }, false)
            })
        })()
