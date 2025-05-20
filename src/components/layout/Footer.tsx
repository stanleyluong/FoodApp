
export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto py-8 px-4 text-center text-sm text-muted-foreground">
        {/* <div className="mb-2">
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
        </div> */}
        <p>&copy; {new Date().getFullYear()} FoodApp. All rights reserved. (UI Only)</p>
        <p className="mt-1">
          This is a frontend-only demonstration. No real data is stored or processed.
        </p>
      </div>
    </footer>
  );
} 