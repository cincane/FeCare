import React from "react";

export default function VideoEdukasi() {
  const videos = [
    {
      title: "Anemia pada Remaja Putri",
      youtubeId: "ru3E9ONfRsU",
    },
    {
      title: "Cara Konsumsi Tablet Tambah Darah (TTD)",
      youtubeId: "H2O_V4pSTrI",
    },
    {
      title: "Gizi Seimbang untuk Remaja Putri",
      youtubeId: "1bcI39ssaaw",
    },
    {
      title: "PHBS (Perilaku Hidup Bersih Sehat)",
      youtubeId: "T-FovJnUBbU",
    },
    {
      title: "Tips Cegah Anemia & KEK",
      youtubeId: "Im6-CkdccHM",
    },
    {
      title: "Edukasi Kesehatan Remaja Putri (Terbaru)",
      youtubeId: "jkS6glRPD_o",
    },
  ];

  return (
    <section
    id="video-edukasi"
      className="relative py-16 lg:py-24 
      bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 
      dark:from-gray-900 dark:via-gray-900 dark:to-gray-950"
    >
      {/* Section Title */}
      <div className="container mx-auto px-4 lg:px-8 xl:px-16 text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          🎥 Video Edukasi Kesehatan Remaja Putri
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Tonton video edukasi menarik tentang anemia, Tablet Tambah Darah,
          gizi seimbang, dan PHBS untuk remaja putri.
        </p>
      </div>

      {/* Video Grid */}
      <div className="container mx-auto px-4 lg:px-8 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              {/* YouTube Embed */}
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {video.title}
                </h4>

                <a
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm rounded-lg transition"
                >
                  Buka di YouTube
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
