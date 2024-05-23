export const GetAccounts = ({ origin }: { origin: string }) => {
  return (
    <>
      <div className="text-xl mb-2 font-bold text-center">Get Accounts</div>
      <small className="block text-center">
        <a className="text-blue-500" target="_blank" href={origin}>
          {origin}
        </a>{" "}
        wants to get your principal and subaccount
      </small>
    </>
  )
}
