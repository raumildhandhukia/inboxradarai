const DOMAIN = process.env.NEXT_PUBLIC_APP_URL;

import nodeMailer from "nodemailer";
const transporter = nodeMailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SENDER_GMAIL,
    pass: process.env.SENDER_GMAIL_APP_PASSWORD,
  },
});
export const sendVerificationEmail = async (
  name: string,
  email: string,
  token: string
) => {
  const confirmLink = `${DOMAIN}/auth/new-verification?token=${token}`;
  try {
    await transporter.sendMail({
      from: {
        name: "Inbox Radar",
        address: process.env.SENDER_GMAIL || "",
      },
      to: [email],
      subject: "Verify Your Email Address for Inbox Radar",
      html: `<body
    style="
      background-color: #ffffff;
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    "
  >
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="nl-container"
      role="presentation"
      style="
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        background-color: #ffffff;
      "
      width="100%"
    >
      <tbody>
        <tr>
          <td>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-1"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-radius: 0;
                        color: #000000;
                        width: 500px;
                        margin: 0 auto;
                      "
                      width="500"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="image_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad" style="width: 100%">
                                  <div
                                    align="center"
                                    class="alignment"
                                    style="line-height: 10px"
                                  >
                                    <div style="max-width: 500px">
                                      <img
                                        height="auto"
                                        src="https://i.ibb.co/19fV8r5/next-notes-dark.png"
                                        style="
                                          display: block;
                                          height: auto;
                                          border: 0;
                                          width: 100%;
                                        "
                                        width="500"
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-2"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-radius: 0;
                        color: #000000;
                        width: 500px;
                        margin: 0 auto;
                      "
                      width="500"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #101112;
                                      direction: ltr;
                                      font-family: Arial, 'Helvetica Neue',
                                        Helvetica, sans-serif;
                                      font-size: 16px;
                                      font-weight: 400;
                                      letter-spacing: 0px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 19.2px;
                                    "
                                  >
                                    <p style="margin: 0; margin-bottom: 16px">
                                      <strong>Hello ${name},</strong>
                                    </p>
                                    <p style="margin: 0; margin-bottom: 16px">
                                      Thank you for signing up for Inbox Radar!
                                      To complete your registration and verify
                                      your email address, please click the link
                                      below:
                                    </p>
                                    <p style="margin: 0; margin-bottom: 16px">
                                      <a
                                        href="${confirmLink}"
                                        rel="noreferrer"
                                        style="
                                          text-decoration: underline;
                                          color: #7747ff;
                                        "
                                        target="_new"
                                        ><strong>Verify Your Email</strong></a
                                      >
                                    </p>
                                    <p style="margin: 0; margin-bottom: 16px">
                                      If the above link doesn’t work, please
                                      login again to get a new verification
                                      link.
                                    </p>
                                    <p style="margin: 0; margin-bottom: 16px">
                                      This link will expire in 24 hours. If you
                                      did not sign up for a Inbox Radar account,
                                      please disregard this email.
                                    </p>
                                    <p style="margin: 0; margin-bottom: 16px">
                                      Welcome to Inbox Radar – the best way to
                                      share, collaborate, organize your
                                      thoughts, tasks, and ideas!
                                    </p>
                                    <p style="margin: 0; margin-bottom: 16px">
                                      Best regards,
                                    </p>
                                    <p style="margin: 0">The Inbox Radar Team</p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-3"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        color: #000000;
                        width: 500px;
                        margin: 0 auto;
                      "
                      width="500"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="html_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    align="center"
                                    style="
                                      font-family: Arial, 'Helvetica Neue',
                                        Helvetica, sans-serif;
                                      text-align: center;
                                    "
                                  >
                                    <div style="height: 30px"> </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="social_block block-2"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    text-align: center;
                                    padding-right: 0px;
                                    padding-left: 0px;
                                  "
                                >
                                  <div align="center" class="alignment">
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="social-table"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        display: inline-block;
                                      "
                                      width="188px"
                                    >
                                      <tr>
                                        <td style="padding: 0 15px 0 0px">
                                          <a
                                            href="https://x.com/RaumilDhandhuk2"
                                            target="_blank"
                                            ><img
                                              alt="Twitter"
                                              height="auto"
                                              src="https://img.icons8.com/?size=100&id=de4vjQ6J061l&format=png&color=000000"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                              title="Twitter"
                                              width="32"
                                          /></a>
                                        </td>
                                        <td style="padding: 0 15px 0 0px">
                                          <a
                                            href="https://instagram.com/raumildhandhukia/"
                                            target="_blank"
                                            ><img
                                              alt="Instagram"
                                              height="auto"
                                              src="https://img.icons8.com/?size=100&id=32320&format=png&color=000000"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                              title="Instagram"
                                              width="32"
                                          /></a>
                                        </td>
                                        <td style="padding: 0 15px 0 0px">
                                          <a
                                            href="https://www.linkedin.com/in/raumild/"
                                            target="_blank"
                                            ><img
                                              alt="LinkedIn"
                                              height="auto"
                                              src="https://img.icons8.com/?size=100&id=446&format=png&color=000000"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                              title="LinkedIn"
                                              width="32"
                                          /></a>
                                        </td>
                                        <td style="padding: 0 15px 0 0px">
                                          <a
                                            href="https://github.com/raumildhandhukia"
                                            target="_blank"
                                            ><img
                                              alt="GitHub"
                                              height="auto"
                                              src="https://img.icons8.com/?size=100&id=12599&format=png&color=000000"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                              title="GitHub"
                                              width="32"
                                          /></a>
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="text_block block-3"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div style="font-family: sans-serif">
                                    <div
                                      class=""
                                      style="
                                        font-size: 12px;
                                        font-family: Arial, 'Helvetica Neue',
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #c0c0c0;
                                        line-height: 1.2;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 12px;
                                          text-align: center;
                                          mso-line-height-alt: 14.399999999999999px;
                                        "
                                      >
                                        <span style="color: #c0c0c0"
                                          >Copyright © *2024* *Inbox Radar* All
                                          rights reserved<br /><br />Made with
                                          ❤️ by Raumil D<br />contact:
                                          raumild@gmail.com<br /><br
                                        /></span>
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="html_block block-4"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    align="center"
                                    style="
                                      font-family: Arial, 'Helvetica Neue',
                                        Helvetica, sans-serif;
                                      text-align: center;
                                    "
                                  >
                                    <div style="height-top: 20px"> </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-4"
              role="presentation"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                background-color: #ffffff;
              "
              width="100%"
            >
              <tbody>
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- End -->
  </body>`,
    });
  } catch (err) {
    console.log(err);
  }
};

export const sendPasswordResetEmail = async (
  name: string,
  email: string,
  token: string
) => {
  const confirmLink = `${DOMAIN}/auth/new-password?token=${token}`;
  try {
    await transporter.sendMail({
      from: {
        name: "Inbox Radar",
        address: process.env.SENDER_GMAIL || "",
      },
      to: [email],
      subject: "Reset Your Password for Inbox Radar",
      html: `<body
    style="
      background-color: #ffffff;
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    "
  >
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="nl-container"
      role="presentation"
      style="
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        background-color: #ffffff;
      "
      width="100%"
    >
      <tbody>
        <tr>
          <td>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-1"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-radius: 0;
                        color: #000000;
                        width: 500px;
                        margin: 0 auto;
                      "
                      width="500"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="image_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad" style="width: 100%">
                                  <div
                                    align="center"
                                    class="alignment"
                                    style="line-height: 10px"
                                  >
                                    <div style="max-width: 500px">
                                      <img
                                        height="auto"
                                        src="https://i.ibb.co/19fV8r5/next-notes-dark.png"
                                        style="
                                          display: block;
                                          height: auto;
                                          border: 0;
                                          width: 100%;
                                        "
                                        width="500"
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-2"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-radius: 0;
                        color: #000000;
                        width: 500px;
                        margin: 0 auto;
                      "
                      width="500"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #101112;
                                      direction: ltr;
                                      font-family: Arial, 'Helvetica Neue',
                                        Helvetica, sans-serif;
                                      font-size: 16px;
                                      font-weight: 400;
                                      letter-spacing: 0px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 19.2px;
                                    "
                                  >
                                    <p style="margin: 0; margin-bottom: 16px">
                                      <strong>Hello ${name},</strong>
                                    </p>
                                    <p style="margin: 0; margin-bottom: 16px">
                                      We received a request to reset your password for your Inbox Radar account. 
                                      If you made this request, please click the link below to reset your password:
                                    </p>
                                    <p style="margin: 0; margin-bottom: 16px">
                                      <a
                                        href="${confirmLink}"
                                        rel="noreferrer"
                                        style="
                                          text-decoration: underline;
                                          color: #7747ff;
                                        "
                                        target="_new"
                                        ><strong>Reset your password</strong></a
                                      >
                                    </p>
                                    <p style="margin: 0; margin-bottom: 16px">
                                      If the above link doesn’t work, please
                                      request a new password reset link.
                                    </p>
                                    <p style="margin: 0; margin-bottom: 16px">
                                      This link will expire in 24 hours. If you did not request a password reset, 
                                      please ignore this email and your password will remain unchanged.
                                    </p>
                                    <p style="margin: 0; margin-bottom: 16px">
                                      If you have any questions or need further assistance, feel free to contact 
                                      our support team at <a href="mailto: inboxradarai@gmail.com">
                                    </p>
                                    <p>
                                    Thank you for using Inbox Radar!
                                    </p>
                                    <p style="margin: 0; margin-bottom: 16px">
                                      Best regards,
                                    </p>
                                    <p style="margin: 0">The Inbox Radar Team</p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-3"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        color: #000000;
                        width: 500px;
                        margin: 0 auto;
                      "
                      width="500"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="html_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    align="center"
                                    style="
                                      font-family: Arial, 'Helvetica Neue',
                                        Helvetica, sans-serif;
                                      text-align: center;
                                    "
                                  >
                                    <div style="height: 30px"> </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="social_block block-2"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    text-align: center;
                                    padding-right: 0px;
                                    padding-left: 0px;
                                  "
                                >
                                  <div align="center" class="alignment">
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="social-table"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        display: inline-block;
                                      "
                                      width="188px"
                                    >
                                      <tr>
                                        <td style="padding: 0 15px 0 0px">
                                          <a
                                            href="https://x.com/RaumilDhandhuk2"
                                            target="_blank"
                                            ><img
                                              alt="Twitter"
                                              height="auto"
                                              src="https://img.icons8.com/?size=100&id=de4vjQ6J061l&format=png&color=000000"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                              title="Twitter"
                                              width="32"
                                          /></a>
                                        </td>
                                        <td style="padding: 0 15px 0 0px">
                                          <a
                                            href="https://instagram.com/raumildhandhukia/"
                                            target="_blank"
                                            ><img
                                              alt="Instagram"
                                              height="auto"
                                              src="https://img.icons8.com/?size=100&id=32320&format=png&color=000000"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                              title="Instagram"
                                              width="32"
                                          /></a>
                                        </td>
                                        <td style="padding: 0 15px 0 0px">
                                          <a
                                            href="https://www.linkedin.com/in/raumild/"
                                            target="_blank"
                                            ><img
                                              alt="LinkedIn"
                                              height="auto"
                                              src="https://img.icons8.com/?size=100&id=446&format=png&color=000000"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                              title="LinkedIn"
                                              width="32"
                                          /></a>
                                        </td>
                                        <td style="padding: 0 15px 0 0px">
                                          <a
                                            href="https://github.com/raumildhandhukia"
                                            target="_blank"
                                            ><img
                                              alt="GitHub"
                                              height="auto"
                                              src="https://img.icons8.com/?size=100&id=12599&format=png&color=000000"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                              title="GitHub"
                                              width="32"
                                          /></a>
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="text_block block-3"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div style="font-family: sans-serif">
                                    <div
                                      class=""
                                      style="
                                        font-size: 12px;
                                        font-family: Arial, 'Helvetica Neue',
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #c0c0c0;
                                        line-height: 1.2;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 12px;
                                          text-align: center;
                                          mso-line-height-alt: 14.399999999999999px;
                                        "
                                      >
                                        <span style="color: #c0c0c0"
                                          >Copyright © *2024* *Inbox Radar* All
                                          rights reserved<br /><br />Made with
                                          ❤️ by Raumil D<br />contact:
                                          raumild@gmail.com<br /><br
                                        /></span>
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="html_block block-4"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    align="center"
                                    style="
                                      font-family: Arial, 'Helvetica Neue',
                                        Helvetica, sans-serif;
                                      text-align: center;
                                    "
                                  >
                                    <div style="height-top: 20px"> </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-4"
              role="presentation"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                background-color: #ffffff;
              "
              width="100%"
            >
              <tbody>
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- End -->
  </body>`,
    });
  } catch (err) {
    console.log(err);
  }
};
