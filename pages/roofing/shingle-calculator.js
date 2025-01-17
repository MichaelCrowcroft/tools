// File: /pages/hvac/shingle-calculator.js
import { useState } from "react";

/**
 * Shingle Calculator Requirements:
 * 1. Inputs:
 *    - Roof length & width (with unit options)
 *    - Pitch input in one of three forms:
 *      - x:12 (rise over run, e.g. 6:12)
 *      - Angle (degrees)
 *      - Percentage (rise/run * 100)
 *    - Bundle coverage (ft²) [default ~33.3]
 *    - Shingles per bundle [default 29]
 *
 * 2. Calculations:
 *    - Convert length & width to feet (ft).
 *    - Compute 'footprint' area in ft² => length * width
 *    - Compute slope multiplier depending on pitch type.
 *       If pitch = x:12 => multiplier = sqrt(1 + (x/12)²)
 *       If angle in degrees => multiplier = 1/cos(angle in radians)
 *       If percentage => pitch% => multiplier = sqrt(1 + (pitch/100)²)
 *    - roofArea = footprintArea * slopeMultiplier
 *    - squares = roofArea / 100
 *    - bundlesNeeded = roofArea / bundleCoverage => typically round UP
 *    - shinglesNeeded = bundlesNeeded * shinglesPerBundle => typically round as integer
 *
 * 3. Output:
 *    - Roof area (ft²)
 *    - Roof area in squares
 *    - Number of bundles
 *    - Number of shingles
 */

const lengthConversions = {
  ft: 1,
  in: 1 / 12,
  m: 3.28084,
  cm: 0.0328084,
};

export default function ShingleCalculator() {
  // Form states
  const [roofLength, setRoofLength] = useState("");
  const [lengthUnit, setLengthUnit] = useState("ft");
  const [roofWidth, setRoofWidth] = useState("");
  const [widthUnit, setWidthUnit] = useState("ft");

  // Pitch
  const [pitchType, setPitchType] = useState("x12"); // 'x12' | 'angle' | 'percent'
  const [pitchValue, setPitchValue] = useState("");

  // Shingle/Bundles
  const [bundleCoverage, setBundleCoverage] = useState("33.3"); // ft² per bundle
  const [shinglesPerBundle, setShinglesPerBundle] = useState("29");

  // Results
  const [roofArea, setRoofArea] = useState(0); // in ft²
  const [squares, setSquares] = useState(0); // squares
  const [totalBundles, setTotalBundles] = useState(0);
  const [totalShingles, setTotalShingles] = useState(0);

  // Calculation handler
  const handleCalculate = (e) => {
    e.preventDefault();

    // 1) Convert length & width to ft
    const lengthFt =
      parseFloat(roofLength) * (lengthConversions[lengthUnit] || 1) || 0;
    const widthFt =
      parseFloat(roofWidth) * (lengthConversions[widthUnit] || 1) || 0;

    // 2) Footprint area
    const footprintArea = lengthFt * widthFt; // ft²

    // 3) Slope multiplier
    const rawPitch = parseFloat(pitchValue) || 0;
    let slopeMultiplier = 1;
    if (pitchType === "x12") {
      // x:12 pitch => multiplier = sqrt(1 + (x/12)²)
      slopeMultiplier = Math.sqrt(1 + Math.pow(rawPitch / 12, 2));
    } else if (pitchType === "angle") {
      // angle in degrees => multiplier = 1/cos(angle)
      const radians = (rawPitch * Math.PI) / 180;
      // angle from horizontal => multiplier = 1 / cos(angle)
      slopeMultiplier = 1 / Math.cos(radians);
    } else if (pitchType === "percent") {
      // pitch% => slope = pitch/100 => multiplier = sqrt(1 + slope²)
      slopeMultiplier = Math.sqrt(1 + Math.pow(rawPitch / 100, 2));
    }

    const calcRoofArea = footprintArea * slopeMultiplier; // ft²
    const calcSquares = calcRoofArea / 100;

    // 4) Bundles & Shingles
    const coverage = parseFloat(bundleCoverage) || 33.3; // ft² per bundle
    const spb = parseInt(shinglesPerBundle) || 29;

    // Round up the number of bundles
    const neededBundles = Math.ceil(calcRoofArea / coverage);
    // Shingles needed is #bundles * shingles/bundle
    const neededShingles = neededBundles * spb;

    // Update states
    setRoofArea(calcRoofArea);
    setSquares(calcSquares);
    setTotalBundles(neededBundles);
    setTotalShingles(neededShingles);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Header */}
      <header className="bg-white py-12 text-center">
        <h1 className="text-5xl font-bold text-[#0A2533] mb-4">
          Try our Roof Shingle Calculator
        </h1>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-[#0A2533] rounded-t-lg p-6">
          <h2 className="text-white text-2xl font-bold text-center">
            Roof Shingle Calculation
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
                    title="Horizontal distance (length) of the roof's base."
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
                    placeholder="e.g., 30"
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
                    title="Horizontal distance (width) of the roof's base."
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
                    placeholder="e.g., 20"
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

              {/* Pitch Type */}
              <div className="space-y-2">
                <label className="flex items-center text-[#0A2533] font-medium">
                  Pitch Type:
                </label>
                <div className="flex gap-4">
                  {/* x:12 Radio */}
                  <label className="inline-flex items-center gap-1 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="pitchType"
                      value="x12"
                      checked={pitchType === "x12"}
                      onChange={(e) => setPitchType(e.target.value)}
                    />
                    x:12
                  </label>
                  {/* Angle Radio */}
                  <label className="inline-flex items-center gap-1 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="pitchType"
                      value="angle"
                      checked={pitchType === "angle"}
                      onChange={(e) => setPitchType(e.target.value)}
                    />
                    Angle (°)
                  </label>
                  {/* Percentage Radio */}
                  <label className="inline-flex items-center gap-1 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="pitchType"
                      value="percent"
                      checked={pitchType === "percent"}
                      onChange={(e) => setPitchType(e.target.value)}
                    />
                    Percent (%)
                  </label>
                </div>
              </div>

              {/* Pitch Value */}
              <div className="space-y-2">
                <label className="flex items-center text-[#0A2533] font-medium">
                  Pitch Value:
                  <button
                    type="button"
                    className="ml-2 text-gray-400 hover:text-gray-600"
                    title="Depending on the pitch type selected."
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
                  step="any"
                  value={pitchValue}
                  onChange={(e) => setPitchValue(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B4ED50] focus:border-transparent"
                  placeholder={
                    pitchType === "x12"
                      ? "e.g., 6 (for 6:12 pitch)"
                      : pitchType === "angle"
                      ? "e.g., 30 (degrees)"
                      : "e.g., 50 (percent)"
                  }
                  required
                />
              </div>

              {/* Bundle Coverage */}
              <div className="space-y-2">
                <label className="flex items-center text-[#0A2533] font-medium">
                  Coverage per Bundle (ft²):
                  <button
                    type="button"
                    className="ml-2 text-gray-400 hover:text-gray-600"
                    title="One shingle bundle typically covers ~33.3 ft²."
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
                  step="any"
                  value={bundleCoverage}
                  onChange={(e) => setBundleCoverage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B4ED50] focus:border-transparent"
                  placeholder="33.3"
                />
              </div>

              {/* Shingles Per Bundle */}
              <div className="space-y-2">
                <label className="flex items-center text-[#0A2533] font-medium">
                  Shingles per Bundle:
                  <button
                    type="button"
                    className="ml-2 text-gray-400 hover:text-gray-600"
                    title="Typically 29 standard shingles in a bundle."
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
                  step="1"
                  value={shinglesPerBundle}
                  onChange={(e) => setShinglesPerBundle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B4ED50] focus:border-transparent"
                  placeholder="29"
                />
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

              <div className="mb-4">
                <p className="text-white text-sm mb-1">Roof Area:</p>
                <p className="text-3xl font-bold text-[#B4ED50]">
                  {roofArea > 0 ? roofArea.toFixed(2) : "0.00"} ft²
                </p>
              </div>

              <div className="mb-4">
                <p className="text-white text-sm mb-1">Roof Area in Squares:</p>
                <p className="text-3xl font-bold text-[#B4ED50]">
                  {squares > 0 ? squares.toFixed(2) : "0.00"} squares
                </p>
              </div>

              <div className="mb-4">
                <p className="text-white text-sm mb-1">Bundles Needed:</p>
                <p className="text-3xl font-bold text-[#B4ED50]">
                  {totalBundles > 0 ? totalBundles : 0}
                </p>
              </div>

              <div>
                <p className="text-white text-sm mb-1">Shingles Needed:</p>
                <p className="text-3xl font-bold text-[#B4ED50]">
                  {totalShingles > 0 ? totalShingles : 0}
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
            How to Use the Roof Shingle Calculator
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              1. Enter the roof&apos;s <strong>length</strong> and{" "}
              <strong>width</strong> with your chosen units. <br />
              2. Select the <strong>pitch type</strong> (x:12, angle, or
              percent) and provide the <strong>pitch value</strong>. <br />
              3. Optionally adjust the <strong>bundle coverage</strong> and{" "}
              <strong>shingles per bundle</strong> if they differ from the
              standard assumptions.
            </p>
            <p>
              Once you click <em>Calculate</em>, you&apos;ll see:
            </p>
            <ul className="list-disc list-inside">
              <li>
                The <strong>roof area</strong> in ft², accounting for the roof
                slope.
              </li>
              <li>
                The <strong>area in squares</strong> (1 square = 100 ft²).
              </li>
              <li>The total <strong>bundles</strong> needed.</li>
              <li>The total <strong>shingles</strong> needed.</li>
            </ul>
          </div>

          <h2 className="text-xl font-bold text-[#0A2533] mt-6 mb-4">
            How Many Shingles Do I Need?
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              In most cases, you need about 3 bundles to cover 100 ft² of roof
              area (one square). If your bundles differ from the typical{" "}
              <em>33.3 ft² coverage</em>, adjust the bundle coverage field to
              match your shingles.
            </p>
            <p>
              If you want to see a more detailed breakdown of the math behind
              how to calculate roof shingles by hand, check out the explanation
              in the text above or consult a roofing professional.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}