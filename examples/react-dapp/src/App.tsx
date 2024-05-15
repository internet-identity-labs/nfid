import { Header } from "./ui/molecules/header"
import { icrc25Section } from "./data/icrc25"
import { Section } from "./ui/organisms/section"
import { ToastContainer } from "react-toastify"

const data = [icrc25Section, icrc25Section]

function App() {
  return (
    <div className="h-full min-h-screen bg-white dark:bg-dark px-[30px] pb-20">
      <ToastContainer />
      <Header />
      <div className="flex flex-col space-y-20">
        {data.map((section, index) => (
          <Section index={index + 1} {...section} />
        ))}
      </div>
    </div>
  )
}

export default App
