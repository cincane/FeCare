import { useState, useEffect, useCallback } from "react";
import { CalendarDays, Clock, Flame, Trash2, Plus, Pill, Bell, BellOff } from "lucide-react";
import { toast } from "sonner";

const STORAGE_KEY = "fecare-log";
const REMINDER_KEY = "fecare-reminder";

const getLog = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

const getReminder = () => {
  try {
    return JSON.parse(localStorage.getItem(REMINDER_KEY) || '{"enabled":false,"time":"19:00"}');
  } catch {
    return { enabled: false, time: "19:00" };
  }
};

const calcStreak = (entries) => {
  if (entries.length === 0) return 0;
  const dates = [...new Set(entries.map((e) => e.date))].sort().reverse();
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  if (dates[0] !== today && dates[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 0; i < dates.length - 1; i++) {
    const curr = new Date(dates[i]);
    const prev = new Date(dates[i + 1]);
    const diff = (curr.getTime() - prev.getTime()) / 86400000;
    if (diff === 1) streak++;
    else break;
  }
  return streak;
};

export default function About() {
  const [log, setLog] = useState(getLog);
  const [reminder, setReminder] = useState(getReminder);
  const [notifPermission, setNotifPermission] = useState(
    typeof Notification !== "undefined" ? Notification.permission : "denied"
  );
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(() => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
  }, [log]);

  const scheduleReminder = useCallback(() => {
    if (!reminder.enabled) return;

    const now = new Date();
    const [h, m] = reminder.time.split(":").map(Number);
    const target = new Date();
    target.setHours(h, m, 0, 0);
    if (target <= now) target.setDate(target.getDate() + 1);

    const delay = target.getTime() - now.getTime();
    const timerId = setTimeout(() => {
      if (Notification.permission === "granted") {
        new Notification("💊 FeCare Reminder", {
          body: "Waktunya minum tablet zat besi! Jangan lupa catat ya 📋",
          icon: "/favicon.ico",
        });
      }
      scheduleReminder();
    }, delay);

    return timerId;
  }, [reminder.enabled, reminder.time]);

  useEffect(() => {
    localStorage.setItem(REMINDER_KEY, JSON.stringify(reminder));
    const timerId = scheduleReminder();
    return () => { if (timerId) clearTimeout(timerId); };
  }, [reminder, scheduleReminder]);

  const toggleReminder = async () => {
    if (!reminder.enabled) {
      if (typeof Notification === "undefined") {
        toast.error("Browser tidak mendukung notifikasi");
        return;
      }
      if (Notification.permission === "denied") {
        toast.error("Izin notifikasi ditolak. Aktifkan di pengaturan browser.");
        return;
      }
      if (Notification.permission === "default") {
        const perm = await Notification.requestPermission();
        setNotifPermission(perm);
        if (perm !== "granted") {
          toast.error("Izin notifikasi diperlukan untuk fitur pengingat");
          return;
        }
      }
      setReminder((prev) => ({ ...prev, enabled: true }));
      toast.success("Pengingat diaktifkan! 🔔");
    } else {
      setReminder((prev) => ({ ...prev, enabled: false }));
      toast.info("Pengingat dinonaktifkan");
    }
  };

  const addEntry = () => {
    if (!date || !time) {
      toast.error("Harap isi tanggal dan waktu konsumsi");
      return;
    }
    const entry = { id: Date.now().toString(), date, time };
    setLog((prev) => [entry, ...prev]);
    toast.success("Konsumsi berhasil dicatat! ✅");
  };

  const removeEntry = (id) => {
    setLog((prev) => prev.filter((e) => e.id !== id));
    toast.info("Catatan dihapus");
  };

  const clearAllHistory = () => {
    if (log.length === 0) return;
    if (window.confirm("Hapus semua riwayat konsumsi?")) {
      setLog([]);
      toast.success("Semua riwayat dihapus");
    }
  };

  const streak = calcStreak(log);
  const totalDays = new Set(log.map((e) => e.date)).size;

  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 lg:px-8 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* About Images - Kiri */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="/images/about-01.png"
                  alt="About"
                  className="rounded-lg shadow-lg w-full"
                />
                <img
                  src="/images/about-02.png"
                  alt="About"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="/images/about-03.png"
                  alt="About"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>

          {/* Tracking Feature - Kanan (Menggantikan About Content) */}
          <div className="space-y-6 w-full">
            {/* Header */}
            <div className="text-left">
              <h4 className="text-primary font-semibold text-lg mb-2">
                Pencatatan Harian
              </h4>
              <h2 className="text-3xl lg:text-4xl font-bold text-dark dark:text-white mb-4">
                Catat Konsumsi Tablet Fe-mu 📋
              </h2>
              <p className="text-body dark:text-gray-300 leading-relaxed">
                Pantau konsumsi tablet zat besi harianmu. Aktifkan pengingat, 
                catat setiap konsumsi, dan lihat perkembangan streak-mu!
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl border border-orange-200 dark:border-orange-800 p-5 text-center">
                <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-dark dark:text-white">{streak}</div>
                <div className="text-sm text-body dark:text-gray-400">Hari Streak 🔥</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800 p-5 text-center">
                <CalendarDays className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-dark dark:text-white">{totalDays}</div>
                <div className="text-sm text-body dark:text-gray-400">Total Hari</div>
              </div>
            </div>

            {/* Reminder Card */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200 dark:border-purple-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-dark dark:text-white flex items-center gap-2">
                  {reminder.enabled ? (
                    <Bell className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  ) : (
                    <BellOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  )}
                  Pengingat Harian
                </h3>
                <button
                  onClick={toggleReminder}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    reminder.enabled ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                      reminder.enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              
              {reminder.enabled && (
                <div>
                  <label className="text-sm text-body dark:text-gray-400 mb-1.5 block">
                    Waktu Pengingat
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <input
                      type="time"
                      value={reminder.time}
                      onChange={(e) => setReminder((prev) => ({ ...prev, time: e.target.value }))}
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-dark dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <p className="text-xs text-body dark:text-gray-400 mt-2">
                    {notifPermission === "granted"
                      ? "✅ Notifikasi aktif — kamu akan diingatkan setiap hari"
                      : "⚠️ Izin notifikasi belum diberikan"}
                  </p>
                </div>
              )}
            </div>

            {/* Form Tambah Catatan */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-xl border border-pink-200 dark:border-pink-800 p-6">
              <h3 className="text-lg font-semibold text-dark dark:text-white mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                Tambah Catatan
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm text-body dark:text-gray-400 mb-1.5 block">
                    Tanggal
                  </label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-dark dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-body dark:text-gray-400 mb-1.5 block">
                    Waktu
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-dark dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>
              </div>
              
              <button
                onClick={addEntry}
                className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-2.5 px-4 rounded-lg font-medium hover:from-pink-600 hover:to-orange-600 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Catat Konsumsi
              </button>
            </div>

            {/* Riwayat */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-dark dark:text-white flex items-center gap-2">
                  <Pill className="w-5 h-5 text-green-600 dark:text-green-400" />
                  Riwayat ({log.length} catatan)
                </h3>
                {log.length > 0 && (
                  <button
                    onClick={clearAllHistory}
                    className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Hapus Semua
                  </button>
                )}
              </div>

              {log.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                  <Pill className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-500" />
                  <p className="text-body dark:text-gray-400">
                    Belum ada catatan. Mulai catat konsumsimu!
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                  {log.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                          <Pill className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-dark dark:text-white">
                            {new Date(entry.date).toLocaleDateString("id-ID", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                          <div className="text-xs text-body dark:text-gray-400">
                            Pukul {entry.time}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeEntry(entry.id)}
                        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Scrollbar Styles */}
            <style>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 10px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #c1c1c1;
                border-radius: 10px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #a1a1a1;
              }
              .dark .custom-scrollbar::-webkit-scrollbar-track {
                background: #374151;
              }
              .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #6b7280;
              }
              .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #9ca3af;
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}