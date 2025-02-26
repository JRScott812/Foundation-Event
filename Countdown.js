document.addEventListener("DOMContentLoaded", function () {
    // Set the date we're counting down to
    const dateElement = document.getElementsByTagName("countdownDate")[0];
    if (dateElement) {
        const date = Date.parse(dateElement.innerHTML.trim());
        if (isNaN(date)) {
            // If the countdownDate is empty or invalid, hide all elements within the section with id "date"
            const parentElement = document.getElementById('date');
            if (parentElement) {
                const childElements = parentElement.querySelectorAll('*');
                childElements.forEach(child => {
                    child.style.display = 'none';
                });
            }
            document.getElementById("current-event-poster").style.display = 'none';
        } else {
            const countDownDate = new Date(date).getTime();

            // Update the count down every 1 second
            var x = setInterval(function () {
                // Get today's date and time
                var now = new Date().getTime();

                // Find the distance between now and the count down date
                var distance = countDownDate - now;

                if (distance < 0) {
                    clearInterval(x);
                    document.getElementById("countdown").innerHTML = "EXPIRED";
                }

                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Display the result in the element with id="countdown"
                document.getElementById("countdown").innerHTML = days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds ";
            }, 1000);
        }
    } else {
        console.error('Element with tag "countdownDate" not found.');
    }
});