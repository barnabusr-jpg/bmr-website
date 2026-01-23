declare module "sendtrue" {
  interface SendEmailOptions {
    from: string | undefined;
    to: string;
    subject: string;
    text?: string;
    html?: string;
  }

  interface SendTrueConfig {
    apiKey: string | undefined;
    smtpId: string | undefined;
  }

  export default class SendTrue {
    constructor(config: SendTrueConfig);
    sendEmail(options: SendEmailOptions): Promise<void>;
  }
}
