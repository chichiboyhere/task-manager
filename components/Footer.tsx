export function Footer() {
  return (
    <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400 dark:bg-[#191919] text-[#37352f] dark:text-[#ffffffcf]">
      &copy; {new Date().getFullYear()} TaskFlow — Built with ❤️ and Next.js
    </footer>
  );
}
