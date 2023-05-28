import { gql, useQuery } from '@apollo/client'
import { PlusCircleIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { MongetSession } from '../../pages/api/auth/[...nextauth]'
import { groupBy } from '../helpers/groupBy'

import { DateTime } from 'luxon'

const ExpensesInMonth = gql`
  query ExampleQuery($userId: String!, $startDate: Date!, $endDate: Date!) {
    expensesInMonth(userId: $userId, startDate: $startDate, endDate: $endDate) {
      expenses {
        id
        userId
        expense
        category
        date
        storeName
        description
      }
    }
  }
`
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const getDays = (year, month) => {
  return new Date(year, month, 0).getDate()
}

const Dashboard = () => {
  const now = new Date()
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getTime()
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getTime()

  const { data: session } = useSession()
  const { data, error, loading, fetchMore } = useQuery(ExpensesInMonth, {
    variables: {
      userId: (session as MongetSession)?.user.uid,
      startDate: firstDay,
      endDate: lastDay,
    },
    pollInterval: 2000,
  })

  const expensesByCategory = useMemo(() => {
    if (!data || !data.expensesInMonth.expenses) {
      return []
    }

    return Object.entries(
      groupBy('category', data?.expensesInMonth.expenses || [])
    ).map(([category, list]) => {
      return {
        name: category,
        value: list.length,
      }
    })
  }, [data?.expensesInMonth.expenses])

  const expensesByDay = useMemo(() => {
    if (!data || !data.expensesInMonth.expenses) {
      return []
    }

    const afterBeginningOfDay = data.expensesInMonth.expenses.map((expense) => {
      const date = DateTime.fromMillis(expense.date).toLocaleString({
        month: 'short',
        day: 'numeric',
      })

      return {
        ...expense,
        date,
      }
    })

    const today = new Date()
    const daysInMonth = getDays(today.getFullYear(), today.getMonth() + 1)
    const monthName = DateTime.fromMillis(today.getTime()).toLocaleString({
      month: 'short',
    })

    const groups = {}
    for (let i = 1; i <= daysInMonth; i++) {
      groups[`${monthName} ${i}`] = 0
    }

    afterBeginningOfDay.forEach((expense) => {
      groups[expense.date] += 1
    })

    return Object.entries(groups).map(([date, count]) => {
      return {
        name: date,
        value: count,
      }
    })
  }, [data?.expensesInMonth.expenses])

  const spendAcrossMonth = useMemo(() => {
    if (!data || !data.expensesInMonth.expenses) {
      return []
    }

    const afterBeginningOfDay: any[] = data.expensesInMonth.expenses.map(
      (expense) => {
        const date = DateTime.fromMillis(expense.date).toLocaleString({
          month: 'short',
          day: 'numeric',
        })

        return {
          ...expense,
          date,
        }
      }
    )

    const today = new Date()
    const daysInMonth = getDays(today.getFullYear(), today.getMonth() + 1)
    const monthName = DateTime.fromMillis(today.getTime()).toLocaleString({
      month: 'short',
    })

    const groups: { [key: string]: number } = {}
    for (let i = 1; i <= daysInMonth; i++) {
      groups[`${monthName} ${i}`] = 0
    }

    afterBeginningOfDay.forEach((expense) => {
      console.log(expense.expense)
      groups[expense.date] += expense.expense
    })

    const groupsArray = Object.entries(groups)

    groupsArray.forEach(([_, expense], index) => {
      if (index === 0) {
        return
      }

      groupsArray[index][1] += groupsArray[index - 1][1]
    })

    return groupsArray.map(([date, count]) => {
      return {
        name: date,
        value: count,
      }
    })
  }, [data?.expensesInMonth.expenses])

  if (!data) {
    return <>'Loading'</>
  }

  console.log(spendAcrossMonth)

  return (
    <div className="flex flex-col w-full h-full p-4 pr-8 text-gray-800 font-josefin">
      <div className="flex justify-between items-center h-16 pt-6">
        <div className="font-bold text-[40px]">Your Dashboard</div>
        <div>
          Showing for <span className="font-bold">1 Apr - 5 Apr 2022</span>
        </div>
      </div>
      <div className="flex w-fit-content h-[6rem] bg-white bg-opacity-50 rounded-[1rem] p-2 mt-4">
        <Link href={'/expenses/new'}>
          <div className="flex flex-col items-center justify-center px-4 py-2 hover:bg-[#424242] hover:bg-opacity-20 rounded-[1rem] cursor-pointer transition-all duration-200 ease-in-out">
            <PlusCircleIcon width={25} height={25} />
            Add New Expense
          </div>
        </Link>
      </div>
      <div>
        <PieChart width={200} height={200}>
          <Pie
            data={expensesByCategory}
            innerRadius={40}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
          >
            {expensesByCategory.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            content={({ payload }) => {
              if (!payload || !payload[0]) {
                return <></>
              }

              return (
                <div className="flex items-center justify-center p-1 rounded-md bg-white">
                  {payload[0].name}
                </div>
              )
            }}
          />
        </PieChart>
      </div>
      <div>
        <BarChart width={600} height={400} data={expensesByDay}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar type="monotone" dataKey="value" fill="#82ca9d" />
        </BarChart>
      </div>
      <div>
        <LineChart width={600} height={400} data={spendAcrossMonth}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line dataKey="value" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  )
}

export default Dashboard
