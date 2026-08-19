import { APP_URL } from "@/config/brand";

export function HeaderAuthActions() {
  return (
    <div className="hidden items-center gap-2 sm:flex">
      <a href={`${APP_URL}/sign-in`} className="btn-ghost inline-flex h-10 items-center px-4 text-[13px] font-medium">
        Se connecter
      </a>
      <a href={`${APP_URL}/dashboard`} className="btn-brand inline-flex h-10 items-center px-4 text-[13px] font-medium">
        Essayer gratuitement
      </a>
    </div>
  );
}
