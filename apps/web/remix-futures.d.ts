declare module '@remix-run/server-runtime' {
  interface Future {
    unstable_singleFetch: true; // 👈 enable _types_ for single-fetch
  }
}
