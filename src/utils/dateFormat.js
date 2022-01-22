import React from "react";
import { FormattedDate } from "react-intl";
const DateFormat = (props) => (
  <FormattedDate
    value={props.at && new Date(props.at.seconds * 1000)}
    year="numeric"
    month="long"
    day="numeric"
    weekday="long"
  />
);
export default DateFormat;
