import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Apa itu anemia pada remaja putri?",
      answer:
        "Anemia adalah kondisi ketika kadar hemoglobin (Hb) dalam darah lebih rendah dari normal. Pada remaja putri, anemia sering terjadi karena menstruasi dan kurangnya asupan zat besi.",
    },
    {
      question: "Kenapa remaja putri rentan mengalami anemia?",
      answer:
        "Karena kehilangan darah saat menstruasi setiap bulan, masa pertumbuhan yang cepat, serta pola makan yang kurang mengandung zat besi dan protein.",
    },
    {
      question: "Berapa kali konsumsi Tablet Tambah Darah (TTD)?",
      answer:
        "Remaja putri dianjurkan mengonsumsi 1 tablet TTD setiap minggu untuk mencegah anemia dan menjaga cadangan zat besi.",
    },
    {
      question: "Apa itu Kurang Energi Kronis (KEK)?",
      answer:
        "KEK adalah kondisi kekurangan energi dan zat gizi dalam waktu lama. Pada remaja putri dapat diukur melalui Lingkar Lengan Atas (LILA) kurang dari 23,5 cm.",
    },
    {
      question: "Bagaimana cara mencegah anemia?",
      answer:
        "Dengan konsumsi TTD secara rutin, makan makanan bergizi seimbang, cukup protein dan zat besi, serta menjaga pola hidup sehat.",
    },
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="relative py-16 lg:py-24 
      bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 
      dark:from-gray-900 dark:via-gray-900 dark:to-gray-950"
    >
      <div className="container mx-auto px-4 lg:px-8 xl:px-16">
        
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
             Pertanyaan Seputar Anemia & Kesehatan Remaja
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Berikut beberapa pertanyaan yang sering ditanyakan mengenai anemia, 
            Tablet Tambah Darah, dan gizi remaja putri.
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 backdrop-blur-md
              ${
                openIndex === index
                  ? "bg-white/80 dark:bg-gray-800/80 shadow-xl border-pink-300 dark:border-pink-700"
                  : "bg-white/60 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700"
              }`}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="font-semibold text-gray-800 dark:text-white text-lg">
                  {faq.question}
                </span>

                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-pink-600" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-500" />
                )}
              </button>

              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-40 pb-6 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
