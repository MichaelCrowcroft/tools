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

    // Base HVAC load:
    //   (sq ft * ceiling height) + occupants*100 + windows*1000 + doors*1000
    let rawBTU = sf * ch + occ * 100 + win * 1000 + dr * 1000;

    // Apply insulation factor
    const insFactor = insulationFactors[insulation] || 1;
    rawBTU *= insFactor;

    setTotalBTU(Math.round(rawBTU));
  };

  const hvacTonnage = (totalBTU / 12000).toFixed(2);

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Header */}
      <header className="bg-white py-12 text-center">
        <h1 className="text-5xl font-bold text-[#0A2533] mb-4">
          HVAC Load Calculator
        </h1>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-[#0A2533] rounded-t-lg p-6">
          <h2 className="text-white text-2xl font-bold text-center">
            Manual J Load Calculation
          </h2>
        </div>

        <div className="bg-white rounded-b-lg shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Calculator Form */}
            <div className="space-y-6">
              <form onSubmit={handleCalculate} className="space-y-6">
                {/* Square Footage */}
                <div className="space-y-2">
                  <label className="flex items-center text-[#0A2533] font-medium">
                    Total Square Footage:
                    <button
                      type="button"
                      className="ml-2 text-gray-400 hover:text-gray-600"
                      title="Room area in square feet (omit unconditioned spaces)"
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
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      ft²
                    </span>
                    <input
                      type="number"
                      value={squareFootage}
                      onChange={(e) => setSquareFootage(e.target.value)}
                      className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B4ED50] focus:border-transparent"
                      placeholder="e.g., 2000"
                      required
                    />
                  </div>
                </div>

                {/* Ceiling Height */}
                <div className="space-y-2">
                  <label className="flex items-center text-[#0A2533] font-medium">
                    Ceiling Height:
                    <button
                      type="button"
                      className="ml-2 text-gray-400 hover:text-gray-600"
                      title="Average height of the ceiling in feet"
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
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      ft
                    </span>
                    <input
                      type="number"
                      value={ceilingHeight}
                      onChange={(e) => setCeilingHeight(e.target.value)}
                      className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B4ED50] focus:border-transparent"
                      placeholder="e.g., 10"
                      required
                    />
                  </div>
                </div>

                {/* Occupants */}
                <div className="space-y-2">
                  <label className="flex items-center text-[#0A2533] font-medium">
                    Number of Occupants:
                    <button
                      type="button"
                      className="ml-2 text-gray-400 hover:text-gray-600"
                      title="Occupants add heat gains (100 BTU each)."
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
                  <input
                    type="number"
                    value={occupants}
                    onChange={(e) => setOccupants(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B4ED50] focus:border-transparent"
                    placeholder="e.g., 4"
                  />
                </div>

                {/* Windows */}
                <div className="space-y-2">
                  <label className="flex items-center text-[#0A2533] font-medium">
                    Number of Windows:
                    <button
                      type="button"
                      className="ml-2 text-gray-400 hover:text-gray-600"
                      title="Each window adds about 1000 BTU."
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
                  <input
                    type="number"
                    value={windows}
                    onChange={(e) => setWindows(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B4ED50] focus:border-transparent"
                    placeholder="e.g., 12"
                  />
                </div>

                {/* Doors */}
                <div className="space-y-2">
                  <label className="flex items-center text-[#0A2533] font-medium">
                    Number of Exterior Doors:
                    <button
                      type="button"
                      className="ml-2 text-gray-400 hover:text-gray-600"
                      title="Each exterior door adds about 1000 BTU."
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
                  <input
                    type="number"
                    value={doors}
                    onChange={(e) => setDoors(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B4ED50] focus:border-transparent"
                    placeholder="e.g., 3"
                  />
                </div>

                {/* Insulation Level */}
                <div className="space-y-2">
                  <label className="flex items-center text-[#0A2533] font-medium">
                    Insulation Level:
                    <button
                      type="button"
                      className="ml-2 text-gray-400 hover:text-gray-600"
                      title="Insulation factor modifies total load."
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
                    value={insulation}
                    onChange={(e) => setInsulation(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B4ED50] focus:border-transparent"
                  >
                    <option value="poor">Poor</option>
                    <option value="average">Average</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                  </select>
                </div>

                {/* Calculate Button */}
                <button
                  type="submit"
                  className="bg-[#B4ED50] hover:bg-[#a3d647] text-[#0A2533] font-bold py-3 px-6 rounded-lg transition-colors w-full"
                >
                  Calculate Load
                </button>
              </form>
            </div>

            {/* Results Display */}
            <div className="bg-[#0A2533] p-8 rounded-lg">
              <h3 className="text-white text-xl mb-4">Total HVAC Load:</h3>
              <div className="text-5xl font-bold text-white mb-4">
                {totalBTU > 0 ? (
                  <>
                    <span className="text-[#B4ED50]">
                      {totalBTU.toLocaleString()}
                    </span>{" "}
                    <span className="text-2xl">BTU</span>
                  </>
                ) : (
                  <span className="text-[#B4ED50]">0</span>
                )}
              </div>
              <h3 className="text-white text-xl mb-2">Recommended HVAC Size:</h3>
              <div className="text-3xl font-bold text-[#B4ED50]">
                {totalBTU > 0 && !isNaN(parseFloat(hvacTonnage))
                  ? `${hvacTonnage} tons`
                  : "N/A"}
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
                    Put these calculations into action. Start managing
                    your HVAC business more efficiently today.
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
            How This Calculation Works
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              This tool uses a simplified version of a Manual J load calculation.
              We consider the following factors:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Square Footage × Ceiling Height:</strong> The total
                volume of the conditioned space.
              </li>
              <li>
                <strong>Occupants:</strong> Each occupant adds roughly 100 BTU
                per hour.
              </li>
              <li>
                <strong>Windows & Doors:</strong> Each adds roughly 1,000 BTU
                based on typical heat gains.
              </li>
              <li>
                <strong>Insulation Factor:</strong> Applied to the sum, from
                poor (1.2×) to excellent (0.75×).
              </li>
            </ul>
            <p>
              We then divide the total BTU requirement by 12,000 to estimate the
              needed HVAC tonnage. Real-world calculations would account for
              climate data, infiltration, solar gains, duct leaks, etc.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}