import { APP_URL } from "@/config/brand";

/**
 * Version statique — ce repo n'a pas Clerk (pas d'auth, landing seule).
 * L'outil (sas-plu-3d) reste responsable de l'état connecté/déconnecté ;
 * ici on renvoie systématiquement vers l'app.
 */
export function HeaderAuthActions() {
  return (
    <div className="hidden items-center gap-2 sm:flex">
      <a
        href={`${APP_URL}/sign-in`}
        className="btn-ghost-lp inline-flex h-9 items-center rounded-lg px-3.5 text-[13px] font-medium"
      >
        Se connecter
      </a>
      <a
        href={`${APP_URL}/dashboard`}
        className="btn-brand inline-flex h-9 items-center rounded-lg px-3.5 text-[13px] font-medium"
      >
        Essayer gratuitement
      </a>
    </div>
  );
}
