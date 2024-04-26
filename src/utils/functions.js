export function getInitials(username) {
  const usernameParts = username.trim().split(" ");
  let initials = "";

  if (usernameParts.length > 1) {
    initials =
      usernameParts[0].charAt(0) +
      usernameParts[usernameParts.length - 1].charAt(0);
  } else {
    initials = usernameParts[0].charAt(0);
  }
  return initials.toUpperCase();
}
