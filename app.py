from flask import Flask, render_template, request, jsonify

app = Flask(__name__, template_folder='.', static_folder='.')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/support', methods=['POST'])
def support():
    data = request.get_json()
    query = data.get('query', '')
    email = data.get('email', '')

    print(f"[NOVÝ DOTAZ] E-mail: {email} | Dotaz: {query}")

    return jsonify({
        "status": "success",
        "message": "Dotaz byl přijat.",
        "query": query,
        "email": email
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
