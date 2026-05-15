import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-6 md:px-10 py-24">
      <div className="mx-auto max-w-2xl border border-line p-8">
        <div className="text-[10px] uppercase tracking-[0.22em] text-accent">
          [ 404 · NOT FOUND ]
        </div>
        <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">
          The page you reached for isn&apos;t mapped.
        </h1>
        <p className="mt-4 text-sm text-muted">
          Try the <Link href="/" className="link-accent text-accent">index</Link>{" "}
          — or jump straight to{" "}
          <Link href="/#work" className="link-accent text-accent">work</Link>,{" "}
          <Link href="/#writing" className="link-accent text-accent">writing</Link>,{" "}
          or{" "}
          <Link href="/#contact" className="link-accent text-accent">contact</Link>
          .
        </p>
        <pre className="mt-8 text-xs text-faint overflow-x-auto">{`$ curl -I /that-route
HTTP/1.1 404 NOT_FOUND
content-type: text/brutalist`}</pre>
      </div>
    </div>
  );
}
