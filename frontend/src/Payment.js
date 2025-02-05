import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import qrCode from "./assets/upi_qr.png"; // Ensure QR image exists in assets folder
import razorpayLogo from "./assets/razorpay_logo.png"; // Ensure this image is in assets folder
import "./Payment.css"; // Import CSS for styling

function Payment() {
  const location = useLocation();
  const [plan, setPlan] = useState("Basic");
  const [amount, setAmount] = useState(99);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setPlan(params.get("plan") || "Basic");
    setAmount(params.get("price") || 99);
  }, [location]);

  const handleRazorpayPayment = async () => {
    const options = {
      key: "rzp_test_EuuMWvK17BdETM", // Replace with actual Razorpay Key ID
      amount: amount * 100, // Convert to paise (₹1 = 100 paise)
      currency: "INR",
      name: "MoodSync",
      description: `Payment for ${plan} Plan`,
      image: "/logo.png",
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "Yogender",
        email: "yogendersingh257@gmail.com",
        contact: "9996298132",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="payment-container">
      {/* Background Video */}
      <video autoPlay loop muted className="payment-video">
        <source src="/videos/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for Blur Effect */}
      <div className="overlay"></div>

      {/* Payment Box */}
      <div className="payment-box">
        <h1 className="payment-header">Payment for {plan} Plan</h1>
        <p className="payment-price">Amount: ₹{amount}</p>

        {/* Payment Options (Two Equal Sections Side-by-Side) */}
        <div className="payment-options">
          {/* Razorpay Payment Section */}
          <div className="payment-method razorpay-section">
            <img src={razorpayLogo} alt="Razorpay" className="razorpay-logo" />
            <p className="payment-description">
              Secure and fast payment processing via Razorpay. Click below to proceed.
            </p>
            <button className="razorpay-button" onClick={handleRazorpayPayment}>
              Pay ₹{amount} via Razorpay
            </button>
          </div>

          {/* UPI QR Code Payment Section */}
          <div className="payment-method upi-section">
            <img src={qrCode} alt="UPI QR Code" className="qr-code" />
            <p className="upi-id">UPI ID: yogendersingh257@oksbi</p>
            <p className="upi-note">Use this method when Razorpay doesn't work</p>
          </div>
        </div>

        {/* Back to Pricing */}
        <a href="/pricing" className="glass-button">Back to Pricing</a>
      </div>
    </div>
  );
}

export default Payment;
