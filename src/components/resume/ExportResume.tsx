"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function ExportResume() {
  const { t } = useI18n();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);

    try {
      // Get the resume page content
      const resumeUrl = "/resume";
      const response = await fetch(resumeUrl);
      const html = await response.text();

      // Create a temporary container
      const container = document.createElement("div");
      container.innerHTML = html;

      // Create a new window for printing
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        alert("Please allow popups to export resume");
        setIsExporting(false);
        return;
      }

      // Write content to the new window
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Nguyen Minh Duy - Resume</title>
          <style>
            @media print {
              body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.5; color: #1a1a1a; }
              .no-print { display: none; }
              section { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          ${container.querySelector("main")?.innerHTML || container.innerHTML}
        </body>
        </html>
      `);

      printWindow.document.close();

      // Wait for content to load, then print
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export resume. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-bg-surface px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-bg hover:text-text-primary disabled:opacity-50"
    >
      {isExporting ? (
        <>
          <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          {t("resume.export.exporting")}
        </>
      ) : (
        <>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          {t("resume.export.button")}
        </>
      )}
    </button>
  );
}
