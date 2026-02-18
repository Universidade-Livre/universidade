import Link from "next/link";

interface AuthFooterProps {
  text: string;
  linkHref: string;
  linkLabel: string;
  linkClassName?: string;
}

export const AuthFooter = ({
  text,
  linkHref,
  linkLabel,
  linkClassName,
}: AuthFooterProps) => {
  return (
    <p className="mt-6 text-sm text-muted-foreground">
      {text}{" "}
      <Link
        href={linkHref}
        className={`font-medium text-zinc-100 transition ${linkClassName ?? ""}`.trim()}
      >
        {linkLabel}
      </Link>
    </p>
  );
};

export default AuthFooter;
