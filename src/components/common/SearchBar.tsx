import { Button } from "./Button";
import { Input } from "./Input";
export function SearchBar({ placeholder = "Search jobs, exams, organizations..." }: { placeholder?: string }) { return <form action="/search" className="flex w-full flex-col gap-3 sm:flex-row"><label className="sr-only" htmlFor="site-search">Search</label><Input id="site-search" name="q" placeholder={placeholder} /><Button type="submit" className="sm:w-32">Search</Button></form>; }
