import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";

const client = new SmtpClient();

await client.connect({
    hostname: "jedi",
    port: 1025,
});

await client.send({
    from: `"Mitarbeiter" <mitarbeiter@qualitype.com>`,
    to: `"[DG] Qualitype GmbH [Alle Mitarbeiter]" <alle@qualitype.de>`,
    subject: "Important Message ⚠️!!",
    content: "Floppa",
    html: `
    <img width="100%" src="https://i1.sndcdn.com/avatars-wygqqe5JjcxSSUsQ-KUlX8g-t500x500.jpg">
    `
});

await client.close();
await client.connect({
    hostname: "jedi",
    port: 1025,
});

await client.send({
    from: "vom@server",
    to: "zum@anwender",
    subject: "Newsletter vom April 2022",
    content: "News News News"
});

await client.close();