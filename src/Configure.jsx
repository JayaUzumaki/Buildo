import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/blankstyle.css"; // Import the CSS file for styling

export default function Configure() {
  const navigate = useNavigate();

  return (
    <section className="header">
      <nav>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <img src="BLK_BUI-removebg-preview.png" alt="Logo" />
        </a>
      </nav>

      <div className="Items">
        <h1 className="confighead">CONFIGURATOR</h1>
      </div>

      <div className="oneline">
        {/* Components Section */}
        <div className="Components">
          <h2>COMPONENTS</h2>
          <br />
          <br />
          <div>
            <table>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Selection</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CPU</td>
                  <td>
                    <button type="button" className="configbtn">
                      Choose A CPU
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>CPU Cooler</td>
                  <td>
                    <button type="button" className="configbtn">
                      Choose A CPU Cooler
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Motherboard</td>
                  <td>
                    <button type="button" className="configbtn">
                      Choose A Motherboard
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Memory</td>
                  <td>
                    <button type="button" className="configbtn">
                      Choose Memory
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Storage</td>
                  <td>
                    <button type="button" className="configbtn">
                      Choose Storage
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>GPU</td>
                  <td>
                    <button type="button" className="configbtn">
                      Choose A GPU
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Case</td>
                  <td>
                    <button type="button" className="configbtn">
                      Choose A Case
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Power Supply</td>
                  <td>
                    <button type="button" className="configbtn">
                      Choose A Power Supply
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Operating System</td>
                  <td>
                    <button type="button" className="configbtn">
                      Choose An Operating System
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Budget Section */}
        <div className="Budget">
          <h2>BUDGET</h2>
          <br />
          <br />
          <p className="paraconfig">Your Budget will be displayed here.</p>
        </div>
      </div>
    </section>
  );
}
