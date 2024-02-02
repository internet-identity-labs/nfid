/* eslint-env browser */

import { setupDapp } from "./setup-dapp"
import "./style.css"
import typescriptLogo from "./typescript.svg"
import viteLogo from "/vite.svg"

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="flex space-x-4">
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="${viteLogo}" class="logo" alt="Vite logo" />
      </a>
      <a href="https://www.typescriptlang.org/" target="_blank">
        <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
      </a>
      <h1>Vite + TypeScript</h1>
      <div><pre>@nfid/identity-kit</pre> dapp example</div>
    </div>
    <div>
      <h1>Signer Iframe</h1>
      <div><pre>@nfid/identity-kit</pre> dapp example</div>
      <iframe src="http://localhost:5173/" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>
`

setupDapp()
