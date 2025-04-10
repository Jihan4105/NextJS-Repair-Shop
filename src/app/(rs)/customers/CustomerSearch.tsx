import Form from "next/form"
import { Input } from "@/components/ui/input"
import SearchButton from "@/components/SearchButton"

export default function CustomerSearch() {
  return (
    <Form
      action="/customers"
      className="flex gap-2 itmes-center"
    >
      <Input 
        name="searchText"
        type="text"
        placeholder="Search customers"
        className="w-full"
        autoFocus
      />
      <SearchButton />
    </Form>
  )
}