import { useState } from "react";
import {
  BookOpenIcon,
  HeartIcon,
  ScaleIcon,
  LinkIcon,
  BeakerIcon,
  FireIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

export default function Services() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const services = [
    {
      icon: BookOpenIcon,
      color:
        "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
      title: "Pendahuluan",
      description: `
Masa remaja merupakan periode pertumbuhan yang sangat pesat. Pada fase ini, tubuh membutuhkan energi, protein, zat besi, vitamin, dan mineral dalam jumlah lebih tinggi dibandingkan masa anak-anak. Jika kebutuhan tersebut tidak terpenuhi, remaja putri berisiko mengalami anemia dan Kurang Energi Kronis (KEK). Kondisi ini dapat memengaruhi kesehatan saat ini maupun kesehatan reproduksi di masa depan.
      `,
    },
    {
      icon: HeartIcon,
      color:
        "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
      title: "Anemia pada Remaja Putri",
      description: `
Anemia adalah kondisi ketika kadar hemoglobin (Hb) dalam darah lebih rendah dari normal. Hemoglobin berfungsi membawa oksigen ke seluruh tubuh.

Penyebab anemia:
• Kehilangan darah saat menstruasi  
• Kurang asupan zat besi  
• Diet berlebihan tanpa pengawasan  
• Kurang konsumsi protein dan vitamin C  

Tanda dan gejala:
• Wajah pucat  
• Mudah lelah dan mengantuk  
• Pusing atau berkunang-kunang  
• Jantung berdebar  
• Konsentrasi menurun  

Dampak anemia meliputi penurunan prestasi belajar, daya tahan tubuh menurun, serta risiko komplikasi kehamilan di masa depan.
      `,
    },
    {
      icon: ScaleIcon,
      color:
        "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      title: "Kurang Energi Kronis (KEK)",
      description: `
KEK adalah kondisi kekurangan asupan energi dan zat gizi dalam waktu lama. Pada remaja putri, KEK dapat diketahui melalui pengukuran Lingkar Lengan Atas (LILA).

Kategori LILA:
• ≥ 23,5 cm : Status gizi normal  
• < 23,5 cm : Berisiko KEK  

Dampak KEK:
• Tubuh kurus dan lemah  
• Mudah sakit  
• Risiko anemia meningkat  
• Risiko gangguan kehamilan di masa depan
      `,
    },
    {
      icon: LinkIcon,
      color:
        "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
      title: "Hubungan KEK dan Anemia",
      description: `
KEK dan anemia sering terjadi bersamaan. Kekurangan energi dan protein dapat menghambat pembentukan sel darah merah. Jika asupan zat besi juga kurang, risiko anemia semakin meningkat.

Oleh karena itu, pemenuhan gizi seimbang sangat penting untuk mencegah kedua kondisi tersebut.
      `,
    },
    {
      icon: BeakerIcon,
      color:
        "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
      title: "Tablet Tambah Darah (TTD)",
      description: `
Tablet Tambah Darah (TTD) mengandung zat besi dan asam folat untuk membantu pembentukan sel darah merah.

Manfaat:
• Mencegah dan mengatasi anemia  
• Menambah energi  
• Meningkatkan konsentrasi  
• Menjaga kesehatan reproduksi  

Cara konsumsi:
• 1 tablet per minggu  
• Minum setelah makan  
• Hindari teh, kopi, dan susu saat minum TTD  

Efek samping ringan seperti mual atau feses lebih gelap adalah normal.
      `,
    },
    {
      icon: FireIcon,
      color:
        "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
      title: "Gizi Seimbang untuk Remaja Putri",
      description: `
Gizi seimbang adalah susunan makanan yang mengandung zat gizi sesuai kebutuhan tubuh.

Prinsip gizi seimbang:
• Konsumsi makanan beragam  
• Biasakan hidup bersih  
• Lakukan aktivitas fisik  
• Pantau berat badan  

Sumber zat besi:
• Hewani: daging merah, hati, ikan, telur  
• Nabati: bayam, kangkung, tempe, kacang-kacangan
      `,
    },
    {
      icon: LightBulbIcon,
      color:
        "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
      title: "Mitos & Fakta tentang TTD",
      description: `
❌ Mitos: TTD bikin gemuk  
✅ Fakta: TTD tidak menyebabkan kenaikan berat badan.

❌ Mitos: TTD hanya untuk ibu hamil  
✅ Fakta: Remaja putri juga membutuhkan TTD.

❌ Mitos: Kalau tidak pusing berarti tidak anemia  
✅ Fakta: Anemia bisa tanpa gejala jelas.

❌ Mitos: Feses hitam itu berbahaya  
✅ Fakta: Itu efek normal dari zat besi.
      `,
    },
  ];

  return (
    <section
      id="edukasi"
      className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 lg:px-8 xl:px-16 text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Edukasi Kesehatan Remaja Putri
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Informasi penting mengenai anemia, KEK, dan gizi seimbang untuk
          remaja putri.
        </p>
      </div>

      <div className="container mx-auto px-4 lg:px-8 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className={`p-6 rounded-2xl shadow-md transition-all duration-300 cursor-pointer
                ${
                  openIndex === index
                    ? "bg-pink-50 dark:bg-pink-900/20 shadow-xl scale-[1.02]"
                    : "bg-white dark:bg-gray-800 hover:shadow-xl"
                }`}
              >
                <div
                  className="flex items-center justify-between"
                  onClick={() => toggle(index)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 flex items-center justify-center rounded-xl ${service.color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {service.title}
                    </h4>
                  </div>

                  <span
                    className={`text-xl font-bold transition-transform duration-300 ${
                      openIndex === index
                        ? "rotate-45 text-pink-600"
                        : "text-gray-500"
                    }`}
                  >
                    +
                  </span>
                </div>

                
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    openIndex === index
                      ? "max-h-[1000px] mt-4 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
