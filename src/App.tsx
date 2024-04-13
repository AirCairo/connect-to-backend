import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import ProductList from "./components/ProductList";
import axios, { AxiosError, CanceledError } from "axios";

interface User {
  id: number;
  name: string;
}

const connect = () => console.log("Connecting");
const disconnect = () => console.log("Disconnecting");

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState(0);

  const [isLoading, setLoading] = useState(false);

  // // afterRender
  // useEffect(() => {
  //   // Side Effect
  //   if (ref.current) ref.current.focus();
  // });

  useEffect(() => {
    document.title = "My App - Connecting to Backend";

    const controller = new AbortController();
    setLoading(true);

    axios // get -> await promise -> response / error
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    // .finally(() => {
    //   setLoading(false);
    // });
    return () => controller.abort();

    // const fetchUsers = async () => {
    //   //try {
    //   //const result = await axios // get -> await promise -> response / error
    //   axios // get -> await promise -> response / error
    //     .get<User[]>("https://jsonplaceholder.typicode.com/users", {
    //       signal: controller.signal,
    //     })
    //     .then((response) => setUsers(response.data))
    //     .catch((err) => setError(err.message));
    //   return () => controller.abort();
    //   //   setUsers(result.data);
    //   // } catch (error) {
    //   //   setError((error as AxiosError).message);
    //   // }
    // };

    // //return

    // fetchUsers();

    // connect();12
    // return () => disconnect();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Mosh" };
    setUsers([newUser, ...users]);

    axios
      .post("https://jsonplaceholder.typicode.com/users/", newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    axios
      .patch(
        "https://jsonplaceholder.typicode.com/users/" + user.id,
        updatedUser
      )
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  return (
    <>
      <div className="p-3 mb-2 bg-light text-dark">
        <h3>CONNECTING TO BACKEND</h3>
        <hr></hr>

        {error && <p className="text-danger">{error}</p>}
        {isLoading && <div className="spinner-border"></div>}
        <button className="btn btn-primary mb-3" onClick={addUser}>
          Add
        </button>

        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className="list-group-item d-flex justify-content-between"
            >
              {user.name}
              <div>
                <Button
                  variant="outline-secondary mx-1"
                  onClick={() => updateUser(user)}
                >
                  Update
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => deleteUser(user)}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>

        {/* <div>
          <input
            ref={ref}
            type="text"
            className="form-control"
            placeholder="focus test"
          />
        </div> */}

        <div>
          <select
            className="form-select"
            onChange={(event) => setCategory(event?.target.value)}
          >
            <option value=""></option>
            <option value="Clothing">Clothing</option>
            <option value="Household">Household</option>
          </select>
          <ProductList category={category} />
        </div>
      </div>

      <div className="App">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  );
}

export default App;
