"use client";

import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
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

  const [comps, setComps] = useState(
    Array(3).fill({ soldPrice: "", sqft: "" })
  );

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCompChange = (i: number, field: string, value: string) => {
    const updated = [...comps];
    updated[i] = { ...updated[i], [field]: value };
    setComps(updated);
  };

  const avgPrice =
    comps.reduce((a, c) => a + Number(c.soldPrice || 0), 0) / comps.length;

  const avgSqftPrice =
    comps.reduce(
      (a, c) => a + Number(c.soldPrice || 0) / Number(c.sqft || 1),
      0
    ) / comps.length;

  const arv = avgSqftPrice * Number(form.squareFeet || 0);

  const mao =
    arv * 0.7 -
    Number(form.repairCost || 0) -
    Number(form.wholesaleFee || 0);

  const investment =
    Number(form.purchasePrice || 0) +
    Number(form.repairCost || 0) +
    Number(form.holdingCosts || 0) +
    Number(form.closingCosts || 0) +
    Number(form.wholesaleFee || 0);

  const profit = mao - investment;
  const roi = investment ? (profit / investment) * 100 : 0;

  const currency = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(n || 0);

  // 🔐 LOGIN UI (PREMIUM)
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4">
        <div className="w-full max-w-sm text-center space-y-6">
          <h1 className="text-3xl font-bold">Deal Analyzer Pro</h1>
          <p className="text-gray-400">
            Real Estate SaaS Dashboard
          </p>

          <button
            onClick={() => signIn("google")}
            className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Continue with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white p-4 md:p-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold">
          Deal Analyzer Pro
        </h1>

        <button
          onClick={() => signOut()}
          className="bg-red-600 px-4 py-2 rounded-xl text-sm"
        >
          Logout
        </button>
      </div>

      {/* STEP NAV (MOBILE CLEAN) */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {[1, 2, 3, 4].map((s) => (
          <button
            key={s}
            onClick={() => setStep(s)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap text-sm ${
              step === s ? "bg-blue-600" : "bg-gray-800"
            }`}
          >
            Step {s}
          </button>
        ))}
      </div>

      {/* CARD WRAPPER */}
      <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-4 md:p-6">

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Property Info
            </h2>

            <input
              name="propertyAddress"
              placeholder="Property Address"
              className="w-full p-3 rounded-xl bg-gray-800 outline-none"
              onChange={handleChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "purchasePrice",
                "repairCost",
                "holdingCosts",
                "closingCosts",
                "wholesaleFee",
              ].map((f) => (
                <input
                  key={f}
                  name={f}
                  type="number"
                  placeholder={f}
                  className="p-3 rounded-xl bg-gray-800 outline-none"
                  onChange={handleChange}
                />
              ))}
            </div>

            <input
              name="squareFeet"
              type="number"
              placeholder="Square Feet"
              className="w-full p-3 rounded-xl bg-gray-800 outline-none"
              onChange={handleChange}
            />

            <button
              onClick={() => setStep(2)}
              className="w-full bg-blue-600 py-3 rounded-xl"
            >
              Next
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Comps (3 Properties)
            </h2>

            {comps.map((c, i) => (
              <div key={i} className="grid grid-cols-2 gap-2">
                <input
                  placeholder="Sold Price"
                  className="p-3 bg-gray-800 rounded-xl"
                  onChange={(e) =>
                    handleCompChange(i, "soldPrice", e.target.value)
                  }
                />
                <input
                  placeholder="Sq Ft"
                  className="p-3 bg-gray-800 rounded-xl"
                  onChange={(e) =>
                    handleCompChange(i, "sqft", e.target.value)
                  }
                />
              </div>
            ))}

            <button
              onClick={() => setStep(3)}
              className="w-full bg-blue-600 py-3 rounded-xl"
            >
              Next
            </button>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">ARV Analysis</h2>

            <div className="p-4 bg-gray-800 rounded-xl">
              ARV: {currency(arv)}
            </div>

            <div className="p-4 bg-gray-800 rounded-xl">
              MAO: {currency(mao)}
            </div>

            <button
              onClick={() => setStep(4)}
              className="w-full bg-blue-600 py-3 rounded-xl"
            >
              Next
            </button>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">
              Profit Analysis
            </h2>

            <div className="p-4 bg-gray-800 rounded-xl">
              Investment: {currency(investment)}
            </div>

            <div className="p-4 bg-gray-800 rounded-xl">
              Profit: {currency(profit)}
            </div>

            <div className="p-4 bg-green-600 rounded-xl font-bold">
              ROI: {roi.toFixed(1)}%
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
