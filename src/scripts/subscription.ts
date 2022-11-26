import { formValidation } from "../utils/formValidation";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_PUBLIC_KEY, SUPABASE_PUBLIC_URL } from "../config";
import { trackServerIssues, trackSubscription } from "../scripts/bee";

// Messages
const MSG_LOADING_TEXT = "Checking your email...";
const MSG_USER_SUBSCRIBED = "Welcome! You just made my day &hearts;";
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
  const supabase = createClient(SUPABASE_PUBLIC_URL, SUPABASE_PUBLIC_KEY);

  function showMessage(message) {
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

    const { error, status } = await supabase.from("subscribers").insert([
      {
        email: emailInputElement.value,
      },
    ]);

    if (status === 409) {
      showMessage(ERR_MSG_USER_EXISTS);
      return false;
    }

    if (error) {
      showMessage(ERR_MSG_SERVER_ERROR);
      trackServerIssues(emailInputElement.value, error);
      return false;
    }

    trackSubscription(emailInputElement.value);
    showMessage(MSG_USER_SUBSCRIBED);
  }

  // Add listeners
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    onSubmit(e);
  });
}
