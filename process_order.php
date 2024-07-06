<?php
// process_order.php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $address = $_POST['address'];
    $city = $_POST['city'];
    $state = $_POST['state'];
    $zip = $_POST['zip'];
    $country = $_POST['country'];
    $phone = $_POST['phone'];
    $notes = $_POST['notes'];
    $cart = json_decode($_POST['cart'], true);
    $total = $_POST['total'];

    // Sanitize and validate inputs
    // Additional validation and sanitization can be added here

    // Prepare the order details
    $orderDetails = "Order Details:\n\n";
    foreach ($cart as $item) {
        $orderDetails .= "Product: " . $item['title'] . " - Price: #" . $item['price'] . ".00\n";
    }
    $orderDetails .= "\nTotal Amount: #" . $total . ".00";

    // Email content for the customer
    $customerSubject = "Your Order Confirmation";
    $customerMessage = "Dear $name,\n\nThank you for your order. Here are the details:\n\n" . $orderDetails;
    $customerHeaders = "From: no-reply@sh_feet.com";

    // Email content for the seller
    $sellerSubject = "New Order Placed";
    $sellerMessage = "A new order has been placed.\n\nCustomer Details:\nName: $name\nEmail: $email\nAddress: $address, $city, $state, $zip, $country\nPhone: $phone\n\nOrder Notes:\n$notes\n\n" . $orderDetails;
    $sellerHeaders = "From: no-reply@sh_feet.com";

    // Send emails
    $customerMailSent = mail($email, $customerSubject, $customerMessage, $customerHeaders);
    $sellerMailSent = mail('ejabena@gmail.com', $sellerSubject, $sellerMessage, $sellerHeaders);

    // Check if emails were sent successfully
    if ($customerMailSent && $sellerMailSent) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}
?>
