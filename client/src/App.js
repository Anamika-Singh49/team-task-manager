import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [savedUser, setSavedUser] = useState(null);

  const [projectName] = useState("Team Manager");
  const [task, setTask] = useState("");
  const [member, setMember] = useState("Member1");
  const [dueDate, setDueDate] = useState("");

  const [tasks, setTasks] = useState([
    {
      name: "Build Login Page",
      member: "Member1",
      dueDate: "2026-05-02",
      status: "In Progress",
    },
  ]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setSavedUser(JSON.parse(user));
  }, []);

  const signup = () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = { name, email, password };
    localStorage.setItem("user", JSON.stringify(userData));
    setSavedUser(userData);

    alert("Signup Successful");
    setIsSignup(false);

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const login = () => {
    if (!savedUser) {
      alert("Please Signup First");
      return;
    }

    if (
      email === savedUser.email &&
      password === savedUser.password
    ) {
      setLoggedIn(true);
    } else {
      alert("Invalid Email or Password");
    }
  };

  const forgotPassword = () => {
    if (!savedUser) {
      alert("No account found");
    } else {
      alert("Your Password: " + savedUser.password);
    }
  };

  const logout = () => {
    setLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  const addTask = () => {
    if (!task || !dueDate) {
      alert("Enter task and date");
      return;
    }

    const newTask = {
      name: task,
      member,
      dueDate,
      status: "Pending",
    };

    setTasks([...tasks, newTask]);
    setTask("");
    setDueDate("");
  };

  const updateStatus = (index, status) => {
    const updated = [...tasks];
    updated[index].status = status;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const pending = tasks.filter((t) => t.status === "Pending").length;
  const overdue = tasks.filter(
    (t) =>
      t.status !== "Done" &&
      new Date(t.dueDate) < new Date()
  ).length;

  if (!loggedIn) {
    return (
      <div className="login-page">
        <div className="login-box">
          <h1>Team Task Manager</h1>

          {isSignup ? (
            <>
              <h2>Signup</h2>

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />

              <button onClick={signup}>Create Account</button>
              <button onClick={() => setIsSignup(false)}>
                Back to Login
              </button>
            </>
          ) : (
            <>
              <h2>Login</h2>

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button onClick={login}>Login</button>
              <button onClick={() => setIsSignup(true)}>
                Signup
              </button>

              <p
                style={{
                  marginTop: "12px",
                  color: "blue",
                  cursor: "pointer",
                }}
                onClick={forgotPassword}
              >
                Forgot Password?
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="top-bar">
        <h1>Team Task Manager</h1>

        <div className="top-right">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Admin</option>
            <option>Member</option>
          </select>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <h2>Role: {role}</h2>

      {role === "Admin" && (
        <div className="card">
          <h2>Project & Team Management</h2>

          <input type="text" value={projectName} readOnly />

          <h2>Add Task</h2>

          <input
            type="text"
            placeholder="Enter Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <select
            value={member}
            onChange={(e) => setMember(e.target.value)}
          >
            <option>Member1</option>
            <option>Member2</option>
            <option>Member3</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <button onClick={addTask}>Add Task</button>
        </div>
      )}

      <div className="dashboard">
        <div className="box">
          <h3>Total Projects</h3>
          <p>1</p>
        </div>

        <div className="box">
          <h3>Total Tasks</h3>
          <p>{tasks.length}</p>
        </div>

        <div className="box">
          <h3>Pending Tasks</h3>
          <p>{pending}</p>
        </div>

        <div className="box">
          <h3>Overdue Tasks</h3>
          <p>{overdue}</p>
        </div>
      </div>

      <div className="card">
        <h2>Projects</h2>
        <p>{projectName}</p>
      </div>

      <div className="card">
        <h2>Tasks</h2>

        {tasks.map((item, index) => (
          <div className="task-row" key={index}>
            <p>
              {item.name} | {item.member} | {item.dueDate} |{" "}
              {item.status}
            </p>

            <button
              onClick={() =>
                updateStatus(index, "In Progress")
              }
            >
              In Progress
            </button>

            <button
              onClick={() => updateStatus(index, "Done")}
            >
              Done
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteTask(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;