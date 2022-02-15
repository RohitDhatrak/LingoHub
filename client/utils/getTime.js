import moment from "moment";

export function getDateOrTime(time) {
    const seconds = new Date(time);
    if (moment(seconds).isSame(moment(), "day")) {
        return moment(seconds).format("h:mm A");
    } else if (moment(seconds).isSame(moment(), "year")) {
        return moment(seconds).format("D MMM");
    } else {
        return moment(seconds).format("D/MM/YYYY");
    }
}
