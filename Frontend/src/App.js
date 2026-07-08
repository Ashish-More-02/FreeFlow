import "./App.css";
import Heading from "./Components/Heading";
import Body from "./Components/Body";
import { Provider, useSelector } from "react-redux";
import appStore from "./Redux/appStore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WatchPage from "./Components/WatchPage";
import MainContainer from "./Components/MainContainer";
import Login from "./Components/Login";
import SignUpForm from "./Components/SignUpForm";
import SearchResults from "./Components/SearchResults";
import Settings from "./Components/Settings";
import Landing from "./Components/Landing";

// Shell for the app pages (header + sidebar + routed content).
const AppLayout = () => (
  <div className="dark:bg-[#07070f]">
    <Heading />
    <Body />
  </div>
);

// Created once at module scope so toggling the theme doesn't recreate the
// router (which would remount every page and lose route state).
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUpForm />,
  },
  {
    // Pathless layout route: wraps the app pages with the header + sidebar.
    element: <AppLayout />,
    children: [
      {
        path: "/home",
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
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);

// Reads the theme from redux; lives inside <Provider> so useSelector works.
const AppContent = () => {
  const darkMode = useSelector((store) => store.appconfigslice.darkMode);

  return (
    <div className={`App ${darkMode ? "dark dark:bg-[#07070f]" : ""}`}>
      <RouterProvider router={appRouter} />
    </div>
  );
};

function App() {
  return (
    <Provider store={appStore}>
      <AppContent />
    </Provider>
  );
}

export default App;
