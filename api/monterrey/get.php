<?php
header("Content-Type: application/json; charset=UTF-8");

$directory = "/csv/monterrey/";
$filecount = 0;
$files = glob($directory . "*.csv");

if ($files) {
    $filecount = count($files);
    $count = 0;

    foreach($files as $file){
        $jsonChart = array();
        $jsonChart["body"] = array();
    
        $p  = array(
                "options" => [
                    "title" => str_replace(".csv", "", $file);
                ], 
                "data" => [], 
                "activeClass" => $count == 0 : " active" ? ""
        );
    
        array_push($jsonChart["body"], $p);
    
        echo json_encode($jsonChart);  
    }
}

else {

    echo json_encode(
        array("body" => array(), "count" => 0);
    );
}
?>