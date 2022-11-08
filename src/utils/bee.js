import splitbee from '@splitbee/web';

splitbee.init({
  scriptUrl: "/bee.js",
  apiUrl: "/_hive",
})

export function trackSubscription (email) {
  splitbee.user.set({
    email: email
  })

  splitbee.track("Click Subscribe")
}