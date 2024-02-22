import React from "react";
import Badge from "../components/badge";
import useKraken from "../hooks/useKraken";
import { getTotalBalance } from "../libs/krakenReader";
import moment from "moment";

export default function TransactionList() {
  const { sumTransactions } = useKraken();

  const totalBalance = getTotalBalance(sumTransactions);

  return (
    <div className="flex flex-col items-center w-full px-20 mt-20">
      <div className="flex items-center pb-8">
        <Badge
          color="green"
          title={`Total Buy: ${totalBalance.totalBuy.toFixed(
            2
          )} - Total Sell: ${totalBalance.totalSell.toFixed(2)}`}
          className="text-3xl"
        >
          {(totalBalance.totalSell - totalBalance.totalBuy).toFixed(2)}
        </Badge>
      </div>
      <div className="flex w-full pb-8">
        <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th>Pair</th>
              <th>Type</th>
              <th>Date</th>
              <th>Volume</th>
              <th>Fee</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {sumTransactions.map((transaction, i) => {
              return (
                <tr
                  key={i}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td>{transaction.pair}</td>
                  <td>
                    <Badge
                      color={transaction.type === "buy" ? "green" : "red"}
                      className="text-xs"
                    >
                      {transaction.type}
                    </Badge>
                  </td>
                  <td
                    title={`from: ${moment(transaction.startTime).format(
                      "DD/MM/yyyy hh:mm:ss"
                    )} - to: ${moment(transaction.endTime).format(
                      "DD/MM/yyyy hh:mm:ss"
                    )}`}
                  >
                    {moment(transaction.startTime).format("DD/MM/yyyy")}
                  </td>
                  <td title={transaction.totalVolume.toString()}>
                    {transaction.totalVolume.toFixed(2)}
                  </td>
                  <td title={transaction.totalFee.toString()}>
                    {transaction.totalFee.toFixed(2)}
                  </td>
                  <td title={transaction.totalCost.toString()}>
                    {transaction.totalCost.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
