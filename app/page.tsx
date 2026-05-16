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
    dealStatus: "",
    leadSource: "",
  });

  const [comps, setComps] = useState([
    { soldPrice: "", sqft: "" },
    { soldPrice: "", sqft: "" },
    { soldPrice: "", sqft: "" },
    { soldPrice: "", sqft: "" },
    { soldPrice: "", sqft: "" },
  ]);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCompChange = (
  index: number,
  field: "soldPrice" | "sqft",
  value: string
) => {
  const updated = [...comps];

  updated[index] = {
    ...updated[index],
    [field]: value,
  };

  setComps(updated);
};

  const avgSoldPrice =
    comps.reduce(
      (sum, comp) => sum + Number(comp.soldPrice || 0),
      0
    ) / comps.length;

  const avgPricePerSqFt =
    comps.reduce(
      (sum, comp) =>
        sum +
        Number(comp.soldPrice || 0) /
          Number(comp.sqft || 1),
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

  const estimatedSalePrice = mao70;

  const estimatedProfit =
    estimatedSalePrice - totalInvestment;

  const roi =
    totalInvestment > 0
      ? (estimatedProfit / totalInvestment) * 100
      : 0;

  const dealScore =
    roi >= 30
      ? "Excellent Deal ✅"
      : roi >= 15
      ? "Good Deal ⚠️"
      : "Risky Deal ❌";

  const currency = (num: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(num || 0);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop')",
      }}
    >
      <div className="min-h-screen bg-black/75 p-6">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="mb-12 text-center">
            <h1 className="text-6xl font-black mb-4">
              Real Estate Deal Analyzer
            </h1>

            <p className="text-xl text-gray-300">
              Professional ARV • MAO • ROI Platform
            </p>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="bg-[#111827]/95 p-8 rounded-3xl border border-gray-700">

              <h2 className="text-3xl font-bold mb-8">
                Property Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="md:col-span-2">
                  <input
                    name="propertyAddress"
                    placeholder="123 Main Street, Tampa FL 33637"
                    className="w-full bg-[#1f2937] border border-gray-600 text-white p-4 rounded-2xl outline-none"
                    value={form.propertyAddress}
                    onChange={handleChange}
                  />

                  <div className="text-gray-400 text-sm mt-2">
                    Format: (123 Main Street, City, State/Zip)
                  </div>
                </div> {[
                  ["purchasePrice", "Purchase Price"],
                  ["repairCost", "Repair Cost"],
                  ["holdingCosts", "Holding Costs"],
                  ["closingCosts", "Closing Costs"],
                  ["wholesaleFee", "Wholesale Fee"],
                ].map(([name, placeholder]) => (
                  <div className="relative" key={name}>

                    <span className="absolute left-4 top-4 text-gray-400">
                      $
                    </span>

                    <input
                      name={name}
                      type="number"
                      placeholder={placeholder}
                      className="w-full bg-[#1f2937] border border-gray-600 text-white p-4 pl-8 rounded-2xl outline-none"
                      value={(form as any)[name]}
                      onChange={handleChange}
                    />

                  </div>
                ))}

                <div className="relative">

                  <input
                    name="squareFeet"
                    type="number"
                    placeholder="Square Feet"
                    className="w-full bg-[#1f2937] border border-gray-600 text-white p-4 pr-16 rounded-2xl outline-none"
                    value={form.squareFeet}
                    onChange={handleChange}
                  />

                  <span className="absolute right-4 top-4 text-gray-400">
                    sqft
                  </span>

                </div>

                <input
                  name="bedrooms"
                  type="number"
                  placeholder="Bedrooms"
                  className="w-full bg-[#1f2937] border border-gray-600 text-white p-4 rounded-2xl outline-none"
                  value={form.bedrooms}
                  onChange={handleChange}
                />

                <input
                  name="bathrooms"
                  type="number"
                  placeholder="Bathrooms"
                  className="w-full bg-[#1f2937] border border-gray-600 text-white p-4 rounded-2xl outline-none"
                  value={form.bathrooms}
                  onChange={handleChange}
                />

                <input
                  name="dealStatus"
                  placeholder="Deal Status"
                  className="w-full bg-[#1f2937] border border-gray-600 text-white p-4 rounded-2xl outline-none"
                  value={form.dealStatus}
                  onChange={handleChange}
                />

                <input
                  name="leadSource"
                  placeholder="Lead Source"
                  className="w-full bg-[#1f2937] border border-gray-600 text-white p-4 rounded-2xl outline-none"
                  value={form.leadSource}
                  onChange={handleChange}
                />

              </div>

              <div className="flex justify-end mt-8">

                <button
                  onClick={() => setStep(2)}
                  className="bg-blue-600 px-8 py-4 rounded-2xl font-bold"
                >
                  Next →
                </button>

              </div>

            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="bg-[#111827]/95 p-8 rounded-3xl border border-gray-700">

              <h2 className="text-3xl font-bold mb-8">
                Comparable Sales Analysis
              </h2>

              <div className="overflow-auto">

                <table className="w-full">

                  <thead>

                    <tr className="bg-[#1e293b]">

                      <th className="p-4 border border-gray-700">
                        Comp
                      </th>

                      <th className="p-4 border border-gray-700">
                        Sold Price
                      </th>

                      <th className="p-4 border border-gray-700">
                        Sq Ft
                      </th> <th className="p-4 border border-gray-700">
                        Price/SqFt
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {comps.map((comp, index) => {

                      const pricePerSqFt =
                        Number(comp.soldPrice || 0) /
                        Number(comp.sqft || 1);

                      return (

                        <tr key={index}>

                          <td className="p-4 border border-gray-700">
                            Comp {index + 1}
                          </td>

                          <td className="p-4 border border-gray-700">

                            <input
                              type="number"
                              className="w-full bg-[#1f2937] border border-gray-600 text-white p-4 rounded-2xl"
                              value={comp.soldPrice}
                              onChange={(e) =>
                                handleCompChange(
                                  index,
                                  "soldPrice",
                                  e.target.value
                                )
                              }
                            />

                          </td>

                          <td className="p-4 border border-gray-700">

                            <input
                              type="number"
                              className="w-full bg-[#1f2937] border border-gray-600 text-white p-4 rounded-2xl"
                              value={comp.sqft}
                              onChange={(e) =>
                                handleCompChange(
                                  index,
                                  "sqft",
                                  e.target.value
                                )
                              }
                            />

                          </td>

                          <td className="p-4 border border-gray-700 font-bold">
                            ${pricePerSqFt.toFixed(2)}
                          </td>

                        </tr>

                      );
                    })}

                  </tbody>

                </table>

              </div>

              <div className="flex justify-between mt-8">

                <button
                  onClick={() => setStep(1)}
                  className="bg-gray-700 px-8 py-4 rounded-2xl font-bold"
                >
                  ← Back
                </button>

                <button
                  onClick={() => setStep(3)}
                  className="bg-blue-600 px-8 py-4 rounded-2xl font-bold"
                >
                  Next →
                </button>

              </div>

            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="bg-[#111827]/95 p-8 rounded-3xl border border-gray-700">

              <h2 className="text-3xl font-bold mb-8">
                ARV Dashboard
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-[#1e293b] p-6 rounded-2xl">
                  <div className="text-gray-400 mb-2">
                    Average Sold Price
                  </div>

                  <div className="text-3xl font-bold">
                    {currency(avgSoldPrice)}
                  </div>
                </div>

                <div className="bg-[#1e293b] p-6 rounded-2xl">
                  <div className="text-gray-400 mb-2">
                    Average Price/SqFt
                  </div>

                  <div className="text-3xl font-bold">
                    ${avgPricePerSqFt.toFixed(2)}
                  </div>
                </div>

                <div className="bg-[#1e293b] p-6 rounded-2xl">
                  <div className="text-gray-400 mb-2">
                    Estimated ARV
                  </div> <div className="text-3xl font-bold">
                    {currency(estimatedARV)}
                  </div>
                </div>

                <div className="bg-[#1e293b] p-6 rounded-2xl">
                  <div className="text-gray-400 mb-2">
                    70% Rule MAO
                  </div>

                  <div className="text-3xl font-bold">
                    {currency(mao70)}
                  </div>
                </div>

              </div>

              <div className="flex justify-between mt-8">

                <button
                  onClick={() => setStep(2)}
                  className="bg-gray-700 px-8 py-4 rounded-2xl font-bold"
                >
                  ← Back
                </button>

                <button
                  onClick={() => setStep(4)}
                  className="bg-blue-600 px-8 py-4 rounded-2xl font-bold"
                >
                  Next →
                </button>

              </div>

            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="bg-[#111827]/95 p-8 rounded-3xl border border-gray-700">

              <h2 className="text-3xl font-bold mb-8">
                Fix & Flip Analysis
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-[#1e293b] p-6 rounded-2xl">

                  <div className="text-gray-400 mb-2">
                    Total Investment
                  </div>

                  <div className="text-3xl font-bold">
                    {currency(totalInvestment)}
                  </div>

                </div>

                <div className="bg-[#1e293b] p-6 rounded-2xl">

                  <div className="text-gray-400 mb-2">
                    Estimated Sale Price
                  </div>

                  <div className="text-3xl font-bold">
                    {currency(estimatedSalePrice)}
                  </div>

                </div>

                <div className="bg-[#1e293b] p-6 rounded-2xl">

                  <div className="text-gray-400 mb-2">
                    Estimated Profit
                  </div>

                  <div className="text-3xl font-bold">
                    {currency(estimatedProfit)}
                  </div>

                </div>

                <div
                  className={
                    roi >= 30
                      ? "p-6 rounded-2xl bg-green-600"
                      : roi >= 15
                      ? "p-6 rounded-2xl bg-yellow-600"
                      : "p-6 rounded-2xl bg-red-600"
                  }
                >

                  <div className="mb-2">
                    ROI %
                  </div>

                  <div className="text-4xl font-bold">
                    {roi.toFixed(1)}%
                  </div>

                  <div className="mt-4 font-semibold">
                    {dealScore}
                  </div>

                </div>

              </div>

              <div className="flex justify-between mt-8">

                <button
                  onClick={() => setStep(3)}
                  className="bg-gray-700 px-8 py-4 rounded-2xl font-bold"
                >
                  ← Back
                </button>

                <button
                  className="bg-green-600 px-8 py-4 rounded-2xl font-bold"
                >
                  Save Deal 🚀
                </button>

              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}