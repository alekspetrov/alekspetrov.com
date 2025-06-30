import { formValidation } from "../utils/formValidation";

// Messages
const MSG_LOADING_TEXT = "Checking your email...";
const MSG_USER_SUBSCRIBED = "Welcome! You've just made my day &hearts;";
const ID_FORM = "js-form";
const ID_FORM_INPUT_EMAIL = "js-form-email";
const ID_FORM_MESSAGE = "js-form-message";
const ERR_MSG_NO_EMAIL = "Please enter your email.";
const ERR_MSG_INVALID_EMAIL = "Is this even an email? Please check.";
const ERR_MSG_USER_EXISTS = "Hey, looks like you're already subscribed!";
const ERR_MSG_SERVER_ERROR =
  "Oh no my server or your internet goes down! You go check the connection, I’ll check the server.";

// Elements
const emailInputElement = document.getElementById(
  ID_FORM_INPUT_EMAIL
) as HTMLFormElement;
const formElement = document.getElementById(ID_FORM);

if (formElement) {
  function showMessage(message: string) {
    document.getElementById(ID_FORM_MESSAGE).innerHTML = message;
  }

  // Validate and submit
  async function onSubmit(e: Event) {
    e.preventDefault();
    showMessage(""); // Clear error message in the form

    if (!emailInputElement.value) {
      showMessage(ERR_MSG_NO_EMAIL);
      emailInputElement.focus();
      return false;
    }

    const isEmailValid = formValidation(emailInputElement.value);

    if (!isEmailValid) {
      showMessage(ERR_MSG_INVALID_EMAIL);
      emailInputElement.focus();
      return false;
    }

    // Loading
    showMessage(MSG_LOADING_TEXT);

    // Try Netlify Forms first (more reliable)
    try {
      const formData = new FormData();
      formData.append('form-name', 'newsletter');
      formData.append('email', emailInputElement.value);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      });

      if (response.ok) {
        showMessage(MSG_USER_SUBSCRIBED);
        emailInputElement.value = "";
        return;
      }
    } catch (error) {
      console.warn('Netlify Forms failed, trying function:', error);
    }

    // Fallback to function if forms fail
    try {
      const response = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailInputElement.value,
        }),
      });

      const result = await response.json();

      if (response.status === 409) {
        showMessage(ERR_MSG_USER_EXISTS);
        return false;
      }

      if (!response.ok) {
        console.error('Function error:', result.error);
        showMessage(ERR_MSG_SERVER_ERROR);
        return false;
      }

      showMessage(MSG_USER_SUBSCRIBED);
      emailInputElement.value = "";
    } catch (error) {
      console.error('Network error:', error);
      showMessage(ERR_MSG_SERVER_ERROR);
      return false;
    }
  }

  // Add listeners
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    onSubmit(e);
  });
}
