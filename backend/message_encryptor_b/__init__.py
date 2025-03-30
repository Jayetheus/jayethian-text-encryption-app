from flask_cors import CORS



def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = "crypto_app"
    CORS(app, origins=["http://localhost:5173"])