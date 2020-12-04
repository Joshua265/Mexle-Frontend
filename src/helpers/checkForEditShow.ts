function checkForEditShow(userData, author?: string) {
  const username = userData.username;
  const userRole = userData.role;
  if (userRole === "admin") {
    return true;
  }
  if (author) {
    if (username === author) {
      return true;
    }
    return false;
  }
  return false;
}

export default checkForEditShow;
