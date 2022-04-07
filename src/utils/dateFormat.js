import moment from "moment";
export const currentDateFromTimeStamp = (timestamp) => {
  try {
    return moment(timestamp.seconds * 1000).format("MM ddd, YYYY hh:mm");
  } catch (e) {
    console.log(e);
    return;
  }
};

export const dateFormatWithTime = (timestamp) => {
  try {
    return moment(timestamp.seconds * 1000).fromNow();
  } catch (e) {
    console.log(e);
    return;
  }
};

export const currentDate = () => moment().format("MM ddd, YYYY hh:mm a");
