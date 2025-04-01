import { getCustomer } from "@/lib/queries/getCustomers";
import { BackButton } from "@/components/BackButton"

import CustomerForm from "@/app/(rs)/customers/form/CustomerForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function generateMetaData({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const customerId = await searchParams

  if(!customerId) return { title: "New Customer" }

  return { title: `Edit Customer ID #${customerId}` }
}

export default async function CustomerFormPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  try {
    // getPermission(): Check if the current user has a permission
    // getPermissions(): Get the current user's permissions
    // isLoading: Check if the client is still loading the user's permissions
    // const permObj = getPermissions()
    // const isAuthorized = !isLoading && permObj.permissions.some(perm => perm === "manager" || perm === "admin")
    const { getPermission } = getKindeServerSession()
    const managerPermission = await getPermission("manager")
    const isManager = managerPermission?.isGranted

    const { customerId } = await searchParams

    // Edit customer form
    if(customerId) {
      const customer = await getCustomer(parseInt(customerId))

      if(!customer) {
        return(
          <>
            <h2 className="text-2xl mb-2">Customer ID #{customerId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }
      // put customer form component
      return <CustomerForm isManager={isManager} customer={customer} />
    } else {
      // new customer form component
      return <CustomerForm isManager={isManager}/>
    }
    
  } catch (error) {
    if(error instanceof Error) {
      throw error
    }
  }
}