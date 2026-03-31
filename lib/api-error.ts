import { NextResponse } from "next/server";
import { ZodError } from "zod";

export interface ApiErrorResponse {
  success: false;
  message: string;
  statusCode: number;
  details?: any;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly details?: any;

  constructor(message: string, statusCode: number = 500, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export function handleApiError(error: unknown): NextResponse<ApiErrorResponse> {
  // Default values for unknown errors
  let statusCode = 500;
  let message = "Internal Server Error";
  let details = undefined;

  // Handle known application errors (AppError)
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    details = error.details;
  }
  // Handle Zod Validation Errors
  else if (error instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    details = error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    })) as any;
  }
  // Handle native Fetch or Network Errors (if thrown internally)
  else if (error instanceof TypeError && error.message.includes("fetch")) {
    statusCode = 503;
    message = "Service Unavailable";
  }
  // Handle standard Error instances
  else if (error instanceof Error) {
    message = error.message;
  }

  // Log error stack securely (only in development)
  if (process.env.NODE_ENV !== "production") {
    console.error(`[API ERROR] ${statusCode} - ${message}`);
    if (error instanceof Error) {
      console.error(error.stack);
    }
    if (details) {
      console.error("Details:", JSON.stringify(details, null, 2));
    }
  }

  return NextResponse.json(
    {
      success: false,
      message,
      statusCode,
      ...(details && { details }),
    },
    { status: statusCode },
  );
}

// Wrapper utility for Next.js Route Handlers
export function withErrorHandler(
  handler: (req: Request, ...args: any[]) => Promise<NextResponse | Response>,
) {
  return async (req: Request, ...args: any[]) => {
    try {
      return await handler(req, ...args);
    } catch (error) {
      return handleApiError(error);
    }
  };
}
