<?php 



ini_set("default_charset", "UTF-8");
//define('DEBUG', false);
//ini_set("display_errors", "Off");
//error_reporting(0);


function stdout($s){

    if ( is_string($s) ){
        file_put_contents("php://stdout", $s . PHP_EOL);
    }else{
        file_put_contents("php://stdout", var_export( $s , TRUE) . PHP_EOL);
    }

}

if ( array_key_exists("SERVER_PROTOCOL", $_SERVER) )
    define("php_run_env", "http");
else 
    define("php_run_env", "not-http");

define("always_file_hash_for_tag", true);
///////////////////////////////////////

function file_name_and_hash($fn)
{
    $result_str = $fn ;
    if ( file_exists($fn) && ( always_file_hash_for_tag || php_run_env == "http"   ) )
    {
        $result_str .= "?v=" . sha1_file($fn); 
    }
    return $result_str;
}

function file_name_and_time($fn)
{
    $result_str = $fn ;
    if ( file_exists($fn) && ( always_file_hash_for_tag || php_run_env == "http"   ) )
    {
        $result_str .= "?v=" . filemtime($fn); 
    }
    return $result_str;
}



function generate_tag($tag, $fn, $id)
{
    if ($tag == "script")
    {
        $tagN = "script";
        $additional = "type='text/javascript'";
        $srcN = "src";
        
    }
    if ($tag == "css")
    {
        $tagN = "link";
        $additional = "rel='stylesheet' type='text/css'";
        $srcN = "href";
    }
    echo "<$tagN $additional $srcN='";
    
    echo file_name_and_hash($fn) . "'";
    
    if($id) 
        echo " id='${id}' ";
    
    echo "></$tagN> \n" ;
}
function scripttag($fn, $id=false)
{
    generate_tag("script", $fn, $id);
}
function csstag($fn, $id=false)
{
    generate_tag("css", $fn, $id);
}

function getUserLang(){
    //stdout($_SERVER );
    
    if (php_run_env != "http") return "undetermined";
    
    if ( array_key_exists("hl", $_GET) )
        return $_GET["hl"];
    else if ( array_key_exists("hl", $_COOKIE) )
        return $_COOKIE["hl"];
    else if ( array_key_exists("Accept-Language", getallheaders()) )
        return substr(getallheaders()["Accept-Language"], 0, 2) ;
    else
        return "en";
}
define("lang",getUserLang());

?>
