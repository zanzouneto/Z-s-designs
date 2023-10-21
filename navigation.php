<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $to = "zeina.m.saade@gmail.com"; 
    $subject = "New Contact Form Submission";
    $headers = "From: " . $email;

    mail($to, $subject, $message, $headers);
    echo "Email sent!";
}
?>
