import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Landing from "./pages/Landing";
import Cart from "./pages/Cart";
import BlogPost from "./pages/IndivBlog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/blog/:id",
    element: <BlogPost />,
  },
]);

const App = () => {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
