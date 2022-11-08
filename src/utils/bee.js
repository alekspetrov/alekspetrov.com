import splitbee from '@splitbee/web';

splitbee.init({
  scriptUrl: "/bee.js",
  apiUrl: "/_hive",
})

export function trackSubscription (email) {
  splitbee.track("Click Subscribe")

  splitbee.user.set({
    email: email
  })
}