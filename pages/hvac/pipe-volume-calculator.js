import { useState } from "react";

// Conversion multipliers to convert user inputs to base SI units (meters, kg/m³).
const lengthConversion = {
  m: 1,
  cm: 0.01,
  mm: 0.001,
  ft: 0.3048,
  in: 0.0254,
};

const densityConversion = {
  "kg/m³": 1, // base
  "lb/ft³": 16.018463, // 1 lb/ft³ = 16.018463 kg/m³
};

export default function PipeVolumeCalculator() {
  // Form inputs
  const [diameter, setDiameter] = useState("");
  const [diameterUnit, setDiameterUnit] = useState("in");
  const [length, setLength] = useState("");
  const [lengthUnit, setLengthUnit] = useState("ft");
  const [density, setDensity] = useState("997"); // default water density in kg/m³
  const [densityUnit, setDensityUnit] = useState("kg/m³");

  // Results
  const [volume, setVolume] = useState(0);
  const [liquidMass, setLiquidMass] = useState(0);

  const handleCalculate = (e) => {
    e.preventDefault();

    // Parse numeric inputs
    const d = parseFloat(diameter) || 0;
    const L = parseFloat(length) || 0;
    const rho = parseFloat(density) || 0;

    // Convert all to SI (meters, kg/m³)
    const diameterInMeters = d * (lengthConversion[diameterUnit] || 1);
    const lengthInMeters = L * (lengthConversion[lengthUnit] || 1);
    const densityInSI = rho * (densityConversion[densityUnit] || 1);

    // radius = diameter/2
    const radiusInMeters = diameterInMeters / 2;

    // volume (m³) = π * r² * length
    const calcVolume = Math.PI * Math.pow(radiusInMeters, 2) * lengthInMeters;

    // mass (kg) = volume (m³) * density (kg/m³)
    const calcMass = calcVolume * densityInSI;

    setVolume(calcVolume);
    setLiquidMass(calcMass);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Header */}
      <header className="bg-white py-12 text-center">
        <h1 className="text-5xl font-bold text-[#0A2533] mb-4">
          Try our Pipe Volume Calculator
        </h1>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Dark header bar */}
        <div className="bg-[#0A2533] rounded-t-lg p-6">
          <h2 className="text-white text-2xl font-bold text-center">
            Pipe Volume Calculation
          </h2>
        </div>

        {/* Form and Results */}
        <div className="bg-white rounded-b-lg shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Calculator Form */}
            <form onSubmit={handleCalculate} className="space-y-6">
              {/* Inner Diameter */}
              <div className="space-y-2">
                <label className="flex items-center text-[#0A2533] font-medium">
                  Inner Diameter:
                  <button
                    type="button"
                    className="ml-2 text-gray-400 hover:text-gray-600"
                    title="The pipe's inner diameter (not outer)."
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
                  <div className="relative w-full">
                    <input
                      type="number"
                      step="any"
                      value={diameter}
                      onChange={(e) => setDiameter(e.target.value)}
                      className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B4ED50] focus:border-transparent"
                      placeholder="e.g., 15"
                      required
                    />
                  </div>
                  <select
                    value={diameterUnit}
                    onChange={(e) => setDiameterUnit(e.target.value)}
                    className="py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B4ED50] focus:border-transparent"
                  >
                    <option value="in">in</option>
                    <option value="ft">ft</option>
                    <option value="mm">mm</option>
                    <option value="cm">cm</option>
                    <option value="m">m</option>
                  </select>
                </div>
              </div>

              {/* Length */}
              <div className="space-y-2">
                <label className="flex items-center text-[#0A2533] font-medium">
                  Length:
                  <button
                    type="button"
                    className="ml-2 text-gray-400 hover:text-gray-600"
                    title="Length of the pipe."
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
                  <div className="relative w-full">
                    <input
                      type="number"
                      step="any"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B4ED50] focus:border-transparent"
                      placeholder="e.g., 6"
                      required
                    />
                  </div>
                  <select
                    value={lengthUnit}
                    onChange={(e) => setLengthUnit(e.target.value)}
                    className="py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B4ED50] focus:border-transparent"
                  >
                    <option value="in">in</option>
                    <option value="ft">ft</option>
                    <option value="mm">mm</option>
                    <option value="cm">cm</option>
                    <option value="m">m</option>
                  </select>
                </div>
              </div>

              {/* Liquid Density */}
              <div className="space-y-2">
                <label className="flex items-center text-[#0A2533] font-medium">
                  Liquid Density:
                  <button
                    type="button"
                    className="ml-2 text-gray-400 hover:text-gray-600"
                    title="Liquid density in kg/m³ or lb/ft³"
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
                  <div className="relative w-full">
                    <input
                      type="number"
                      step="any"
                      value={density}
                      onChange={(e) => setDensity(e.target.value)}
                      className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B4ED50] focus:border-transparent"
                      placeholder="e.g., 997 (water)"
                      required
                    />
                  </div>
                  <select
                    value={densityUnit}
                    onChange={(e) => setDensityUnit(e.target.value)}
                    className="py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B4ED50] focus:border-transparent"
                  >
                    <option value="kg/m³">kg/m³</option>
                    <option value="lb/ft³">lb/ft³</option>
                  </select>
                </div>
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
              <h3 className="text-white text-xl mb-4">Pipe Volume:</h3>
              <div className="text-5xl font-bold text-white mb-4">
                {volume > 0 ? (
                  <>
                    <span className="text-[#B4ED50]">
                      {volume.toFixed(4)}
                    </span>{" "}
                    <span className="text-2xl">m³</span>
                  </>
                ) : (
                  <span className="text-[#B4ED50]">0.0000</span>
                )}
              </div>

              <h3 className="text-white text-xl mb-4">Liquid Mass:</h3>
              <div className="text-5xl font-bold text-white">
                {liquidMass > 0 ? (
                  <>
                    <span className="text-[#B4ED50]">
                      {liquidMass.toFixed(2)}
                    </span>{" "}
                    <span className="text-2xl">kg</span>
                  </>
                ) : (
                  <span className="text-[#B4ED50]">0.00</span>
                )}
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
                    your projects more efficiently today.
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
            About the Pipe Volume Calculation
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              This tool calculates the volume of a pipe (assumed to be a
              right circular cylinder) using:
            </p>
            <div className="bg-[#F7F7F7] p-4 rounded-lg">
              <p className="font-mono">
                volume = π × (diameter/2)² × length
              </p>
            </div>
            <p>
              The <strong>liquid mass</strong> is then derived from:
            </p>
            <div className="bg-[#F7F7F7] p-4 rounded-lg">
              <p className="font-mono">
                liquid mass = volume × density
              </p>
            </div>
            <p>
              By default, the density is set to water (997 kg/m³), but you
              can change it for any other fluid by specifying its density.
              Use the unit dropdowns to seamlessly switch between metric and
              imperial measurements.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}