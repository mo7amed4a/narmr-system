export function tryCatchWrapper<T>(
  callback: () => T,
  errorMessage = "حدث خطأ غير متوقع"
): T | { error: string } {
  try {
    return callback();
  } catch (error) {
    console.error("Error:", error);
    return { error: errorMessage };
  }
}
