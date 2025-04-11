export function SettingsH1({ children }) {
  return (
    <h1 className="font-extrabold text-2xl mb-4 w-[500px]">
      {children}
    </h1>
  );
}
export function SettingsH2({ mb, children }) {
  return (
    <h1 className={`font-bold text-xl ${mb ? "mb-" + mb : ""}`}>
      {children}
    </h1>
  );
}
export function SettingsH3({ children }) {
  return (
    <h1 className="text-lg font-bold text-gray-900 dark:text-white">
      {children}
    </h1>
  );
}