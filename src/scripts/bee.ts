import splitbee from "@splitbee/web";
import { PostgrestError } from "@supabase/supabase-js";

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

export function trackServerIssues(email: string, error: PostgrestError): void {
  splitbee.user.set({ email: email });
  splitbee.user.set({ source: "alekspetrov.com" });

  splitbee.track("Server Error", {
    email: email,
    error: error.message,
  });
}
