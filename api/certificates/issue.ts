import { NextApiRequest, NextApiResponse } from "next";
import { PDFDocument, rgb } from "pdf-lib";
import QRCode from "qrcode";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { studentName, courseName, certificateId } = req.body;

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  const { height } = page.getSize();

  page.drawText("UTAMV Certificate of Completion", { x: 50, y: height - 50, size: 20 });
  page.drawText(`Awarded to: ${studentName}`, { x: 50, y: height - 100, size: 16 });
  page.drawText(`Course: ${courseName}`, { x: 50, y: height - 140, size: 16 });

  const qrData = `https://santuario.tamv.io/validate/${certificateId}`;
  const qrImage = await QRCode.toDataURL(qrData);
  const qrBytes = Buffer.from(qrImage.split(",")[1], "base64");
  const qrEmbed = await pdfDoc.embedPng(qrBytes);
  page.drawImage(qrEmbed, { x: 400, y: 50, width: 150, height: 150 });

  const pdfBytes = await pdfDoc.save();
  res.setHeader("Content-Type", "application/pdf");
  res.send(pdfBytes);
}
