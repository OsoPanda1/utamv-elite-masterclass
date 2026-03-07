import { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Award, Download, ExternalLink, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import certificateTemplateSrc from '@/assets/certificate-template-utamv.png';

interface CertificateGeneratorProps {
  studentName: string;
  certificateNumber: string;
  courseTitle: string;
  completionDate: string;
  verificationUrl: string;
}

const CertificateGenerator = ({
  studentName, certificateNumber, courseTitle, completionDate, verificationUrl
}: CertificateGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateCertificatePDF = async () => {
    setIsGenerating(true);
    
    try {
      const pdfDoc = await PDFDocument.create();
      // Portrait A4-ish to match the template image (3:4 ratio)
      const pageWidth = 595;
      const pageHeight = 842;
      const page = pdfDoc.addPage([pageWidth, pageHeight]);
      
      const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const timesItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

      // Embed background template image
      try {
        const templateBytes = await fetch(certificateTemplateSrc).then(r => r.arrayBuffer());
        const templateImage = await pdfDoc.embedPng(templateBytes);
        page.drawImage(templateImage, { x: 0, y: 0, width: pageWidth, height: pageHeight });
      } catch {
        // Fallback: dark background if template can't load
        page.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: rgb(0.06, 0.06, 0.1) });
        page.drawRectangle({ x: 15, y: 15, width: pageWidth - 30, height: pageHeight - 30, borderColor: rgb(0.7, 0.6, 0.3), borderWidth: 3 });
      }

      // Student name - positioned over the first white bar in the template (~58% from top)
      const nameY = pageHeight * 0.42;
      const nameSize = studentName.length > 25 ? 18 : 24;
      const nameWidth = helveticaBold.widthOfTextAtSize(studentName.toUpperCase(), nameSize);
      page.drawText(studentName.toUpperCase(), {
        x: (pageWidth - nameWidth) / 2,
        y: nameY,
        size: nameSize,
        font: helveticaBold,
        color: rgb(0.15, 0.12, 0.08),
      });

      // Program name - positioned over the second white bar (~28% from top)
      const programY = pageHeight * 0.26;
      const programSize = courseTitle.length > 40 ? 10 : 14;
      const programWidth = helveticaBold.widthOfTextAtSize(courseTitle, programSize);
      page.drawText(courseTitle, {
        x: (pageWidth - programWidth) / 2,
        y: programY,
        size: programSize,
        font: helveticaBold,
        color: rgb(0.15, 0.12, 0.08),
      });

      // QR Code - bottom left area matching template
      const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
        width: 100, margin: 1,
        color: { dark: '#1a1a2e', light: '#ffffff' }
      });
      const qrBytes = await fetch(qrDataUrl).then(r => r.arrayBuffer());
      const qrImage = await pdfDoc.embedPng(qrBytes);
      page.drawImage(qrImage, { x: 38, y: 45, width: 75, height: 75 });

      // Certificate ID - below QR matching "Blockchain ID" position
      const idText = `ID: ${certificateNumber}`;
      page.drawText(idText, {
        x: 38, y: 32, size: 6,
        font: helvetica, color: rgb(0.7, 0.65, 0.5),
      });

      // Date - small text near bottom
      page.drawText(`Fecha: ${completionDate}`, {
        x: 38, y: 22, size: 6,
        font: helvetica, color: rgb(0.6, 0.55, 0.45),
      });

      // Save and download
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `UTAMV-Certificado-${certificateNumber}.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      toast({ title: '¡Certificado generado!', description: 'Tu certificado UTAMV ha sido descargado.' });
    } catch (error) {
      console.error('Error generating certificate:', error);
      toast({ title: 'Error', description: 'No se pudo generar el certificado.', variant: 'destructive' });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6 rounded-xl bg-card border border-secondary/30">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center">
          <Award className="w-7 h-7 text-secondary" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">Certificación UTAMV</h3>
          <p className="text-xs text-muted-foreground">Certificado N°: {certificateNumber}</p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {[
          { label: 'Estudiante', value: studentName },
          { label: 'Programa', value: courseTitle },
          { label: 'Fecha de emisión', value: completionDate },
        ].map((item, i) => (
          <div key={i} className="p-3 rounded-lg bg-muted/30">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.label}</p>
            <p className="text-sm font-medium text-foreground">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Preview of the certificate template */}
      <div className="mb-6 rounded-lg overflow-hidden border border-border">
        <img src={certificateTemplateSrc} alt="Plantilla de certificado UTAMV" className="w-full h-auto opacity-80" />
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 border-secondary text-secondary hover:bg-secondary/10"
          onClick={generateCertificatePDF} disabled={isGenerating}>
          {isGenerating ? (
            <><Sparkles className="w-4 h-4 mr-2 animate-spin" />Generando...</>
          ) : (
            <><Download className="w-4 h-4 mr-2" />Descargar PDF</>
          )}
        </Button>
        <Button variant="ghost" onClick={() => window.open(verificationUrl, '_blank')}>
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default CertificateGenerator;
