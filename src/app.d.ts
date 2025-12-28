import { Database } from './DatabaseDefinitions'

declare global {
	namespace App {
    interface Locals {
			session: Session | null
      cookieConsent: string | null
    }
    interface PageData {
      session: Session | null
    }
	}
}

export {};

