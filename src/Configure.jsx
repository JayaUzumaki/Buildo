import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // For navigation and route params
import { usePocket } from "./context/PocketContext"; // PocketBase context
import "./styles/blankstyle.css";
import Logo from "./assets/BLK_BUI-removebg-preview.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

export default function Configure() {
  const navigate = useNavigate();
  const { buildId } = useParams(); // Extract buildId from URL parameters
  const { pb } = usePocket();

  const [showModal, setShowModal] = useState(false);
  const [showBuildModal, setShowBuildModal] = useState(false);
  const [componentType, setComponentType] = useState("");
  const [components, setComponents] = useState([]);
  const [selectedComponents, setSelectedComponents] = useState({});
  const [selectedComponentsForSave, setSelectedComponentsForSave] = useState(
    []
  );
  const [totalBudget, setTotalBudget] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [buildData, setBuildData] = useState({
    image_url: "",
    name: "",
    desc: "",
    total_price: 0,
  });

  // Fetch components associated with the selected buildId
  useEffect(() => {
    if (buildId) {
      const fetchBuildComponents = async () => {
        try {
          setLoading(true);
          setError(null);

          // Fetch build_components with expanded related components
          const response = await pb.collection("build_component").getFullList({
            filter: `build_id="${buildId}"`,
            expand: "component",
          });

          // Process related components and organize them by type
          const componentsByType = response.reduce((acc, item) => {
            if (item.expand.component && Array.isArray(item.expand.component)) {
              item.expand.component.forEach((component) => {
                if (component && component.type) {
                  acc[component.type] = {
                    name: `${component.brand} ${component.model}`,
                    price: component.price,
                    id: component.id,
                  };
                }
              });
            }
            return acc;
          }, {});

          setSelectedComponents(componentsByType);
        } catch (err) {
          console.error("Error fetching build components:", err);
          setError("Failed to fetch build components. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchBuildComponents();
    }
  }, [buildId, pb]);

  const isLoggedIn = pb.authStore.isValid;

  const handlePickSelectedOptions = () => {
    const selectedComponentsList = Object.values(selectedComponents).filter(
      (component) => component.id
    ); // Filter out any empty or undefined components

    if (selectedComponentsList.length === 0) {
      alert("Please select at least one component to save.");
      return null;
    }

    return selectedComponentsList.map((component) => ({
      id: component.id,
      name: component.name,
      price: component.price,
    }));
  };

  // Handle Save Button Click
  const handleSaveConfiguration = async () => {
    try {
      if (!isLoggedIn) {
        return alert("You must be logged in to save configurations.");
      }

      const selectedComponentsForSave = handlePickSelectedOptions(); // Get selected components for saving

      if (
        !selectedComponentsForSave ||
        selectedComponentsForSave.length === 0
      ) {
        return alert("Please select at least one component to save.");
      }

      // Show the build modal for entering build details
      setSelectedComponentsForSave(selectedComponentsForSave); // Store the selected components
      setShowBuildModal(true);
    } catch (error) {
      console.error("Error saving configuration:", error);
      alert("Failed to save configuration. Please try again.");
    }
  };

  // Function to handle build form submission
  const handleBuildSubmit = async () => {
    try {
      const { image_url, name, desc, total_price } = buildData;

      // Log the data before trying to save it
      console.log("Submitting Build Data:", {
        image_url,
        name,
        desc,
        total_price,
      });

      if (!image_url || !name || !desc || !total_price) {
        alert("All fields are required.");
        return;
      }

      // Save the build data to the build table
      const buildPayload = {
        image: image_url,
        user_id: pb.authStore.model.id, // Assuming user is logged in and we can get the user ID
        name,
        desc,
        totalBudget,
      };

      // Log the buildPayload before API call
      console.log("Build Payload to Save:", buildPayload);

      const savedBuild = await pb.collection("build").create(buildPayload);

      // Log the saved build response
      console.log("Saved Build Response:", savedBuild);

      const buildId = savedBuild.id;

      // Now, insert the selected components into the build_component table
      const allComponentIds = selectedComponentsForSave.map((comp) => comp.id);

      const payload = {
        build_id: buildId,
        component: allComponentIds, // Send array of IDs
      };

      // Save configuration to the backend
      await pb.collection("build_component").create(payload);
      alert("Configuration saved successfully!");
    } catch (error) {
      console.error("Error saving configuration:", error);
      alert("Failed to save configuration. Please try again.");
    }
  };

  // Modal to enter build details (image URL, name, description, and total price)
  const handleInputChange = (e) => {
    setBuildData({ ...buildData, [e.target.name]: e.target.value });
  };

  // Fetch components of a particular type for the modal
  const fetchCompatibility = async (componentId) => {
    try {
      const response = await pb.collection("compatibility").getList(1, 50, {
        filter: `component_id_1="${componentId}" && is_compatible=true`, // Filter for compatible components
      });

      return response.items;
    } catch (error) {
      console.error("Error fetching compatibility data:", error);
      throw error; // Propagate error for retry logic
    }
  };

  // Retry logic for fetching compatibility with a delay
  const fetchCompatibilityWithRetry = async (
    componentId,
    retries = 3,
    delay = 1000
  ) => {
    try {
      return await fetchCompatibility(componentId);
    } catch (error) {
      if (retries > 0) {
        console.warn(
          `Retrying compatibility fetch for componentId: ${componentId}`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        return await fetchCompatibilityWithRetry(
          componentId,
          retries - 1,
          delay
        );
      }
      throw error; // If no retries left, throw the error
    }
  };

  const fetchComponentsByType = async (type) => {
    setLoading(true);
    setError(null); // Reset error message before each fetch
    try {
      const response = await pb.collection("components").getFullList({
        filter: `type="${type}"`,
      });

      const compatibleComponents = [];
      for (let component of response) {
        const compatibleWithCPU = await checkCompatibilityWithCPU(component);
        if (compatibleWithCPU) {
          compatibleComponents.push(component);
        }
      }

      setComponents(compatibleComponents);
    } catch (error) {
      console.error("Error fetching components:", error);
      setError("Failed to fetch components. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const checkCompatibilityWithCPU = async (component) => {
    // If CPU is selected, compare with component_id_1 (CPU ID) from compatibility table
    if (selectedComponents.CPU) {
      const compatibilityData = await fetchCompatibilityWithRetry(
        selectedComponents.CPU.id
      );
      const isCompatible = compatibilityData.some((compatibility) => {
        return (
          compatibility.component_id_2 === component.id &&
          compatibility.is_compatible
        );
      });

      return isCompatible;
    }
    return true; // If no CPU selected, assume compatibility
  };

  const handleComponentButtonClick = (type) => {
    setComponentType(type);
    fetchComponentsByType(type);
    setShowModal(true);
  };

  const handleSelectComponent = (component) => {
    const componentName = `${component.brand} ${component.model}`;
    setSelectedComponents((prev) => ({
      ...prev,
      [componentType]: {
        name: componentName,
        price: component.price,
        id: component.id,
      },
    }));
    setShowModal(false);
  };

  // Calculate total budget whenever selectedComponents change
  useEffect(() => {
    let budget = 0;

    Object.values(selectedComponents).forEach((component) => {
      // Check if price is a valid string before calling replace
      const priceString = component.price || "";
      const price = parseFloat(priceString.replace(/[₹,]/g, "")); // Replace currency symbols and commas
      if (!isNaN(price)) {
        budget += price;
      }
    });

    setTotalBudget(budget);
  }, [selectedComponents]);

  return (
    <section className="header">
      <nav>
        <img
          src={Logo}
          alt="Logo"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />

        {/* Save icon visible only to logged-in users */}
        {isLoggedIn && (
          <FontAwesomeIcon
            icon={faSave}
            className="save-icon"
            onClick={handleSaveConfiguration}
            title="Save Build"
            style={{
              cursor: "pointer",
              fontSize: "24px",
              color: "green",
              marginLeft: "10px",
            }}
          />
        )}
      </nav>

      <div className="Items">
        <h1 className="confighead">CONFIGURATOR</h1>
      </div>

      <div className="oneline">
        <div className="Components">
          <h2>COMPONENTS</h2>
          <table>
            <thead>
              <tr>
                <th>Component</th>
                <th>Selection</th>
              </tr>
            </thead>
            <tbody>
              {[
                "CPU",
                "CPU Cooler",
                "Motherboard",
                "RAM",
                "Storage",
                "GPU",
                "Case",
                "Power Supply",
                "Operating System",
              ].map((type) => (
                <tr key={type}>
                  <td>{type}</td>
                  <td>
                    <button
                      type="button"
                      className="configbtn"
                      onClick={() => handleComponentButtonClick(type)}
                    >
                      {selectedComponents[type]
                        ? `${selectedComponents[type].name}`
                        : `Choose ${type}`}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="Budget">
          <h2>BUDGET</h2>
          <p className="paraconfig">Total Budget: {totalBudget.toFixed(2)}</p>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ color: "white" }}>Select {componentType}</h3>
            <button
              className="close-modal-btn"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <ul>
              {loading ? (
                <li>Loading components...</li>
              ) : error ? (
                <li>{error}</li>
              ) : (
                components.map((component) => (
                  <li key={component.id}>
                    <button
                      className="component-option"
                      onClick={() => handleSelectComponent(component)}
                    >
                      {`${component.brand} ${component.model}`} -{" "}
                      {component.price}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
      {/* Build Configuration Modal */}
      {showBuildModal && (
        <div
          className="modal-overlay1"
          onClick={() => setShowBuildModal(false)}
        >
          <div className="modal-content1" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ color: "white" }}>Save Your Build</h3>
            <button
              className="close-modal-btn"
              onClick={() => setShowBuildModal(false)}
            >
              &times;
            </button>
            <form onSubmit={handleBuildSubmit}>
              <label>Image URL</label>
              <input
                type="text"
                name="image_url"
                value={buildData.image_url}
                onChange={handleInputChange}
                required
              />
              <label>Build Name</label>
              <input
                type="text"
                name="name"
                value={buildData.name}
                onChange={handleInputChange}
                required
              />
              <label>Description</label>
              <textarea
                name="desc"
                value={buildData.desc}
                onChange={handleInputChange}
                required
              />
              <button type="submit" className="save-btn">
                Save Build
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
