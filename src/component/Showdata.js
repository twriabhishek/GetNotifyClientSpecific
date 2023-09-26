// import React, { useEffect, useState } from "react";

// import axios from "axios";

// import SocketClient from "socket.io-client";

// function Showdata() {
//   const [studentList, setStudentList] = useState([]);

//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//   useEffect(() => {
//     // Fetch initial student data from the server

//     axios
//       .get("http://localhost:4000/users")

//       .then((res) => {
//         setStudentList(res.data);
//       })

//       .catch((error) => {
//         console.log(error);
//       });

//     // Establish Socket.IO connection

//     const socket = SocketClient("http://localhost:4000");

//     // Listen for WebSocket messages

//     socket.on("initialData", (data) => {
//       setStudentList(data);
//     });

//     socket.on("newData", (newData) => {
//       setStudentList((prevList) => [...prevList, newData]);

//       // Show the success message with the student's name
//       setShowSuccessMessage(`Welcome Back, ${newData.name}`);

//       setTimeout(() => {
//         setShowSuccessMessage(false);
//       }, 3000);
//     });

//     // WebSocket error event

//     socket.on("error", (error) => {
//       console.error("WebSocket error:", error);
//     });

//     // WebSocket close event

//     socket.on("disconnect", () => {
//       console.log("WebSocket disconnected");
//     });

//     // Cleanup function to disconnect WebSocket when the component unmounts

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div className="container text-center">
//       <h2 className="pt-4 pb-2 text-center">Student Details Section</h2>

//       {/* Display the success message */}

//       {showSuccessMessage && (
//         <div className="alert alert-success" role="alert">
//           {showSuccessMessage}
//         </div>
//       )}

//       <table className="table">
//         <thead>
//           <tr>
//             <th scope="col">ID</th>

//             <th scope="col">Name</th>

//             <th scope="col">Email</th>

//             <th scope="col">Phone</th>
//           </tr>
//         </thead>

//         <tbody>
//           {studentList.map((s) => (
//             <tr key={s.id}>
//               <td>{s.id}</td>

//               <td>{s.name}</td>

//               <td>{s.email}</td>

//               <td>{s.phone}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Showdata;






























// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import SocketClient from "socket.io-client";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Showdata() {
//   const [studentList, setStudentList] = useState([]);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//   useEffect(() => {
//     // Fetch initial student data from the server
//     axios
//       .get("http://localhost:4000/users")
//       .then((res) => {
//         setStudentList(res.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     // Establish Socket.IO connection
//     const socket = SocketClient("http://localhost:4000");

//     // Listen for WebSocket messages
//     socket.on("initialData", (data) => {
//       setStudentList(data);
//     });

//     socket.on("newData", (newData) => {
//       setStudentList((prevList) => [...prevList, newData]);

//       // Show the success message with the student's name
//       setShowSuccessMessage(`Welcome Back, ${newData.username}`);

//       // Display a toast notification
//       toast.success(`Welcome Back, ${newData.username}`, {
//         position: "top-right",
//         autoClose: 9000,
//       });
//     });

//     // WebSocket error event
//     socket.on("error", (error) => {
//       console.error("WebSocket error:", error);
//     });

//     // WebSocket close event
//     socket.on("disconnect", () => {
//       console.log("WebSocket disconnected");
//     });

//     // Cleanup function to disconnect WebSocket when the component unmounts
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div className="container text-center">
//       <h2 className="pt-4 pb-2 text-center">Student Details Section</h2>

//       {/* Display the success message */}
//       {showSuccessMessage && (
//         <div className="alert alert-success" role="alert">
//           {showSuccessMessage}
//         </div>
//       )}
//       <div>
//       <table className="table">
//         <thead>
//           <tr>
//             <th scope="col">ID</th>
//             <th scope="col">Name</th>
//             <th scope="col">Username</th>
//             <th scope="col">Email</th>
//             <th scope="col">Phone</th>
//           </tr>
//         </thead>

//         <tbody>
//           {studentList.map((s) => (
//             <tr key={s.id}>
//               <td>{s.id}</td>
//               <td>{s.name}</td>
//               <td>{s.username}</td>
//               <td>{s.email}</td>
//               <td>{s.phone}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       </div>

//       {/* Toast notification container */}
//       <ToastContainer />
//     </div>
//   );
// }

// export default Showdata;






















import React, { useEffect, useState } from "react";
import axios from "axios";
import SocketClient from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Showdata() {
  const [studentList, setStudentList] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [inputValue, setInputValue] = useState(""); // State variable for input field value

  useEffect(() => {
    // Fetch initial student data from the server
    axios
      .get("http://localhost:4000/users")
      .then((res) => {
        setStudentList(res.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Establish Socket.IO connection
    const socket = SocketClient("http://localhost:4000");

    // Listen for WebSocket messages
    socket.on("initialData", (data) => {
      setStudentList(data);
    });

    socket.on("newData", (newData) => {
      setStudentList((prevList) => [...prevList, newData]);

      // Check if the input field value matches the username from the backend
      if (inputValue.trim() === newData.username) {
        // Show the success message with the student's name
        setShowSuccessMessage(`Welcome Back, ${newData.username}`);

        // Display a toast notification
        toast.success(`Welcome Back, ${newData.username}`, {
          position: "top-right",
          autoClose: 9000,
        });
      }
    });

    // WebSocket error event
    socket.on("error", (error) => {
      console.error("WebSocket error:", error);
    });

    // WebSocket close event
    socket.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });

    // Cleanup function to disconnect WebSocket when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="container text-center">
      <h2 className="pt-4 pb-2 text-center">Student Details Section</h2>

      {/* Input field for user input */}
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a value"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>

          <tbody>
            {studentList.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.username}</td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Toast notification container */}
      <ToastContainer />
    </div>
  );
}

export default Showdata;