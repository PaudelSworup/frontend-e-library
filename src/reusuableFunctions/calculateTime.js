export const formatNotificationTime = (timestamp) => {
  const notifiedTime = new Date(timestamp).getTime();
  const currentTime = Date.now();
  const timeDifference = currentTime - notifiedTime;

  // Convert milliseconds to seconds, minutes, hours, and days
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return "Just now";
  } else if (minutes < 60) {
    return `${minutes}m`;
  } else if (hours < 24) {
    return `${hours}h`;
  } else {
    return `${days}d`;
  }
};
