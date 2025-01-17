// File: /pages/hvac/load-calculator.js
import { useState } from "react";

export default function HVACLoadCalculator() {
  // User inputs
  const [squareFootage, setSquareFootage] = useState("");
  const [ceilingHeight, setCeilingHeight] = useState("");
  const [occupants, setOccupants] = useState("");
  const [windows, setWindows] = useState("");
  const [doors, setDoors] = useState("");
  const [insulation, setInsulation] = useState("average");

  // Output
  const [totalBTU, setTotalBTU] = useState(0);

  // Simple insulation multipliers (optional)
  const insulationFactors = {
    poor: 1.2,
    average: 1.0,
    good: 0.85,
    excellent: 0.75,
  };

  const handleCalculate = (e) => {
    e.preventDefault();

    // Parse user inputs
    const sf = parseFloat(squareFootage) || 0;
    const ch = parseFloat(ceilingHeight) || 0;
    const occ = parseFloat(occupants) || 0;
    const win = parseFloat(windows) || 0;
    const dr = parseFloat(doors) || 0;

    // Base HVAC load according to the new description:
    //  1) (House surface in sq ft) x (height of the ceiling)
    //  2) (# of occupants) x 100 BTU
    //  3) (# of windows) x 1000 BTU
    //  4) (# of exterior doors) x 1000 BTU
    let rawBTU =
      sf * ch + // (1)
      occ * 100 + // (2)
      win * 1000 + // (3)
      dr * 1000; // (4)

    // Apply insulation factor
    const insFactor = insulationFactors[insulation] || 1;
    rawBTU *= insFactor;

    setTotalBTU(Math.round(rawBTU));
  };

  const hvacTonnage = (totalBTU / 12000).toFixed(2);

  return (
    <>
      {/* Header / Hero section (optional) */}
      <section className="bg-[#004A7C] py-12 text-white text-center">
        <h1 className="text-4xl font-semibold">HVAC Load Calculator</h1>
        <p className="mt-2 max-w-lg mx-auto">
          Estimate your heating and cooling requirements with this simplified Manual J approach.
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
            Enter Building Details
          </h2>

          {/* Square Footage */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <label
              htmlFor="squareFootage"
              className="text-sm font-medium text-gray-700"
            >
              Total Square Footage:
            </label>
            <input
              id="squareFootage"
              type="number"
              min="0"
              placeholder="e.g., 2000"
              value={squareFootage}
              onChange={(e) => setSquareFootage(e.target.value)}
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
              min="0"
              placeholder="e.g., 10"
              value={ceilingHeight}
              onChange={(e) => setCeilingHeight(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-[#00aade]"
              required
            />
          </div>

          {/* Occupants */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <label
              htmlFor="occupants"
              className="text-sm font-medium text-gray-700"
            >
              Number of Occupants:
            </label>
            <input
              id="occupants"
              type="number"
              min="0"
              placeholder="e.g., 4"
              value={occupants}
              onChange={(e) => setOccupants(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-[#00aade]"
            />
          </div>

          {/* Windows */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <label
              htmlFor="windows"
              className="text-sm font-medium text-gray-700"
            >
              Number of Windows:
            </label>
            <input
              id="windows"
              type="number"
              min="0"
              placeholder="e.g., 12"
              value={windows}
              onChange={(e) => setWindows(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-[#00aade]"
            />
          </div>

          {/* Doors */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <label
              htmlFor="doors"
              className="text-sm font-medium text-gray-700"
            >
              Number of Exterior Doors:
            </label>
            <input
              id="doors"
              type="number"
              min="0"
              placeholder="e.g., 2"
              value={doors}
              onChange={(e) => setDoors(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-[#00aade]"
            />
          </div>

          {/* Insulation Level */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <label
              htmlFor="insulation"
              className="text-sm font-medium text-gray-700"
            >
              Insulation Level:
            </label>
            <select
              id="insulation"
              value={insulation}
              onChange={(e) => setInsulation(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-[#00aade]"
            >
              <option value="poor">Poor</option>
              <option value="average">Average</option>
              <option value="good">Good</option>
              <option value="excellent">Excellent</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#00aade] hover:bg-[#008db4] text-white font-semibold py-2 rounded-md transition-all duration-200"
          >
            Calculate Load
          </button>
        </form>

        {/* Results */}
        {totalBTU > 0 && (
          <div className="mt-8 bg-[#f5faff] p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-[#004A7C] mb-4">Results</h2>
            <p className="mb-2">
              <strong>Total HVAC Load:</strong>{" "}
              {totalBTU.toLocaleString()} BTU
            </p>
            <p className="mb-2">
              <strong>Recommended HVAC Size:</strong>{" "}
              {isNaN(parseFloat(hvacTonnage)) ? "—" : `${hvacTonnage} tons`}
            </p>
          </div>
        )}

        {/* Explanation Section */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-[#004A7C] mb-4">
            How This Calculation Works
          </h2>
          <ol className="list-decimal list-inside space-y-2 mb-4 text-sm">
            <li>
              <strong>Measure the square footage:</strong> Find the total
              conditioned square footage of the building.
            </li>
            <li>
              <strong>Evaluate the building&apos;s insulation:</strong> We
              account for insulation levels by applying a multiplier based
              on whether the insulation is poor, average, good, or excellent.
            </li>
            <li>
              <strong>Consider the building usage:</strong> Identify
              potential heat sources and the number of occupants, as more
              occupants means higher cooling loads (and occupant heat gain).
            </li>
            <li>
              <strong>Determine the BTU of each element:</strong> We add
              100 BTU per occupant, 1,000 BTU per window, and 1,000 BTU per
              exterior door. For the living area, we multiply square footage
              by ceiling height to get volume-based BTU needs. Then, we apply
              the insulation factor.
            </li>
            <li>
              <strong>Calculate the HVAC load:</strong> We sum all BTU
              contributions and convert to tons (1 ton per 12,000 BTU) to
              find the recommended HVAC capacity.
            </li>
          </ol>
        </section>
      </main>
    </>
  );
}