"use client";
import React, { useState, useEffect } from "react";

export interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
}

export interface ToastComponentProps {
  toast: Toast;
  onClose: (id: string) => void;
}

export const ToastComponent: React.FC<ToastComponentProps> = ({ toast, onClose }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const showTimer = setTimeout(() => setShow(true), 100);
    const hideTimer = setTimeout(() => {
      setShow(false);
      setTimeout(() => onClose(toast.id), 400);
    }, 4000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [toast.id, onClose]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => onClose(toast.id), 400);
  };

  const icons = {
    success: "✓",
    error: "✗",
    warning: "⚠",
    info: "ℹ",
  };

  const toastStyle: React.CSSProperties = {
    marginTop: "15px",
    background: "white",
    borderRadius: "12px",
    padding: "16px 20px",
    marginBottom: "15px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
    borderLeft: `5px solid ${
      toast.type === "success"
        ? "#28a745"
        : toast.type === "error"
          ? "#dc3545"
          : toast.type === "info"
            ? "#17a2b8"
            : "#ffc107"
    }`,
    opacity: show ? 1 : 0,
    transform: show ? "translateX(0)" : "translateX(100%)",
    transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    position: "relative",
    overflow: "hidden",
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  };

  const titleStyle: React.CSSProperties = {
    fontWeight: "bold",
    fontSize: "14px",
    marginRight: "10px",
    color:
      toast.type === "success"
        ? "#28a745"
        : toast.type === "error"
          ? "#dc3545"
          : toast.type === "info"
            ? "#17a2b8"
            : "#856404",
  };

  const closeStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#999",
    padding: "0",
    marginLeft: "auto",
  };

  const messageStyle: React.CSSProperties = {
    fontSize: "13px",
    color: "#333",
    lineHeight: "1.4",
  };

  const progressStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "0",
    left: "0",
    height: "3px",
    background: "currentColor",
    opacity: "0.3",
    animation: "progress 4s linear forwards",
    width: "100%",
  };

  return (
    <div style={toastStyle}>
      <div style={headerStyle}>
        <div style={titleStyle}>
          <span
            style={{
              display: "inline-block",
              width: "16px",
              height: "16px",
              marginRight: "8px",
              fontWeight: "bold",
            }}
          >
            {icons[toast.type]}
          </span>
          {toast.title}
        </div>
        <button style={closeStyle} onClick={handleClose}>
          &times;
        </button>
      </div>
      <div style={messageStyle}>{toast.message}</div>
      <div style={progressStyle}></div>
    </div>
  );
};

const ToasterDemo: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [toastCounter, setToastCounter] = useState(0);

  const showToast = (type: Toast["type"], title: string, message: string) => {
    const newToast: Toast = {
      id: `toast-${toastCounter + 1}`,
      type,
      title,
      message,
    };
    setToasts((prev) => [...prev, newToast]);
    setToastCounter((prev) => prev + 1);
  };

  const closeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearAllToasts();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const containerStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    margin: "0",
    boxSizing: "border-box",
    width: "100%",
    overflowX: "hidden",
  };

  const innerContainerStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  };

  const titleStyle: React.CSSProperties = {
    textAlign: "center",
    color: "white",
    marginBottom: "30px",
    fontSize: "2.5rem",
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  };

  const buttonGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  };

  const categoryStyle: React.CSSProperties = {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    padding: "20px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  };

  const categoryTitleStyle: React.CSSProperties = {
    color: "white",
    marginBottom: "15px",
    textAlign: "center",
    fontSize: "1.2rem",
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 20px",
    margin: "8px 0",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  const successBtnStyle = {
    ...buttonStyle,
    background: "linear-gradient(45deg, #28a745, #20c997)",
    color: "white",
  };

  const errorBtnStyle = {
    ...buttonStyle,
    background: "linear-gradient(45deg, #dc3545, #e74c3c)",
    color: "white",
  };

  const infoBtnStyle = {
    ...buttonStyle,
    background: "linear-gradient(45deg, #17a2b8, #3498db)",
    color: "white",
  };

  const warningBtnStyle = {
    ...buttonStyle,
    background: "linear-gradient(45deg, #ffc107, #f39c12)",
    color: "#212529",
  };

  const toastContainerStyle: React.CSSProperties = {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 1000,
    maxWidth: "400px",
  };

  return (
    <>
      <style>
        {`
          @keyframes progress {
            from { width: 100%; }
            to { width: 0%; }
          }
          
          .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
          }
          
          .btn:active {
            transform: translateY(0);
          }
          
          @media (max-width: 768px) {
            .toast-container-mobile {
              left: 20px !important;
              right: 20px !important;
              max-width: none !important;
            }
            
            .button-grid-mobile {
              grid-template-columns: 1fr !important;
            }
            
            .title-mobile {
              font-size: 2rem !important;
            }
          }
        `}
      </style>

      <div style={containerStyle}>
        <div style={innerContainerStyle}>
          <h1 style={titleStyle} className="title-mobile">
            🎲 Betting Platform Toast Demo
          </h1>

          <div style={buttonGridStyle} className="button-grid-mobile">
            {/* Bet Actions */}
            <div style={categoryStyle}>
              <h3 style={categoryTitleStyle}>🎯 Bet Actions</h3>
              <button
                className="btn"
                style={successBtnStyle}
                onClick={() =>
                  showToast(
                    "success",
                    "🎉 Bet Successfully Placed!",
                    "Your single bet on Manchester United to win at 2.50 odds is now live! Stake: $50 | Potential return: $125 | Bet ID: #BT12345 🍀"
                  )
                }
              >
                Place Bet Success
              </button>
              <button
                className="btn"
                style={errorBtnStyle}
                onClick={() =>
                  showToast(
                    "error",
                    "💰 Insufficient Betting Balance",
                    "You need $25 more to place this accumulator bet. Top up your account to back your predictions and chase those big wins! 🚀"
                  )
                }
              >
                Insufficient Balance
              </button>
              <button
                className="btn"
                style={errorBtnStyle}
                onClick={() =>
                  showToast(
                    "error",
                    "⚖️ Daily Betting Limit Reached",
                    "You have reached your responsible gambling limit of $500 today. Your total stakes: $500 across 12 bets. Resume tomorrow! 🛡️"
                  )
                }
              >
                Limit Exceeded
              </button>
              <button
                className="btn"
                style={warningBtnStyle}
                onClick={() =>
                  showToast(
                    "warning",
                    "📈 Live Odds Movement",
                    "Odds changed from 3.20 to 2.85 for your selection. Accept new odds to place bet or wait for better value! 💎"
                  )
                }
              >
                Odds Changed
              </button>
              <button
                className="btn"
                style={errorBtnStyle}
                onClick={() =>
                  showToast(
                    "error",
                    "⏰ Betting Markets Suspended",
                    "Betting is closed for Chelsea vs Arsenal (kick-off in 10 mins). Check our in-play markets once the match starts! ⚽"
                  )
                }
              >
                Event Closed
              </button>
              <button
                className="btn"
                style={successBtnStyle}
                onClick={() =>
                  showToast(
                    "success",
                    "✅ Accumulator Bet Confirmed!",
                    "4-fold accumulator bet placed! Total odds: 12.50 | Stake: $20 | Potential payout: $250. All legs are now tracking live! 🎯"
                  )
                }
              >
                Bet Confirmed
              </button>
              <button
                className="btn"
                style={infoBtnStyle}
                onClick={() =>
                  showToast(
                    "info",
                    "🔄 Processing Your Wager...",
                    "Placing your over 2.5 goals bet on Liverpool vs City. Checking final odds and confirming your stake. Almost ready! ⏱️"
                  )
                }
              >
                Bet Processing
              </button>
            </div>

            {/* Login & Account */}
            <div style={categoryStyle}>
              <h3 style={categoryTitleStyle}>👤 Sportsbook Access</h3>
              <button
                className="btn"
                style={successBtnStyle}
                onClick={() =>
                  showToast(
                    "success",
                    "🏆 Welcome Back to the Action!",
                    "Ready to place some winning bets? Your betting account is loaded with live odds on 1,500+ events. Current balance: $250.75 💪"
                  )
                }
              >
                Login Success
              </button>
              <button
                className="btn"
                style={errorBtnStyle}
                onClick={() =>
                  showToast(
                    "error",
                    "🔐 Betting Account Access Denied",
                    "Login credentials dont match our sportsbook records. Check your email and password to access your betting dashboard! 🤔"
                  )
                }
              >
                Login Failed
              </button>
              <button
                className="btn"
                style={warningBtnStyle}
                onClick={() =>
                  showToast(
                    "warning",
                    "🛡️ Account Temporarily Restricted",
                    "For responsible gambling protection, your account is locked after multiple login attempts. Wait 15 minutes to resume betting! 🔒"
                  )
                }
              >
                Account Locked
              </button>
              <button
                className="btn"
                style={infoBtnStyle}
                onClick={() =>
                  showToast(
                    "info",
                    "📧 Verify Email for Betting Access",
                    "Almost ready to start betting! Verify your email to unlock all markets, live betting, and promotional offers! ✨"
                  )
                }
              >
                Email Verification
              </button>
              <button
                className="btn"
                style={successBtnStyle}
                onClick={() =>
                  showToast(
                    "success",
                    "🌟 Sportsbook Account Activated!",
                    "Welcome to our betting community! Your account includes $10 free bet bonus. Start with our featured matches today! 🚀"
                  )
                }
              >
                Account Created
              </button>
              <button
                className="btn"
                style={infoBtnStyle}
                onClick={() =>
                  showToast(
                    "info",
                    "👋 New Bettor Welcome!",
                    "Explore thousands of betting markets! Check featured bets, live odds, and our newcomer betting guide to get started! 🎯"
                  )
                }
              >
                First Login
              </button>
            </div>

            {/* Transactions */}
            <div style={categoryStyle}>
              <h3 style={categoryTitleStyle}>💰 Betting Wallet</h3>
              <button
                className="btn"
                style={successBtnStyle}
                onClick={() =>
                  showToast(
                    "success",
                    "💸 Betting Funds Added!",
                    "Perfect! $100 deposited to your betting wallet. Current balance: $325.50. Ready to back your next winning predictions! 🎉"
                  )
                }
              >
                Deposit Success
              </button>
              <button
                className="btn"
                style={infoBtnStyle}
                onClick={() =>
                  showToast(
                    "info",
                    "⏳ Deposit Processing for Betting",
                    "Your $100 deposit is being processed. Once confirmed, you can place bets on tonights Champions League matches! 💳"
                  )
                }
              >
                Deposit Pending
              </button>
              <button
                className="btn"
                style={errorBtnStyle}
                onClick={() =>
                  showToast(
                    "error",
                    "💔 Insufficient Betting Balance",
                    "You need $15 more to place this bet. Current balance: $35.00. Top up to continue backing your selections! 📊"
                  )
                }
              >
                Withdrawal Failed
              </button>
              <button
                className="btn"
                style={warningBtnStyle}
                onClick={() =>
                  showToast(
                    "warning",
                    "🔔 Low Betting Funds Alert",
                    "Your betting balance is $25.50. Consider depositing more to place larger stakes on your favorite teams! 🎲"
                  )
                }
              >
                Low Balance
              </button>
              <button
                className="btn"
                style={infoBtnStyle}
                onClick={() =>
                  showToast(
                    "info",
                    "📈 Betting Balance Refreshed!",
                    "Account updated! Current balance: $180.25 (including $50 in pending winnings from live bets). Ready to bet! 💪"
                  )
                }
              >
                Balance Update
              </button>
              <button
                className="btn"
                style={warningBtnStyle}
                onClick={() =>
                  showToast(
                    "warning",
                    "🏧 Daily Withdrawal Limit for Bettors",
                    "Daily withdrawal limit reached ($1,000). Protects your betting funds. Additional withdrawals available tomorrow! 🛡️"
                  )
                }
              >
                Withdrawal Limit
              </button>
            </div>

            {/* Bet Results */}
            <div style={categoryStyle}>
              <h3 style={categoryTitleStyle}>🏆 Bet Settlements</h3>
              <button
                className="btn"
                style={successBtnStyle}
                onClick={() =>
                  showToast(
                    "success",
                    "🎊 WINNING BET SETTLED!",
                    "Amazing prediction! Your over 2.5 goals bet on Real Madrid won! Stake: $25 | Odds: 1.80 | Winnings: $45.00 added! 🏆✨"
                  )
                }
              >
                Bet Won
              </button>
              <button
                className="btn"
                style={errorBtnStyle}
                onClick={() =>
                  showToast(
                    "error",
                    "😔 Bet Settled - No Win",
                    "Close one! Your both teams to score bet didn t come in this time. Final score: 2-0. Your next prediction could be the winner! 💪"
                  )
                }
              >
                Bet Lost
              </button>
              <button
                className="btn"
                style={infoBtnStyle}
                onClick={() =>
                  showToast(
                    "info",
                    "🔄 Bet Voided - Stake Returned",
                    "Player injury caused match abandonment. Your correct score bet has been voided and $30 stake refunded to your betting wallet! 💰"
                  )
                }
              >
                Bet Voided
              </button>
              <button
                className="btn"
                style={successBtnStyle}
                onClick={() =>
                  showToast(
                    "success",
                    "💰 Smart Cash Out Executed!",
                    "Perfect timing! Cashed out your 3-fold accumulator early for $75.25. Sometimes securing profit is the winning move! 🧠💰"
                  )
                }
              >
                Cash Out
              </button>
              <button
                className="btn"
                style={warningBtnStyle}
                onClick={() =>
                  showToast(
                    "warning",
                    "⚡ Cash Out No Longer Available",
                    "Cash out closed for your Liverpool to win bet (match minute 89). Your original bet is still live with 1 minute to go! 🎯"
                  )
                }
              >
                Cash Out Failed
              </button>
              <button
                className="btn"
                style={successBtnStyle}
                onClick={() =>
                  showToast(
                    "success",
                    "🌟 Accumulator Partial Win!",
                    "2 of 4 selections won in your acca! Barcelona & Bayern won, returning $45.75. Close to a huge payout! 🎉"
                  )
                }
              >
                Partial Win
              </button>
              <button
                className="btn"
                style={infoBtnStyle}
                onClick={() =>
                  showToast(
                    "info",
                    "📊 Live Bet Still Running",
                    "Your in-play over 1.5 goals bet is active! Current score: 1-0 (67 mins). One more goal needed for the win! ⚽"
                  )
                }
              >
                Bet Active
              </button>
            </div>

            {/* System Notifications */}
            <div style={categoryStyle}>
              <h3 style={categoryTitleStyle}>🔔 Sportsbook Alerts</h3>
              <button
                className="btn"
                style={infoBtnStyle}
                onClick={() =>
                  showToast(
                    "info",
                    "⏰ Match Postponed - Bets Refunded",
                    "Arsenal vs Tottenham postponed due to weather. All pre-match bets voided and stakes returned to betting wallets! 🔄"
                  )
                }
              >
                Event Postponed
              </button>
              <button
                className="btn"
                style={warningBtnStyle}
                onClick={() =>
                  showToast(
                    "warning",
                    "🔧 Sportsbook Maintenance",
                    "Quick odds system update in progress! Live betting temporarily paused. Pre-match markets resume in 30 minutes! 🚀"
                  )
                }
              >
                Maintenance Mode
              </button>
              <button
                className="btn"
                style={successBtnStyle}
                onClick={() =>
                  showToast(
                    "success",
                    "🎁 Free Bet Bonus Credited!",
                    "Excellent betting activity! You earned a $25 free bet. Use it on odds 1.50+ within 7 days. Happy betting! 💰✨"
                  )
                }
              >
                Bonus Received
              </button>
              <button
                className="btn"
                style={infoBtnStyle}
                onClick={() =>
                  showToast(
                    "info",
                    "📝 Betting Account Verification",
                    "To increase betting limits to $5,000/day and access VIP markets, please complete ID verification! 🆔"
                  )
                }
              >
                KYC Required
              </button>
              <button
                className="btn"
                style={errorBtnStyle}
                onClick={() =>
                  showToast(
                    "error",
                    "🔐 Betting Session Expired",
                    "For account security, your betting session timed out. Login again to view live odds and place bets! 🛡️"
                  )
                }
              >
                Session Expired
              </button>
              <button
                className="btn"
                style={successBtnStyle}
                onClick={() =>
                  showToast(
                    "success",
                    "🆙 VIP Betting Status Unlocked!",
                    "Congratulations! VIP status achieved with higher limits, exclusive odds, and personal account manager! 👑"
                  )
                }
              >
                Account Upgrade
              </button>
              <button
                className="btn"
                style={infoBtnStyle}
                onClick={() =>
                  showToast(
                    "info",
                    "🌟 New Betting Markets Live!",
                    "Tennis betting now available! Bet on Wimbledon with live odds, set betting, and match handicaps! 🎾"
                  )
                }
              >
                New Features
              </button>
            </div>

            {/* Validation Errors */}
            <div style={categoryStyle}>
              <h3 style={categoryTitleStyle}>⚠️ Betting Validation</h3>
              <button
                className="btn"
                style={errorBtnStyle}
                onClick={() =>
                  showToast(
                    "error",
                    "📝 Complete Betting Slip",
                    "Please select your stake amount and confirm your betting selections before placing your wager! ✍️"
                  )
                }
              >
                Missing Fields
              </button>
              <button
                className="btn"
                style={errorBtnStyle}
                onClick={() =>
                  showToast(
                    "error",
                    "📧 Email Required for Betting",
                    "Valid email needed for bet confirmations and winning notifications. Please check your email format! 💌"
                  )
                }
              >
                Invalid Email
              </button>
              <button
                className="btn"
                style={warningBtnStyle}
                onClick={() =>
                  showToast(
                    "warning",
                    "🔒 Secure Your Betting Account",
                    "Password must be 8+ characters with numbers and letters to protect your betting funds and winnings! 🛡️"
                  )
                }
              >
                Weak Password
              </button>
              <button
                className="btn"
                style={errorBtnStyle}
                onClick={() =>
                  showToast(
                    "error",
                    "🎂 Betting Age Verification",
                    "Must be 18+ to place sports bets. Age verification protects minors and ensures responsible gambling! 🔞"
                  )
                }
              >
                Age Check
              </button>
              <button
                className="btn"
                style={infoBtnStyle}
                onClick={() =>
                  showToast(
                    "info",
                    "📋 Betting Terms Agreement",
                    "Please accept our sports betting terms including odds changes, settlement rules, and responsible gambling policies! 📜"
                  )
                }
              >
                Terms Required
              </button>
              <button
                className="btn"
                style={warningBtnStyle}
                onClick={() =>
                  showToast(
                    "warning",
                    "🔤 Betting Username Taken",
                    "That username is already taken by another bettor! Choose a unique name for your sportsbook account! 🎯"
                  )
                }
              >
                Username Taken
              </button>
              <button
                className="btn"
                style={errorBtnStyle}
                onClick={() =>
                  showToast(
                    "error",
                    "📱 Phone for Bet Verification",
                    "Valid phone number required for two-factor authentication and important betting notifications! 📞"
                  )
                }
              >
                Invalid Phone
              </button>
              <button
                className="btn"
                style={errorBtnStyle}
                onClick={() =>
                  showToast(
                    "error",
                    "💰 Invalid Bet Stake",
                    "Minimum stake $5, maximum $1,000 per single bet. Adjust your wager amount to place this bet! 💸"
                  )
                }
              >
                Invalid Stake
              </button>
              <button
                className="btn"
                style={warningBtnStyle}
                onClick={() =>
                  showToast(
                    "warning",
                    "🎯 Select Betting Market",
                    "Please choose at least one betting selection (match winner, over/under, etc.) to create your bet slip! ⚽"
                  )
                }
              >
                No Selection
              </button>
            </div>
          </div>
        </div>

        {/* Toast Container */}
        <div style={toastContainerStyle} className="toast-container-mobile">
          {toasts.map((toast) => (
            <ToastComponent key={toast.id} toast={toast} onClose={closeToast} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ToasterDemo;
