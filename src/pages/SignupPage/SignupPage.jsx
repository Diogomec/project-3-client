import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {})
    */

    // Or using a service
    authService
      .signup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate("/login");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      <h1 className="my-4 text-2xl">Sign Up</h1>

      <form
        className="flex flex-col w-[400px] mx-auto"
        onSubmit={handleSignupSubmit}
      >
        <label>Email</label>
        <input
          className="p-2 rounded-md border border-neutral-400"
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />

        <label>Password</label>
        <input
          className="p-2 rounded-md border border-neutral-400"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>Name</label>
        <input className="p-2 rounded-md border border-neutral-400" type="text" name="name" value={name} onChange={handleName} />

        <button className="w-1/2 bg-teal-600 mx-auto py-2 rounded-sm hover:bg-teal-500 mt-4" type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="my-4">Already have account?</p>
      <Link className="bg-teal-600 py-2 px-4 hover:bg-teal-500" to={"/login"}>Login</Link>
    </div>
  );
}

export default SignupPage;
