<?php 


include_once(__DIR__.'/Manager.php');

class ModelManager extends Manager { 

    function getQuestions(){

        try {
 
            $db= $this->dbConnect();
 
            $questions = $db->prepare('SELECT * FROM questions_reponses;');
            $questions->execute();
 
            $reqs = $questions->fetchAll();
            $toArray = json_encode($reqs);
 
            //$toArray = $reqs;
            //var_dump($reqs);
 
            return $toArray;
 
        } catch (Exception $e) {
            echo('test');
            echo 'Exception reçue : ',  $e->getMessage(), "\n";
        }
 
    }

    function addQuestions($questions, $reponse1, $reponse2 , $reponse3, $reponse4 ,$validation) {

        try {
        $db= $this->dbConnect();
        

        $req = $db->prepare('INSERT INTO questions_reponses(questions, reponse1, reponse2 , reponse3, reponse4 , validation) 
        VALUES (?,?,?,?,?) ');
        $nouveauContact = $req->execute(array($questions, $reponse1, $reponse2 , $reponse3, $reponse4 ,$validation));

        return $nouveauContact;

    } catch (Exception $e){
        echo $e->getMessage();
    }
    

    }

}