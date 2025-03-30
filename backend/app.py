from flask import session, request, jsonify 
from cryptography.fernet import Fernet
from message_encryptor_b import create_app

app = create_app()

@app.route("/api/encrypt_message", methods=["POST"])
def encrypt():
    data = request.get_json()
    print(data['key'])
    cipher = Fernet(data['key'].encode('utf-8'))
    print(f"Key: {data['key']}")

    encryptedMessage = cipher.encrypt(data['message'].encode("utf-8"))

    return jsonify({"message" : encryptedMessage.decode("utf-8")})


@app.route("/api/decrypt_message", methods=["POST"])
def decrypt():
    data = request.get_json()
    cipher = Fernet(data['key'].encode('utf-8'))
    print(f"Key: {data['key']}")

    decryptedMessage = cipher.decrypt(data['message'].encode("utf-8"))

    return jsonify({"message" : decryptedMessage.decode("utf-8")})


@app.route("/init_session", methods=["POST"])
def init_session():
    session['key']= Fernet.generate_key()
    print(f"Session created with key: {session['key']}")
    key = session['key'].decode("utf-8")
    print(key)
    return jsonify({"key": key})

if __name__ == __name__:
    app.run(debug=True)