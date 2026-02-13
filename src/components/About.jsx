import { useState, useEffect } from "react";
import { CalendarDays, Clock, Flame, Trash2, Plus, Pill, Bell, BellOff } from "lucide-react";
import { toast } from "sonner";
import apiService from "../services/api";
import { requestNotificationPermission, onMessageListener, showForegroundNotification } from "../firebase";

const STORAGE_KEY = "fecare-log";
const REMINDER_KEY = "fecare-reminder";

// Perbaiki fungsi calcStreak dengan defensive programming
const calcStreak = (entries) => {
  if (!entries || !Array.isArray(entries) || entries.length === 0) {
    return 0;
  }
  
  try {
    const dates = [...new Set(entries.map((e) => e?.date).filter(Boolean))].sort().reverse();
    if (dates.length === 0) return 0;
    
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
  } catch (error) {
    console.error("Error calculating streak:", error);
    return 0;
  }
};

export default function About() {
  const [log, setLog] = useState([]);
  const [reminder, setReminder] = useState({ enabled: false, time: "19:00" });
  const [notifPermission, setNotifPermission] = useState("default");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(() => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  });

  // ===========================================
  // 🔔 FOREGROUND NOTIFICATION LISTENER
  // ===========================================
  // NOTIFIKASI INI AKAN MUNCUL KETIKA:
  // ✅ Aplikasi sedang DIBUKA dan AKTIF
  // ===========================================
 // ===========================================
// 🔔 FOREGROUND NOTIFICATION LISTENER - DENGAN ERROR HANDLING & LOOP
// ===========================================
  useEffect(() => {
    let isMounted = true;
    let listenerPromise = null;
    
    const setupForegroundListener = async () => {
      try {
        console.log('🔔 [FOREGROUND] Checking permission...');
        if (Notification.permission !== 'granted') {
          console.log('⚠️ [FOREGROUND] Permission not granted, skipping listener');
          return;
        }
        
        console.log('🔔 [FOREGROUND] Setting up listener...');
        
        // Setup listener dalam loop untuk menangkap multiple pesan
        const listenForMessages = async () => {
          while (isMounted) {
            try {
              listenerPromise = onMessageListener();
              const payload = await listenerPromise;
              
              if (!isMounted) break;
              
              if (payload) {
                console.log('📨 [FOREGROUND] Notifikasi diterima:', payload);
                
                // Tampilkan notifikasi foreground
                showForegroundNotification(payload);
                
                // Tampilkan toast sebagai backup
                const notificationBody = payload.notification?.body || 'Waktunya minum tablet zat besi!';
                toast.info(notificationBody, {
                  duration: 5000,
                  position: 'top-center',
                  icon: '💊'
                });
              }
            } catch (error) {
              console.error('❌ [FOREGROUND] Listener error:', error);
              // Tunggu sebentar sebelum retry
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          }
        };
        
        listenForMessages();
        
      } catch (error) {
        console.error('❌ [FOREGROUND] Setup error:', error);
      }
    };
    
    setupForegroundListener();
    
    // Cleanup
    return () => {
      isMounted = false;
      if (listenerPromise) {
        // Jika ada cara cancel promise, tambahkan di sini
      }
    };
  }, []); // Tetap sekali, tapi dengan loop di dalam

  // Check notification permission on mount
  useEffect(() => {
    if (typeof Notification !== "undefined") {
      setNotifPermission(Notification.permission);
    }
  }, []);

  // Load data from backend
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Load dari localStorage dulu
        const localLogs = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        const localReminder = JSON.parse(localStorage.getItem(REMINDER_KEY) || '{"enabled":false,"time":"19:00"}');
        
        if (Array.isArray(localLogs)) {
          setLog(localLogs);
        }
        if (localReminder && typeof localReminder === 'object') {
          setReminder(localReminder);
        }

        // Coba load dari backend
        try {
          const logsResult = await apiService.getLogs();
          if (logsResult && logsResult.success && Array.isArray(logsResult.data)) {
            setLog(logsResult.data);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(logsResult.data));
          }
        } catch (logError) {
          console.error("Load logs error:", logError);
        }

        try {
          const reminderResult = await apiService.getReminder();
          if (reminderResult && reminderResult.success && reminderResult.data) {
            setReminder(reminderResult.data);
            localStorage.setItem(REMINDER_KEY, JSON.stringify(reminderResult.data));
          }
        } catch (reminderError) {
          console.error("Load reminder error:", reminderError);
        }
        
      } catch (error) {
        console.error("Load data error:", error);
        setError("Gagal memuat data");
        toast.error("Gagal memuat data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Save logs to localStorage as backup
  useEffect(() => {
    if (Array.isArray(log)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
    }
  }, [log]);

  // Save reminder to localStorage as backup
  useEffect(() => {
    if (reminder && typeof reminder === 'object') {
      localStorage.setItem(REMINDER_KEY, JSON.stringify(reminder));
    }
  }, [reminder]);

  // ===========================================
  // 🔧 REGISTER SERVICE WORKER UNTUK BACKGROUND
  // ===========================================
  // NOTIFIKASI INI AKAN MUNCUL KETIKA:
  // ✅ Browser/Tab DITUTUP
  // ✅ Browser di BACKGROUND
  // ===========================================
  // useEffect(() => {
  //   const registerSW = async () => {
  //     if (reminder?.enabled && notifPermission === "granted" && "serviceWorker" in navigator) {
  //       try {
  //         // Unregister existing service workers
  //         const registrations = await navigator.serviceWorker.getRegistrations();
  //         for (const registration of registrations) {
  //           await registration.unregister();
  //           console.log('Service worker unregistered:', registration);
  //         }
          
  //         // Register new service worker
  //         const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
  //         console.log("✅ Service Worker registered for background notifications:", registration);
          
  //         // Wait for ready
  //         await navigator.serviceWorker.ready;
  //         console.log("✅ Service Worker ready for background notifications");
          
  //       } catch (error) {
  //         console.error("❌ Service Worker registration failed:", error);
  //       }
  //     }
  //   };
    
  //   registerSW();
  // }, [reminder?.enabled, notifPermission]);

  // ===========================================
  // 🔘 TOGGLE REMINDER - VERSI FINAL DENGAN ERROR HANDLING!
  // ===========================================
  // ===========================================
// 🔘 TOGGLE REMINDER - VERSI FINAL!
// ===========================================
  const toggleReminder = async () => {
    if (!reminder || isSaving) return;

    setIsSaving(true);

    try {
      const newState = !reminder.enabled;

      if (newState) {
        // 1️⃣ Minta izin + generate token (JANGAN unregister SW!)
        const fcmToken = await requestNotificationPermission();

        if (!fcmToken) {
          toast.error("Gagal mendapatkan token notifikasi");
          return;
        }

        // 2️⃣ Simpan token ke backend
        const tokenResult = await apiService.savePushToken(fcmToken);

        if (!tokenResult.success) {
          toast.error("Gagal menyimpan token");
          return;
        }

        // 3️⃣ Update reminder
        const result = await apiService.updateReminder({
          enabled: true,
          time: reminder.time || "19:00"
        });

        if (result?.success) {
          setReminder({
            enabled: true,
            time: reminder.time || "19:00"
          });

          toast.success("✅ Pengingat diaktifkan");
        }

      } else {
        // NONAKTIFKAN
        const result = await apiService.updateReminder({
          enabled: false,
          time: reminder.time
        });

        if (result?.success) {
          setReminder({
            enabled: false,
            time: reminder.time
          });

          toast.success("🔕 Pengingat dinonaktifkan");
        }
      }

    } catch (error) {
      console.error("❌ Toggle reminder error:", error);
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Update reminder time
  const updateReminderTime = async (newTime) => {
    if (!reminder || !newTime || isSaving) return;
    
    setIsSaving(true);
    try {
      const newReminder = { 
        enabled: reminder.enabled, 
        time: newTime
      };
      
      const result = await apiService.updateReminder(newReminder);
      
      if (result && result.success) {
        setReminder({ enabled: reminder.enabled, time: newTime });
        toast.success(`⏰ Waktu pengingat: ${newTime}`);
      }
    } catch (error) {
      console.error("Update reminder time error:", error);
      toast.error("Gagal memperbarui waktu pengingat");
    } finally {
      setIsSaving(false);
    }
  };

  // Add entry
  const addEntry = async () => {
    if (!date || !time) {
      toast.error("Harap isi tanggal dan waktu konsumsi");
      return;
    }

    setIsSaving(true);
    try {
      const result = await apiService.addLog(date, time);
      
      if (result && result.success) {
        const newEntry = { 
          id: Date.now().toString(), 
          date, 
          time,
        };
        
        if (result.data && result.data.id) {
          newEntry.backendId = result.data.id;
        }
        
        setLog((prev) => {
          const prevLogs = Array.isArray(prev) ? prev : [];
          return [newEntry, ...prevLogs];
        });
        
        toast.success("✅ Catatan berhasil ditambahkan");
        
        // Reset waktu ke sekarang
        const now = new Date();
        setTime(`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`);
      } else {
        toast.error(result.error?.msg || "Gagal menambahkan catatan");
      }
    } catch (error) {
      console.error("Add entry error:", error);
      toast.error("Gagal menambahkan catatan");
    } finally {
      setIsSaving(false);
    }
  };

  // Remove entry
  const removeEntry = async (id, backendId) => {
    if (!id) return;
    
    if (backendId) {
      setIsSaving(true);
      try {
        const result = await apiService.deleteLog(backendId);
        if (result && result.success) {
          setLog((prev) => {
            const prevLogs = Array.isArray(prev) ? prev : [];
            return prevLogs.filter((e) => e?.id !== id);
          });
          toast.success("🗑️ Catatan berhasil dihapus");
        }
      } catch (error) {
        console.error("Remove entry error:", error);
        toast.error("Gagal menghapus catatan");
      } finally {
        setIsSaving(false);
      }
    } else {
      setLog((prev) => {
        const prevLogs = Array.isArray(prev) ? prev : [];
        return prevLogs.filter((e) => e?.id !== id);
      });
      toast.info("📝 Catatan dihapus (lokal)");
    }
  };

  // Clear all history
  const clearAllHistory = async () => {
    const currentLog = Array.isArray(log) ? log : [];
    if (currentLog.length === 0) return;
    
    if (window.confirm("Hapus semua riwayat konsumsi?")) {
      setIsSaving(true);
      try {
        for (const entry of currentLog) {
          if (entry?.backendId) {
            await apiService.deleteLog(entry.backendId);
          }
        }
        setLog([]);
        toast.success("🗑️ Semua riwayat dihapus");
      } catch (error) {
        console.error("Clear history error:", error);
        toast.error("Gagal menghapus semua riwayat");
      } finally {
        setIsSaving(false);
      }
    }
  };

  const safeLog = Array.isArray(log) ? log : [];
  const streak = calcStreak(safeLog);
  const totalDays = new Set(safeLog.map((e) => e?.date).filter(Boolean)).size;

  // Loading state
  if (isLoading) {
    return (
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 lg:px-8 xl:px-16">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 lg:px-8 xl:px-16">
          <div className="flex flex-col justify-center items-center min-h-[400px]">
            <div className="text-red-500 text-xl mb-4">⚠️ {error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Muat Ulang
            </button>
          </div>
        </div>
      </section>
    );
  }

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
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                  }}
                />
                <img
                  src="/images/about-02.png"
                  alt="About"
                  className="rounded-lg shadow-lg w-full"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                  }}
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="/images/about-03.png"
                  alt="About"
                  className="rounded-lg shadow-lg w-full"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Tracking Feature - Kanan */}
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
                  {reminder?.enabled ? (
                    <Bell className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  ) : (
                    <BellOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  )}
                  Pengingat Harian
                </h3>
                <button
                  onClick={toggleReminder}
                  disabled={isSaving}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    reminder?.enabled ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"
                  } ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                      reminder?.enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              
              {reminder?.enabled && (
                <div>
                  <label className="text-sm text-body dark:text-gray-400 mb-1.5 block">
                    Waktu Pengingat
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <input
                      type="time"
                      value={reminder?.time || "19:00"}
                      onChange={(e) => updateReminderTime(e.target.value)}
                      disabled={isSaving}
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-dark dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                    />
                  </div>
                  <p className="text-xs text-body dark:text-gray-400 mt-2">
                    {notifPermission === "granted" ? (
                      "✅ Notifikasi aktif — akan muncul di foreground & background"
                    ) : notifPermission === "denied" ? (
                      "⚠️ Izin notifikasi ditolak. Aktifkan di pengaturan browser."
                    ) : (
                      "⚠️ Izin notifikasi belum diberikan. Aktifkan pengingat untuk meminta izin."
                    )}
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
                      disabled={isSaving}
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-dark dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50"
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
                      disabled={isSaving}
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-dark dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
              
              <button
                onClick={addEntry}
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-2.5 px-4 rounded-lg font-medium hover:from-pink-600 hover:to-orange-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Catat Konsumsi
                  </>
                )}
              </button>
            </div>

            {/* Riwayat */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-dark dark:text-white flex items-center gap-2">
                  <Pill className="w-5 h-5 text-green-600 dark:text-green-400" />
                  Riwayat ({safeLog.length} catatan)
                </h3>
                {safeLog.length > 0 && (
                  <button
                    onClick={clearAllHistory}
                    disabled={isSaving}
                    className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    Hapus Semua
                  </button>
                )}
              </div>

              {safeLog.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                  <Pill className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-500" />
                  <p className="text-body dark:text-gray-400">
                    Belum ada catatan. Mulai catat konsumsimu!
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                  {safeLog.map((entry) => (
                    <div
                      key={entry?.id || entry?.date + entry?.time}
                      className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                          <Pill className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-dark dark:text-white">
                            {entry?.date ? new Date(entry.date).toLocaleDateString("id-ID", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }) : "Tanggal tidak valid"}
                          </div>
                          <div className="text-xs text-body dark:text-gray-400">
                            Pukul {entry?.time || "00:00"}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeEntry(entry?.id, entry?.backendId)}
                        disabled={isSaving}
                        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:opacity-50"
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