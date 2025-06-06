<?php
// Handle CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 86400"); // Cache CORS preflight for 1 day
header("Content-Type: application/json");

// Respond to preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include database connection
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

// Check if email already exists
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

// Insert user into the database
$stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $first_name, $last_name, $email, $password, $role);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Registered successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Registration failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
