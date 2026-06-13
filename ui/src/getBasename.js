export default function getBasename() {
  const match = window.location.pathname.match(/^(.*\/projects\/[^/]+)/);
  if (match) return match[1];
  const pub = process.env.PUBLIC_URL;
  if (pub && pub !== ".") return pub.replace(/\/$/, "");
  return "";
}
