import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import App from "../App";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Navigate to="/home" />} />
      <Route path="home" element={<HomePage />} />
    </Route>
  )
);

export default router;
