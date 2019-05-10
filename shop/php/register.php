<?php
    $u = @$_REQUEST["username"];
    $p = @$_REQUEST["pass"];

    // 连接mysql
    $link = @mysql_connect("localhost:3306","root","root");
    if(!$link){
        echo '{"code":0,"msg":"'.mysql_error().'"}';
    }

    // 连接数据库
    $db = @mysql_select_db("shop");
    if(!$db){
        echo '{"code":0,"msg":"'.mysql_error().'"}';
    }

    // 设置字符集
    $utf = mysql_query("set names utf8");
    if(!$utf){
        echo '{"code":0,"msg":"'.mysql_error().'"}';
    }

    $q = mysql_query('INSERT user (username,password) VALUE ("'.$u.'","'.$p.'")');
    if($q){
        echo select();
    }else{
        if(!$q){
            echo '{"code":0,"msg":"'.mysql_error().'"}';
        }
    }

    function select(){
        $data = mysql_query('SELECT * FROM user');
        $str = "";
        while($arr = mysql_fetch_assoc($data)){
            $str = $str . json_encode($arr) . ",";
        }
        return "[".substr($str,0,-1)."]";
    }


?>