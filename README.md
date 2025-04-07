This is the GitHub repo for https://FoundationEvent.com .
It advertises the upcoming events for the floor.

# How to maintain the events
- Update any date/time info (with day of the week)
    - Uncomment the countdown script and text.
        - Write the "fancy" date & time in the "h3" tag
        - Write the "ugly" date & time format in the "countdownDate" tag
- Update what's happening
- Put the poster in the empty <img> tag
- Forms for rgistration can be embedded on the proper page
- Some changes won't work locally, but will work when it is pushed to the website (due to CORS issues).

# Adding a new event
- Use the `Event Template.html` and copy it and rename it to whatever the event will be.
- Edit the default details in the file.
- Create a new folder in the `Assets` folder for the event's images.