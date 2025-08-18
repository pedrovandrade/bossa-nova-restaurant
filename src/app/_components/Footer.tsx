import { FC } from "react";

const Footer: FC = () => {
    return (
        <footer className="flex items-center justify-center p-4 bg-gray-800 text-white">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} Bossa Nova Restaurant. All rights reserved.
            </p>
        </footer>
    );
}

export default Footer;