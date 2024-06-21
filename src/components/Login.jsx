import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

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
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    } else {
      // Sign In logic
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }
  };

  return (
    <div className="font-geist">
      <Header />
      <div className="absolute">
        <img className="h-screen object-cover md:object-cover md:h-auto" src={BG_URL} alt="background" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-75"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            autoComplete="off"
            ref={nameRef}
            type="text"
            placeholder="Full Name"
            className="px-4 py-3 my-4 w-full bg-gray-800 bg-opacity-70 rounded-lg text-sm"
          />
        )}
        <input
          autoComplete="off"
          ref={emailRef}
          type="email"
          placeholder="Email Address"
          className="px-4 py-3 my-4 w-full bg-gray-800 bg-opacity-70 rounded-lg text-sm"
        />
        <input
          autoComplete="off"
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="px-4 py-3 my-4 w-full bg-gray-800 bg-opacity-70 rounded-lg text-sm"
        />
        <p className="text-red-500 text-xs font-medium">{errorMessage}</p>
        <button
          className="px-4 py-2 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 text-sm cursor-pointer" onClick={ToggleSignInForm}>
          {isSignInForm
            ? "New to MoviesFlix? Sign Up Now."
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
