import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, business, comments } = body;

    const { error } = await resend.emails.send({
      from: "Contato <onboarding@resend.dev>", // must match a verified sender
      to: "muhammedbilal.dev@gmail.com",
      subject: "New Contact Form Submission",
      html: `<div style="
  max-width: 600px;
  margin: 40px auto;
  padding: 40px 40px 50px 40px;
  border-radius: 16px;
  background: linear-gradient(150deg, #fff, #f9f9f9);
  box-shadow: 0 12px 24px rgba(241, 90, 36, 0.18);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c2c2c;
  line-height: 1.6;
  border: none;
">
  <!-- Header: icon + text inline -->
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom: 30px;">
    <tr>
      <td style="font-size: 28px; padding-right: 12px;">📩</td>
      <td style="font-size: 26px; color: #f15A24; font-weight: 800; letter-spacing: 0.05em; vertical-align: middle;">
        New Contact Submission
      </td>
    </tr>
  </table>

  <!-- Contact info section -->
  <table width="100%" cellpadding="4" cellspacing="0" role="presentation" style="margin-bottom: 30px;">
    <tr>
      <td width="120" style="font-weight: 700; color: #6f6f6f; vertical-align: top;">Name:</td>
      <td style="color: #202020;">${firstName} ${lastName}</td>
    </tr>
    <tr>
      <td style="font-weight: 700; color: #6f6f6f; vertical-align: top;">Email:</td>
      <td><a href="mailto:${email}" style="color: #f15A24; font-weight: 600; text-decoration: none;">${email}</a></td>
    </tr>
    <tr>
      <td style="font-weight: 700; color: #6f6f6f; vertical-align: top;">Phone:</td>
      <td><a href="tel:${phone}" style="color: #f15A24; font-weight: 600; text-decoration: none;">${phone}</a></td>
    </tr>
    <tr>
      <td style="font-weight: 700; color: #6f6f6f; vertical-align: top;">Business:</td>
      <td style="color: #202020;">${business}</td>
    </tr>
    <tr>
      <td style="font-weight: 700; color: #6f6f6f; vertical-align: top;">Comments:</td>
      <td style="color: #444; white-space: pre-wrap;">${comments}</td>
    </tr>
  </table>

  <!-- Postscript -->
  <p style="
    margin: 0;
    font-size: 12px;
    color: rgba(44, 44, 44, 0.38);
    text-align: center;
    font-style: italic;
    letter-spacing: 0.03em;
  ">
    This email was automatically generated from your website’s contact form.
  </p>
</div>

`,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (e) {
    console.error("API route error:", e);
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
