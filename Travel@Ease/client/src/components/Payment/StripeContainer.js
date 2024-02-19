import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51OeoqbGYbYa5wlIIS5SNnhCn7HbD7bjLqJRrnh6nT5pK3RcqBPqagoGuvuf7M8uJU0Fkcbo9NTadwz5RBz2kvehd00S9NbXus3"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}