import pymysql
pymysql.install_as_MySQLdb()

from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os

app = Flask(__name__)

# CORS configuration - PERBAIKI!
CORS(app, 
     origins=["http://localhost:5173", "http://localhost:3000"], 
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
     supports_credentials=True,
     expose_headers=["Content-Type", "Authorization"])

app.config.from_object(Config)

# JWT Configuration - PERBAIKI PANJANG KEY!
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET", "super-secret-key-change-this-please-make-it-at-least-32-chars-long")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 86400  # 24 hours

db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# Import models
from app.model import user, log, reminder, push_token_model

# Start scheduler
from app.scheduler import check_reminders
check_reminders()

# Import routes - PASTIKAN routes.py SUDAH DIPERBAIKI!
from app import routes