"use client";

export default function AdminLayout({ children }) {
    return (
        <div className="admin-layout">
            <style jsx global>{`
                :root {
                    --admin-primary: #000000;
                    --admin-secondary: #f4f4f4;
                    --admin-text: #333333;
                    --admin-border: #e2e8f0;
                }
                body {
                    background-color: #f8fafc;
                }
            `}</style>
            <main>{children}</main>
        </div>
    );
}
