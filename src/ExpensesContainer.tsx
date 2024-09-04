import * as React from 'react';
import axios, { AxiosResponse } from 'axios';

export interface IExpense {
    id: number;
    merchant: string;
    amount: number;
    description: string;
    category: string;
    date: string;
    status: string;
}

export const ExpensesContainer: React.FC = () => {
    const [expenses, setExpenses] = React.useState<IExpense[]>([]);

    React.useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const res: AxiosResponse = await axios.get(
                    "https://expenses-backend-mu.vercel.app/expenses", {
                        headers: {
                            "Content-Type": "application/json",
                            Username: "liberty.sprackling"   
                        }
                    })
                const resData: IExpense[] = res.data;
                setExpenses(resData);
            }
            catch (error) {
                if (axios.isAxiosError(error)){
                    console.error(error.message);
                } else {
                    console.error("There was a problem fetching the data");
                }

            }
        }
        fetchExpenses();
    }, []);

    return (<>
    
        <h1>Expenses</h1>
        <table>
        <thead>
            <th>Date</th>
            <th>Merchant</th>
            <th>Amount</th>
            <th>Category</th>
        </thead>
        <tbody>
            {expenses.map((expense: IExpense): React.ReactNode => {
                return (
                    <tr key={expense.id}>
                    <td>{expense.date}</td>
                    <td>{expense.merchant}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.category}</td>
                </tr>
                )
            })}


    
        </tbody>
    </table>
    </>
    )
}

export default ExpensesContainer;