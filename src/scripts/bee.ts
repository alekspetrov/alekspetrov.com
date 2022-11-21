import splitbee from "@splitbee/web";

splitbee.init({
  scriptUrl: "/bee.js",
  apiUrl: "/_hive",
});

export function trackSubscription(email: string): void {
  splitbee.user.set({ email: email });
  splitbee.user.set({ source: "alekspetrov.com" });

  splitbee.track("Subscribe", {
    email: email,
  });
}

export function trackServerIssues(email: string, error: any): void {
  splitbee.track("Server Error", {
    email: email,
    error: error,
  });
}
