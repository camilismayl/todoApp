import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, List, ListItem } from "@mui/material";
import axios from "axios";
import { RootState } from "./store/index";
import { takeTodos, selectTodos, getTodoErrors } from "./features/todos";
import { Container, UserKey, UserValue } from "./uiComponents/Component";

function App() {
  const URL = "https://jsonplaceholder.typicode.com/todos";

  const { todos, selectedTodo, errorCase } = useSelector(
    (state: RootState) => state.todos
  );
  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      method: "get",
      url: URL,
    })
      .then((res) => {
        dispatch(takeTodos(res.data));
      })
      .catch((err) => {
        dispatch(getTodoErrors(err.message));
      })
      .finally(() => {
        console.log("API request completed.");
      });
  }, [dispatch]);

  const showTodo = (id: number) => {
    const activeTodo = todos.filter((todo) => {
      return todo.id == id;
    });
    dispatch(selectTodos(activeTodo[0]));
  };

  if (errorCase) {
    return <Box sx={{ fontSize: 40 }}>{errorCase}</Box>;
  }

  if (todos.length == 0) {
    return (
      <Container
        sx={{
          width: "100%",
          height: "100vh",
          background: "linear-gradient(to right, #00d2ff, #3a7bd5)",
          backgroundImage: "#53F98B",
          color: "#203A43",
          fontSize: 50,
          zIndex: 999,
        }}
      >
        Loading... Please wait...
      </Container>
    );
  }

  return (
    <Container
      sx={{
        width: "100%",
        height: "100vh",
        flexDirection: "column",
        gap: "30px",
        background: "linear-gradient(to right, #a8ff78, #78ffd6)",
        backgroundImage: "#F99F53",
      }}
    >
      <Box component="h2" sx={{ fontSize: "40px", color: "#0B1046" }}>
        Todo App
      </Box>
      <Container
        sx={{
          width: "80%",
          height: "80%",
          backgroundColor: "#fff",
          borderRadius: "15px",
        }}
      >
        <List
          sx={{
            width: "100%",
            height: "100%",
            padding: "10px",
            overflowY: "scroll",
            borderRadius: "10px",
            background: "linear-gradient(to right, #aaffa9, #11ffbd)",
          }}
        >
          {todos.map((todo, index: number) => (
            <ListItem
              sx={{
                borderBottomStyle: "solid",
                borderBottomColor:
                  "linear-gradient(to right, #1d976c, #93f9b9)",
                marginBottom: "1px",
                padding: 1,
              }}
              key={todo.id}
            >
              <Button
                variant="text"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  border: "none",
                  outline: "none",
                  background: "none",
                  width: "100%",
                  height: "100%",
                  padding: "10px",
                  color: "#000",
                  textTransform: "capitalize",
                  fontSize: "18px",
                  "&:hover": {
                    fontSize: "20px",

                    cursor: "pointer",
                    color: "#054236",
                    background: " linear-gradient(to right, #b3ffab, #12fff7)",
                    transition: "color 0.4s ease-in",
                  },
                }}
                onClick={() => showTodo(todo.id)}
              >{`${index + 1}. ${todo.title}`}</Button>
            </ListItem>
          ))}
        </List>
      </Container>
      <Box
        sx={{
          display: selectedTodo ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99999,
        }}
      >
        <Container
          sx={{
            flexDirection: "column",
            gap: "50px",
            alignItems: "flex-start",
            padding: "50px",
            width: 700,
            height: 400,
            background: "linear-gradient(to right, #00f260, #0575e6)",
            borderRadius: "30px",
          }}
        >
          <Container>
            <UserKey component="div">user id</UserKey>
            <UserValue component="span">{`${selectedTodo?.userId}`}</UserValue>
          </Container>
          <Container>
            <UserKey component="div">todo id</UserKey>
            <UserValue component="span">{`${selectedTodo?.id}`}</UserValue>
          </Container>
          <Container>
            <UserKey component="div">title</UserKey>
            <UserValue component="span">{`${selectedTodo?.title}`}</UserValue>
          </Container>
          <Container>
            <UserKey component="div">completed</UserKey>
            <UserValue component="span">{`${
              selectedTodo?.completed ? "true" : "false"
            }`}</UserValue>
          </Container>
        </Container>
        <CloseIcon
          sx={{
            position: "fixed",
            top: 20,
            right: 30,
            fontSize: 50,
            color: "#04293A",
            "&:hover": { cursor: "pointer", color: "#215269" },
          }}
          onClick={() => {
            dispatch(selectTodos(null));
          }}
        />
      </Box>
    </Container>
  );
}

export default App;
