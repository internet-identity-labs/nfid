import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "@radix-ui/themes/styles.css"
import { ThemeProvider } from "next-themes"
import { Theme } from "@radix-ui/themes"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider attribute="class">
      <Theme
        className="h-full"
        accentColor="indigo"
        grayColor="gray"
        panelBackground="solid"
        radius="medium"
      >
        <App />
        {/* <ThemePanel /> */}
      </Theme>
    </ThemeProvider>
  </React.StrictMode>
)
