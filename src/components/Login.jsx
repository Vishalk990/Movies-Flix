import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const ToggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="font-geist">
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a56dc29b-a0ec-4f6f-85fb-50df0680f80f/2f8ae902-8efe-49bb-9a91-51b6fcc8bf46/IN-en-20240617-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="background"
        />
      </div>
      <form className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-75">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="px-4 py-3 my-4 w-full bg-gray-800 rounded-lg text-sm"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="px-4 py-3 my-4 w-full bg-gray-800 rounded-lg text-sm"
        />

        <input
          type="password"
          placeholder="Password"
          className="px-4 py-3 my-4 w-full bg-gray-800 rounded-lg text-sm"
        />
        <button className="px-4 py-2 my-6 bg-red-700 w-full rounded-lg  ">
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
