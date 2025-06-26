//The function checks if the input is valid using the schema, and returns either the valid data or a list of errors.

export function validateInput(schema: any, input: any) {
  const result = schema.safeParse(input);  //Tries to validate the input using the schema.

  //f the input is valid, it returns success: true
  if (result.success) {
    return { success: true, data: result.data };
  }

  //If the input is not valid, it returns success: false &  the list of validation errors
  
  else {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors
    };
  }
}
