
// This file acts as a bridge to expose the environment variables to the Python runtime.
// The main application logic has been migrated to Python in index.html.

try {
  // Expose the API Key to the global window object for PyScript access
  (window as any).API_KEY = process.env.API_KEY;
  console.log("Python environment initialized: API Key bridged.");
} catch (e) {
  console.error("Failed to bridge API Key:", e);
}
