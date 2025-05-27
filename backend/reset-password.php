<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data['email'])) {
    echo json_encode(['status' => 'error', 'message' => 'Email is required']);
    exit;
}

$email = $data['email'];
$token = bin2hex(random_bytes(16));
$expires = date("Y-m-d H:i:s", strtotime("+1 hour"));

require 'db.php';

// Store the token in your database
$stmt = $conn->prepare("UPDATE users SET reset_token = ?, token_expires = ? WHERE email = ?");
$stmt->bind_param("sss", $token, $expires, $email);
$stmt->execute();

if ($stmt->affected_rows === 0) {
    echo json_encode(['status' => 'error', 'message' => 'No user found with that email']);
    exit;
}

// Send email using PHPMailer
require 'send_reset_email.php';
