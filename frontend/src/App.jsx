import React, { useState } from 'react';
import './App.css';

export default function NetflixSubscription() {

  const availablePlans = [
    {
      planName: 'Basic',
      monthlyPrice: 199,
      videoQuality: 'SD',
      numberOfScreens: 1,
    },
    {
      planName: 'Standard',
      monthlyPrice: 499,
      videoQuality: 'HD',
      numberOfScreens: 2,
    },
    {
      planName: 'Premium',
      monthlyPrice: 649,
      videoQuality: '4K',
      numberOfScreens: 4,
    }
  ];

  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const handleSubscribe = async (plan) => {

    if (!userName.trim()) {
      setError('Please enter your name before subscribing.');
      return;
    }
    setError('');

    const subscriptionData = {
      userName: userName,
      planName: plan.planName,
      monthlyPrice: plan.monthlyPrice,
      videoQuality: plan.videoQuality,
      numberOfScreens: plan.numberOfScreens,
      status: 'Active'   
    };

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      });

      const result = await response.json();

      if (response.ok) {
        setSelectedSubscription(result);
        alert('Subscription saved to Database!');
      } else {
        alert('Failed to save: ' + result.message);
      }
    } catch (err) {
      console.error("Error connecting to server:", err);
      setError('Server error: Is the backend running?');
    }
  };

  const handleReset = () => {
    setSelectedSubscription(null);
    setUserName('');
    setError('');
  };

  return (
    <div className="netflix-app">
      <header>
        <h1 className="logo">NETFLIX</h1>
        <span className="sub-header">Subscription Manager</span>
      </header>

      {selectedSubscription ? (

        
        <div className="summary-card">
          <div className="summary-header">
            <h2>Subscription Confirmed</h2>
            <span className="status-tag">
              {selectedSubscription.status}
            </span>
          </div>

          <div className="summary-details">
            <div className="summary-row">
              <span>Account Name</span>
              <span>{selectedSubscription.userName}</span>
            </div>
            <div className="summary-row">
              <span>Plan Type</span>
              <span>{selectedSubscription.planName}</span>
            </div>
            <div className="summary-row">
              <span>Monthly Cost</span>
              <span>₹{selectedSubscription.monthlyPrice}</span>
            </div>
            <div className="summary-row">
              <span>Video Quality</span>
              <span>{selectedSubscription.videoQuality}</span>
            </div>
            <div className="summary-row">
              <span>Screens</span>
              <span>{selectedSubscription.numberOfScreens}</span>
            </div>
          </div>

          <button onClick={handleReset} className="btn-cancel">
            Cancel Plan
          </button>
        </div>

      ) : (

        
        <div className="main-content">

          <div className="input-group">
            <h2 className="section-title">Enter your name</h2>
            <input
              type="text"
              placeholder="Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="name-input"
            />
            {error && <p className="error-msg">{error}</p>}
          </div>

          <h2 className="section-title">Choose your plan</h2>

          <div className="plans-container">
            {availablePlans.map((plan, index) => (
              <div
                key={index}
                className={`plan-card ${plan.planName === 'Premium' ? 'premium' : ''}`}
              >

                {plan.planName === 'Premium' && (
                  <span className="badge">Best Value</span>
                )}

                <h3 className="plan-name">{plan.planName}</h3>
                <div className="plan-price">₹{plan.monthlyPrice}</div>

                <ul className="features">
                  <li>
                    <span>Quality</span>
                    <span className="feature-value">{plan.videoQuality}</span>
                  </li>
                  <li>
                    <span>Screens</span>
                    <span className="feature-value">{plan.numberOfScreens}</span>
                  </li>
                  <li>
                    <span>Downloads</span>
                    <span className="feature-value">Included</span>
                  </li>
                </ul>

                <button
                  onClick={() => handleSubscribe(plan)}
                  className={`btn-subscribe ${plan.planName === 'Premium' ? 'red' : ''}`}
                >
                  Subscribe
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
