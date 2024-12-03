// Basic API error response
export interface ApiErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

// Validation error response with field errors
export interface ValidationErrorResponse {
  status: number;
  error: string;
  message: string;
  path: string;
  fieldErrors: FieldError[];
}

export interface FieldError {
  field: string;
  message: string;
}
