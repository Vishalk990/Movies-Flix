import { useRef, useState, useEffect } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";
import bg from "../images/bg.jpeg";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const ToggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    const emailValue = emailRef.current ? emailRef.current.value : "";
    const passwordValue = passwordRef.current ? passwordRef.current.value : "";
    const nameValue =
      !isSignInForm && nameRef.current ? nameRef.current.value : "";

    const message = checkValidData(emailValue, passwordValue, nameValue);
    setErrorMessage(message);

    if (message) return;

    setIsLoading(true);

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: nameValue,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              simulateDelay();
            })
            .catch((error) => {
              setErrorMessage(error.message);
              setIsLoading(false);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
          setIsLoading(false);
        });
    } else {
      // Sign In logic
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          simulateDelay();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
          setIsLoading(false);
        });
    }
  };

  const simulateDelay = () => {
    setTimeout(() => {
      setIsLoading(false);
      // Navigate 
      console.log("Navigating to browse page...");
    }, 2000);
  };

  return (
    <div className="font-geist">
      <Header />
      <div className="absolute">
        <img
          className="h-screen object-cover md:object-cover md:h-full"
          src={bg}
          alt="background"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-4/12 absolute p-10 md:8 bg-black my-36 mx-auto right-0 left-0 text-white rounded-2xl bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-2 text-center">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={nameRef}
            type="text"
            placeholder="Full Name"
            className="px-4 py-3 my-4 w-full bg-gray-800 bg-opacity-70 rounded-lg text-sm"
          />
        )}
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          className="px-4 py-3 my-4 w-full bg-gray-800 bg-opacity-70 rounded-lg text-sm"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="px-4 py-3 my-4 w-full bg-gray-800 bg-opacity-70 rounded-lg text-sm"
        />
        <p className="text-red-500 text-xs font-medium">{errorMessage}</p>
        <button
          className="px-4 py-2 my-6 bg-red-700 w-full rounded-lg font-semibold transition duration-300 ease-in-out hover:bg-red-500 hover:shadow-lg flex items-center justify-center"
          onClick={handleButtonClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-t-4 border-white border-solid rounded-full animate-spin"></div>
          ) : (
            isSignInForm ? "Sign In" : "Sign Up"
          )}
        </button>
        <p
          className="py-4 text-[16px] text-center"
          onClick={ToggleSignInForm}
        >
          {isSignInForm ? (
            <>
              New to MoviesFlix?{" "}
              <span className="hover:text-red-500 cursor-pointer">Sign Up</span>.
            </>
          ) : (
            <>
              Already registered?{" "}
              <span className="hover:text-red-500 cursor-pointer">Sign In</span>.
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;