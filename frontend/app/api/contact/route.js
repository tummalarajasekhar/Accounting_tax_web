import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      name, email, phone, message, 
      country, pincode, state, referral 
    } = body;

    // Create the Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // Construct the Email
    const mailOptions = {
      from: process.env.EMAIL_SERVER_USER,
      to: process.env.EMAIL_TO_ADDRESS,
      replyTo: email,
      subject: `[Tax Inquiry] ${country} - ${name}`,
      text: `
        New Tax Callback Request:
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Location: ${state}, ${pincode} (${country})
        Referral Code: ${referral || 'None'}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #dc2626;">New Tax Callback Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Location:</strong> ${state}, ${pincode} (${country})</p>
          <p><strong>Referral Code:</strong> ${referral || '<em>None</em>'}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Mail Error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}