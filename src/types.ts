/**
 * Represents a validation state of an input element.
 * https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
 *
 * @param badInput A boolean value that is true if the user has provided input that the browser is unable to convert.
 * @param customError A boolean value indicating whether the element's custom validity message has been set to a non-empty string by calling the element's setCustomValidity() method.
 * @param patternMismatch A boolean value that is true if the value does not match the specified pattern, and false if it does match. If true, the element matches the :invalid CSS pseudo-class.
 * @param rangeOverflow A boolean value that is true if the value is greater than the maximum specified by the max attribute, or false if it is less than or equal to the maximum. If true, the element matches the :invalid and :out-of-range and CSS pseudo-classes.
 * @param rangeUnderflow A boolean value that is true if the value is less than the minimum specified by the min attribute, or false if it is greater than or equal to the minimum. If true, the element matches the :invalid and :out-of-range CSS pseudo-classes.
 * @param stepMismatch A boolean value that is true if the value does not fit the rules determined by the step attribute (that is, it's not evenly divisible by the step value), or false if it does fit the step rule. If true, the element matches the :invalid and :out-of-range CSS pseudo-classes.
 * @param tooLong A boolean value that is true if the value exceeds the specified maxlength for HTMLInputElement or HTMLTextAreaElement objects, or false if its length is less than or equal to the maximum length. Note: This property is never true in Gecko, because elements' values are prevented from being longer than maxlength. If true, the element matches the :invalid and :out-of-range CSS pseudo-classes.
 * @param tooShort A boolean value that is true if the value fails to meet the specified minlength for HTMLInputElement or HTMLTextAreaElement objects, or false if its length is greater than or equal to the minimum length. If true, the element matches the :invalid and :out-of-range CSS pseudo-classes.
 * @param typeMismatch A boolean value that is true if the value is not in the required syntax (when type is email or url), or false if the syntax is correct. If true, the element matches the :invalid CSS pseudo-class.
 * @param valid A boolean value that is true if the element meets all its validation constraints, and is therefore considered to be valid, or false if it fails any constraint. If true, the element matches the :valid CSS pseudo-class; the :invalid CSS pseudo-class otherwise.
 * @param valueMissing A boolean value that is true if the element has a required attribute, but no value, or false otherwise. If true, the element matches the :invalid CSS pseudo-class.
 */
export type ValidityState =
  | "badInput"
  | "customError"
  | "patternMismatch"
  | "rangeOverflow"
  | "rangeUnderflow"
  | "stepMismatch"
  | "tooLong"
  | "tooShort"
  | "typeMismatch"
  | "valid"
  | "valueMissing";

export enum Sort {
  Desc = "Desc",
  Asc = "Asc",
  NameDesc = "NameDesc",
  NameAsc = "NameAsc",
}
