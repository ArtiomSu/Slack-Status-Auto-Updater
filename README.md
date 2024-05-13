# Slack Status Auto Updater

This simple nodejs script uses your token to automatically change the slack status based on a time table.

This app does not use the official bot api because you need to have admin aproval to add bots and we don't like admins in this neck of the woods.

The tokens you get using this do last a while but they will expire, so just go through the setup again.

This script is basically making the same request as slack does when running in the browser, so we need to to copy some fields from the browser generated curl request.

# Setup

1. clone this repo and make sure you have nodejs installed.
2. open slack in your browser and open the developer tools so that you can see the network tab.
3. change you status manually and look for the request.
4. right click on the request and select "Copy Value" -> "Copy as cURL" The request method is POST and the url should contain the following `.slack.com/api/users.profile.set`, thats how you know you got the right one.
5. paste this into a new file called `curl.txt`
6. now you can run the script with `node slackStatusAutoUpdater.js` in the terminal. 


# Configure the time table

The time table is based on your local time/date so you might have to change the order of `const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];` inside `timeTable.js`


next edit your presets in `slack_presets.json`, this is the different statuses you can use, with emojis and custom text.

now edit `timeTable.json` and set which status you want to use each day and the start and end time of those statuses. Make sure these are in chronoligical order since the script just grabs the first matching one. You can see an example time table in the repo.
