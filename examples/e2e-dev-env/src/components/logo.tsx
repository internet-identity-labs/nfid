export const Logo = () => {
  return (
    <>
      <img src="/NFID-logo-light.webp" alt="nfid-logo" className="dark:hidden" width={67} />
      <img src="/NFID-logo-dark.webp" alt="nfid-logo" className="hidden dark:block" width={67} />
    </>
  )
}
