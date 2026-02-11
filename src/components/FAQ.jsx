export default function FAQ() {
  const faqs = [
    {
      question: "What is Base?",
      answer:
        "Base is a modern healthcare template built with React and Tailwind CSS.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply download the template and follow the installation instructions.",
    },
    {
      question: "Do you offer support?",
      answer: "Yes, we provide 24/7 customer support for all our users.",
    },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8 xl:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-dark dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-dark dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                {faq.question}
                <svg
                  className="w-5 h-5 transition-transform group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-body dark:text-gray-300">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
