// File: /pages/hvac/roof-sheathing-calculator.js
import { useState } from "react";

/**
 * Roof Sheathing Calculator Requirements:
 *
 * 1) Inputs:
 *   - Roof length & width (with unit options)
 *   - Roof pitch from a list (each pitch has a multiplier)
 *   - (Optional) Sheathing thickness (7/16", 1/2", 5/8")
 *
 * 2) Calculations:
 *   - Convert length & width to feet => (ex: 'ft', 'in', 'm')
 *   - Base area = length * width
 *   - Adjusted area = base area * pitch multiplier
 *   - Number of 4x8 panels needed:
 *     area per panel = 32 ft²
 *     totalPanels = ceil(adjustedArea / 32)
 *
 * 3) Outputs:
 *   - Base area (ft²)
 *   - Adjusted area (ft²) after applying pitch multiplier
 *   - Number of sheathing panels (4x8)
 */

const lengthConversions = {
  ft: 1,
  in: 1 / 12,
  m: 3.28084,
  cm: 0.0328084,
};

// Common pitch multipliers (examples from your table)
const pitchMultipliers = [
  { label: "2:12 (low)", value: 1.02 },
  { label: "4:12", value: 1.06 },
  { label: "6:12", value: 1.12 },
  { label: "8:12", value: 1.20 },
  { label: "10:12 (high)", value: 1.30 },
];

export default function RoofSheathingCalculator() {
  // Form states
  const [roofLength, setRoofLength] = useState("");
  const [lengthUnit, setLengthUnit] = useState("ft");

  const [roofWidth, setRoofWidth] = useState("");
  const [widthUnit, setWidthUnit] = useState("ft");

  const [pitch, setPitch] = useState("1.12"); // default to 6:12 pitch
  const [thickness, setThickness] = useState("7/16");

  // Results
  const [baseArea, setBaseArea] = useState(0);
  const [adjustedArea, setAdjustedArea] = useState(0);
  const [panelsNeeded, setPanelsNeeded] = useState(0);

  const handleCalculate = (e) => {
    e.preventDefault();

    // 1) Convert length & width to feet
    const lengthFt =
      parseFloat(roofLength) * (lengthConversions[lengthUnit] || 1) || 0;
    const widthFt =
      parseFloat(roofWidth) * (lengthConversions[widthUnit] || 1) || 0;

    // 2) Base area
    const area = lengthFt * widthFt;

    // 3) Apply pitch multiplier
    const multiplier = parseFloat(pitch) || 1.0;
    const adjArea = area * multiplier;

    // 4) Number of 4x8 panels (32 ft² each)
    const needed = Math.ceil(adjArea / 32);

    // Update states
    setBaseArea(area);
    setAdjustedArea(adjArea);
    setPanelsNeeded(needed);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Header */}
      <header className="bg-white py-12 text-center">
        <h1 className="text-5xl font-bold text-[#0A2533] mb-4">
          Roof Sheathing Calculator
        </h1>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-[#0A2533] rounded-t-lg p-6">
          <h2 className="text-white text-2xl font-bold text-center">
            Estimate Your Roof Sheathing Needs
          </h2>
        </div>

        <div className="bg-white rounded-b-lg shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Calculator Form */}
            <form onSubmit={handleCalculate} className="space-y-6">
              {/* Roof Length */}
              <div className="space-y-2">
                <label className="flex items-center text-[#0A2533] font-medium">
                  Roof Length:
                  <button
                    type="button"
                    className="ml-2 text-gray-400 hover:text-gray-600"
                    title="Horizontal length of the roof's base."
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path strokeWidth="2" d="M12 16v-4M12 8h.01" />
                    </svg>
                  </button>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="any"
                    value={roofLength}
                    onChange={(e) => setRoofLength(e.target.value)}
                    className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B4ED50] focus:border-transparent"
                    placeholder="e.g., 20"
                    required
                  />
                  <select
                    value={lengthUnit}
                    onChange={(e) => setLengthUnit(e.target.value)}
                    className="py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B4ED50] focus:border-transparent"
                  >
                    <option value="ft">ft</option>
                    <option value="in">in</option>
                    <option value="m">m</option>
                    <option value="cm">cm</option>
                  </select>
                </div>
              </div>

              {/* Roof Width */}
              <div className="space-y-2">
                <label className="flex items-center text-[#0A2533] font-medium">
                  Roof Width:
                  <button
                    type="button"
                    className="ml-2 text-gray-400 hover:text-gray-600"
                    title="Horizontal width of the roof's base."
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path strokeWidth="2" d="M12 16v-4M12 8h.01" />
                    </svg>
                  </button>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="any"
                    value={roofWidth}
                    onChange={(e) => setRoofWidth(e.target.value)}
                    className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B4ED50] focus:border-transparent"
                    placeholder="e.g., 30"
                    required
                  />
                  <select
                    value={widthUnit}
                    onChange={(e) => setWidthUnit(e.target.value)}
                    className="py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B4ED50] focus:border-transparent"
                  >
                    <option value="ft">ft</option>
                    <option value="in">in</option>
                    <option value="m">m</option>
                    <option value="cm">cm</option>
                  </select>
                </div>
              </div>

              {/* Roof Pitch */}
              <div className="space-y-2">
                <label className="flex items-center text-[#0A2533] font-medium">
                  Roof Pitch:
                  <button
                    type="button"
                    className="ml-2 text-gray-400 hover:text-gray-600"
                    title="Select your roof's pitch multiplier."
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path strokeWidth="2" d="M12 16v-4M12 8h.01" />
                    </svg>
                  </button>
                </label>
                <select
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B4ED50] focus:border-transparent"
                >
                  {pitchMultipliers.map((pm) => (
                    <option key={pm.label} value={pm.value}>
                      {pm.label} (× {pm.value})
                    </option>
                  ))}
                </select>
              </div>

              {/* Sheathing Thickness */}
              <div className="space-y-2">
                <label className="flex items-center text-[#0A2533] font-medium">
                  Sheathing Thickness:
                  <button
                    type="button"
                    className="ml-2 text-gray-400 hover:text-gray-600"
                    title="Choose your panel thickness (7/16, 1/2, or 5/8)."
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path strokeWidth="2" d="M12 16v-4M12 8h.01" />
                    </svg>
                  </button>
                </label>
                <select
                  value={thickness}
                  onChange={(e) => setThickness(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B4ED50] focus:border-transparent"
                >
                  <option value="7/16">7/16"</option>
                  <option value="1/2">1/2"</option>
                  <option value="5/8">5/8"</option>
                </select>
              </div>

              {/* Calculate Button */}
              <button
                type="submit"
                className="bg-[#B4ED50] hover:bg-[#a3d647] text-[#0A2533] font-bold py-3 px-6 rounded-lg transition-colors w-full"
              >
                Calculate
              </button>
            </form>

            {/* Results Display */}
            <div className="bg-[#0A2533] p-8 rounded-lg">
              <h3 className="text-white text-xl mb-4">Results</h3>

              {/* Base Area */}
              <div className="mb-4">
                <p className="text-white text-sm mb-1">Base Area (no pitch):</p>
                <p className="text-3xl font-bold text-[#B4ED50]">
                  {baseArea > 0 ? baseArea.toFixed(2) : "0.00"} ft²
                </p>
              </div>

              {/* Adjusted Area */}
              <div className="mb-4">
                <p className="text-white text-sm mb-1">Adjusted Area:</p>
                <p className="text-3xl font-bold text-[#B4ED50]">
                  {adjustedArea > 0 ? adjustedArea.toFixed(2) : "0.00"} ft²
                </p>
              </div>

              {/* Panels Needed */}
              <div>
                <p className="text-white text-sm mb-1">4x8 Panels Needed:</p>
                <p className="text-3xl font-bold text-[#B4ED50]">
                  {panelsNeeded > 0 ? panelsNeeded : 0}
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 border-t pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-X00zVo8X4cX9U8UCz6grx775JnZ2KC.png"
                  alt="Calculator illustration"
                  className="w-32 opacity-50"
                />
                <div>
                  <h3 className="text-xl font-bold text-[#0A2533] mb-2">
                    Try our HVAC software
                  </h3>
                  <p className="text-gray-600">
                    Put these calculations into action. Start managing your
                    building projects more efficiently today.
                  </p>
                </div>
              </div>
              <button className="bg-[#B4ED50] hover:bg-[#a3d647] text-[#0A2533] font-bold py-3 px-6 rounded-lg transition-colors">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>

        {/* Explanation Section */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-bold text-[#0A2533] mb-4">
            How to Calculate Roof Sheathing Requirements
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>1. Measuring the Surface Area</strong><br />
              Measure the length and width of each roof section and multiply to
              get the area. If you have multiple sections, sum the areas.
            </p>
            <p>
              <strong>2. Correcting for Roof Pitch</strong><br />
              Use a pitch multiplier from the table to account for the extra area
              on steeper roofs. Multiply the base area by that multiplier.
            </p>
            <p>
              <strong>3. Sheathing Panel Dimensions</strong><br />
              Standard panels measure <em>4 ft × 8 ft</em>, giving 32 ft² coverage.
              Divide the total area (after pitch adjustment) by 32 to find how many
              panels you need, rounding up.
            </p>
            <p>
              <strong>Thickness</strong><br />
              The choice of thickness (7/16", 1/2", or 5/8") depends on local codes
              and the loads your roof must handle.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}