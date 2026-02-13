from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from app.model.reminder import Reminder
from app import db

class ReminderController:

    @staticmethod
    def get_reminder():
        user_id = get_jwt_identity()
        reminder = Reminder.query.filter_by(user_id=user_id).first()

        if not reminder:
            return jsonify({"enabled": False, "time": "19:00"})

        return jsonify({
            "enabled": reminder.enabled,
            "time": reminder.time
        })

    @staticmethod
    def update_reminder(data):
        user_id = get_jwt_identity()

        reminder = Reminder.query.filter_by(user_id=user_id).first()

        if not reminder:
            reminder = Reminder(user_id=user_id)

        reminder.enabled = data["enabled"]
        reminder.time = data["time"]

        db.session.add(reminder)
        db.session.commit()

        return jsonify({"msg": "Reminder updated"})
