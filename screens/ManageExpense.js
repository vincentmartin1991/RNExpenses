import { useLayoutEffect, useContext } from "react";
import { View, StyleSheet, TextInput } from "react-native";

import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { ExpensesContext } from "../store/expenses-context";
import { Styles } from "../constants/styles";

export default function ManageExpense({ route, navigation }) {
	const expensesCtx = useContext(ExpensesContext);
	const editedExpenseId = route.params?.expenseId;
	const isEditing = !!editedExpenseId;

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? "Edit Expense" : "Add Expense",
		});
	}, [navigation, isEditing]);

	function deleteExpenseHandler() {
		expensesCtx.deleteExpense(editedExpenseId);
		navigation.goBack();
	}

	function confirmHandler() {
		if (isEditing) {
			expensesCtx.updateExpense(editedExpenseId, {
				description: "Test",
				amount: 99.99,
				date: new Date("2022/05/25"),
			});
		} else {
			expensesCtx.addExpense({
				description: "Test2",
				amount: 19.99,
				date: new Date("2022/05/23"),
			});
		}
		navigation.goBack();
	}

	function cancelHandler() {
		navigation.goBack();
	}

	return (
		<View style={styles.container}>
			<TextInput />
			<View style={styles.buttons}>
				<Button mode="flat" onPress={cancelHandler} style={styles.button}>
					Cancel
				</Button>
				<Button onPress={confirmHandler} style={styles.button}>
					{isEditing ? "Update" : "Add"}
				</Button>
			</View>
			{isEditing && (
				<View style={styles.deleteContainer}>
					<IconButton
						icon="trash"
						color={Styles.colors.error500}
						size={36}
						onPress={deleteExpenseHandler}
					/>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: Styles.colors.primary800,
	},
	buttons: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		minWidth: 120,
		marginHorizontal: 8,
	},
	deleteContainer: {
		marginTop: 16,
		padding: 8,
		borderTopWidth: 2,
		borderTopColor: Styles.colors.primary200,
		alignItems: "center",
	},
});
