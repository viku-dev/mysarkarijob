import { Alert } from "@/components/common/Alert";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Card } from "@/components/common/Card";
import { Container } from "@/components/layout/Container";
export default function AdminLoginPage() { return <Container className="grid min-h-[70vh] place-items-center py-10"><Card className="w-full max-w-md"><h1 className="text-2xl font-bold">Admin Login</h1><Alert><strong>Phase 2 foundation:</strong> Firebase Auth utilities are prepared. Full protected auth flow and role verification will be completed in Phase 3.</Alert><form className="mt-5 grid gap-4"><label className="grid gap-2 text-sm font-semibold">Email<Input type="email" placeholder="admin@example.com" disabled /></label><label className="grid gap-2 text-sm font-semibold">Password<Input type="password" placeholder="••••••••" disabled /></label><Button disabled type="button">Login foundation only</Button></form></Card></Container>; }
