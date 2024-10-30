export function toastSuccess(message: string) {
  M.toast({
    html: message,
    classes: "green",
  });
}

export function toastError(message: string) {
  M.toast({
    html: message,
    classes: "red",
  });
}
