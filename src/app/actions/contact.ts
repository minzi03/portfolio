"use server";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResult {
  success: boolean;
  error?: string;
}

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactResult> {
  // Validate required fields
  if (!data.name || !data.email || !data.message) {
    return { success: false, error: "Name, email, and message are required." };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // Validate message length
  if (data.message.length < 10) {
    return {
      success: false,
      error: "Message must be at least 10 characters long.",
    };
  }

  if (data.message.length > 2000) {
    return {
      success: false,
      error: "Message must be less than 2000 characters.",
    };
  }

  // In production, you would send an email here using:
  // - Resend: https://resend.com/nextjs
  // - SendGrid: https://docs.sendgrid.com/for-developers/sending-email/v3-smtpapi-nodejs
  // - Nodemailer: https://nodemailer.com/
  //
  // Example with Resend:
  // import { Resend } from 'resend';
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'Portfolio <onboarding@resend.dev>',
  //   to: 'your-email@example.com',
  //   subject: `Contact: ${data.subject || 'No subject'}`,
  //   html: `<p>From: ${data.name} (${data.email})</p><p>${data.message}</p>`,
  // });

  // Log the submission for now
  console.log("Contact form submission:", {
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    timestamp: new Date().toISOString(),
  });

  return { success: true };
}
