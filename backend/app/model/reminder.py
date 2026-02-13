from app import db
from datetime import datetime

class Reminder(db.Model):
    __tablename__ = 'reminder'
    
    id = db.Column(db.Integer, primary_key=True)
    enabled = db.Column(db.Boolean, default=False)
    time = db.Column(db.String(5), default="19:00")  # Format: HH:MM
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    # ZONA WAKTU USER (WAJIB!)
    timezone = db.Column(db.String(50), default="Asia/Jakarta")  # WIB default
    
    # TIMESTAMPS
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<Reminder {self.user_id}: {self.time} {self.timezone} {"ON" if self.enabled else "OFF"}>'