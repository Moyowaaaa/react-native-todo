import Header from "@/app/components/Header";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import {
  FlatList,
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import TodoItem from "./components/TodoItem";
import { SafeAreaView, StatusBar } from "react-native";

export interface todo {
  title: string;
  id: string;
  isDone?: boolean;
}

export default function Index() {
  const [newTodo, setNewTodo] = useState<string>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [todos, setTodos] = useState<todo[]>([
    {
      id: "1",
      title: "Go to the dentist",
      isDone: false,
    },
    {
      id: "2",
      title: "Walk the dog",
      isDone: false,
    },
    {
      id: "3",
      title: "Feed the fish",
      isDone: false,
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setTodos((prev) =>
        prev.map((todo) => ({
          ...todo,
          isDone: Math.random() > 0.5,
        }))
      );
      setRefreshing(false);
    }, 1500);
  };

  const onDeleteHandler = (todo: todo) => {
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
  };

  const onAddTodoHandler = () => {
    if (!newTodo.trim()) return;

    if (newTodo.length > 3) {
      const newTodoItem: todo = {
        id: Math.random().toString(),
        title: newTodo,
        isDone: false,
      };

      setTodos((prev) => [newTodoItem, ...prev]);
      setNewTodo("");
    } else {
      Alert.alert("Oops", "Todos must be over 3 characters long", [
        { text: "Understood" },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={"darkslategrey"}
          barStyle={"dark-content"}
        />
        <Header />

        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={"e.g do some laundry..."}
              style={styles.input}
              onChangeText={(val) => setNewTodo(val)}
              value={newTodo}
            />

            <TouchableOpacity
              onPress={onAddTodoHandler}
              style={styles.addButton}
            >
              <FontAwesome name="plus" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <FlatList
            keyExtractor={(todo) => todo.id}
            data={todos}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#007bff"]}
                tintColor={"#007bff"}
                title={"Pull to refresh"}
              />
            }
            renderItem={({ item }) => (
              <TodoItem
                todo={item}
                setTodos={setTodos}
                onDeleteHandler={onDeleteHandler}
              />
            )}
          />
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    width: "100%",
  },
  input: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: "black",
    marginHorizontal: 20,
  },
  addButton: {
    backgroundColor: "#007bff",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
});
