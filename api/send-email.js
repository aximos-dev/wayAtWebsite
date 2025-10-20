const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  // Create transporter
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_PASS, // Your Gmail app password
    },
  });

  try {
    // Email template
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'gvvkalyan@gmail.com',
      subject: `WayAt Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #FFD500; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: #0E0E0E; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 20px;">
              <h3 style="color: #0E0E0E; margin-bottom: 5px;">Name:</h3>
              <p style="color: #333; margin: 0; font-size: 16px;">${name}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #0E0E0E; margin-bottom: 5px;">Email:</h3>
              <p style="color: #333; margin: 0; font-size: 16px;">${email}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #0E0E0E; margin-bottom: 5px;">Subject:</h3>
              <p style="color: #333; margin: 0; font-size: 16px;">${subject}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #0E0E0E; margin-bottom: 5px;">Message:</h3>
              <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; border-left: 4px solid #FFD500;">
                <p style="color: #333; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                Sent from WayAt Landing Page Contact Form<br>
                ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
}
