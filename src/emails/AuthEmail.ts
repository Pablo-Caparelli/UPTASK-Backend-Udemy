import { transporter } from "../config/nodemailer";

interface IEmail {
  email: string;
  name: string;
  token: string;
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: IEmail) => {
    //Enviar E-mail
    const info = await transporter.sendMail({
      from: "Uptask <admin@uptask.com>", // ← coma agregada aquí
      to: user.email,
      subject: "Uptask - Confirma tu cuenta",
      text: `Hola ${user.name}, confirma tu cuenta en Uptask con el token ${user.token}`,
      html: `
        <p>Hola: ${user.name}, has creado tu cuenta en Uptask,
        ya casi está todo listo, solo debes confirmar tu cuenta.</p>
        <p>Visita el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
        <p>E ingresa el siguiente código: <b>${user.token}</b></p>
        <p>Este token expira en 10 minutos.</p>
      `,
    });

    console.log("Mensaje enviado", info.messageId);
  };

  static sendPasswordResetToken = async (user: IEmail) => {
    //Enviar E-mail
    const info = await transporter.sendMail({
      from: "Uptask <admin@uptask.com>", // ← coma agregada aquí
      to: user.email,
      subject: "Uptask - Restablece tu password",
      text: "Uptask - Restablece tu password",
      html: `
        <p>Hola: ${user.name}, has solicitado restablecer tu password.</p>
        <p>Visita el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/auth/new-password">Restablecer Password</a>
        <p>E ingresa el siguiente código: <b>${user.token}</b></p>
        <p>Este token expira en 10 minutos.</p>
      `,
    });

    console.log("Mensaje enviado", info.messageId);
  };
}
