    const months = [
        "Jan", "Feb", "Mar", 
        "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", 
        "Oct", "Nov", "Dec"
    ]

    // stripe date formatting
    export const newDateFormat = (stripeDate) => {

        const mins = new Date(stripeDate * 1000).getMinutes()
        const hour = new Date(stripeDate * 1000).getHours()
        const hourMins = hour + ":" + mins
        const day = new Date(stripeDate * 1000).getDate()
        const month = months[new Date(stripeDate * 1000).getMonth()]
        const year = new Date(stripeDate * 1000).getFullYear()
        const dayMonth = day + " " + month
        const fullDate = day + " " + month + " " + year

        const createdDateFormat = fullDate + ", " + hourMins
        const createdDateFormat1 = dayMonth + ", " + hourMins

        return [dayMonth, day, createdDateFormat, fullDate, createdDateFormat1] 
    }

    export const nonStripeDateFormat = () => {

        const nonStripeDay = new Date().getDate()
        const nonStripeMonth = months[new Date().getMonth()]
        const nonStripeYear = new Date().getFullYear()
        const nonStripeHours = new Date().getHours()
        const nonStripeMins = new Date().getMinutes()

        const nonStripeHourMins = nonStripeHours + ":" + nonStripeMins
        const nonStripeDayMonth = nonStripeDay + " " + nonStripeMonth
        const nonStripeFullDate = nonStripeDay + " " + nonStripeMonth + " " + nonStripeYear

        const nonStripeCreatedDateFormat = nonStripeFullDate + ", " + nonStripeHourMins
        const nonStripeCreatedDateFormat1 = nonStripeDayMonth + ", " + nonStripeHourMins

        return [nonStripeDayMonth, nonStripeDay, nonStripeCreatedDateFormat, nonStripeFullDate, nonStripeCreatedDateFormat1] 
    }