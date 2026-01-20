from app import app

def test_index():
    client = app.test_client()
    r = client.get("/")
    assert r.status_code == 200
    data = r.get_json()
    assert data["service"] == "demo-web"

def test_health():
    client = app.test_client()
    r = client.get("/health")
    assert r.status_code == 200
    assert r.data.decode() == "ok"