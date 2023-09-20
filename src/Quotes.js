import { useState, useEffect } from 'react';
import { getQuotes } from './db.js';

export default function Quotes() {
	const [quotesList, setQuotesList] = useState([]);

	useEffect(() => {
		async function fetchQuotes() {
			const quotes = await getQuotes()
			const quoteslist = []
			quotes.forEach((quote) => {
				quoteslist.push(quote["quote"])
			})
			setQuotesList(quoteslist)
		}
		fetchQuotes()
		
	}, []);

	return (
		<div>
			<p>{quotesList[Math.floor(Math.random() * quotesList.length)]}</p>
		</div>
	)
}