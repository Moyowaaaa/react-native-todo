import React, { SetStateAction } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { todo } from "..";
import { FontAwesome } from "@expo/vector-icons";

function TodoItem({
  todo,
  setTodos,
  onDeleteHandler,
}: {
  todo: todo;
  setTodos: React.Dispatch<SetStateAction<todo[]>>;
  onDeleteHandler: (todo: todo) => void;
}) {
  const updateTodoStatus = () => {
    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? { ...t, isDone: !t.isDone } : t))
    );
  };

  return (
    <TouchableOpacity onPress={updateTodoStatus}>
      <View style={[styles.card, todo.isDone && styles.completedCard]}>
        <Text style={[styles.headerText, todo.isDone && styles.completedText]}>
          {todo.title}
        </Text>

        <FontAwesome
          name="trash-o"
          size={24}
          color="white"
          onPress={() => onDeleteHandler(todo)}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    backgroundColor: "#121212",
    padding: 15,
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  completedCard: {
    backgroundColor: "#2c2c2c",
  },
  headerText: {
    color: "white",
    flex: 1,
    marginRight: 10,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#888",
  },

  boxShadow: {
    shadowColor: "#151515",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowRadius: 4,
    shadowOpacity: 0.6,
  },
  androidShadow: {
    elevation: 10,
  },
});

export default TodoItem;
