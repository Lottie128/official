<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
$password = $input['password'] ?? '';
$page = $input['page'] ?? '';

// Page-specific passwords
$passwords = [
    'business_plan' => getenv('BUSINESS_PLAN_PASSWORD') ?: 'z3roAI$2024!',
    'bcm_proposal' => 'bcm@docs123#',
    'robotics_training' => 'bcm@docs123#'
];

if (!isset($passwords[$page])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid page']);
    exit();
}

if ($password === $passwords[$page]) {
    // Log access (optional)
    $log_file = __DIR__ . '/logs/doc_access.log';
    $log_dir = dirname($log_file);
    
    if (!is_dir($log_dir)) {
        mkdir($log_dir, 0755, true);
    }
    
    $log_entry = date('Y-m-d H:i:s') . " - Page: {$page}, IP: {$_SERVER['REMOTE_ADDR']}\n";
    file_put_contents($log_file, $log_entry, FILE_APPEND);
    
    echo json_encode([
        'status' => 'success',
        'message' => 'Authentication successful'
    ]);
} else {
    http_response_code(401);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid password'
    ]);
}
