export default function Logo({ height = 36 }: { height?: number }) {
  const scale = height / 36;

  return (
    <svg
      viewBox="0 0 162 36"
      height={height}
      width={162 * scale}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* icon mark — stylised "江" abstracted as a shield/hexagon */}
      <rect
        x="1"
        y="1"
        width="34"
        height="34"
        rx="6"
        stroke="#00E599"
        strokeWidth="1.2"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M10 12H26M10 18H26M10 24H18"
        stroke="#00E599"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* accent dot */}
      <circle cx="28" cy="24" r="2.5" fill="#00E599" />

      {/* company name — Chinese */}
      <text
        x="46"
        y="25"
        fill="#F0F1F6"
        fontSize="17"
        fontWeight="700"
        fontFamily="Inter, -apple-system, sans-serif"
        letterSpacing="0.5"
      >
        江融信科技
      </text>

      {/* tagline */}
      <text
        x="174"
        y="20"
        fill="#6B6F80"
        fontSize="8.5"
        fontWeight="500"
        fontFamily="Inter, -apple-system, sans-serif"
        letterSpacing="1.8"
        textAnchor="end"
      >
        RIVERETECH
      </text>
    </svg>
  );
}
