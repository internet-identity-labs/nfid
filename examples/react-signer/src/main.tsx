import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "@radix-ui/themes/styles.css"
import { ThemeProvider } from "next-themes"
// import { Theme } from "@radix-ui/themes"

import "./style.css"

const theme = new URLSearchParams(window.location.search).get("theme") ?? "light"
// for css to access theme
document.documentElement.style.setProperty(
  "--theme-main-color",
  theme === "light" ? "#000000" : "#ffffff"
)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider forcedTheme={theme} attribute="class">
      {/* <Theme className="h-full"> */}
      <App />
      {/* <ThemePanel /> */}
      {/* </Theme> */}
    </ThemeProvider>
  </React.StrictMode>
)
