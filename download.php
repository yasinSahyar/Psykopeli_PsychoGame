<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Download file using php</title>
</head>
<body>
    <h2>Download file from HERE:</h2>
    <form method="post" action="download.php">
        <input type="submit" name="download" value="Download zehra.jpg">
    </form>
</body>
</html>

<?php

     if(isset($_POST["download"])) {
         $file = 'zehra.jpg';
            if (file_exists($file)) {
            header('Content-Description: File Transfer');
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename="' . basename($file) . '"');
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            header('Content-Length: ' . filesize($file));
            ob_clean();
            flush();
            readfile($file);
            exit;

            } else {

                echo 'This File Does not exist...';

            }

            }

        ?>