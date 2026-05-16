"use client";

import React, { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    propertyAddress: "",
    purchasePrice: "",
    repairCost: "",
    holdingCosts: "",
    closingCosts: "",
    wholesaleFee: "",
    squareFeet: "",
    bedrooms: "",
    bathrooms: "",
  });

  // ✅ ONLY 3 COMPS
  const [comps, setComps] = useState([
    { soldPrice: "", sqft: "" },
    { soldPrice: "", sqft: "" },
    { soldPrice: "", sqft: "" },
  ]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCompChange = (i: number, field: string, value: string) => {
    const updated = [...comps];
    updated[i] = { ...updated[i], [field]: value };
    setComps(updated);
  };

  // 🔥 ARV CALCULATION (FIXED)
  const avgPricePerSqFt =
    comps.reduce(
      (sum, c) =>
        sum + (Number(c.soldPrice) || 0) / (Number(c.sqft) || 1),
      0
    ) / comps.length;

  const estimatedARV =
    avgPricePerSqFt * Number(form.squareFeet || 0);

  const mao70 =
    estimatedARV * 0.7 -
    Number(form.repairCost || 0) -
    Number(form.wholesaleFee || 0);

  const totalInvestment =
    Number(form.purchasePrice || 0) +
    Number(form.repairCost || 0) +
    Number(form.holdingCosts || 0) +
    Number(form.closingCosts || 0) +
    Number(form.wholesaleFee || 0);

  const profit = mao70 - totalInvestment;

  const roi =
    totalInvestment > 0 ? (profit / totalInvestment) * 100 : 0;

  const currency = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(n || 0);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-10">

      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold">
          Real Estate SaaS Pro
        </h1>
        <p className="text-gray-400 mt-2">
          ARV • MAO • ROI Deal Analyzer
        </p>
      </div>

      {/* STEP NAV */}
      <div className="flex gap-2 justify-center mb-6 flex-wrap">
        {[1, 2, 3, 4].map((s) => (
          <button
            key={s}
            onClick={() => setStep(s)}
            className={`px-4 py-2 rounded ${
              step === s ? "bg-blue-600" : "bg-gray-800"
            }`}
          >
            Step {s}
          </button>
        ))}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="bg-gray-900 p-5 rounded-xl space-y-3">
          <input
            name="propertyAddress"
            placeholder="Property Address"
            className="w-full p-3 bg-gray-800 rounded"
            onChange={handleChange}
          />

          {[
            ["purchasePrice", "Purchase Price"],
            ["repairCost", "Repair Cost"],
            ["holdingCosts", "Holding Costs"],
            ["closingCosts", "Closing Costs"],
            ["wholesaleFee", "Wholesale Fee"],
          ].map(([name, ph]) => (
            <div key={name} className="flex items-center">
              <span className="text-yellow-400 mr-2">$</span>
              <input
                name={name}
                type="number"
                placeholder={ph}
                className="w-full p-3 bg-gray-800 rounded"
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="flex items-center">
            <input
              name="squareFeet"
              type="number"
              placeholder="Square Feet"
              className="w-full p-3 bg-gray-800 rounded"
              onChange={handleChange}
            />
            <span className="ml-2 text-gray-400">sqft</span>
          </div>

          <button
            onClick={() => setStep(2)}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            Next →
          </button>
        </div>
      )}

      {/* STEP 2 (COMPS 3 ONLY) */}
      {step === 2 && (
        <div className="bg-gray-900 p-5 rounded-xl">
          <h2 className="text-xl mb-4">Comparable Sales (3)</h2>

          {comps.map((c, i) => (
            <div key={i} className="flex gap-2 mb-3">
              <div className="flex items-center w-full">
                <span className="text-yellow-400 mr-1">$</span>
                <input
                  placeholder="Sold Price"
                  className="p-2 bg-gray-800 flex-1"
                  onChange={(e) =>
                    handleCompChange(i, "soldPrice", e.target.value)
                  }
                />
              </div>

              <div className="flex items-center w-full">
                <input
                  placeholder="Sq Ft"
                  className="p-2 bg-gray-800 flex-1"
                  onChange={(e) =>
                    handleCompChange(i, "sqft", e.target.value)
                  }
                />
                <span className="ml-1 text-gray-400">sqft</span>
              </div>
            </div>
          ))}

          <button
            onClick={() => setStep(3)}
            className="bg-blue-600 px-4 py-2"
          >
            Next →
          </button>
        </div>
      )}

      {/* STEP 3 (ARV BACK ADDED) */}
      {step === 3 && (
        <div className="bg-gray-900 p-5 rounded-xl space-y-3">
          <h2 className="text-xl mb-4">ARV Dashboard</h2>

          <p>Avg Price/SqFt: {currency(avgPricePerSqFt)}</p>
          <p>Estimated ARV: {currency(estimatedARV)}</p>
          <p>70% MAO: {currency(mao70)}</p>

          <button
            onClick={() => setStep(4)}
            className="bg-blue-600 px-4 py-2 mt-3"
          >
            Next →
          </button>
        </div>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <div className="bg-gray-900 p-5 rounded-xl space-y-3">
          <h2 className="text-xl mb-4">Profit Analysis</h2>

          <p>Total Investment: {currency(totalInvestment)}</p>
          <p>Profit: {currency(profit)}</p>
          <p>ROI: {roi.toFixed(2)}%</p>

          <button
            onClick={() => setStep(3)}
            className="bg-gray-700 px-4 py-2 mr-2"
          >
            ← Back
          </button>

          <button className="bg-green-600 px-4 py-2">
            Save Deal 🚀
          </button>
        </div>
      )}
    </div>
  );
}
