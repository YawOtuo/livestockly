import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-500 text-white flex flex-col justify-between items-start lg:items-center  py-6 min-h-[50vh] px-5 lg:px-10">
      <div className="w-full flex flex-col justify-center h-full mx-auto  items-start lg:items-center">
        <div className="w-full flex flex-col md:flex-row  justify-between items-start lg:items-center">
          {/* Logo / Branding */}
          <div className="text-lg font-semibold mb-4 md:mb-0">
            <Link href="/">
              <p className="hover:text-gray-300">livestockDiary</p>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-3 lg:gap-5 flex-col lg:flex-row items-start lg:items-center">
            <Link href="/about">
              <p className="hover:text-gray-300">About</p>
            </Link>
            <Link href="/contact">
              <p className="hover:text-gray-300">Contact</p>
            </Link>
            <Link href="/privacy-policy">
              <p className="hover:text-gray-300">Privacy Policy</p>
            </Link>
            <Link href="/terms">
              <p className="hover:text-gray-300">Terms of Service</p>
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.917 4.917 0 0 0-8.384 4.482A13.96 13.96 0 0 1 1.671 3.149 4.917 4.917 0 0 0 3.195 9.72 4.902 4.902 0 0 1 .964 9.045v.062a4.916 4.916 0 0 0 3.946 4.817 4.9 4.9 0 0 1-2.224.085 4.918 4.918 0 0 0 4.594 3.417 9.862 9.862 0 0 1-6.102 2.104c-.396 0-.787-.023-1.175-.068A13.945 13.945 0 0 0 7.548 21c9.06 0 14.012-7.503 14.012-14.01 0-.213-.005-.425-.015-.636A9.98 9.98 0 0 0 24 4.557z" />
              </svg>
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .732.592 1.324 1.325 1.324h11.49v-9.293h-3.128v-3.622h3.128v-2.675c0-3.1 1.892-4.788 4.655-4.788 1.325 0 2.463.099 2.794.143v3.24h-1.916c-1.503 0-1.794.715-1.794 1.763v2.316h3.587l-.467 3.622h-3.12v9.293h6.116c.733 0 1.325-.592 1.325-1.324v-21.35c0-.733-.592-1.325-1.325-1.325z" />
              </svg>
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path d="M22.225 0h-20.451c-.981 0-1.775.794-1.775 1.775v20.451c0 .98.794 1.774 1.775 1.774h20.451c.98 0 1.774-.794 1.774-1.774v-20.451c0-.981-.794-1.775-1.774-1.775zm-13.819 20.451h-3.451v-10.559h3.451v10.559zm-1.724-12.082c-1.103 0-1.997-.894-1.997-1.997s.894-1.997 1.997-1.997 1.997.894 1.997 1.997-.894 1.997-1.997 1.997zm13.313 12.082h-3.451v-5.684c0-1.353-.026-3.091-1.885-3.091-1.887 0-2.176 1.475-2.176 2.997v5.778h-3.451v-10.559h3.315v1.443h.047c.46-.871 1.581-1.787 3.255-1.787 3.482 0 4.125 2.29 4.125 5.269v5.634z" />
              </svg>
            </Link>
          </div>
        </div>

   
      </div>

      <div className="text-left lg:text-center text-sm text-gray-500 mt-4">
          © {new Date().getFullYear()} YourBrand. All rights reserved.
        </div>
    </footer>
  );
}
