import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button, Alert, Image } from "react-native";
import Square from "../Components/Square"; // Asegúrate de que la ruta sea correcta



const TURNS = { X: "✖", O: "Ｏ" };
const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState<null | string | boolean>(null);

  const checkWinner = (boardCheck: string[]) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (boardCheck[a] && boardCheck[a] === boardCheck[b] && boardCheck[a] === boardCheck[c]) {
        return boardCheck[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  const checkEndGame = (newBoard: string[]) => {
    return newBoard.every((square) => square !== null);
  };

  const updateBoard = (index: number) => {
    if (board[index] !== null || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gato</Text>
      <View style={styles.gameBoard}>
        {board.map((_, index) => (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {board[index]}
          </Square>
        ))}
      </View>
      <View style={styles.turnContainer}>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </View>
      {winner !== null && (
        <View style={styles.winnerContainer}>
          <Text style={styles.winnerText}>
            {winner === false ? "Empate" : `Ganó ${winner}`}
          </Text>
          <Button title="Reiniciar" onPress={resetGame} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2d2d2a",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#4EDAC7",
  },
  gameBoard: {
    width: 300,
    height: 300,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  square: {
    width: "33%",
    height: "33%",
    borderWidth: 2,
    borderColor: "#20fc8f",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedSquare: {
    backgroundColor: "#353831",
  },
  squareText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  turnContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  winnerContainer: {
    alignItems: "center",
    marginTop: 0,
    marginBottom: 20,
  },
  winnerText: {
    fontSize: 30,
    fontWeight: "bold",
    
    color: "#20fc8f",
  },
  winnerDisplay: {
    marginBottom: 20,
  },

});

export default TicTacToe;
