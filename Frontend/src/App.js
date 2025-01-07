import "./App.css";
import Heading from "./Components/Heading";
import Body from "./Components/Body";
import { Provider } from "react-redux";
import appStore from "./Redux/appStore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WatchPage from "./Components/WatchPage";
import MainContainer from "./Components/MainContainer";
import Login from "./Components/Login";
import SignUpForm from "./Components/SignUpForm";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUpForm />,
    },
    {
      path: "/",
      element: (
        <>
          <Heading />
          <Body />
        </>
      ),
      children: [
        {
          path: "/",
          element: <MainContainer />,
        },
        {
          path: "/watch",
          element: <WatchPage />,
        },
      ],
    },
  ]);

  return (
    <Provider store={appStore}>
      <div className="App">
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;
