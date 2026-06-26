from flask import Flask, render_template, jsonify, request, session
import random

app = Flask(__name__)
# Une clé secrète est nécessaire pour utiliser les sessions (stockage du score)
app.secret_key = 'chic_secret_key_tic_tac'

WINNING_CONDITIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

def check_winner(game_state):
    for condition in WINNING_CONDITIONS:
        a, b, c = condition
        if game_state[a] and game_state[a] == game_state[b] and game_state[a] == game_state[c]:
            return condition
    return None

def find_winning_move(game_state, player):
    for condition in WINNING_CONDITIONS:
        a, b, c = condition
        values = [game_state[a], game_state[b], game_state[c]]
        if values.count(player) == 2 and "" in values:
            empty_idx = [a, b, c][values.index("")]
            return empty_idx
    return None

def get_random_move(game_state):
    empty_indices = [i for i, v in enumerate(game_state) if v == ""]
    return random.choice(empty_indices) if empty_indices else None

@app.route('/')
def home():
    if 'score' not in session:
        session['score'] = 0
    return render_template('index.html', score=session['score'])

@app.route('/computer-turn', methods=['POST'])
def computer_turn():
    data = request.json
    game_state = data.get('gameState', [""] * 9)

    # L'ordinateur cherche à gagner ('O'), sinon bloque ('X'), sinon joue au hasard
    move = find_winning_move(game_state, 'O')
    if move is None:
        move = find_winning_move(game_state, 'X')
    if move is None:
        move = get_random_move(game_state)
    return jsonify({'move': move})

@app.route('/increment-score', methods=['POST'])
def increment_score():
    session['score'] = session.get('score', 0) + 1
    return jsonify({'score': session['score']})

if __name__ == '__main__':
    app.run(debug=True)