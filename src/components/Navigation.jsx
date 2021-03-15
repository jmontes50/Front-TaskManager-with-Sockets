import React, { Fragment, useContext } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function Navigation() {
  const { userState, signOut } = useContext(AuthContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <div className="container poppins">
        <Navbar.Brand className="semi-bold">
          <i className="fas fa-tasks mr-1"></i>
          TareasApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavLink to="/" className="nav-link" activeClassName="active">
              Inicio
            </NavLink>
            {userState ? (
              <Fragment>
                <NavLink
                  to="/tareas"
                  className="nav-link"
                  activeClassName="active"
                >
                  Tareas
                </NavLink>
                <NavLink
                  to="/usuarios"
                  className="nav-link"
                  activeClassName="active"
                >
                  Usuarios
                </NavLink>
              </Fragment>
            ) : null}
          </Nav>
          <Nav>
            {userState ? (
              <Fragment>
                <NavDropdown
                  title={
                    <div className="d-inline">
                      <img
                        src={userState.photoURL}
                        className="mr-2"
                        style={{ borderRadius: "50%", width: "30px" }}
                        alt={`avatar ${userState.displayName}`}
                      />
                      <span>{userState.displayName}</span>
                    </div>
                  }
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item onClick={signOut}>Salir</NavDropdown.Item>
                </NavDropdown>
              </Fragment>
            ) : (
              <NavLink
                to="/login"
                className="nav-link"
                activeClassName="active"
              >
                Login
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
