import chabokpush from "chabokpush";

const auth = {
  appId: "shopp",
  webKey: "d9a2adc20c0ec778c90d6a7c82d29868f9a86ed5",
  username: "sH0P+Ch@BoK",
  password: "chABoK+$HopP",
  devMode: false
};
const options = {
  webpush: {
    enabled: true,
    publicKey:
      "BOq3XaEZEAG6cqotZ9HLhjjL3AYnknAYlZJlBgiKd5JSUmRLT4CFcXuYUzr2A9ExVcj4_yugWdoov0jRqMZDzHE"
  },
  realTime: false,
  silent: false,
  serviceWorker: {
    path: "../../ChabokSDKWorker.js",
    scope: "/"
  }
};

const chabok = new chabokpush.Chabok(auth, options);
chabok.on("registered", deviceId => console.log("DeviceId ", deviceId));

chabok.on("connected", _ => {
  chabok.subscribe("important"); // subscribe to important channel
  chabok.subscribeEvent("geo"); // subscribe to geo events
});

chabok.on("message", msg => console.log("Message ", msg));
chabok.on("geo", geoEvent => console.log("Geo Event ", geoEvent));

chabok.on("connecting", _ => console.log("Reconnecting"));
chabok.on("disconnected", _ => console.log("offline"));
chabok.on("closed", _ => console.log("disconnected"));


export default chabok;
