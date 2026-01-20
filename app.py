from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.get("/")
def index():
    return jsonify(
        service="demo-web",
        version=os.getenv("APP_VERSION", "dev"),
    )

@app.get("/health")
def health():
    return "ok", 200

if __name__ == "__main__":
    port = int(os.getenv("PORT", "8080"))
    app.run(host="0.0.0.0", port=port)