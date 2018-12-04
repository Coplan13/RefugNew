$(function() {

    // Variable
    var validInformation = true;
    // Ajax request
    $.post({
        url :'/../codeRefugNum/src/Controller/GetQuestions.php',

        success : function(code_html, data, statut){
            
            //json_encode($toJson)
            /*$('.testResponse').append('<p class="reponse">'+ reponseBdd+'</p>');*/
            var listeDeQuestions = jQuery.parseJSON(code_html);
            var questionsPosees = [];
            
            //$('.testResponse').append('<h1>'+ listeDeQuestions.question1.question+'</h1>');
            var newQuest = giveRandomQuest(0, 18);
            $('.question').append('<h1>'+ listeDeQuestions[newQuest][1]+'</h1>');
            $('.reponses').append('<div><input type="checkbox" id="reponse1" name="reponse1"><label for='+listeDeQuestions[newQuest][2]+'>'+listeDeQuestions[newQuest][2]+'</label></div>');
            $('.reponses').append('<div><input type="checkbox" id="reponse2" name="reponse2"><label for='+listeDeQuestions[newQuest][3]+'>'+listeDeQuestions[newQuest][3]+'</label></div>');
            $('.reponses').append('<div><input type="checkbox" id="reponse3" name="reponse3"><label for='+listeDeQuestions[newQuest][4]+'>'+listeDeQuestions[newQuest][4]+'</label></div>');
            $('.reponses').append('<div><input type="checkbox" id="reponse4" name="reponse4"><label for='+listeDeQuestions[newQuest][5]+'>'+listeDeQuestions[newQuest][5]+'</label></div>');
            var compteur = 0;
            var nbBonneRep = 0;
            var nbMauvaiseRep = 0; 
            var validation = listeDeQuestions[newQuest][6];

            var longueurDuQuizz = 10;
            var nbPourObtention = 8;
        
            $('.validButton').click(function(e){
                compteur++;
                if(questionsPosees.length <= longueurDuQuizz){
                    if(compteur==1){
                        var bonneRep = isGoodResult(validation);
                        if(bonneRep == true){
                            nbBonneRep += 1;
                        }else{
                            nbMauvaiseRep += 1;
                        }
                        var newQuest = giveRandomQuest(0, 18);
                    }else{
                        var bonneRep = isGoodResult(listeDeQuestions[questionsPosees[compteur-1]][6]);
                        if(bonneRep == true){
                            nbBonneRep += 1;
                        }else{
                            nbMauvaiseRep += 1;
                        }
                        var newQuest = giveRandomQuest(0, 18);
                    }                    
                    $( ".question" ).empty();
                    $( ".reponses" ).empty();

                    if(questionsPosees.length == longueurDuQuizz+1){
                        $('.question').append('<h1> Quiz terminé</h1>');
                        $('.reponses').append('<p>Cliquez sur valider pour voir votre résultat</p>');
                    }
                    else{
                        $('.question').append('<h1>'+ listeDeQuestions[newQuest][1]+'</h1>');
                        var quatreRep = 0;
                        for(var j = 2; j<=5; j++){
                            quatreRep++;
                            $('.reponses').append('<div><input type="checkbox" class="checkbox" name="reponse'+quatreRep+'"><label for='+listeDeQuestions[newQuest][j]+'>'+listeDeQuestions[newQuest][j]+'</label></div>');
                        }
                    }
                    
                }else{
                    var stringResult = codeObtenu(nbBonneRep, nbPourObtention);
                    $( ".question" ).empty();
                    $( ".reponses" ).empty();
                    $('.question').append('<p>Test fini</p>');
                    $('.reponses').append('<p>'+stringResult+'</p><p>Nombres de bonnes réponses : '+nbBonneRep+'</p><p>Nombres de mauvaises réponses : '+nbMauvaiseRep+'</p>');
                    $( '.myButton' ).empty();
                    $('.myButton').append('<button class="correction">Voir la correction</button>')
                    compteur=0;
                }
            });

            function giveRandomQuest(min, max){
                //min est 0 et max est le nombre de ligne en bdd
                var result = Math.floor((Math.random() * (Math.floor(max) - Math.ceil(min) +1) + Math.ceil(min)));
                while(questionsPosees.includes(result) || compteur == max){
                    result= Math.floor((Math.random() * (Math.floor(max) - Math.ceil(min) +1) + Math.ceil(min)));
                }
                questionsPosees.push(result);
                console.log(questionsPosees);
                return result;
            }
            function isGoodResult(codeBDD) {
                var myCodeRep = "";
                for(var i =1; i<=4; i++){
                    var checked = $('input[name="reponse' + i + '"]:checked').length;
                    if(checked == 1){
                        myCodeRep += "1";
                    }else{
                        myCodeRep += "0";
                    }
                }
                    console.log("Code User = "+myCodeRep);
                    console.log("Code en BDD = " + codeBDD);

                    if(codeBDD == myCodeRep){
                        return true;
                    }else{
                        return false;
                    }
                               
                if (checked == 0) {
                  return false;
                } else {
                  return true;
                }
              }

              function codeObtenu(nbBonneRep, condObtention){
                if(nbBonneRep >= condObtention){
                    var finalResult = "Félicitation vous avez obtenu le code de la route";
                    return finalResult;
                }else{
                    var finalResult = "Dommage, vous avez raté le code de la route";
                    return finalResult;
                }
              }
        },
        error : function(resultat, statut, erreur){
            console.log("error");

        }

    });

  
});