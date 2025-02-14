function UnauthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-6">
      <div className="max-w-lg text-center rounded-2xl bg-gray-800 p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-red-500 sm:text-4xl">Access Denied</h1>
        <p className="mt-4 text-gray-300 sm:text-lg">
          You don't have permission to view this page. Please contact the administrator or try logging in with the correct credentials.
        </p>
        <a
          href="/"
          className="mt-6 inline-block rounded-lg bg-red-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-red-700"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}

export default UnauthPage;
