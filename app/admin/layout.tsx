export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Admin pages have their own layout, no header/footer from main site
    return <>{children}</>;
}
