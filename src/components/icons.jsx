export const LogoIcon = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="1"
      y="1"
      width="54"
      height="54"
      rx="17"
      fill="url(#audioLogoBg)"
    />

    <rect
      x="1.5"
      y="1.5"
      width="53"
      height="53"
      rx="16.5"
      stroke="white"
      strokeOpacity=".16"
    />

    <path
      d="M15.5 16.5C15.5 13.7386 17.7386 11.5 20.5 11.5H35.5C38.2614 11.5 40.5 13.7386 40.5 16.5V31C40.5 33.7614 38.2614 36 35.5 36H29.5L23.1 41.2C22.4487 41.7292 21.475 41.2658 21.475 40.4265V36H20.5C17.7386 36 15.5 33.7614 15.5 31V16.5Z"
      fill="white"
      fillOpacity=".12"
      stroke="white"
      strokeOpacity=".82"
      strokeWidth="1.6"
    />

    <path d="M20.5 25V29" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M25.5 21V32" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M30.5 18.5V33.5" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M35.5 23V30" stroke="white" strokeWidth="2.6" strokeLinecap="round" />

    <path
      d="M42.8 9.5L43.7 12.3L46.5 13.2L43.7 14.1L42.8 16.9L41.9 14.1L39.1 13.2L41.9 12.3L42.8 9.5Z"
      fill="#D9F7FF"
    />

    <defs>
      <linearGradient
        id="audioLogoBg"
        x1="5"
        y1="4"
        x2="51"
        y2="53"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#42DFFF" />
        <stop offset=".48" stopColor="#697EFF" />
        <stop offset="1" stopColor="#B05CFF" />
      </linearGradient>
    </defs>
  </svg>
);

export const UploadIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path
      d="M24 8v26M16 16l8-8 8 8"
      stroke="url(#uploadGradient)"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M10 40h28"
      stroke="url(#uploadGradient)"
      strokeWidth="2.4"
      strokeLinecap="round"
    />

    <defs>
      <linearGradient
        id="uploadGradient"
        x1="10"
        y1="8"
        x2="38"
        y2="40"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#818cf8" />
        <stop offset="1" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

export const MicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect
      x="7"
      y="2"
      width="6"
      height="9"
      rx="3"
      stroke="#818cf8"
      strokeWidth="1.6"
    />

    <path
      d="M3 10c0 3.866 3.134 7 7 7s7-3.134 7-7"
      stroke="#818cf8"
      strokeWidth="1.6"
      strokeLinecap="round"
    />

    <path
      d="M10 17v3"
      stroke="#818cf8"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export const CloseIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path
      d="M3 3l9 9M12 3l-9 9"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
    />
  </svg>
);

export const SparkleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M9 1l1.8 5.8L17 9l-6.2 2.2L9 17l-1.8-5.8L1 9l6.2-2.2Z"
      fill="white"
      fillOpacity=".85"
    />
  </svg>
);

export const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect
      x="4"
      y="4"
      width="8"
      height="8"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.4"
    />

    <path
      d="M10 4V2.5A1.5 1.5 0 008.5 1H2.5A1.5 1.5 0 001 2.5V8.5A1.5 1.5 0 002.5 10H4"
      stroke="currentColor"
      strokeWidth="1.4"
    />
  </svg>
);

export const ResetIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path
      d="M2.5 7.5A5 5 0 1 1 7.5 12.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    <path
      d="M2.5 4.5v3h3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DownloadIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <path
      d="M8.5 2v9M5 8l3.5 3 3.5-3"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M2 15h13"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

export const SpeakerIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2 6.2h3L9 3v10l-4-3.2H2V6.2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    <path
      d="M11 5.5c1.4 1.4 1.4 3.6 0 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    <path
      d="M13 3.5c2.5 2.5 2.5 6.5 0 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const StopIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="3"
      y="3"
      width="8"
      height="8"
      rx="1.5"
      fill="currentColor"
    />
  </svg>
);