
const notify = (title, message, onclick) => {
    const notification = new Notification(title, {
        body: message
      })
      notification.onclick = onclick
      return notification;
}

export default {
    notify
}