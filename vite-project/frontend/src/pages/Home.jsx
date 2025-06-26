import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Clock, TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useTransaction } from "../context/TransactionContext";

function Home() {
  const {transactions} = useTransaction();
  const [stats, setStats] = useState({
    income: 0,
    expenses: 0,
    balance: 0,
    recentTransactions: [],
    trend: { income: 0, expenses: 0 },
  });

  useEffect(() => {
    const stored = transactions || [];

    const income = stored
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expenses = stored
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const balance = income - expenses;

    const recentTransactions = [...stored]
      .sort((a, b) => b.id - a.id)
      .slice(0, 3);

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

    const thisMonthTransactions = stored.filter(
      (t) => new Date(t.id).getMonth() === currentMonth
    );
    const lastMonthTransactions = stored.filter(
      (t) => new Date(t.id).getMonth() === lastMonth
    );

    const trend = {
      income: (
        (thisMonthTransactions
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + Number(t.amount), 0) /
          (lastMonthTransactions
            .filter((t) => t.type === "income")
            .reduce((sum, t) => sum + Number(t.amount), 0) || 1) -
          1) *
        100
      ).toFixed(1),
      expenses: (
        (thisMonthTransactions
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + Number(t.amount), 0) /
          (lastMonthTransactions
            .filter((t) => t.type === "expense")
            .reduce((sum, t) => sum + Number(t.amount), 0) || 1) -
          1) *
        100
      ).toFixed(1),
    };
    setStats({ income, expenses, balance, recentTransactions, trend });
  }, [transactions]);
  return (
    <div className="main-container" style={{ padding: "20px" }}>
      <h1 className="main-heading">Welcome to Finance Tracker 👋</h1>

      <div className="grid-container">
        {/* Balance Card */}
        <Card className="card">
          <CardHeader className="sub-text" style={{ fontWeight: 600 }}>
            Balance
          </CardHeader>
          <CardContent>
            <p
              className="sub-heading-medium"
              style={{ color: stats.balance >= 0 ? "green" : "red" }}
            >
              ₹{stats.balance.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        {/* Income Card */}
        <Card className="card">
          <CardHeader className="sub-container">
            <span className="sub-text" style={{ fontWeight: 600 }}>
              Income
            </span>
            <div className="flex-container" style={{ gap: "8px" }}>
              <span
                className="sub-text-small"
                style={{
                  color: stats.trend.income >= 0 ? "green" : "red",
                  fontWeight: 600,
                }}
              >
                {stats.trend.income > 0 ? "+" : ""}
                {stats.trend.income}%
              </span>
              {stats.trend.income >= 0 ? (
                <TrendingUp
                  className="sub-container-icon-medium"
                  color="green"
                />
              ) : (
                <TrendingDown
                  className="sub-container-icon-medium"
                  color="red"
                />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="sub-heading-medium text-green-500">
              ₹{stats.income.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        {/* Expense Card */}
        <Card className="card">
          <CardHeader className="sub-container">
            <span className="sub-text" style={{ fontWeight: 600 }}>
              Expenses
            </span>
            <div className="flex-container" style={{ gap: "8px" }}>
              <span
                className="sub-text-small"
                style={{
                  color: stats.trend.expenses >= 0 ? "green" : "red",
                  fontWeight: 600,
                }}
              >
                {stats.trend.expenses > 0 ? "+" : ""}
                {stats.trend.expenses}%
              </span>
              {stats.trend.expenses >= 0 ? (
                <TrendingUp
                  className="sub-container-icon-medium"
                  color="green"
                />
              ) : (
                <TrendingDown
                  className="sub-container-icon-medium"
                  color="red"
                />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="sub-heading-medium text-red-500">
              ₹{stats.expenses.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="card">
        <CardHeader>
          <div
            className="flex-container"
            style={{ justifyContent: "space-between" }}
          >
            <h2 className="sub-heading-small">Recent Transactions</h2>
            <Clock className="sub-container-icon-medium text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          {stats.recentTransactions.length === 0 ? (
            <p className="text-muted-foreground">No recent transactions.</p>
          ) : (
            stats.recentTransactions.map((txn) => (
              <div
                key={txn.id}
                className="sub-container p-2 rounded-md hover:bg-gray-50 transition"
              >
                <div>
                  <p className="sub-text" style={{ fontWeight: 600 }}>
                    {txn.description}
                  </p>
                  <p className="text-muted-foreground">
                    {new Date(txn.id).toLocaleDateString()} •{" "}
                    {new Date(txn.id).toLocaleTimeString()}
                  </p>
                </div>
                <div
                  className="sub-text-small"
                  style={{
                    fontWeight: 600,
                    color: txn.type === "expense" ? "red" : "green",
                  }}
                >
                  {txn.type === "expense" ? "-" : "+"}₹
                  {Number(txn.amount).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
