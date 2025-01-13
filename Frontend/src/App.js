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
import { useState } from "react";
import SearchResults from "./Components/SearchResults";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkmode, setDarkmode] = useState(false);

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
        <div className="dark:bg-black">
          <Heading darkmode={darkmode} setDarkmode={setDarkmode} />
          <Body isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
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
        {
          path: "/results",
          element: <SearchResults />,
        },
      ],
    },
  ]);

  return (
    <Provider store={appStore}>
      <div className={`App  ${darkmode ? " dark dark:bg-black" : ""}`}>
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;
