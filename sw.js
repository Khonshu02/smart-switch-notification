
self.addEventListener("push", (event) => {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = {
      title: "IoT Smart Switch",
      body: event.data ? event.data.text() : "A switch event occurred."
    };
  }

  const title = data.title || "IoT Smart Switch";

  const options = {
    body: data.body || "Your smart switch status has changed.",
    icon: "./icon.png",
    data: {
      url: data.url || "./"
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url || "./")
  );
});
