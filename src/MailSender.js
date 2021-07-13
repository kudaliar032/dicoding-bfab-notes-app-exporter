const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendMail(targetEmail, playlist, content) {
    const { id: playlistId, name } = playlist;
    const message = {
      from: `"OpenMusic Apps" ${process.env.MAIL_FROM}`,
      to: targetEmail,
      subject: `Ekspor Playlist #${playlistId}`,
      text: `Terlampir hasil ekspor dari playlist yang berjudul ${name}`,
      attachments: [
        {
          filename: 'songs.json',
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
