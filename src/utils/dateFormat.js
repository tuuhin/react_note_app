import moment from "moment";
export const currentDateFromTimeStamp = (timestamp) =>
  moment(timestamp.seconds * 1000).format("MM ddd, YYYY hh:mm");

export const dateFormatWithTime = (timestamp) =>
  moment(timestamp.seconds * 1000).fromNow();

export const currentDate = () => moment().format("MM ddd, YYYY hh:mm a");
