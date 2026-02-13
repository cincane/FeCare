from flask import jsonify
from app.model.user import User
from app import db
from flask_jwt_extended import create_access_token, get_jwt_identity
from app.model.push_token_model import PushToken

class UserController:

    @staticmethod
    def register(data):
        if User.query.filter_by(email=data["email"]).first():
            return jsonify({"msg": "Email sudah terdaftar"}), 400

        user = User(email=data["email"])
        user.set_password(data["password"])

        db.session.add(user)
        db.session.commit()

        return jsonify({"msg": "Register berhasil"}), 201

    @staticmethod
    def login(data):
        user = User.query.filter_by(email=data["email"]).first()

        if not user or not user.check_password(data["password"]):
            return jsonify({"msg": "Email / password salah"}), 401

        token = create_access_token(identity=user.id)

        return jsonify({
            "token": token,
            "user_id": user.id
        })


    @staticmethod
    def save_push_token(data):
        user_id = get_jwt_identity()

        token = PushToken.query.filter_by(
            user_id=user_id,
            token=data["token"]
        ).first()

        if not token:
            new_token = PushToken(
                user_id=user_id,
                token=data["token"]
            )
            db.session.add(new_token)
            db.session.commit()

        return jsonify({"msg": "Token saved"})