import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import loadable from "@loadable/component";

import CustomError from "../common/CustomError";

import { ROUTES } from "./webRoutes";

const RootPage = loadable(() => import("../views"));
const Home = loadable(() => import("../views/HomePage"));
const User = loadable(() => import("../views/UserPage"));
const SearchPage = loadable(() => import("../views/SearchPage"));

export const RouterRoutes = () => {
  return (
    <BrowserRouter>
      <ResetPage />
      <Routes>
        <Route path={ROUTES.HOME.route} element={<RootPage />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.TOPIC.route + ":topicId"} element={<Home />} />
          <Route path={ROUTES.USER.route + ":username"} element={<User />} />
          <Route path={ROUTES.SEARCH.route} element={<SearchPage />} />
          <Route
            path="*"
            element={
              <CustomError errMessage="Page not found" statusCode={404} />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const ResetPage = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return null;
};
