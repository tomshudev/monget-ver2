const Expense = ({ expense }) => {
  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-md bg-white bg-opacity-50 w-[12rem]">
      <div className="font-bold">₪{expense.expense}</div>
      <div className="font-thin">
        {expense.description || 'No description available'}
      </div>
      <div className="italic">@{expense.storeName}</div>
      <div className="text-[10px]">{expense.date}</div>
    </div>
  )
}

export default Expense
