from datetime import datetime, timedelta, timezone
from app.model.reminder import Reminder
from app.model.push_token_model import PushToken  # Tambahkan import ini jika belum ada
from app import db
from app.firebase_config import send_multiple_notifications, send_push_notification  # Tambahkan send_push_notification
import threading
import time

# 🔴 SET TIMEZONE KE WIB (UTC+7) - PASTIKAN DI ATAS SEMUA!
WIB = timezone(timedelta(hours=7))

def check_reminders():
    """
    Check reminders every minute and send push notifications
    """
    from app import app
    
    def run_check():
        with app.app_context():
            try:
                # 🔴 PAKAI WIB, BUKAN UTC!
                now_wib = datetime.now(WIB)
                now_time = now_wib.strftime("%H:%M")
                
                print(f"⏰ [WIB] Checking reminders at {now_time} WIB...")
                
                # Get all enabled reminders for current time
                reminders = Reminder.query.filter_by(
                    enabled=True,
                    time=now_time
                ).all()
                
                print(f"📋 Found {len(reminders)} reminders for {now_time} WIB")
                
                for reminder in reminders:
                    try:
                        # Get user's push tokens
                        tokens = PushToken.query.filter_by(
                            user_id=reminder.user_id
                        ).all()
                        
                        token_list = [t.token for t in tokens if t.token]
                        
                        if token_list:
                            # Send push notification
                            success = send_multiple_notifications(
                                tokens=token_list,
                                title="💊 FeCare Reminder",
                                body="Waktunya minum tablet zat besi! Jangan lupa catat ya 📋",
                                data={
                                    "type": "reminder",
                                    "time": now_time,
                                    "user_id": str(reminder.user_id),
                                    "click_action": "OPEN_APP"
                                }
                            )
                            
                            if success:
                                print(f"✅ Reminder sent to user {reminder.user_id} at {now_time} WIB")
                            else:
                                print(f"❌ Failed to send reminder to user {reminder.user_id} - deleting invalid tokens")
                                
                                # 🔴 HAPUS TOKEN YANG INVALID!
                                for token_obj in tokens:
                                    try:
                                        # Coba kirim test kecil untuk cek validitas
                                        test_success = send_push_notification(
                                            token_obj.token, "Test", "Test", {}
                                        )
                                        if not test_success:
                                            db.session.delete(token_obj)
                                            print(f"🗑️ Deleted invalid token for user {reminder.user_id}")
                                    except Exception as e:
                                        print(f"🗑️ Deleting token due to error: {e}")
                                        db.session.delete(token_obj)
                                db.session.commit()
                        else:
                            print(f"⚠️ No push tokens for user {reminder.user_id}")
                            
                    except Exception as e:
                        print(f"❌ Error processing reminder for user {reminder.user_id}: {e}")
                        import traceback
                        traceback.print_exc()
                        
            except Exception as e:
                print(f"❌ Error in check_reminders: {e}")
                import traceback
                traceback.print_exc()
        
        # Schedule next check in 60 seconds
        timer = threading.Timer(60.0, run_check)
        timer.daemon = True
        timer.start()
    
    # Start the scheduler
    run_check()
    print("🚀 Reminder scheduler started with WIB (UTC+7)")