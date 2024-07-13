import { useState } from "react"
import { isEmpty } from "../helper/validation"
import { useNavigate } from "react-router-dom"
import axios from "axios"
const Register = () => {
    const navigate= useNavigate()
    const [userData, setUserData] =useState({
        name:"",
        email:"",
        password:""
    })
    const [error, setError] = useState(null)
    const handleChange=(e)=>{
        const { name, value } = e.target;
        if (name === 'email') {
          const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
          if (!emailPattern.test(value)) {
            setError('Please enter a valid email address.');
          } else {
            setError('');
          }
        }
          setUserData({
              ...userData,
        [name]: value,
  
          })
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    
        //check the empty field
        if (
          isEmpty(userData.name) ||
          isEmpty(userData.email) ||
          isEmpty(userData.password)
        ) {
          setError("please fill in all fields");
          return;
        }
    
        try {
          await axios
            .post("http://localhost:3000/signup", userData)
            .then((response) => {
              if (response.status === 200) {
                console.log(response);
                // alert(response.data.message)
                navigate("/");
              } else {
                console.log("unhandled status code:", response.status);
              }
            })
            .catch((error) => {
              if (error.response) {
                console.log(error);
                setError(error.response.data.error || error.response.data.message);
              } else if (error.request) {
                console.error("no response from server");
              } else {
                console.error("request error");
              }
            });
        } catch (err) {
          console.error(err);
        }
      };
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                   Register
                </h1>
                {error ? <div>{error}</div> : ""}
                <form className="mt-6" onSubmit={handleSubmit}>
                <div className="mb-2">
                        <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={handleChange}
                            name="name"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={handleChange}
                            name="email"
                            autoComplete="email"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={handleChange}
                            name="password"
                        />
                    </div>
                    
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default Register