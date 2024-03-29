import { gql, useMutation } from '@apollo/client'
// import { Category } from '@prisma/client'
import { Field, Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Bars } from 'react-loader-spinner'
import Input from '../../components/Input/Input'
import { MongetSession } from '../api/auth/[...nextauth]'
import DatePickerField from './DatePickerField'

const CreateExpense = gql`
  mutation (
    $userId: String!
    $expense: Float!
    $storeName: String!
    $category: String!
    $date: Date!
    $description: String
  ) {
    createExpense(
      userId: $userId
      expense: $expense
      storeName: $storeName
      category: $category
      date: $date
      description: $description
    ) {
      id
    }
  }
`

// const Categories = Object.values(Category).map((v) => ({
//   value: v,
//   label: v,
// }))

const NewExpense = () => {
  const [mutate, { loading, reset, data }] = useMutation(CreateExpense)
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div className="flex flex-col py-6 gap-y-4 text-[#424242]">
      <div className="text-3xl">Add New Expense</div>
      <Formik
        initialValues={{
          expense: 0,
          storeName: '',
          category: 'RENT',
          description: '',
          date: new Date(),
        }}
        onSubmit={(values) => {
          mutate({
            variables: {
              userId: (session as MongetSession)?.user.uid,
              ...values,
            },
          }).then((result) => {
            if (!result.errors) {
              reset()
              setTimeout(() => {
                router.push('/dashboard')
              }, 3000)
            }
          })
        }}
      >
        <Form>
          <div className="flex flex-col gap-y-2">
            <Field
              as={Input}
              type="number"
              name="expense"
              placeholder="The amount of the expense"
              outlineColor="#38A3A5"
            />
            {/* <Field as="select" name="category" className="rounded-[0.5rem] p-2">
              {Categories.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              ))}
            </Field> */}
            <Field
              as={Input}
              type="textfield"
              name="storeName"
              outlineColor="#38A3A5"
              placeholder="The name of the store or retailer"
            />
            <Field
              as="textarea"
              name="description"
              placeholder="Short description for this expense"
              className="rounded-[0.5rem] p-2"
            />
            <DatePickerField name="date" />

            <div className="flex items-center px-4">
              <button
                type="submit"
                disabled={loading}
                className="w-fit h-fit p-2 bg-green-200 rounded-[0.5rem] hover:bg-green-300 transition-all duration-150 ease-in-out"
              >
                Create expense
              </button>
              {loading && (
                <Bars
                  height="30"
                  width="100"
                  color="rgb(134, 239, 172)"
                  ariaLabel="loading-indicator"
                />
              )}
              {!loading && data && <>Saved successfully!</>}
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default NewExpense
