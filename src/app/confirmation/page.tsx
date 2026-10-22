import { redirect } from "next/navigation";

export default function ConfirmationPage() {
  redirect("/appointment-confirmed");
}
