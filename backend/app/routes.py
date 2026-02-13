from datetime import datetime
from flask import jsonify, request
from app import db, app
from flask_jwt_extended import get_jwt_identity, jwt_required, create_access_token

from app.model.log import Log
from app.model.reminder import Reminder
from app.model.push_token_model import PushToken
from app.model.user import User
from werkzeug.security import generate_password_hash, check_password_hash

# ==========================
# INDEX
# ==========================
@app.route("/")
def index():
    return "Hello FeCare API 🚀"

# ==========================
# AUTH - PERBAIKAN DI SINI!
# ==========================
@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        print(f"📝 Register data: {data}")
        
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({"msg": "Email dan password required"}), 400

        if User.query.filter_by(email=data["email"]).first():
            return jsonify({"msg": "Email sudah terdaftar"}), 400

        user = User(email=data["email"])
        user.password = generate_password_hash(data["password"])

        db.session.add(user)
        db.session.commit()

        return jsonify({"msg": "Register berhasil"}), 201
    except Exception as e:
        print(f"❌ Register error: {e}")
        db.session.rollback()
        return jsonify({"msg": str(e)}), 500

@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        print(f"📝 Login data: {data}")
        
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({"msg": "Email dan password required"}), 400
        
        user = User.query.filter_by(email=data["email"]).first()

        if not user or not check_password_hash(user.password, data["password"]):
            return jsonify({"msg": "Email / password salah"}), 401

        # PERBAIKAN: Convert user.id ke STRING!
        user_identity = str(user.id)
        token = create_access_token(identity=user_identity)

        print(f"✅ Login success for user {user.id} (identity: {user_identity})")
        return jsonify({
            "token": token,
            "user_id": user.id
        }), 200
    except Exception as e:
        print(f"❌ Login error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({"msg": str(e)}), 500

# ==========================
# LOG CONSUMSI
# ==========================
@app.route('/log', methods=['GET'])
@jwt_required()
def get_logs():
    try:
        user_id = get_jwt_identity()
        print(f"🔍 GET /log - user_id: {user_id} (type: {type(user_id)})")
        
        # PERBAIKAN: Convert ke integer untuk query
        try:
            user_id_int = int(user_id)
        except:
            user_id_int = user_id
        
        logs = Log.query.filter_by(user_id=user_id_int).order_by(Log.date.desc(), Log.time.desc()).all()
        
        result = []
        for log in logs:
            date_str = ""
            if log.date:
                if hasattr(log.date, 'isoformat'):
                    date_str = log.date.isoformat()
                else:
                    date_str = str(log.date)
            
            result.append({
                "id": log.id,
                "date": date_str,
                "time": log.time or ""
            })
        
        print(f"✅ GET /log - found {len(result)} logs")
        return jsonify(result), 200
        
    except Exception as e:
        print(f"❌ GET /log error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify([]), 200

@app.route('/log', methods=['POST'])
@jwt_required()
def add_log():
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        
        print(f"📝 POST /log - user: {current_user} (type: {type(current_user)}), data: {data}")
        
        # PERBAIKAN: Convert ke integer untuk query
        try:
            user_id_int = int(current_user)
        except:
            user_id_int = current_user
        
        if not data:
            print("❌ No data provided")
            return jsonify({'error': 'No data provided'}), 400
            
        date = data.get('date')
        time = data.get('time')
        
        print(f"📝 Extracted - date: {date}, time: {time}")
        
        if not date:
            print("❌ Date is missing")
            return jsonify({'error': 'Date is required'}), 400
        if not time:
            print("❌ Time is missing")
            return jsonify({'error': 'Time is required'}), 400
        
        # Convert string date ke Python date object
        try:
            date_obj = datetime.strptime(date, '%Y-%m-%d').date()
            print(f"✅ Date parsed: {date_obj}")
        except Exception as e:
            print(f"❌ Date parse error: {e}")
            return jsonify({'error': f'Invalid date format: {date}. Use YYYY-MM-DD'}), 400
        
        # Validasi format time
        try:
            datetime.strptime(time, '%H:%M')
            print(f"✅ Time parsed: {time}")
        except:
            print(f"❌ Time parse error: {time}")
            return jsonify({'error': f'Invalid time format: {time}. Use HH:MM'}), 400
        
        # Simpan ke database
        log_entry = Log(
            user_id=user_id_int,
            date=date_obj,
            time=time
        )
        
        db.session.add(log_entry)
        db.session.commit()
        
        print(f"✅ Log added with ID: {log_entry.id}")
        
        return jsonify({
            'success': True,
            'id': log_entry.id,
            'date': date,
            'time': time
        }), 201
        
    except Exception as e:
        print(f"❌ POST /log error: {e}")
        import traceback
        traceback.print_exc()
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/log/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_log(id):
    try:
        current_user = get_jwt_identity()
        print(f"🗑️ DELETE /log/{id} - user: {current_user}")
        
        # PERBAIKAN: Convert ke integer untuk query
        try:
            user_id_int = int(current_user)
        except:
            user_id_int = current_user
        
        log = Log.query.filter_by(id=id, user_id=user_id_int).first()
        
        if not log:
            return jsonify({"msg": "Log tidak ditemukan", "success": False}), 404
        
        db.session.delete(log)
        db.session.commit()
        
        print(f"✅ Log {id} deleted")
        return jsonify({"msg": "Log berhasil dihapus", "success": True}), 200
        
    except Exception as e:
        print(f"❌ DELETE /log/{id} error: {e}")
        db.session.rollback()
        return jsonify({'error': str(e), "success": False}), 500

# ==========================
# REMINDER
# ==========================
@app.route('/reminder', methods=['GET'])
@jwt_required()
def get_reminder():
    try:
        current_user = get_jwt_identity()
        print(f"🔍 GET /reminder - user: {current_user}")
        
        # PERBAIKAN: Convert ke integer untuk query
        try:
            user_id_int = int(current_user)
        except:
            user_id_int = current_user
        
        reminder = Reminder.query.filter_by(user_id=user_id_int).first()
        
        if not reminder:
            print(f"ℹ️ No reminder found for user {current_user}")
            return jsonify({
                "enabled": False,
                "time": "19:00"
            }), 200
        
        result = {
            "enabled": reminder.enabled if reminder.enabled is not None else False,
            "time": reminder.time or "19:00"
        }
        
        print(f"✅ GET /reminder - found: {result}")
        return jsonify(result), 200
        
    except Exception as e:
        print(f"❌ GET /reminder error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({"enabled": False, "time": "19:00"}), 200

@app.route('/reminder', methods=['PUT'])
@jwt_required()
def update_reminder():
    try:
        current_user = get_jwt_identity()
        user_id_int = int(current_user)
        data = request.get_json()
        
        enabled = data.get('enabled', False)
        time = data.get('time', '19:00')
        
        # Validasi format time (HH:MM)
        try:
            datetime.strptime(time, '%H:%M')
        except:
            return jsonify({'error': 'Invalid time format. Use HH:MM'}), 400
        
        reminder = Reminder.query.filter_by(user_id=user_id_int).first()
        
        if not reminder:
            reminder = Reminder(user_id=user_id_int)
            db.session.add(reminder)
        
        reminder.enabled = enabled
        reminder.time = time
        reminder.timezone = "Asia/Jakarta"  # WIB - BISA DIAMBIL DARI FRONTEND NANTI
        reminder.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        print(f"✅ Reminder saved: user={user_id_int}, time={time}, enabled={enabled}, tz={reminder.timezone}")
        
        return jsonify({
            'success': True,
            'enabled': reminder.enabled,
            'time': reminder.time,
            'timezone': reminder.timezone
        }), 200
        
    except Exception as e:
        print(f"❌ Error: {e}")
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
# ==========================
# PUSH TOKEN
# ==========================
@app.route("/push-token", methods=["POST"])
@jwt_required()
def save_push_token():
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        
        print(f"🔑 POST /push-token - user: {current_user}, data: {data}")
        
        # PERBAIKAN: Convert ke integer untuk query
        try:
            user_id_int = int(current_user)
        except:
            user_id_int = current_user
        
        if not data:
            print("❌ No data provided")
            return jsonify({'error': 'No data provided'}), 400
            
        token = data.get('token')
        
        if not token:
            print("❌ Token is missing")
            return jsonify({'error': 'Token is required'}), 400
        
        print(f"📝 Token: {token[:20]}...")
        
        # Cek apakah token sudah ada
        existing_token = PushToken.query.filter_by(
            user_id=user_id_int,
            token=token
        ).first()
        
        if not existing_token:
            new_token = PushToken(
                user_id=user_id_int,
                token=token
            )
            db.session.add(new_token)
            db.session.commit()
            print(f"✅ New push token saved for user {current_user}")
        else:
            print(f"ℹ️ Push token already exists for user {current_user}")
        
        return jsonify({"msg": "Token saved", "success": True}), 200
        
    except Exception as e:
        print(f"❌ POST /push-token error: {e}")
        import traceback
        traceback.print_exc()
        db.session.rollback()
        return jsonify({'error': str(e), 'success': False}), 500

# ==========================
# PUSH TOKEN - TAMBAHKAN ENDPOINT INI!
# ==========================
@app.route("/push-tokens", methods=["DELETE"])
@jwt_required()
def delete_all_push_tokens():
    try:
        current_user = get_jwt_identity()
        user_id_int = int(current_user)
        
        # HAPUS SEMUA TOKEN USER INI
        PushToken.query.filter_by(user_id=user_id_int).delete()
        db.session.commit()
        
        print(f"✅ All push tokens deleted for user {user_id_int}")
        return jsonify({"msg": "All tokens deleted", "success": True}), 200
        
    except Exception as e:
        print(f"❌ Error deleting push tokens: {e}")
        db.session.rollback()
        return jsonify({'error': str(e), 'success': False}), 500

# ==========================
# 🔴 ENDPOINT RESET TOKEN - WAJIB!
# ==========================
@app.route("/push-tokens/reset", methods=["POST"])
@jwt_required()
def reset_push_tokens():
    try:
        current_user = get_jwt_identity()
        user_id_int = int(current_user)
        
        print(f"🔄 Resetting push tokens for user {user_id_int}...")
        
        # HAPUS SEMUA TOKEN USER INI
        deleted = PushToken.query.filter_by(user_id=user_id_int).delete()
        db.session.commit()
        
        print(f"✅ Deleted {deleted} old tokens for user {user_id_int}")
        
        return jsonify({
            "success": True, 
            "msg": f"Deleted {deleted} tokens",
            "deleted": deleted
        }), 200
        
    except Exception as e:
        print(f"❌ Error resetting tokens: {e}")
        db.session.rollback()
        return jsonify({"success": False, "error": str(e)}), 500

# ==========================
# 🔴 ENDPOINT CEK TOKEN - DEBUG!
# ==========================
@app.route("/push-tokens/check", methods=["GET"])
@jwt_required()
def check_push_tokens():
    try:
        current_user = get_jwt_identity()
        user_id_int = int(current_user)
        
        tokens = PushToken.query.filter_by(user_id=user_id_int).all()
        
        result = []
        for token in tokens:
            result.append({
                "id": token.id,
                "token_preview": token.token[:20] + "...",
                "token_full": token.token
            })
        
        print(f"📋 User {user_id_int} has {len(result)} tokens")
        
        return jsonify({
            "success": True,
            "count": len(result),
            "tokens": result
        }), 200
        
    except Exception as e:
        print(f"❌ Error checking tokens: {e}")
        return jsonify({"success": False, "error": str(e)}), 500