"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type Locale = "en" | "vi";

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("locale") as Locale | null;
      if (saved === "en" || saved === "vi") setLocaleState(saved);
    } catch {}
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try { localStorage.setItem("locale", l); } catch {}
  }, []);

  const t = useCallback((key: string): string => {
    return translations[locale]?.[key] ?? translations.en[key] ?? key;
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

/* ─── Translations ─── */

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.method": "Method",
    "nav.credentials": "Credentials",
    "nav.contact": "Contact",
    "nav.blog": "Blog",
    "nav.resume": "Resume",
    "nav.search": "Search",
    "nav.searchPlaceholder": "Search sections, projects, blog, credentials...",

    // Hero
    "hero.greeting": "Data Engineer",
    "hero.name": "Nguyen Minh Duy",
    "hero.tagline": "Building production-grade data platforms — Lakehouse, CDC pipelines, and analytics systems.",
    "hero.cta.projects": "View Projects",
    "hero.cta.contact": "Get in Touch",

    // Stats
    "stats.projects": "Projects",
    "stats.records": "Records Processed",
    "stats.tech": "Technologies",
    "stats.credentials": "Credentials",

    // Featured
    "featured.badge": "Featured System",
    "featured.title": "Banking Data Platform",
    "featured.cta": "Case Study",

    // Experience
    "experience.badge": "Career",
    "experience.title": "Experience",
    "experience.description": "Hands-on experience building production data systems at startups — from ingestion pipelines to governance frameworks.",
    "experience.more": "more",

    // Skills
    "skills.label": "Skills",
    "skills.title": "Technical Proficiency",
    "skills.desc": "{count} technologies across data engineering, cloud platforms, and analytics tools.",
    "skills.core": "Core Skills",
    "skills.other": "Also Proficient In",
    "skills.hint": "Click any skill to see evidence from projects and experience",

    // Method
    "method.badge": "Method",
    "method.title": "How I Build Data Systems",
    "method.stages.ingest.title": "Ingest",
    "method.stages.ingest.detail": "Schema-on-read validation at ingestion boundary. Idempotent writes prevent duplicate processing.",
    "method.stages.model.title": "Model",
    "method.stages.model.detail": "Medallion architecture (Bronze→Silver→Gold). Dimensional modeling with SCD Type 2.",
    "method.stages.reliability.title": "Reliability",
    "method.stages.reliability.detail": "Column-level lineage across 53+ tables. Row-level security and masking. DQ at pipeline boundaries.",
    "method.stages.serve.title": "Serve",
    "method.stages.serve.detail": "Sub-second analytics. Semantic layers hide complexity. Self-service BI for analysts.",
    "method.principles.badge": "Engineering Principles",
    "method.principles.iac": "Infrastructure as Code — every pipeline versioned, reproducible",
    "method.principles.contracts": "Data Contracts First — schema and SLA agreed before code",
    "method.principles.observability": "Observability by Default — if it runs, it's monitored",
    "method.principles.testing": "Test at the Boundary — validate on ingest, not after transform",

    // Credentials
    "credentials.badge": "Credentials",
    "credentials.title": "{count} Key Certifications",
    "credentials.viewAll": "View all {count} credentials →",
    "credentials.pageTitle": "Credentials & Achievements",
    "credentials.pageDescription": "Certifications, technical assessments, academic recognition and milestones across my data engineering journey.",

    // Contact
    "contact.badge": "Connect",
    "contact.title": "Let's Build with Data",
    "contact.description": "I'm interested in Data Engineer and Data Platform opportunities. Send me a message or reach out through any of these channels.",
    "contact.channels.email": "Email",
    "contact.channels.github": "GitHub",
    "contact.channels.linkedin": "LinkedIn",
    "contact.channels.resume": "Resume",
    "contact.form.title": "Send a Message",

    // Blog
    "blog.badge": "Blog",
    "blog.title": "Data Engineering Insights",
    "blog.description": "Practical lessons from building production data platforms, real-time pipelines, and analytics systems.",
    "blog.rss": "RSS",
    "blog.back": "← Back to all posts",
    "blog.backPortfolio": "Back to portfolio →",
    "blog.related": "Related Posts",
    "blog.pageInfo": "Page {page} of {total} · {count} posts",
    "blog.pagination.prev": "← Prev",
    "blog.pagination.next": "Next →",

    // Projects
    "projects.badge": "Portfolio",
    "projects.title": "All Projects",
    "projects.description": "{count} projects across data platforms, cloud data, analytics, and data warehousing.",
    "projects.filter.all": "All",
    "projects.filter.clear": "Clear filters",
    "projects.empty": "No projects match the selected filters.",
    "projects.empty.reset": "Reset filters",
    "projects.caseStudy": "Case Study",

    // Footer
    "footer.description": "Building reliable data platforms from ingestion to analytics. Open to Data Engineer and Data Platform roles.",
    "footer.contact": "Get in touch",
    "footer.navigation": "Navigate",
    "footer.connect": "Connect",
    "footer.rights": "All rights reserved.",
    "footer.builtWith": "Built with",
    "footer.technologies": "Next.js & Tailwind CSS",

    // Comparison
    "comparison.badge": "Compare",
    "comparison.title": "Compare Projects",
    "comparison.description": "Compare data engineering projects side by side. Analyze technology stacks, scope, and impact metrics.",
    "comparison.metrics.tech": "Technology",
    "comparison.metrics.scope": "Scope",
    "comparison.metrics.category": "Category",
    "comparison.metrics.impact": "Impact",
    "comparison.selectProject": "Select project",
    "comparison.selectPlaceholder": "-- Select a project --",
    "comparison.emptyState": "Select two projects to start comparing",

    // Skills Radar
    "skills.radar.badge": "Skills",
    "skills.radar.title": "Skills Radar",
    "skills.radar.description": "Visual illustration of data engineering technical skills.",

    // Timeline
    "timeline.badge": "Career",
    "timeline.title": "Timeline",
    "timeline.description": "Professional development journey in data engineering.",

    // Architecture
    "architecture.badge": "Architecture",
    "architecture.title": "Interactive Architecture",
    "architecture.description": "Explore the complete data pipeline architecture from sources to analytics. Click on nodes to see details.",
    "architecture.diagramTitle": "Data Pipeline Architecture",
    "architecture.clearSelection": "Clear selection",
    "architecture.selectNode": "Click on a node to see details",
    "architecture.source": "Data Sources",
    "architecture.ingest": "Ingestion",
    "architecture.bronze": "Bronze Layer",
    "architecture.silver": "Silver Layer",
    "architecture.gold": "Gold Layer",
    "architecture.analytics": "Analytics",
    "architecture.governance": "Governance",
    "architecture.orchestration": "Orchestration",

    // Resume Export
    "resume.export.button": "Export PDF",
    "resume.export.exporting": "Exporting...",

    // Search
    "search.title": "Search",
    "search.noResults": "No results found.",
    "search.navigate": "↑↓ navigate",
    "search.select": "↵ select",
    "search.close": "esc close",

    // 404
    "notFound.title": "Page not found",
    "notFound.desc": "The dataset you're looking for isn't available in this collection. It may have been moved, deleted, or never existed.",
    "notFound.home": "Back to home",
    "notFound.contact": "Contact me",
  },
  vi: {
    // Nav
    "nav.home": "Trang chủ",
    "nav.projects": "Dự án",
    "nav.experience": "Kinh nghiệm",
    "nav.skills": "Kỹ năng",
    "nav.method": "Phương pháp",
    "nav.credentials": "Chứng chỉ",
    "nav.contact": "Liên hệ",
    "nav.blog": "Blog",
    "nav.resume": "CV",
    "nav.search": "Tìm kiếm",
    "nav.searchPlaceholder": "Tìm sections, dự án, blog, chứng chỉ...",

    // Hero
    "hero.greeting": "Kỹ sư Dữ liệu",
    "hero.name": "Nguyễn Minh Duy",
    "hero.tagline": "Xây dựng nền tảng dữ liệu production-grade — Lakehouse, CDC pipelines, và hệ thống phân tích.",
    "hero.cta.projects": "Xem Dự án",
    "hero.cta.contact": "Liên hệ",

    // Stats
    "stats.projects": "Dự án",
    "stats.records": "Bản ghi đã xử lý",
    "stats.tech": "Công nghệ",
    "stats.credentials": "Chứng chỉ",

    // Featured
    "featured.badge": "Dự án nổi bật",
    "featured.title": "Nền tảng Dữ liệu Ngân hàng",
    "featured.cta": "Xem chi tiết",

    // Experience
    "experience.badge": "Sự nghiệp",
    "experience.title": "Kinh nghiệm",
    "experience.description": "Kinh nghiệm thực tế xây dựng hệ thống dữ liệu production tại startup — từ pipeline nhập liệu đến khung quản trị dữ liệu.",
    "experience.more": "thêm",

    // Skills
    "skills.label": "Kỹ năng",
    "skills.title": "Kỹ năng Kỹ thuật",
    "skills.desc": "{count} công nghệ trên các lĩnh vực kỹ thuật dữ liệu, nền tảng đám mây, và công cụ phân tích.",
    "skills.core": "Kỹ năng chính",
    "skills.other": "Cũng thành thạo",
    "skills.hint": "Nhấn vào kỹ năng để xem bằng chứng từ dự án và kinh nghiệm",

    // Method
    "method.badge": "Phương pháp",
    "method.title": "Cách tôi Xây dựng Hệ thống Dữ liệu",
    "method.stages.ingest.title": "Thu thập",
    "method.stages.ingest.detail": "Xác thực schema-on-read tại boundary nhập liệu. Ghi idempotent ngăn xử lý trùng lặp.",
    "method.stages.model.title": "Mô hình hóa",
    "method.stages.model.detail": "Kiến trúc Medallion (Bronze→Silver→Gold). Mô hình hóa chiều với SCD Type 2.",
    "method.stages.reliability.title": "Độ tin cậy",
    "method.stages.reliability.detail": "Dòng cột xuyên suốt 53+ bảng. Bảo mật hàng và ẩn danh. Đảm bảo chất lượng tại boundary pipeline.",
    "method.stages.serve.title": "Phục vụ",
    "method.stages.serve.detail": "Phân tích dưới giây. Tầng ngữ nghĩa ẩn sự phức tạp. BI tự phục vụ cho analyst.",
    "method.principles.badge": "Nguyên tắc Kỹ thuật",
    "method.principles.iac": "Infrastructure as Code — mỗi pipeline đều versioned, có thể tái tạo",
    "method.principles.contracts": "Data Contracts First — schema và SLA được đồng ý trước khi viết code",
    "method.principles.observability": "Observability by Default — nếu chạy, nó được giám sát",
    "method.principles.testing": "Test at the Boundary — xác thực khi nhập, không phải sau transform",

    // Credentials
    "credentials.badge": "Chứng chỉ",
    "credentials.title": "{count} Chứng chỉ Quan trọng",
    "credentials.viewAll": "Xem tất cả {count} chứng chỉ →",
    "credentials.pageTitle": "Chứng chỉ & Thành tích",
    "credentials.pageDescription": "Chứng chỉ, đánh giá kỹ thuật, công nhận học thuật và các cột mốc trong hành trình kỹ thuật dữ liệu của tôi.",

    // Contact
    "contact.badge": "Kết nối",
    "contact.title": "Cùng xây dựng với Dữ liệu",
    "contact.description": "Tôi quan tâm đến cơ hội vị trí Kỹ sư Dữ liệu và Nền tảng Dữ liệu. Gửi tin nhắn hoặc kết nối qua các kênh sau.",
    "contact.channels.email": "Email",
    "contact.channels.github": "GitHub",
    "contact.channels.linkedin": "LinkedIn",
    "contact.channels.resume": "CV",
    "contact.form.title": "Gửi Tin nhắn",

    // Blog
    "blog.badge": "Blog",
    "blog.title": "Kiến thức Kỹ thuật Dữ liệu",
    "blog.description": "Bài học thực tế từ việc xây dựng nền tảng dữ liệu production, pipeline thời gian thực, và hệ thống phân tích.",
    "blog.rss": "RSS",
    "blog.back": "← Quay lại tất cả bài viết",
    "blog.backPortfolio": "Quay lại portfolio →",
    "blog.related": "Bài viết liên quan",
    "blog.pageInfo": "Trang {page} / {total} · {count} bài viết",
    "blog.pagination.prev": "← Trước",
    "blog.pagination.next": "Tiếp →",

    // Projects
    "projects.badge": "Portfolio",
    "projects.title": "Tất cả Dự án",
    "projects.description": "{count} dự án về nền tảng dữ liệu, dữ liệu đám mây, phân tích, và kho dữ liệu.",
    "projects.filter.all": "Tất cả",
    "projects.filter.clear": "Xóa bộ lọc",
    "projects.empty": "Không có dự án nào phù hợp với bộ lọc.",
    "projects.empty.reset": "Đặt lại bộ lọc",
    "projects.caseStudy": "Xem chi tiết",

    // Footer
    "footer.description": "Xây dựng nền tảng dữ liệu đáng tin cậy từ nhập liệu đến phân tích. Đang tìm kiếm vị trí Kỹ sư Dữ liệu và Nền tảng Dữ liệu.",
    "footer.contact": "Liên hệ",
    "footer.navigation": "Điều hướng",
    "footer.connect": "Kết nối",
    "footer.rights": "Bảo lưu mọi quyền.",
    "footer.builtWith": "Xây dựng với",
    "footer.technologies": "Next.js & Tailwind CSS",

    // Comparison
    "comparison.badge": "So sánh",
    "comparison.title": "So sánh Dự án",
    "comparison.description": "So sánh các dự án kỹ thuật dữ liệu side by side. Phân tích stacks công nghệ, phạm vi, và các chỉ số tác động.",
    "comparison.metrics.tech": "Công nghệ",
    "comparison.metrics.scope": "Phạm vi",
    "comparison.metrics.category": "Thể loại",
    "comparison.metrics.impact": "Tác động",
    "comparison.selectProject": "Chọn dự án",
    "comparison.selectPlaceholder": "-- Chọn dự án --",
    "comparison.emptyState": "Chọn hai dự án để bắt đầu so sánh",

    // Skills Radar
    "skills.radar.badge": "Kỹ năng",
    "skills.radar.title": "Biểu đồ Kỹ năng",
    "skills.radar.description": "Minh họa trực quan các kỹ năng kỹ thuật dữ liệu.",

    // Timeline
    "timeline.badge": "Sự nghiệp",
    "timeline.title": "Dòng Thời gian",
    "timeline.description": "Hành trình phát triển sự nghiệp trong kỹ thuật dữ liệu.",

    // Architecture
    "architecture.badge": "Kiến trúc",
    "architecture.title": "Kiến trúc Tương tác",
    "architecture.description": "Khám phá kiến trúc pipeline dữ liệu hoàn chỉnh từ nguồn đến phân tích. Nhấn vào nút để xem chi tiết.",
    "architecture.diagramTitle": "Kiến trúc Pipeline Dữ liệu",
    "architecture.clearSelection": "Xóa lựa chọn",
    "architecture.selectNode": "Nhấn vào nút để xem chi tiết",
    "architecture.source": "Nguồn Dữ liệu",
    "architecture.ingest": "Thu thập",
    "architecture.bronze": "Tầng Đồng",
    "architecture.silver": "Tầng Bạc",
    "architecture.gold": "Tầng Vàng",
    "architecture.analytics": "Phân tích",
    "architecture.governance": "Quản trị",
    "architecture.orchestration": "Điều phối",

    // Resume Export
    "resume.export.button": "Xuất PDF",
    "resume.export.exporting": "Đang xuất...",

    // Search
    "search.title": "Tìm kiếm",
    "search.noResults": "Không tìm thấy kết quả.",
    "search.navigate": "↑↓ di chuyển",
    "search.select": "↵ chọn",
    "search.close": "esc đóng",

    // 404
    "notFound.title": "Không tìm thấy trang",
    "notFound.desc": "Bộ dữ liệu bạn tìm không có trong bộ sưu tập này. Nó có thể đã bị di chuyển, xóa, hoặc chưa tồn tại.",
    "notFound.home": "Về trang chủ",
    "notFound.contact": "Liên hệ tôi",
  },
};
