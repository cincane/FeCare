import firebase_admin
from firebase_admin import credentials, messaging
import os

# Initialize Firebase Admin SDK
cred = None
try:
    # Try to load from service account key file
    cred_path = os.path.join(os.path.dirname(__file__), '..', 'firebase-service-account.json')
    if os.path.exists(cred_path):
        cred = credentials.Certificate(cred_path)
    else:
        # Try environment variable
        cred_json = os.environ.get('FIREBASE_SERVICE_ACCOUNT')
        if cred_json:
            import json
            cred_dict = json.loads(cred_json)
            cred = credentials.Certificate(cred_dict)
        else:
            print("⚠️ Firebase credentials not found. Push notifications will be disabled.")
except Exception as e:
    print(f"⚠️ Firebase init error: {e}")

if cred:
    try:
        firebase_admin.initialize_app(cred)
        print("✅ Firebase initialized successfully")
    except Exception as e:
        print(f"⚠️ Firebase app already initialized: {e}")
else:
    print("⚠️ Firebase not initialized - missing credentials")

def send_push_notification(token, title, body, data=None):
    """
    Send push notification to a single device
    """
    if not cred:
        print("⚠️ Firebase not initialized, skipping notification")
        return False
        
    try:
        message = messaging.Message(
            notification=messaging.Notification(
                title=title,
                body=body,
            ),
            data=data or {},
            token=token,
        )
        
        response = messaging.send(message)
        print(f"✅ Push notification sent: {response}")
        return True
    except Exception as e:
        print(f"❌ Error sending push notification: {e}")
        return False

def send_multiple_notifications(tokens, title, body, data=None):
    """
    Send DATA ONLY push notifications (WAJIB untuk Web)
    """

    success_count = 0

    for token in tokens:
        try:
            message = messaging.Message(
                data={
                    "title": title,
                    "body": body,
                    **(data or {})
                },
                token=token,
            )

            response = messaging.send(message)
            success_count += 1
            print(f"✅ Push notification sent to {token[:20]}...: {response}")

        except Exception as e:
            print(f"❌ Error sending to {token[:20]}...: {e}")

    print(f"✅ Sent {success_count}/{len(tokens)} notifications")
    return success_count > 0

    """
    Send push notifications to multiple devices (one by one)
    """
    if not cred:
        print("⚠️ Firebase not initialized, skipping notifications")
        return False
        
    success_count = 0
    for token in tokens:
        try:
            message = messaging.Message(
                notification=messaging.Notification(
                    title=title,
                    body=body,
                ),
                data=data or {},
                token=token,
            )
            
            response = messaging.send(message)
            success_count += 1
            print(f"✅ Push notification sent to {token[:20]}...: {response}")
        except Exception as e:
            print(f"❌ Error sending to {token[:20]}...: {e}")
    
    print(f"✅ Sent {success_count}/{len(tokens)} notifications")
    return success_count > 0

# Untuk backward compatibility
def send_multicast(tokens, title, body, data=None):
    """
    Alias for send_multiple_notifications - untuk kompatibilitas
    """
    return send_multiple_notifications(tokens, title, body, data)