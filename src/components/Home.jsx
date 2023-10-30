import { useEffect, useState } from "react";
import "../align.css";
import axios from "axios";

const Home = () => {
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState({});
  const config = {
    method: "get",
    url: "http://localhost:3000/api/users/get-user",
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    if (token) {
      axios(config)
        .then((response) => {
          setUserData(response.data.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);
  return (
    <>
      {!token ? (
        <>
          <div className="align-center">
            <h1>Welcome To Home</h1>
          </div>
        </>
      ) : (
        <>
          <div className="align-center">
            <h1>Welcome {userData.first_name}!</h1>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
