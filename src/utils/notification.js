import { Notification } from 'rsuite';


/**
 * @param funcName = info|success|warning|error
 * @param description
 */
export function showSimpleNotification (funcName, description) {
  Notification[funcName]({
    title: funcName.toUpperCase(),
    description
  });
}

/**
 * @param title
 * @param jsxDescription = React.Node
 */
export function showCustomNotification (title, jsxDescription) {
  Notification.open({
    title,
    duration: 10000,
    description: jsxDescription
  });
}