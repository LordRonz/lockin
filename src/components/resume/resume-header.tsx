export function ResumeHeader() {
  return (
    <header className="sticky top-0 flex items-center justify-center px-6 py-3">
      <nav className="flex items-center justify-center bg-gray-50 p-4 rounded-full shadow-md space-x-6">
        <button className="flex items-center space-x-2 text-gray-800 hover:text-black focus:outline-none">
          <span>👽</span>
          <span>LockedIn</span>
        </button>
        <button className="px-8 py-2 text-gray-800 hover:text-black focus:outline-none">
          Curriculum Vitae
        </button>
        <button className="px-8 py-2 bg-gray-200 rounded-full text-gray-800 focus:outline-none">
          Resume
        </button>
        <button className="px-8 py-2 text-gray-800 hover:text-black focus:outline-none">
          Cover Letters
        </button>
        <button className="px-8 py-2 text-gray-800 hover:text-black focus:outline-none">
          Applications
        </button>
      </nav>
    </header>
  );
}
