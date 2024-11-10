import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);
const fromEmail = process.env.FROM_EMAIL as string;

interface RequestBody {
  email: string;
  subject: string;
  message: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { email, subject, message }: RequestBody = await req.json();
    console.log(email, subject, message);

    const data = await resend.emails.send({
      from: fromEmail,
      to: [fromEmail, email],
      subject: subject,
      react: (
        <>
          <h1>{subject}</h1>
          <p>Thank you for contacting us!</p>
          <p>New message submitted:</p>
          <p>{message}</p>
        </>
      ),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}
