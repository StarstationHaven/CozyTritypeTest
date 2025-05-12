export function Button({ children, ...props }) {
  return <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded transition" {...props}>{children}</button>;
}
