<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "PHP Version: " . phpversion() . "<br>";

// Test database connection
try {
    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=espocrm', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✓ Database connection successful!<br>";
    
    // Test query
    $stmt = $pdo->query("SELECT DATABASE()");
    $db = $stmt->fetch();
    echo "✓ Current database: " . $db[0] . "<br>";
    
} catch(PDOException $e) {
    echo "✗ Database error: " . $e->getMessage() . "<br>";
}

// Check if files are writable
$paths = [
    'data/cache',
    'data/logs',
    'data/tmp',
    'data/upload'
];

foreach ($paths as $path) {
    $fullPath = __DIR__ . '/' . $path;
    if (is_writable($fullPath)) {
        echo "✓ $path is writable<br>";
    } else {
        echo "✗ $path is NOT writable<br>";
    }
}
?>
```

Access: `http://localhost/tpdcrm/check_error.php`

## Step 2: Check EspoCRM Error Log

Open this file in a text editor:
```
C:\xampp\htdocs\tpdcrm\data\logs\espo.log