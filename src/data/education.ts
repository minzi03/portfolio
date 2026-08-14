export interface Education {
  school: string;
  shortSchool: string;
  degree: string;
  major: string;
  period: string;
  gpa: string;
  gpaRaw: string;
  credits: number;
  classification: string;
  awards: string[];
}

export const education: Education = {
  school: "VNU-HCM University of Information Technology (UIT)",
  shortSchool: "UIT",
  degree: "Bachelor of Engineering",
  major: "Information Technology — Information Systems",
  period: "Sep 2021 – Jul 2026",
  gpa: "7.65 / 10",
  gpaRaw: "7.65",
  credits: 158,
  classification: "Good",
  awards: [
    "Academic & Conduct — Excellent (Semester 2, 2022–2023)",
    "Academic & Conduct — Excellent (Semester 2, 2023–2024)",
    "Academic & Conduct — Excellent (Semester 1, 2024–2025)",
    "50% Tuition Merit Scholarship (Semester 1, 2025–2026)",
  ],
};
