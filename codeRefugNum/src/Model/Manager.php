<?php



class Manager 
{

    protected function dbConnect()
        {
            $db = new PDO('mysql:host=localhost:8889;dbname=code_route;charset=utf8', 'root', 'root');

            return $db;

        }
}