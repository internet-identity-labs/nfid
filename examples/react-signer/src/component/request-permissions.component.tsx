import { InteractivePanel } from "./interactive-panel.component"

interface RequestPermissionsRequest {
  origin: string
  permissions: string[]
  revoke?: boolean
  onReject: () => void
  onApprove: () => void
}

export const RequestPermissions = ({
  origin,
  permissions,
  revoke,
  onApprove,
  onReject,
}: RequestPermissionsRequest) => {
  return (
    <>
      <div className="pt-9">
        <div className="mb-2 text-xl font-bold text-center">Request Permission</div>
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
      </div>
      <InteractivePanel onApprove={onApprove} onReject={onReject} />
    </>
  )
}
