import Image from "next/image"
import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'

import LogoLight from "./public/img/logo-light.png"
import LogoDark from "./public/img/logo-dark.png"

const REPO_BASE = "https://github.com/internet-identity-labs/nfid"
const TWITTER_LINK = "https://twitter.com/@IdentityMaxis"

const theme = {
  useNextSeoProps() {
    return {
      titleTemplate: 'NFID Docs - %s'
    }
  },
  logo: (
    <div>
      <div className="flex items-center dark:hidden">
        <Image src={LogoLight} alt="logo" width={67} height={32} />
      </div>
      <div className="items-center hidden dark:flex">
        <Image src={LogoDark} alt="logo" width={67} height={32} />
      </div>
    </div>
  ),
  docsRepositoryBase: REPO_BASE,
  project: {
    link: REPO_BASE,
    icon: <GitHubLogoIcon />
  },
  chat: {
    link: TWITTER_LINK,
    icon: <TwitterLogoIcon />
  },
  sidebar: { 
    toggleButton: true,
    defaultMenuCollapseLevel: 1,
  },
  footer: {
    text: (
      <span>
        © {new Date().getFullYear() + " "}
        Internet Identity Labs.
      </span>
    ),
  },
  // ... other theme options
}

export default theme
