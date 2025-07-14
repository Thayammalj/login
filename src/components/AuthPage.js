import React from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import authImg from '../assets/auth-image.png'; // Replace with your image

function AuthPage({ isRegistering, setIsRegistering }) {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light overflow-hidden">
      <div className="row shadow-lg rounded-4 overflow-hidden bg-white" style={{ width: '90%', maxWidth: '1100px' }}>
        
        {/* IMAGE SIDE */}
        <div className={`col-md-6 d-flex flex-column justify-content-center align-items-center p-5 text-center ${isRegistering ? '' : 'order-md-2'}`}>
          <h2 className="fw-bold text-primary">Welcome to our largest community</h2>
          <p className="fs-5">Let's learn something new today!</p>
          <img src={authImg} alt="auth" className="img-fluid" style={{ maxHeight: "300px" }} />
        </div>

        {/* FORM SIDE */}
        <div className={`col-md-6 d-flex align-items-center justify-content-center p-5 ${isRegistering ? '' : 'order-md-1'}`}>
          <div className="w-100">
            {isRegistering ? (
              <RegisterForm switchMode={() => setIsRegistering(false)} />
            ) : (
              <LoginForm switchMode={() => setIsRegistering(true)} />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default AuthPage;
