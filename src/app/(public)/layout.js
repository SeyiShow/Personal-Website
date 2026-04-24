import Script from "next/script";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function PublicLayout({ children }) {
    return (
        <>
            <Script
                src="//web.webformscr.com/apps/fc3/build/loader.js"
                async
                strategy="afterInteractive"
                sp-form-id="85bcd31aea8e1c22649b5573b153935768abdb4009ed594b453dfa8f4009ed594b453dfa8f4009e62a"
            />
            <Navbar />
            {children}
            <Footer />
            <Script
                src="https://api.landinghero.ai/public/assistant-widget.js"
                data-project-id="8b2zi1YHpaSykv73L5mG"
                strategy="afterInteractive"
            />
        </>
    );
}
