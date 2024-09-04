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

interface IExpenses {
    expense: IExpense
}

export const ExpensesContainer: React.FC = () => {
    const [expenses, setExpenses] = React.useState<IExpenses[]>([]);

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
                const resData: IExpenses[] = res.data;
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
    }, [])


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
            {expenses.map((item) => (
                <tr>{item.date}</tr>
            ))}
        </tbody>
    </table>
    </>
    )
}

export default ExpensesContainer;