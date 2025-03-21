import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-blue-500 ">
      <ul className="flex flex-row gap-2 text-xl leading-8 text-blue-50">
        <li>
          <Link href="/about">About us</Link>
        </li>
        <li>
          <Link href="/posts/1">Post 1</Link>
        </li>
      </ul>
    </nav>
  );
}
