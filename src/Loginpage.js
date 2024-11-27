// import React, { useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   getAuth,
//   signInWithEmailAndPassword,
//   signInAnonymously,
//   sendPasswordResetEmail,
// } from "firebase/auth";
// import { auth } from "./firebase";
// import { useNavigate } from "react-router-dom";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import LockOpenIcon from "@mui/icons-material/LockOpen";
// import LockIcon from "@mui/icons-material/Lock";
// import ParticlesComponent from "./Pages/Particles.js";
// import "./Loginpage.css";

// function Loginpage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [registered, setRegistered] = useState(true);
//   const navigate = useNavigate();

//   const handleSignIn = () => {
//     signInWithEmailAndPassword(auth, email, password)
//       .then(() => {
//         navigate("./todolist");
//       })
//       .catch(() => {
//         if (email.includes("gmail.com") || email.includes(".ac.in")) {
//           document.getElementById("passworderror").style.display = "block";
//         } else {
//           document.getElementById("emailerror").style.display = "block";
//         }
//       });
//   };

//   const handleRegister = () => {
//     if (password.length >= 6 && password === confirmPassword) {
//       createUserWithEmailAndPassword(auth, email, password)
//         .then(() => {
//           navigate("./todolist");
//           setPassword("");
//           setEmail("");
//         })
//         .catch(() => {
//           alert("An account already exists with this email");
//         });
//     } else {
//       if (email.includes("gmail.com") || email.includes(".ac.in")) {
//         if (password.length < 6) {
//           document.getElementById("passworderror").style.display = "block";
//         }
//         if (password !== confirmPassword) {
//           document.getElementById("passworderror2").style.display = "block";
//         }
//       } else {
//         document.getElementById("emailerror").style.display = "block";
//       }
//     }
//   };

//   const goBack = () => {
//     setEmail("");
//     setPassword("");
//     setRegistered(true);
//   };

//   const handleAnonymousLogin = () => {
//     signInAnonymously(getAuth())
//       .then(() => {
//         navigate("./todolist");
//       })
//       .catch(() => alert("Error"));
//   };

//   const forgetPassword = () => {
//     sendPasswordResetEmail(getAuth(), email)
//       .then(() => {
//         document.getElementById("resetpassword").style.display = "block";
//       })
//       .catch(() => {
//         alert("Please provide the correct email.");
//       });
//   };

//   return (
//     <div className="relative">
//       <ParticlesComponent />
//       <section className="form-container">
//         <div className="Loginpage">
//           {registered ? (
//             <>
//               <h1>Log-in</h1>
//               <div className="input">
//                 <MailOutlineIcon className="icons" />
//                 <input
//                   type="email"
//                   placeholder="Enter your Email"
//                   onChange={(e) => setEmail(e.target.value)}
//                   value={email}
//                   id="email"
//                 />
//               </div>
//               <p id="emailerror">
//                 * Sorry, the email you entered is incorrect. Please provide the
//                 correct email address.
//               </p>

//               <div className="input">
//                 <LockOpenIcon className="icons" />
//                 <input
//                   type="password"
//                   placeholder="Enter the Password"
//                   onChange={(e) => setPassword(e.target.value)}
//                   value={password}
//                 />
//               </div>
//               <p id="passworderror">
//                 * Sorry, your password was incorrect for this email. Please
//                 double-check your password.
//               </p>

//               <button className="button" onClick={handleSignIn}>
//                 Sign in
//               </button>
//               <button className="accountbutton" onClick={forgetPassword}>
//                 Forget Password
//               </button>
//               <p id="resetpassword">
//                 Reset Password link has been sent to your email. Please check
//                 your email.
//               </p>
//               <button
//                 className="accountbutton"
//                 onClick={() => setRegistered(false)}
//               >
//                 Create new Account
//               </button>
//               <button className="accountbutton" onClick={handleAnonymousLogin}>
//                 Continue as GUEST
//               </button>
//             </>
//           ) : (
//             <>
//               <h1>Create Account</h1>
//               <div className="input">
//                 <MailOutlineIcon className="icons" />
//                 <input
//                   type="email"
//                   placeholder="Enter Your Email"
//                   onChange={(e) => setEmail(e.target.value)}
//                   value={email}
//                   id="email"
//                 />
//               </div>
//               <p id="emailerror">
//                 * Sorry, the email you entered is incorrect. Please provide the
//                 correct email address.
//               </p>
//               <div className="input">
//                 <LockOpenIcon className="icons" />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   onChange={(e) => setPassword(e.target.value)}
//                   value={password}
//                 />
//               </div>
//               <p id="passworderror">* Your password must contain 6 characters</p>

//               <div className="input">
//                 <LockIcon className="icons" />
//                 <input
//                   type="password"
//                   placeholder="Confirm Password"
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   value={confirmPassword}
//                 />
//               </div>
//               <p id="passworderror2">
//                 * Sorry, your password is not the same. Please double-check your
//                 password.
//               </p>
//               <button className="button" onClick={handleRegister}>
//                 Create Account
//               </button>
//               <button className="accountbutton" onClick={goBack}>
//                 Go Back
//               </button>
//             </>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Loginpage;
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInAnonymously,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import ParticlesComponent from "./Pages/Particles.js";
import "./Loginpage.css";

function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registered, setRegistered] = useState(true);
  const navigate = useNavigate();

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("./todolist");
      })
      .catch(() => {
        if (email.includes("gmail.com") || email.includes(".ac.in")) {
          document.getElementById("passworderror").style.display = "block";
        } else {
          document.getElementById("emailerror").style.display = "block";
        }
      });
  };

  const handleRegister = () => {
    if (password.length >= 6 && password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("./todolist");
          setPassword("");
          setEmail("");
        })
        .catch(() => {
          alert("An account already exists with this email");
        });
    } else {
      if (email.includes("gmail.com") || email.includes(".ac.in")) {
        if (password.length < 6) {
          document.getElementById("passworderror").style.display = "block";
        }
        if (password !== confirmPassword) {
          document.getElementById("passworderror2").style.display = "block";
        }
      } else {
        document.getElementById("emailerror").style.display = "block";
      }
    }
  };

  const goBack = () => {
    setEmail("");
    setPassword("");
    setRegistered(true);
  };

  const handleAnonymousLogin = () => {
    signInAnonymously(getAuth())
      .then(() => {
        navigate("./todolist");
      })
      .catch(() => alert("Error"));
  };

  const forgetPassword = () => {
    sendPasswordResetEmail(getAuth(), email)
      .then(() => {
        document.getElementById("resetpassword").style.display = "block";
      })
      .catch(() => {
        alert("Please provide the correct email.");
      });
  };

  return (
    <div className="relative">
      <ParticlesComponent />
      <section className="form-container">
        <div className="Loginpage">
          {registered ? (
            <>
              <h1>Log-in</h1>
              <div className="input">
                <MailOutlineIcon className="icons" />
                <input
                  type="email"
                  placeholder="Enter your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  id="email"
                />
              </div>
              <p id="emailerror">
                * Sorry, the email you entered is incorrect. Please provide the
                correct email address.
              </p>

              <div className="input">
                <LockOpenIcon className="icons" />
                <input
                  type="password"
                  placeholder="Enter the Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <p id="passworderror">
                * Sorry, your password was incorrect for this email. Please
                double-check your password.
              </p>

              <button className="button" onClick={handleSignIn}>
                Sign in
              </button>
              <button className="accountbutton" onClick={forgetPassword}>
                Forget Password
              </button>
              <p id="resetpassword">
                Reset Password link has been sent to your email. Please check
                your email.
              </p>
              <button
                className="accountbutton"
                onClick={() => setRegistered(false)}
              >
                Create new Account
              </button>
              <button className="accountbutton" onClick={handleAnonymousLogin}>
                Continue as GUEST
              </button>
              <Link to="/home" className="home-button"><button className="home-button">Home</button></Link>
            </>
          ) : (
            <>
              <h1>Create Account</h1>
              <div className="input">
                <MailOutlineIcon className="icons" />
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  id="email"
                />
              </div>
              <p id="emailerror">
                * Sorry, the email you entered is incorrect. Please provide the
                correct email address.
              </p>
              <div className="input">
                <LockOpenIcon className="icons" />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <p id="passworderror">* Your password must contain 6 characters</p>

              <div className="input">
                <LockIcon className="icons" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </div>
              <p id="passworderror2">
                * Sorry, your password is not the same. Please double-check your
                password.
              </p>
              <button className="button" onClick={handleRegister}>
                Create Account
              </button>
              <button className="accountbutton" onClick={goBack}>
                Go Back
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Loginpage;
