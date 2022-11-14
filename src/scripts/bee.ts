import splitbee from "@splitbee/web";

splitbee.init({
  scriptUrl: "/bee.js",
  apiUrl: "/_hive",
});

export function trackSubscription(email) {
  splitbee.track("Subscribe", {
    email: email,
  });
}

export function trackServerIssues(email, error) {
  splitbee.track("Server Error", { email: email, error: error });
}
