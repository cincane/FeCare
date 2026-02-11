import { useState } from "react";

export default function Pricing() {
  const [billPlan, setBillPlan] = useState("monthly");

  const plans = [
    {
      name: "Starter",
      price: { monthly: 29, annually: 29 * 12 - 199 },
      features: [
        "400 GB Storage",
        "Unlimited Photos & Videos",
        "Exclusive Support",
      ],
    },
    {
      name: "Growth Plan",
      price: { monthly: 59, annually: 59 * 12 - 100 },
      features: [
        "400 GB Storage",
        "Unlimited Photos & Videos",
        "Exclusive Support",
      ],
      popular: true,
    },
    {
      name: "Business",
      price: { monthly: 139, annually: 139 * 12 - 100 },
      features: [
        "400 GB Storage",
        "Unlimited Photos & Videos",
        "Exclusive Support",
      ],
    },
  ];

  return (
    <section className="relative py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50">
      {/* Section Title */}
      <div className="container mx-auto px-4 lg:px-8 xl:px-16 text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-dark dark:text-white mb-4 max-w-3xl mx-auto">
          We Offer Great Affordable Premium Prices.
        </h2>
        <p className="text-body dark:text-gray-300 max-w-2xl mx-auto">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using.
        </p>
      </div>

      {/* Pricing switcher */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <span className="text-dark dark:text-white font-semibold">
          Bill Monthly
        </span>
        <button
          className="relative w-14 h-7 bg-gray-300 dark:bg-gray-700 rounded-full transition-colors"
          onClick={() =>
            setBillPlan(billPlan === "monthly" ? "annually" : "monthly")
          }
        >
          <div
            className={`absolute top-1 w-5 h-5 bg-primary rounded-full transition-transform ${
              billPlan === "monthly" ? "left-1" : "left-8"
            }`}
          ></div>
        </button>
        <span className="text-dark dark:text-white font-semibold">
          Bill Annually
        </span>
      </div>

      {/* Pricing Table */}
      <div className="container mx-auto px-4 lg:px-8 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-gray-800 p-8 rounded-lg ${
                plan.popular
                  ? "ring-2 ring-primary shadow-2xl scale-105"
                  : "shadow-md"
              }`}
            >
              <h4 className="text-2xl font-bold text-dark dark:text-white mb-4">
                {plan.name}
              </h4>

              <div className="flex items-baseline gap-2 mb-6">
                <h2 className="text-5xl font-bold text-dark dark:text-white">
                  $
                  {billPlan === "monthly"
                    ? plan.price.monthly
                    : plan.price.annually}
                </h2>
                <span className="text-body dark:text-gray-400">
                  {billPlan === "monthly" ? "/per month" : "/per year"}
                </span>
              </div>

              <p className="text-sm text-body dark:text-gray-400 mb-6">
                No credit card required
              </p>

              <a
                href="#"
                className={`block w-full text-center py-3 rounded-lg font-semibold mb-6 transition-colors ${
                  plan.popular
                    ? "bg-primary text-white hover:bg-primary-600"
                    : "bg-gray-100 text-dark hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                }`}
              >
                Try for free
              </a>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-body dark:text-gray-300"
                  >
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="text-center text-sm font-semibold text-dark dark:text-white">
                7-day free trial
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
