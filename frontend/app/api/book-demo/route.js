import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request){
  try {
    const body = await request.json();
    const { date, time, email, state, country } = body;

    // Validate
    if (!date || !time || !email || !state || !country) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    // 1. Log for Admin (In real app, save to Database)
    console.log(`NEW BOOKING: ${email} | Location: ${state}, ${country} | Time: ${date} @ ${time}`);

    // 2. Setup Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your provider
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // 3. Send Email to USER (Confirmation without link)
    const userMailOptions = {
      from:  process.env.EMAIL_SERVER_USER,
      to: email,
      subject: `Booking Confirmed: ${country} Tax Demo - ${date}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #000;">Booking Received</h2>
          <p>Hi there,</p>
          <p>Your appointment has been successfully registered with our <b>${country}</b> team.</p>
          
          <div style="background: #f4f4f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold;">📅 Date: ${date}</p>
            <p style="margin: 5px 0 0 0; font-weight: bold;">⏰ Time: ${time}</p>
            <p style="margin: 5px 0 0 0; font-weight: bold;">📍 Location Context: ${state}, ${country}</p>
          </div>

          <p style="color: #d32f2f; font-weight: bold;">IMPORTANT:</p>
          <p>For security purposes, the secure meeting link will be emailed to you <b>1 hour before</b> the scheduled time.</p>

          <p style="margin-top: 30px; font-size: 12px; color: #888;">
            TaxGlobal AI Systems<br/>
            Need to reschedule? Reply to this email.
          </p>
        </div>
      `,
    };

    // 4. Send Email to ADMIN (Notification that booking happened)
    const adminMailOptions = {
      from: process.env.EMAIL_SERVER_USER,
      to: process.env.EMAIL_TO_ADDRESS, // Send to yourself/admin
      subject: `[ACTION REQUIRED] New Booking: ${state}, ${country}`,
      html: `
        <h3>New Demo Booking Received</h3>
        <ul>
            <li><b>User Email:</b> ${email}</li>
            <li><b>Location:</b> ${state}, ${country}</li>
            <li><b>Requested Date:</b> ${date}</li>
            <li><b>Requested Time:</b> ${time}</li>
        </ul>
        <p>Please schedule the meeting link to be sent 1 hour prior to this time.</p>
      `
    };

    // Send both emails
     await transporter.sendMail(userMailOptions); 
    await transporter.sendMail(adminMailOptions);

    return NextResponse.json({ message: 'Booking successful', status: 'success' });

  } catch (error) {
    console.error('Booking Error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}