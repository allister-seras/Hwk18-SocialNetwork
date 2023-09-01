const dayjs = require("dayjs");

module.exports = (date) => {
    const formattedDate = dayjs().format("MMMM D, YYYY h:mm A")

    return formattedDate
}