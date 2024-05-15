import { useTheme } from "next-themes"
import { IconSvgMoon, IconSvgNFID, IconSvgSun } from "../atoms/icons"

export const Header = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center justify-between h-[68px] mb-3">
      <img src={IconSvgNFID} alt="nfid" />
      <div className="flex items-center gap-10">
        <p className="text-sm font-bold">Identity Kit Playground</p>
        {theme === "light" ? (
          <img
            className="w-5 transition-opacity cursor-pointer hover:opacity-50"
            src={IconSvgSun}
            alt="light"
            onClick={() => setTheme("dark")}
          />
        ) : (
          <img
            className="w-5 transition-opacity cursor-pointer hover:opacity-50"
            src={IconSvgMoon}
            alt="dark"
            onClick={() => setTheme("light")}
          />
        )}
      </div>
    </div>
  )
}
