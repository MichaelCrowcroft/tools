import { useState } from "react";

export default function CFMCalculator() {
  // User inputs
  const [floorArea, setFloorArea] = useState("");
  const [ceilingHeight, setCeilingHeight] = useState("");
  const [ach, setAch] = useState("");

  // Output
  const [airflowCFM, setAirflowCFM] = useState(0);

  const handleCalculate = (e) => {
    e.preventDefault();

    const fa = parseFloat(floorArea) || 0;
    const ch = parseFloat(ceilingHeight) || 0;
    const airChanges = parseFloat(ach) || 0;

    const cfm = (fa * ch * airChanges) / 60;
    setAirflowCFM(Math.round(cfm * 100) / 100);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Header */}
      <header className="bg-white py-12 text-center">
        <h1 className="text-5xl font-bold text-[#0A2533] mb-4">
          Try our CFM calculator
        </h1>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-[#0A2533] rounded-t-lg p-6">
          <h2 className="text-white text-2xl font-bold text-center">
            CFM Calculator
          </h2>
        </div>

        <div className="bg-white rounded-b-lg shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Calculator Form */}
            <div className="space-y-6">
              <form onSubmit={handleCalculate} className="space-y-6">
                {/* Floor Area */}
                <div className="space-y-2">
                  <label className="flex items-center text-[#0A2533] font-medium">
                    Room Floor Area:
                    <button
                      type="button"
                      className="ml-2 text-gray-400 hover:text-gray-600"
                      title="Area of the room in square feet"
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
                      value={floorArea}
                      onChange={(e) => setFloorArea(e.target.value)}
                      className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B4ED50] focus:border-transparent"
                      placeholder="0"
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
                      title="Height of the room in feet"
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
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                {/* ACH */}
                <div className="space-y-2">
                  <label className="flex items-center text-[#0A2533] font-medium">
                    Air Changes per Hour (ACH):
                    <button
                      type="button"
                      className="ml-2 text-gray-400 hover:text-gray-600"
                      title="Number of times the air volume is replaced per hour"
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
                    value={ach}
                    onChange={(e) => setAch(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B4ED50] focus:border-transparent"
                    placeholder="0"
                    required
                  />
                </div>

                {/* Add a Calculate button */}
                <button
                  type="submit"
                  className="bg-[#B4ED50] hover:bg-[#a3d647] text-[#0A2533] font-bold py-3 px-6 rounded-lg transition-colors w-full"
                >
                  Calculate
                </button>
              </form>
            </div>

            {/* Results Display */}
            <div className="bg-[#0A2533] p-8 rounded-lg">
              <h3 className="text-white text-xl mb-4">Required CFM:</h3>
              <div className="text-5xl font-bold text-white mb-4">
                {airflowCFM > 0 ? (
                  <>
                    <span className="text-[#B4ED50]">
                      {airflowCFM.toLocaleString()}
                    </span>{" "}
                    <span className="text-2xl">CFM</span>
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
                    Put these calculations into action. Start managing your HVAC
                    business more efficiently today.
                  </p>
                </div>
              </div>
              <a href="https://www.getjobber.com">
                <button className="bg-[#B4ED50] hover:bg-[#a3d647] text-[#0A2533] font-bold py-3 px-6 rounded-lg transition-colors">
                    Start Free Trial
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Explanation Section */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-bold text-[#0A2533] mb-4">
            About CFM Calculation
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>CFM (cubic feet per minute)</strong> is a measure of volumetric
              airflow. This calculator helps determine the required CFM for a room,
              given its floor area, ceiling height, and the desired air changes per
              hour (ACH).
            </p>
            <div className="bg-[#F7F7F7] p-4 rounded-lg">
              <p className="font-mono">
                airflow (CFM) = (room floor area × ceiling height × ACH) / 60
              </p>
            </div>
            <p>
              This means that to achieve a certain ACH, we must replace the entire
              volume of the room multiple times per hour with fresh air.
            </p>
            <p>
              In practice, choosing the right ventilation system is crucial for
              maintaining indoor air quality, comfortable humidity levels, and
              temperature.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}