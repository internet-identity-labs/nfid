export const RequestPermissions = ({
  origin,
  permissions,
  revoke,
}: {
  origin: string
  permissions: string[]
  revoke?: boolean
}) => {
  return (
    <>
      <div className="text-xl mb-2 font-bold text-center">Request Permission</div>
      <small className="block text-center">
        <a className="text-blue-500" target="_blank" href={origin}>
          {origin}
        </a>{" "}
        wants permission to {revoke ? "revoke" : "request"} the following methods:
      </small>
      <div className="rounded border border-solid border-neutral-600 py-2.5 px-5 mt-8">
        <ul className="themed">
          {permissions.map((p) => (
            <li key={p}>
              <small className="font-bold">{p}</small>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
