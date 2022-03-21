import React from "react";
import { FormattedDate } from "react-intl";
import moment from "moment";
const DateFormat = (props) => (
  <FormattedDate
    value={props.at && new Date(props.at.seconds * 1000)}
    year="numeric"
    month="long"
    day="numeric"
    weekday="long"
  />
);

export const dateFormatWithTime = (timestamp) =>
  moment(timestamp.seconds * 1000).fromNow();

export default DateFormat;
