document.addEventListener("DOMContentLoaded", function () {
    const eventLinks = [
        { id: "haunted-house-link", url: "https://foundationevent.com/Haunted%20House.html" },
        { id: "parade-link", url: "https://foundationevent.com/Parade.html" },
        { id: "5k-link", url: "https://foundationevent.com/5K.html" }
    ];

    const checkEventDate = async (event) => {
        const response = await fetch(event.url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const dateElement = doc.querySelector('countdownDate');
        if (dateElement) {
            const date = Date.parse(dateElement.textContent.trim());
            if (!isNaN(date)) {
                return event;
            }
        }
        return null;
    };

    Promise.all(eventLinks.map(checkEventDate)).then(results => {
        const activeEvent = results.find(event => event !== null);

        if (activeEvent) {
            eventLinks.forEach(event => {
                if (event.url !== activeEvent.url) {
                    const linkElement = document.getElementById(event.id);
                    if (linkElement) {
                        linkElement.style.display = 'none';
                    }
                }
            });
        }
    });
});