// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { useEffect, useState } from "react";
// import { Clock, TrendingUp, TrendingDown } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useTransaction } from "../context/TransactionContext";

// function Home() {
//   const {transactions} = useTransaction();
//   const [stats, setStats] = useState({
//     income: 0,
//     expenses: 0,
//     balance: 0,
//     recentTransactions: [],
//     trend: { income: 0, expenses: 0 },
//   });

//   useEffect(() => {
//     const stored = transactions || [];

//     const income = stored
//       .filter((t) => t.type === "income")
//       .reduce((sum, t) => sum + Number(t.amount), 0);

//     const expenses = stored
//       .filter((t) => t.type === "expense")
//       .reduce((sum, t) => sum + Number(t.amount), 0);

//     const balance = income - expenses;

//     const recentTransactions = [...stored]
//       .sort((a, b) => b.id - a.id)
//       .slice(0, 3);

//     const currentDate = new Date();
//     const currentMonth = currentDate.getMonth();
//     const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

//     const thisMonthTransactions = stored.filter(
//       (t) => new Date(t.id).getMonth() === currentMonth
//     );
//     const lastMonthTransactions = stored.filter(
//       (t) => new Date(t.id).getMonth() === lastMonth
//     );

//     const trend = {
//       income: (
//         (thisMonthTransactions
//           .filter((t) => t.type === "income")
//           .reduce((sum, t) => sum + Number(t.amount), 0) /
//           (lastMonthTransactions
//             .filter((t) => t.type === "income")
//             .reduce((sum, t) => sum + Number(t.amount), 0) || 1) -
//           1) *
//         100
//       ).toFixed(1),
//       expenses: (
//         (thisMonthTransactions
//           .filter((t) => t.type === "expense")
//           .reduce((sum, t) => sum + Number(t.amount), 0) /
//           (lastMonthTransactions
//             .filter((t) => t.type === "expense")
//             .reduce((sum, t) => sum + Number(t.amount), 0) || 1) -
//           1) *
//         100
//       ).toFixed(1),
//     };
//     setStats({ income, expenses, balance, recentTransactions, trend });
//   }, [transactions]);
//   return (
//     <div className="main-container" style={{ padding: "20px" }}>
//       <h1 className="main-heading">Welcome to Finance Tracker 👋</h1>

//       <div className="grid-container">
//         {/* Balance Card */}
//         <Card className="card">
//           <CardHeader className="sub-text" style={{ fontWeight: 600 }}>
//             Balance
//           </CardHeader>
//           <CardContent>
//             <p
//               className="sub-heading-medium"
//               style={{ color: stats.balance >= 0 ? "green" : "red" }}
//             >
//               ₹{stats.balance.toLocaleString()}
//             </p>
//           </CardContent>
//         </Card>

//         {/* Income Card */}
//         <Card className="card">
//           <CardHeader className="sub-container">
//             <span className="sub-text" style={{ fontWeight: 600 }}>
//               Income
//             </span>
//             <div className="flex-container" style={{ gap: "8px" }}>
//               <span
//                 className="sub-text-small"
//                 style={{
//                   color: stats.trend.income >= 0 ? "green" : "red",
//                   fontWeight: 600,
//                 }}
//               >
//                 {stats.trend.income > 0 ? "+" : ""}
//                 {stats.trend.income}%
//               </span>
//               {stats.trend.income >= 0 ? (
//                 <TrendingUp
//                   className="sub-container-icon-medium"
//                   color="green"
//                 />
//               ) : (
//                 <TrendingDown
//                   className="sub-container-icon-medium"
//                   color="red"
//                 />
//               )}
//             </div>
//           </CardHeader>
//           <CardContent>
//             <p className="sub-heading-medium text-green-500">
//               ₹{stats.income.toLocaleString()}
//             </p>
//           </CardContent>
//         </Card>

//         {/* Expense Card */}
//         <Card className="card">
//           <CardHeader className="sub-container">
//             <span className="sub-text" style={{ fontWeight: 600 }}>
//               Expenses
//             </span>
//             <div className="flex-container" style={{ gap: "8px" }}>
//               <span
//                 className="sub-text-small"
//                 style={{
//                   color: stats.trend.expenses >= 0 ? "green" : "red",
//                   fontWeight: 600,
//                 }}
//               >
//                 {stats.trend.expenses > 0 ? "+" : ""}
//                 {stats.trend.expenses}%
//               </span>
//               {stats.trend.expenses >= 0 ? (
//                 <TrendingUp
//                   className="sub-container-icon-medium"
//                   color="green"
//                 />
//               ) : (
//                 <TrendingDown
//                   className="sub-container-icon-medium"
//                   color="red"
//                 />
//               )}
//             </div>
//           </CardHeader>
//           <CardContent>
//             <p className="sub-heading-medium text-red-500">
//               ₹{stats.expenses.toLocaleString()}
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Transactions */}
//       <Card className="card">
//         <CardHeader>
//           <div
//             className="flex-container"
//             style={{ justifyContent: "space-between" }}
//           >
//             <h2 className="sub-heading-small">Recent Transactions</h2>
//             <Clock className="sub-container-icon-medium text-muted-foreground" />
//           </div>
//         </CardHeader>
//         <CardContent>
//           {stats.recentTransactions.length === 0 ? (
//             <p className="text-muted-foreground">No recent transactions.</p>
//           ) : (
//             stats.recentTransactions.map((txn) => (
//               <div
//                 key={txn.id}
//                 className="sub-container p-2 rounded-md hover:bg-gray-50 transition"
//               >
//                 <div>
//                   <p className="sub-text" style={{ fontWeight: 600 }}>
//                     {txn.description}
//                   </p>
//                   <p className="text-muted-foreground">
//                     {new Date(txn.id).toLocaleDateString()} •{" "}
//                     {new Date(txn.id).toLocaleTimeString()}
//                   </p>
//                 </div>
//                 <div
//                   className="sub-text-small"
//                   style={{
//                     fontWeight: 600,
//                     color: txn.type === "expense" ? "red" : "green",
//                   }}
//                 >
//                   {txn.type === "expense" ? "-" : "+"}₹
//                   {Number(txn.amount).toLocaleString()}
//                 </div>
//               </div>
//             ))
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default Home;
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  PlusCircle,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

function Home({ transactions }) {
const safeTransactions = transactions || [];
const stats = safeTransactions.reduce(
    (acc, item) => {
      const amount = Number(item.amount);
      if (item.type === "expense") {
        acc.expenses += amount;
      } else {
        acc.income += amount;
      }
      acc.total = acc.income - acc.expenses;
      return acc;
    },
    { total: 0, income: 0, expenses: 0 }
  );

  const recentTransactions = safeTransactions
    .slice()
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  return (
    <div className="main-container" style={{ padding: "20px" }}>
      <Card className="card">
        <CardHeader>
          <h1 className="sub-heading-large">Welcome to Your Finance Tracker</h1>
          <p className="sub-text">
            Take control of your finances with our easy-to-use tracking tools
          </p>
        </CardHeader>
        <CardContent className="grid-container">
          <Card>
            <CardContent className="pt-6">
              <div className="sub-container">
                <div>
                  <p className="sub-heading-small">Total Balance</p>
                  <p
                    className="sub-heading-medium"
                    style={
                      stats.total >= 0 ? { color: "green" } : { color: "red" }
                    }
                  >
                    ${stats.total.toLocaleString()}
                  </p>
                </div>
                <TrendingUp
                  className="sub-container-icon-large"
                  style={{ color: "#666" }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="sub-container">
                <div>
                  <p className="sub-heading-small">Total Income</p>
                  <p className="sub-heading-medium" style={{ color: "green" }}>
                    ${stats.income.toLocaleString()}
                  </p>
                </div>
                <ArrowUpCircle
                  className="sub-container-icon"
                  style={{ color: "green" }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="sub-container">
                <div>
                  <p className="sub-heading-small">Total Expenses</p>
                  <p className="sub-heading-medium" style={{ color: "red" }}>
                    ${stats.expenses.toLocaleString()}
                  </p>
                </div>
                <ArrowDownCircle
                  className="sub-container-icon"
                  style={{ color: "red" }}
                />
              </div>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter>
          <Link to="/transactions">
            <Button>
              <PlusCircle className="sub-container-icon-large" />
              Add New Transaction
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <Card className="card">
        <CardHeader>
          <h2 className="sub-heading-medium">Recent Transactions</h2>
        </CardHeader>
        <CardContent>
          {recentTransactions.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No transactions yet. Start by adding your first transaction!
            </p>
          ) : (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="sub-container recent-transactions-card"
                >
                  <div>
                    <p
                      className="font-medium"
                      style={{
                        fontWeight: "500",
                      }}
                    >
                      {transaction.description}
                    </p>
                    <p
                      style={{
                        color: "#666",
                        fontWeight: "400",
                      }}
                    >
                      {new Date(transaction.id).toLocaleDateString()}
                    </p>
                  </div>
                  <p
                    style={{
                      color: transaction.type === "expense" ? "red" : "green",
                      fontWeight: "bold",
                    }}
                  >
                    {transaction.type === "expense" ? "-" : "+"}$
                    {Number(transaction.amount).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Link to="/transactions" className="w-full">
            <Button variant="outline" className="w-full">
              View All Transactions
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Home;
