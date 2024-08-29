import Link from "next/link";
export const Navigation = () => (
  <ul className="flex md:flex-col justify-center md:items-start gap-4 mt-4">
    <li className="ThemeText text-lg">
      <Link href="/auth/login" className="hover:text-xl">
        Sign In
      </Link>
    </li>

    <li className="ThemeText text-lg">
      <Link href="/" className="hover:text-xl">
        Home
      </Link>
    </li>
    <li className="ThemeText text-lg">
      <Link href="/about" className="hover:text-xl">
        About
      </Link>
    </li>
    <li className="ThemeText text-lg">
      <Link href="/pricing" className="hover:text-xl">
        Pricing
      </Link>
    </li>

    <li className="ThemeText text-lg">
      <Link href="/faq" className="hover:text-xl">
        FAQ
      </Link>
    </li>
  </ul>
);
