import { Route, Routes, BrowserRouter } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";

import Login from "./Login";
import Dashboard from "./Dashboard";
import PostList from "./Dashboard/Posts/PostList";
import Home from "./Dashboard/Home";
import NewPost from "./Dashboard/Posts/NewPost";
import { EditPost } from "./Dashboard/Posts/EditPost";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Login />} path="/login" />

        <Route
          element={
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          }
          path="/dashboard"
        >
          <Route element={<Home />} path="/dashboard" />
          <Route element={<PostList />} path="/dashboard/posts" />
          <Route element={<NewPost />} path="/dashboard/posts/newpost" />
          <Route element={<EditPost />} path="/dashboard/posts/edit_post/:id" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

/* TIPOS PROPRIEDADS DO HTML (TSX) */

/**
 
<Route element={<Builder />} path="/">
          <Route element={<Panel />} path="/" />
          <Route element={<Geral />} path="/configurations/geral" />
        </Route>

 */
