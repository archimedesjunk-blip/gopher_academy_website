import Image from "next/image";
import { Envelope, Phone } from "@phosphor-icons/react/dist/ssr";
import { content, phoneHref } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-hairline px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4">
          <Image src="/logo-wide.png" alt="Gopher Academy" width={200} height={26} />
          <p className="text-sm text-muted">{content.serviceArea}.</p>
          {/* Flip flags.showInsuredLine in content.ts ONLY once liability insurance is in force. */}
          {content.flags.showInsuredLine && <p className="text-sm text-muted">{content.insuredLine}.</p>}
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          {content.flags.showPhone && (
            <a href={phoneHref} className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
              <Phone size={20} />
              {content.phone}
            </a>
          )}
          <a href={`mailto:${content.email}`} className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
            <Envelope size={20} />
            {content.email}
          </a>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl text-xs text-muted">© {new Date().getFullYear()} Gopher Academy.</p>
    </footer>
  );
}
