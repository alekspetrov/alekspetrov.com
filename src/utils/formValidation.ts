export const emailValidator = (email: string): boolean => {
  let regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export enum ValidatorTypes {
  email = "email",
}

export const formValidation = (value: string): boolean => {
  // Now works only with emails, there is no other form on the site.
  return emailValidator(value);
};
