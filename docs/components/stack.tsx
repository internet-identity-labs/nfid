import React from "react"

export const Stack = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => (
  <div className="flex gap-2 mt-4 mb-8">
    {children && React.Children.map(children, (child: React.ReactNode) => <div>{child}</div>)}
  </div>
)
