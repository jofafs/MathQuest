<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/PHPMailer-master/src/Exception.php';
require 'vendor/PHPMailer-master/src/PHPMailer.php';
require 'vendor/PHPMailer-master/src/SMTP.php';
require 'db.php'; // This should already connect to your DB

// --- Handle CORS Preflight ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    http_response_code(204);
    exit;
}

// --- Regular CORS Headers ---
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

// --- Parse JSON input ---
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Email is required']);
    exit;
}

$email = $data['email'];

// 1. Check if user exists
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user) {
    echo json_encode(['status' => 'error', 'message' => 'No user found with that email']);
    exit;
}

// 2. Generate reset token
$token = bin2hex(random_bytes(32));
$expires = date("Y-m-d H:i:s", strtotime("+1 hour"));

// 3. Store in database
$stmt = $conn->prepare("INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?) 
                        ON DUPLICATE KEY UPDATE token = VALUES(token), expires_at = VALUES(expires_at)");
$stmt->bind_param("sss", $email, $token, $expires);
$stmt->execute();

// 4. Send reset email
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'nunez.judison@gmail.com'; // Your Gmail address
    $mail->Password = 'hhahufirawrkirjt'; // Your Gmail app password (no spaces)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Sender/recipient
    $mail->setFrom('nunez.judison@gmail.com', 'MathQuest Support');
    $mail->addAddress($email);

    $resetLink = "http://localhost:3000/reset-password?token=$token"; // Adjust to your frontend domain

    // Email content
    $mail->isHTML(true);
    $mail->Subject = 'Reset your MathQuest password';
    $mail->Body    = "
        <h2>Reset Your Password</h2>
        <p>Hello,</p>
        <p>Click the button below to reset your password. This link will expire in 1 hour.</p>
        <a href='$resetLink' style='
            padding: 10px 15px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;'>Reset Password</a>
        <p>If you did not request a password reset, please ignore this email.</p>
    ";

    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'Reset email sent successfully']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Email could not be sent. Error: ' . $mail->ErrorInfo]);
}
