from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from app.model.log import Log
from app import db
from datetime import datetime

class LogController:

    @staticmethod
    def get_logs():
        user_id = get_jwt_identity()
        logs = Log.query.filter_by(user_id=user_id).all()

        return jsonify([
            {
                "id": l.id,
                "date": l.date.isoformat(),
                "time": l.time
            } for l in logs
        ])

    @staticmethod
    def add_log(data):
        user_id = get_jwt_identity()

        log = Log(
            date=datetime.strptime(data["date"], "%Y-%m-%d"),
            time=data["time"],
            user_id=user_id
        )

        db.session.add(log)
        db.session.commit()

        return jsonify({"msg": "Log berhasil ditambahkan"}), 201

    @staticmethod
    def delete_log(id):
        user_id = get_jwt_identity()
        log = Log.query.filter_by(id=id, user_id=user_id).first()

        if not log:
            return jsonify({"msg": "Log tidak ditemukan"}), 404

        db.session.delete(log)
        db.session.commit()

        return jsonify({"msg": "Log berhasil dihapus"})
