import dayjs from "dayjs";
export function toTitleCase(sentence) {
  const words = sentence.toLowerCase().split(" ");
  for (let i in words) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
  }
  return words.join(" ");
}
export function mpsToKmph(mps) {
  return ((mps * 18) / 5).toFixed(1);
}
export function secondsToDate(seconds) {
  return dayjs(seconds * 1000).format("dddd, MMMM D");
}

export function degToDir(degrees) {
  if (degrees > 337.5 && degrees < 22.5) {
    return "North";
  } else if (degrees > 22.5 && degrees < 67.5) {
    return "North-East";
  } else if (degrees > 67.5 && degrees < 112.5) {
    return "East";
  } else if (degrees > 112.5 && degrees < 157.5) {
    return "South-East";
  } else if (degrees > 157.5 && degrees < 202.5) {
    return "South";
  } else if (degrees < 202.5 && degrees > 247.5) {
    return "South West";
  } else if (degrees < 247.5 && degrees > 292.5) {
    return "West";
  } else {
    return "North-West";
  }
}
export function secondsToMonthDay(seconds) {
  return dayjs(seconds * 1000).format("MMM D");
}
export function secondsToTime(seconds) {
  return dayjs(seconds * 1000).format("h:mm a");
}
export function secondsToWeekDay(seconds) {
  return dayjs(seconds * 1000).format("ddd");
}
