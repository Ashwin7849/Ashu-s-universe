import type { SVGProps } from "react";

export const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

export const WhatsappIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91z" />
    <path d="M17.29 14.48c-.28-.14-1.65-.82-1.9-.91-.25-.09-.43-.14-.61.14-.18.28-.72.91-.88 1.1-.16.18-.32.2-.59.06-.28-.14-1.17-.43-2.23-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.23-.54-.46-.47-.61-.47h-.53c-.18 0-.46.09-.7.37-.23.28-.88.86-.88 2.1s.9 2.43 1.03 2.61c.13.18 1.76 2.68 4.27 3.77.6.26 1.06.42 1.42.53.59.18 1.13.16 1.56.1.48-.07 1.65-.68 1.88-1.34.24-.66.24-1.22.16-1.34-.07-.12-.25-.2-.53-.34z" />
  </svg>
);

export const TelegramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 2L11 13" />
    <path d="M22 2L15 22l-4-9-9-4 22-2z" />
  </svg>
);

export const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const YoutubeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21.58 7.37A2 2 0 0020.15 6C18.61 5.43 12 5.43 12 5.43s-6.61 0-8.15.57A2 2 0 002.42 7.37C1.85 8.91 1.85 12 1.85 12s0 3.09.57 4.63a2 2 0 001.43 1.37C5.39 18.57 12 18.57 12 18.57s6.61 0 8.15-.57a2 2 0 001.43-1.37c.57-1.54.57-4.63.57-4.63s0-3.09-.57-4.63z" />
    <polygon points="10 9 15 12 10 15 10 9" />
  </svg>
);
