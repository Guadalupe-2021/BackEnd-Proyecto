// express.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any;  // 'any' is a placeholder, you can replace it with a more specific type if needed
    }
  }
}