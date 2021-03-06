import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getFormattedDate } from "../../util/date";

import { Styles } from "../../constants/styles";

export default function ExpenseItem({ id, description, amount, date }) {
	const navigation = useNavigation();

	function expensePressHandler() {
		navigation.navigate("ManageExpense", {
			expenseId: id,
		});
	}

	return (
		<Pressable
			style={({ pressed }) => pressed && styles.pressed}
			onPress={expensePressHandler}
		>
			<View style={styles.expenseItem}>
				<View>
					<Text style={[styles.textBase, styles.description]}>
						{description}
					</Text>
					<Text style={styles.textBase}>{date.toDateString()}</Text>
				</View>
				<View style={styles.amountContainer}>
					<Text style={styles.amount}>{amount.toFixed(2)}</Text>
				</View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	expenseItem: {
		padding: 12,
		marginVertical: 8,
		backgroundColor: Styles.colors.primary500,
		flexDirection: "row",
		justifyContent: "space-between",
		borderRadius: 6,
		elevation: 3,
		shadowColor: Styles.colors.gray500,
		shadowRadius: 4,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.4,
	},
	textBase: {
		color: Styles.colors.primary50,
	},
	description: {
		fontSize: 16,
		marginBottom: 4,
		fontWeight: "bold",
	},
	amountContainer: {
		paddingHorizontal: 12,
		paddingVertical: 4,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 4,
		minWidth: 80,
	},
	amount: {
		color: Styles.colors.primary500,
		fontWeight: "bold",
	},
	pressed: {
		opacity: 0.5,
	},
});
