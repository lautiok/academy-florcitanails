export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4 bg-gray-100 dark:bg-black">
      <h1 className="text-6xl font-extrabold text-pink-600">404</h1>
      <p className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Página no encontrada
      </p>
      <video src="https://media.tenor.com/Z6CkoIysYZEAAAPo/rihanna-dance-hands.mp4" autoPlay loop muted className="w-64 h-auto rounded-xl shadow-lg">
        Your browser does not support the video tag.
      </video>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        Pero al menos Rihanna está feliz 🎉
      </p>
    </div>
  );
}
