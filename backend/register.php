<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

// Debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Decode incoming JSON
$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields
if (
    empty($data['firstName']) ||
    empty($data['lastName']) ||
    empty($data['email']) ||
    empty($data['password']) ||
    empty($data['role'])
) {
    echo json_encode(["status" => "error", "message" => "Missing required fields."]);
    exit;
}

// Map frontend camelCase to DB snake_case
$first_name = $data['firstName'];
$last_name = $data['lastName'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);
$role = $data['role'];

// Check if email exists
$check = $conn->prepare("SELECT id FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Email already exists."]);
    $check->close();
    exit;
}
$check->close();

// Insert user into DB
$stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $first_name, $last_name, $email, $password, $role);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Registered successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Registration failed. Server error."]);
}

$stmt->close();
$conn->close();
?>
