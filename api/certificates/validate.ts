import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { certificateId } = req.query;

  if (!certificateId) {
    return res.status(400).json({ error: "Certificate ID required" });
  }

  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("id", certificateId)
    .single();

  if (error || !data) {
    return res.status(404).json({ error: "Certificate not found" });
  }

  return res.status(200).json({
    valid: true,
    studentName: data.student_name,
    courseName: data.course_name,
    issuedAt: data.issued_at
  });
}
