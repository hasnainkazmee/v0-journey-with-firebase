type ToastType = "success" | "error" | "info" | "warning"

// This is a simple implementation that will be replaced with a proper toast system
export function addToast(message: string, type: ToastType = "info") {
  // Check if we're in a browser environment
  if (typeof window === "undefined") return

  // Create a custom event to be caught by the Toast component
  const event = new CustomEvent("toast", {
    detail: { message, type },
  })

  // Dispatch the event
  window.dispatchEvent(event)
}
