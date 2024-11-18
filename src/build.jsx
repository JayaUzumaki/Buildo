import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePocket } from "./context/PocketContext"; // Assuming usePocket context for PocketBase access
import "./styles/build.css";
import logo from "/BLK_BUI-removebg-preview.png"; // Your logo image

const Build = () => {
  const { pb, user, logout } = usePocket();
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pre-builds"); // Tracks the active tab

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        // Fetch Pre-Builds
        const preBuildsResponse = await pb
          .collection("build")
          .getFullList(undefined, false);
        setBuilds(preBuildsResponse);
      } catch (error) {
        console.error("Error fetching builds:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBuilds();
  }, [pb]);

  // Function to categorize builds based on their names
  const categorizeBuilds = () => {
    const gamingBuilds = [];
    const workstationBuilds = [];
    const multimediaBuilds = [];

    builds.forEach((build) => {
      if (build.name.toLowerCase().includes("gaming")) {
        gamingBuilds.push(build);
      } else if (build.name.toLowerCase().includes("workstation")) {
        workstationBuilds.push(build);
      } else if (
        build.name.toLowerCase().includes("multimedia") ||
        build.name.toLowerCase().includes("creative")
      ) {
        multimediaBuilds.push(build);
      }
    });

    return { gamingBuilds, workstationBuilds, multimediaBuilds };
  };

  const { gamingBuilds, workstationBuilds, multimediaBuilds } =
    categorizeBuilds();

  return (
    <div className="header1">
      <nav>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <div className="nav-links">
          <ul>
            <li>
              <a href="#home">HOME</a>
            </li>
            <li>
              <Link to="/configure">CONFIGURATOR</Link>
            </li>
            <li>
              <Link to="/build">BUILDS</Link>
            </li>
            <li>
              <Link to="/forum">FORUMS</Link>
            </li>
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

      <div className="tab-container">
        <div
          className={`tab ${activeTab === "pre-builds" ? "active" : ""}`}
          onClick={() => setActiveTab("pre-builds")}
        >
          Pre-Builds
        </div>
        <div
          className={`tab ${activeTab === "public-builds" ? "active" : ""}`}
          onClick={() => setActiveTab("public-builds")}
        >
          Public Builds
        </div>
      </div>

      <div className="build-container">
        {loading ? (
          <p>Loading...</p>
        ) : activeTab === "pre-builds" ? (
          <div className="builds-gallery">
            {gamingBuilds.length > 0 && (
              <div className="category">
                <h2>Gaming Builds</h2>
                <div className="category-builds">
                  {gamingBuilds.map((build) => (
                    <div className="build-box" key={build.id}>
                      <img
                        src={build.image}
                        alt={build.name}
                        className="build-image"
                      />
                      <div className="build-info">
                        <h3>{build.name}</h3>
                        <p className="build-description">{build.desc}</p>
                        <p className="build-price">
                          Total Price: ₹{build.total_price}
                        </p>
                        <Link
                          to={`/configure/${build.id}`}
                          className="build-configure-btn"
                        >
                          Configure This Build
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {workstationBuilds.length > 0 && (
              <div className="category">
                <h2>Workstation Builds</h2>
                <div className="category-builds">
                  {workstationBuilds.map((build) => (
                    <div className="build-box" key={build.id}>
                      <img
                        src={build.image}
                        alt={build.name}
                        className="build-image"
                      />
                      <div className="build-info">
                        <h3>{build.name}</h3>
                        <p className="build-description">{build.desc}</p>
                        <p className="build-price">
                          Total Price: ₹{build.total_price}
                        </p>
                        <Link
                          to={`/configure/${build.id}`}
                          className="build-configure-btn"
                        >
                          Configure This Build
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {multimediaBuilds.length > 0 && (
              <div className="category">
                <h2>Multimedia & Creative Builds</h2>
                <div className="category-builds">
                  {multimediaBuilds.map((build) => (
                    <div className="build-box" key={build.id}>
                      <img
                        src={build.image}
                        alt={build.name}
                        className="build-image"
                      />
                      <div className="build-info">
                        <h3>{build.name}</h3>
                        <p className="build-description">{build.desc}</p>
                        <p className="build-price">
                          Total Price: ₹{build.total_price}
                        </p>
                        <Link
                          to={`/configure/${build.id}`}
                          className="build-configure-btn"
                        >
                          Configure This Build
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {gamingBuilds.length === 0 &&
              workstationBuilds.length === 0 &&
              multimediaBuilds.length === 0 && <p>No builds found!</p>}
          </div>
        ) : (
          <div className="builds-gallery">
            {/* Handle public builds similar to pre-builds if needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Build;
