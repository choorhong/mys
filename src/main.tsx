import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ProfileShareProvider from "./context/profile-share.tsx";
import { worker } from "./mocks/browser";

import ShareInfoPage from "./pages/ShareInfoPage.tsx";
import SharesInfoPage from "./pages/SharesInfoPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SharesInfoPage />,
  },
  {
    path: "/:ticker",
    element: <ShareInfoPage />,
  },
  // {
  //   path: "/profile",
  //   element: <ProfileForm />,
  // },
]);

async function prepare() {
  if (import.meta.env.DEV) {
    return worker.start({
      onUnhandledRequest: "bypass",
    });
  }
}

prepare().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ProfileShareProvider>
        <RouterProvider router={router} />
      </ProfileShareProvider>
    </React.StrictMode>
  );
});
