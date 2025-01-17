// File: /pages/hvac/cfm-calculator.js
import { useState } from "react";

export default function CFMCalculator() {
  // User inputs
  const [floorArea, setFloorArea] = useState("");
  const [ceilingHeight, setCeilingHeight] = useState("");
  const [ach, setAch] = useState("");

  // Output
  const [airflowCFM, setAirflowCFM] = useState(0);

  /**
   * CFM Calculation:
   *
   *   airflow (CFM) = floorArea (ft²) × ceilingHeight (ft) × ACH ÷ 60
   *
   * Where:
   *  floorArea       - Room's floor area in square feet (ft²)
   *  ceilingHeight   - Room's average ceiling height in feet (ft)
   *  ACH             - Air changes per hour
   */
  const handleCalculate = (e) => {
    e.preventDefault();

    const fa = parseFloat(floorArea) || 0;
    const ch = parseFloat(ceilingHeight) || 0;
    const airChanges = parseFloat(ach) || 0;

    const cfm = (fa * ch * airChanges) / 60;
    setAirflowCFM(Math.round(cfm * 100) / 100); // Round to 2 decimals
  };

  return (
    <>
      {/* Header / Hero section */}
      <section className="bg-[#004A7C] py-12 text-white text-center">
        <h1 className="text-4xl font-semibold">CFM Calculator</h1>
        <p className="mt-2 max-w-xl mx-auto">
          Calculate the required air flow rate (in CFM) for any room using its
          floor area, ceiling height, and air changes per hour (ACH).
        </p>
      </section>

      {/* Main Container */}
      <main className="mx-auto max-w-2xl px-4 py-8 text-gray-800">
        {/* Calculator Form */}
        <form
          onSubmit={handleCalculate}
          className="bg-white rounded-lg shadow-md p-6 space-y-6"
        >
          <h2 className="text-xl font-bold text-[#004A7C]">
            Enter Room Details
          </h2>

          {/* Floor Area */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <label
              htmlFor="floorArea"
              className="text-sm font-medium text-gray-700"
            >
              Room Floor Area (ft²):
            </label>
            <input
              id="floorArea"
              type="number"
              placeholder="e.g., 200"
              value={floorArea}
              onChange={(e) => setFloorArea(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-[#00aade]"
              required
            />
          </div>

          {/* Ceiling Height */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <label
              htmlFor="ceilingHeight"
              className="text-sm font-medium text-gray-700"
            >
              Ceiling Height (ft):
            </label>
            <input
              id="ceilingHeight"
              type="number"
              placeholder="e.g., 8"
              value={ceilingHeight}
              onChange={(e) => setCeilingHeight(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-[#00aade]"
              required
            />
          </div>

          {/* ACH */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <label
              htmlFor="ach"
              className="text-sm font-medium text-gray-700"
            >
              Air Changes per Hour (ACH):
            </label>
            <input
              id="ach"
              type="number"
              placeholder="e.g., 8"
              value={ach}
              onChange={(e) => setAch(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-[#00aade]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#00aade] hover:bg-[#008db4] text-white font-semibold py-2 rounded-md transition-all duration-200"
          >
            Calculate CFM
          </button>
        </form>

        {/* Results */}
        {airflowCFM > 0 && (
          <div className="mt-8 bg-[#f5faff] p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-[#004A7C] mb-4">Results</h2>
            <p className="mb-2">
              <strong>Required Air Flow Rate:</strong>{" "}
              {airflowCFM.toLocaleString()} CFM
            </p>
          </div>
        )}

        {/* Explanation Section */}
        <section className="mt-8 space-y-4 text-sm">
          <h2 className="text-xl font-bold text-[#004A7C]">
            About This CFM Calculation
          </h2>
          <p>
            <strong>CFM (cubic feet per minute)</strong> is a measure of volumetric
            airflow. This calculator helps determine the required CFM for a room,
            given its floor area, ceiling height, and the desired air changes per
            hour (ACH).
          </p>
          <p>
            The formula used here is:
            <br />
            <em>
              airflow (CFM) = (room floor area × ceiling height × ACH) / 60
            </em>
          </p>
          <p>
            This means that to achieve a certain ACH, we must replace the entire
            volume of the room multiple times per hour with fresh air.
          </p>
          <p>
            In practice, choosing the right ventilation system is crucial for
            maintaining indoor air quality, comfortable humidity levels, and
            temperature.
          </p>
        </section>
      </main>
    </>
  );
}