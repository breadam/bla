export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getInitials(name, surname) {
  return name.charAt(0).toUpperCase() + surname.charAt(0).toUpperCase();
}
