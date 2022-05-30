import { useContext, useEffect } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

export default function RecentExpenses() {
	const expensesCtx = useContext(ExpensesContext);

	useEffect(() => {
		async function getExpenses() {
			const expenses = await fetchExpenses();
			expensesCtx.setExpenses(expenses);
		}

		getExpenses();
	}, []);

	const recentExpenses = expensesCtx.expenses.filter((expense) => {
		const today = new Date();
		const weekAgo = getDateMinusDays(today, 7);

		return expense.date >= weekAgo && expense.date <= today;
	});

	return (
		<ExpensesOutput
			expenses={recentExpenses}
			expensesPeriod="Last 7 Days"
			fallbackText="No expenses registered for the last 7 days."
		/>
	);
}
