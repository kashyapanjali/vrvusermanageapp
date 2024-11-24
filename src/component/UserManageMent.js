import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./UserManageMent.css";
import UserManageMentDetails from "./UserManageMentDetails";
import RoleManagement from "./RoleManagement";
import Permission from "./Permission";
import LoginSignUp from "./LoginSignUp";

function UserManageMent() {
  const [activeComponent, setActiveComponent] = useState("userdetails");
  const [currentLinkName, setCurrentLinkName] = useState("User Management");
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const addUser = () => {
    const newUser = {
      name: "",
      email: "",
      number: "",
      designation: "",
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);

    setRoles((prevRoles) => [
      ...prevRoles,
      {
        name: "",
        email: "",
        contactNo: "",
        designation: "",
        permissions: { read: false, write: false, delete: false },
      },
    ]);
  };

  const saveUserDetails = (index, userDetails) => {
    const updatedUsers = [...users];
    updatedUsers[index] = userDetails;
    setUsers(updatedUsers);
  };

  const handleSaveRoles = (updatedRoles) => {
    const updatedUsers = users.map((user, index) => ({
      ...user,
      designation: updatedRoles[index]?.designation || user.designation,
      email: updatedRoles[index]?.email || user.email,
      contactNo: updatedRoles[index]?.contactNo || user.contactNo,
    }));
    setUsers(updatedUsers);
    setRoles(updatedRoles);
  };

  const handleSavePermissions = (updatedRoles) => {
    const updatedUsers = users.map((user, index) => ({
      ...user,
      designation: updatedRoles[index]?.designation || user.designation,
      email: updatedRoles[index]?.email || user.email,
      contactNo: updatedRoles[index]?.contactNo || user.contactNo,
    }));
    setUsers(updatedUsers);
    setRoles(updatedRoles);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.contactNo && user.contactNo.toString().includes(searchQuery))
  );

  const renderComponent = () => {
    switch (activeComponent) {
      case "/":
        return <LoginSignUp />;
      case "userdetails":
        return <UserManageMentDetails users={filteredUsers} />;
      case "roles":
        return (
          <RoleManagement
            roles={roles}
            saveUserDetails={saveUserDetails}
            onSave={handleSaveRoles}
          />
        );
      case "permissions":
        return (
          <Permission
            roles={roles}
            saveUserDetails={saveUserDetails}
            onSave={handleSavePermissions}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="usermanage">
      <div className="header">
        {/* Header Left */}
        <div className="headerleft">
          <p>{currentLinkName}</p>
          <div className="link">
            <Link
              to="/"
              onClick={() => {
                setActiveComponent("/");
                setCurrentLinkName("Home");
              }}
            >
              Home
            </Link>
            <Link
              to="#"
              onClick={() => {
                setActiveComponent("userdetails");
                setCurrentLinkName("User Management");
              }}
            >
              User Management
            </Link>
            <Link
              to="#"
              onClick={() => {
                setActiveComponent("roles");
                setCurrentLinkName("Role Management");
              }}
            >
              Role Management
            </Link>
            <Link
              to="#"
              onClick={() => {
                setActiveComponent("permissions");
                setCurrentLinkName("Permissions");
              }}
            >
              Permissions
            </Link>
          </div>
        </div>
        {/* Header Right */}
        <div className="headerright">
          <div className="search">
            <input
              type="search"
              placeholder="Search User"
              required
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="search-btn">
              <img src="/search.png" alt="Search" className="search-icon" />
            </button>
          </div>
          <div className="addbtn">
            <button className="btn" onClick={addUser}>
              Add Users
            </button>
          </div>
        </div>
      </div>

      {/* Render Active Component Below */}
      <div className="nested-content">{renderComponent()}</div>
    </div>
  );
}

export default UserManageMent;
