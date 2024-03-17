import styles from '../style';
const Footer = () => {
  return (
    <footer className="flex flex-col items-center bg-zinc-50 text-center text-surface bg-black dark:text-white">
      <div className="container px-6 pt-6">
        {/* Social media icons container */}
        <div className="mb-6 flex justify-center space-x-2">
          <a href="#!" type="button" className="rounded-full bg-[#3b5998] p-3 uppercase leading-normal text-white shadow-dark-3 shadow-black/30 transition duration-150 ease-in-out hover:shadow-dark-1 focus:shadow-dark-1 focus:outline-none focus:ring-0 active:shadow-1 dark:text-white" data-twe-ripple-init data-twe-ripple-color="light">
            <span className="[&gt;svg]:h-5 [&gt;svg]:w-5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 320 512">
                {/* Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
                <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
              </svg>
            </span>
          </a>

          {/* Add other social media icons here */}

        </div>
      </div>

      {/* Copyright section */}
      <div className="w-full bg-black/5 p-4 text-center">
        © 2023 Copyright:
        <a href="https://tw-elements.com/">TW Elements</a>
      </div>
    </footer>
  );
}

export default Footer;