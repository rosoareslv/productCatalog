export function fieldValidationError(req, res) {
  return res.status(400).json({ message: res.validationMessage });
}
