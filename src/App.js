import logo from "./logo.svg";
import "./App.css";
import TodoContainer from "./components/TodoContainer";

function App() {
  return (
    <div className="App">
      <h1 className="p-8 font-bold text-2xl text-center lg:text-left">
        Trello app
      </h1>
      <TodoContainer />
    </div>
  );
}

export default App;
