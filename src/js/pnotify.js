import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

function errorNotification(text) {
  error({
    text: text,
  });
}

export default errorNotification;
