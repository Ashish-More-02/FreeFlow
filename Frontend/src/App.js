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
  const routingInfo = createBrowserRouter([
    {
      path: "/",
      element: <Body></Body>,
      // child elements will render in <outlet> component , and this outlet should be in body component (the element which its child have!)
      children: [
        {
          path: "/",
          element: <MainContainer></MainContainer>,
        },
        {
          path: "/watch",
          element: <WatchPage></WatchPage>,
        },
      ],
    },
  ]);

  const headingRouter = createBrowserRouter([
    {
      path: "/",
      element: <Heading></Heading>,
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/signup",
      element: <SignUpForm></SignUpForm>,
    },
  ]);

  return (
    <Provider store={appStore}>
      <div className="App ">
        <RouterProvider router={headingRouter}></RouterProvider>
        <RouterProvider router={routingInfo}></RouterProvider>
      </div>
    </Provider>
  );
}

export default App;
