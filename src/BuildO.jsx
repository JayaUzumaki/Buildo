import React from "react";
import { Link } from "react-router-dom";
import { usePocket } from "./context/PocketContext"; // Assuming you have a context for authentication
import "./styles/buildo.css"; // Assuming the CSS file is in the same directory

const BuildO = () => {
  const { user, logout } = usePocket(); // Access user and logout function

  return (
    <div>
      <section className="header">
        <nav>
          <Link to="/">
            <img src="/BLK_BUI-removebg-preview.png" alt="Logo" />
          </Link>
          <div className="nav-links">
            <ul>
              <li>
                <a href="#home">HOME</a>
              </li>
              <li>
                <Link to="/configure">CONFIGURATOR</Link>{" "}
                {/* Link to the Configurator */}
              </li>
              <li>
                <a href="#builds">BUILDS</a>
              </li>
              <li>
                <Link to="/forum">FORUMS</Link> {/* Updated to Link to forum */}
              </li>
              <li>
                <a href="#aboutus1">ABOUT</a>
              </li>

              {/* Conditional rendering based on authentication */}
              {!user ? (
                <li>
                  <Link to="/login">LOGIN</Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/update-profile">UPDATE PROFILE</Link>
                  </li>
                  <li>
                    <button onClick={logout} className="logout-btn">
                      LOGOUT
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        <div className="text-box">
          <h1 id="home" className="build">
            All in One Customised PC Recommendation System
          </h1>
          <p>Explore the Endless Possibility of Building and Upgrading PCs</p>
          <Link to="/configure" className="hero-btn">
            Go to Configurator
          </Link>
        </div>
      </section>

      {/* About the Configurator */}
      <section className="About" id="confi">
        <h1>ABOUT THE CONFIGURATOR</h1>
      </section>
      <div className="row">
        <div className="about-col">
          <img src="/Build1.jpeg" alt="Pre Builds" />
          <div className="layer">
            <h3>PRE BUILDS</h3>
          </div>
        </div>
        <div className="about-col">
          <img src="/Build2.cust.png" alt="Custom Builds" />
          <div className="layer">
            <h3>CUSTOM BUILDS</h3>
          </div>
        </div>
        <div className="about-col">
          <img src="/Build3.cust.png" alt="Update Builds" />
          <div className="layer">
            <h3>UPDATE BUILDS</h3>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <section className="posts" id="post">
        <h1>POSTS & FORUMS</h1>
      </section>
      <div className="row">
        <div className="post-col">
          <h3>POSTS</h3>
          <p>
            Posts can be considered a way of sharing information and connecting
            with others online. It can be used to put out information and let
            people know about the updates in the Technological World...
          </p>
        </div>
        <div className="post-col">
          <h3>FORUMS</h3>
          <p>
            Forums are great for building communities around shared interests...
          </p>
        </div>
      </div>

      {/* About Us */}
      <section className="AboutUs" id="aboutus1">
        <h1>ABOUT US</h1>
      </section>
      <div className="row">
        <div className="aboutus-col">
          <h3>What are WE?</h3>
          <p>Welcome to BuildO, where your Dream PC becomes a Reality...</p>
        </div>
      </div>

      {/* Footer */}
      <section className="footer">
        <h5>Any Queries? Contact Us</h5>
        <pre>Email: info@buildo.com | Toll Free Number: 0080 1902 0020</pre>
        <div className="icons">
          <i className="fab fa-facebook" style={{ color: "black" }}></i>
          <i className="fab fa-twitter" style={{ color: "black" }}></i>
          <i className="fab fa-instagram" style={{ color: "black" }}></i>
          <i className="fab fa-linkedin" style={{ color: "black" }}></i>
        </div>
      </section>
    </div>
  );
};

export default BuildO;
