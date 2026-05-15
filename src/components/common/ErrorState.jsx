export default function ErrorState({ message, onRetry }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 text-center text-red-400"
      role="alert"
    >
      <h2 className="text-xl font-semibold text-red-300">
        Something went wrong
      </h2>

      <p className="mt-2 text-sm text-red-400 max-w-md">{message}</p>

      <button
        onClick={onRetry}
        className="mt-5 px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
      >
        Retry
      </button>
    </div>
  );
}
