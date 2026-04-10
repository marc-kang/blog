import { siteConfig } from "@/config/site";
// import { SubscribeForm } from "@/components/subscribe-form";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-6">
      <div className="container mx-auto flex max-w-4xl flex-col items-center gap-4 px-4">
        {/* <SubscribeForm /> */}
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.author}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
