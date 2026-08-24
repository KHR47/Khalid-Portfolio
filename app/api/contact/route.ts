import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function makeHtml(name: string, email: string, message: string) {
  return `
    <h2>New portfolio enquiry</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br />')}</p>
  `;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim();
    const message = String(body.message ?? '').trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    const recipient = process.env.CONTACT_TO_EMAIL || 'hasankhalid16648@gmail.com';
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

    // Primary path: Resend (fast, recommended)
    if (resend) {
      const data = await resend.emails.send({
        from: fromAddress,
        to: [recipient],
        replyTo: email,
        subject: `Portfolio contact from ${name}`,
        html: makeHtml(name, email, message),
      });

      const emailId = data && 'id' in data && typeof data.id === 'string' ? data.id : null;
      return NextResponse.json({ success: true, id: emailId });
    }

    // Fallback: SMTP via nodemailer (if SMTP env vars provided)
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpPort && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // true for 465, false for other ports
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: fromAddress,
        to: recipient,
        replyTo: email,
        subject: `Portfolio contact from ${name}`,
        html: makeHtml(name, email, message),
      });

      // nodemailer returns messageId
      return NextResponse.json({ success: true, id: info.messageId || null, transport: 'smtp' });
    }

    // Demo fallback if no sending method configured
    console.log('CONTACT_EMAIL_DEMO', { name, email, recipient, message });
    return NextResponse.json({ success: true, demo: true });
  } catch (error) {
    console.error('CONTACT_FORM_ERROR', error);
    return NextResponse.json({ error: 'Something went wrong while sending the email.' }, { status: 500 });
  }
}
