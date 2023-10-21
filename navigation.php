<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $fromEmail = $_POST['email'];
    $message = $_POST['message'];

    $toEmail = "zeina.m.saade@gmail.com";  // Replace with your email
    $subject = "New message from " . $name;
    $headers = "From: " . $fromEmail;

    if (mail($toEmail, $subject, $message, $headers)) {
        echo "Email sent successfully!";
    } else {
        echo "There was an error sending the email.";
    }
}
?>
