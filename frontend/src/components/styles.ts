
export const asteroidTableStyles = {
  container: "bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100",
  header: {
    wrapper: "bg-gradient-to-r from-blue-600 to-blue-300 px-6 py-4",
    title: "text-xl font-bold text-white flex items-center gap-2",
    pulse: "w-2 h-2 bg-yellow-400 rounded-full animate-pulse",
    subtitle: "text-blue-100 text-sm mt-1"
  },
  table: {
    wrapper: "overflow-x-auto",
    table: "w-full",
    thead: "bg-gray-50 border-b border-gray-200",
    th: "px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200 select-none",
    thContent: "flex items-center justify-between group",
    sortIcon: "group-hover:opacity-100 transition-opacity duration-200",
    tbody: "bg-white divide-y divide-gray-200"
  },
  row: {
    base: "hover:bg-blue-50 transition-colors duration-200",
    even: "bg-white",
    odd: "bg-gray-50/30"
  },
  cell: {
    base: "px-6 py-4 whitespace-nowrap",
    nameWrapper: "flex items-center gap-2",
    name: "font-medium text-gray-900",
    hazardousWrapper: "flex items-center",
    number: "text-gray-900 font-mono text-sm",
    velocityWrapper: "flex items-center gap-2",
  },
  footer: {
    wrapper: "bg-gray-50 px-6 py-3 border-t border-gray-200",
    content: "flex items-center justify-between text-sm text-gray-600",
  },
  icons: {
    hazard: "w-4 h-4 text-red-500",
  }
};
