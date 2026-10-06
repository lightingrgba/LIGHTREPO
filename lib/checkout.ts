// Payment link customers are sent to from every "Buy" / checkout button.
// Set NEXT_PUBLIC_CHECKOUT_URL to the new store's payment link; while it's
// unset the buttons stay on the page instead of leaving the site.
export const CHECKOUT_URL = process.env.NEXT_PUBLIC_CHECKOUT_URL ?? ""
