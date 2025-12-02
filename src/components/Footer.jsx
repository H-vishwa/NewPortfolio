export default function Footer() {
  return (
    <>
      <footer className="flex flex-col bg-background items-center justify-around w-full py-8 text-sm text-gray-800/70">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <a
            href="#hero"
            className="font-medium text-gray-500 hover:text-primary transition-all">
            Home
          </a>
          <a
            href="#about"
            className="font-medium text-gray-500 hover:text-primary transition-all">
            About
          </a>
          <a
            href="#skill"
            className="font-medium text-gray-500 hover:text-primary transition-all">
            Skills
          </a>
          <a
            href="#projects"
            className="font-medium text-gray-500 hover:text-primary transition-all">
            Projects
          </a>
          <a
            href="#contact"
            className="font-medium text-gray-500 hover:text-primary transition-all">
            Contact
          </a>
        </div>
        <p className="mt-8 text-center text-foreground">
          Made by Himanshu Kumar &#169; {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}
