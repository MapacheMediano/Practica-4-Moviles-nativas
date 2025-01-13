import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type SquareProps = {
  children: React.ReactNode; // El contenido del cuadrado (✖ u Ｏ)
  isSelected?: boolean; // Si el cuadrado está seleccionado (para estilos)
  updateBoard: (index: number) => void; // Función para actualizar el tablero
  index: number; // Índice del cuadrado en el tablero
};

const Square: React.FC<SquareProps> = ({ children, isSelected = false, updateBoard, index }) => {
  const handlePress = () => {
    updateBoard(index); // Llama a la función pasada como prop para manejar el clic
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.square, isSelected && styles.selectedSquare]}
    >
      <Text style={styles.squareText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  square: {
    width: "33%", // Divide el ancho en tres columnas
    height: "33%", // Divide el alto en tres filas
    borderWidth: 2,
    borderColor: "#20fc8f",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedSquare: {
    backgroundColor: "#4edac7", // Fondo para el cuadrado seleccionado
  },
  squareText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff", // Color del texto
  },
});

export default Square;
