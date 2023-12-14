const REPO_BASE = "https://github.com/internet-identity-labs/nfid"
const theme = {
  logo: (
    <div>
      <strong>@nfid</strong>/identity-kit
    </div>
  ),
  docsRepositoryBase: REPO_BASE,
  project: {
    link: REPO_BASE,
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
