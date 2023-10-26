<?php
function test_input($data) {
        $data = strip_tags($data);		
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
?>