import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, List, ListItem } from "@mui/material";
import axios from "axios";
import { RootState } from "./store/index";
import { takeTodos, selectTodos, getTodoErrors } from "./features/todos";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

const UserKey = styled(Box)({
  fontSize: "20px",
  color: "#333333",
  letterSpacing: "0.2px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  minWidth: "100px",
  backgroundColor: "#F9D5E5",
  padding: "5px 10px",
  borderRadius: "10px",
});

const UserValue = styled(Box)({
  color: "#FFFFFF",
  marginLeft: "100px",
  fontSize: "20px",
  backgroundColor: "#F15A29",
  borderRadius: "10px",
  padding: "5px 10px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
});

function App() {
  const { todos, selectedTodo, errorCase } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/todos",
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
          background: "#F99F53",
          backgroundImage: "#53F98B",
          color: "#53F98B",
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
            background: "linear-gradient(to right, #c2e59c, #64b3f4)",
          }}
        >
          {todos.map((todo, index: number) => (
            <ListItem
              sx={{
                borderBottomStyle: "solid",
                borderBottomColor: "#F95357",
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
                    background: " linear-gradient(to right, #ff9966, #ff5e62)",
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
            gap: "10px",
            alignItems: "flex-start",
            padding: "20px",
            width: 700,
            height: 400,
            background: "linear-gradient(to right bottom, #dd3e54, #6be585)",
            borderRadius: "20px",
          }}
        >
          <Container>
            <UserKey component="div">UserId</UserKey>
            <UserValue component="span">{`${selectedTodo?.userId}`}</UserValue>
          </Container>
          <Container>
            <UserKey component="div">TodoId</UserKey>
            <UserValue component="span">{`${selectedTodo?.id}`}</UserValue>
          </Container>
          <Container>
            <UserKey component="div">Title</UserKey>
            <UserValue component="span">{`${selectedTodo?.title}`}</UserValue>
          </Container>
          <Container>
            <UserKey component="div">Completed</UserKey>
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
