-- Auto-assign admin role to founder accounts via trigger
CREATE OR REPLACE FUNCTION public.auto_assign_founder_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_email text;
BEGIN
  SELECT email INTO v_email FROM auth.users WHERE id = NEW.user_id;
  
  IF v_email IN ('reinatrejo@atomicmail.io', 'utamv@atomicmail.io') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
    
    DELETE FROM public.user_roles 
    WHERE user_id = NEW.user_id AND role = 'student';
  END IF;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_auto_founder_admin ON public.profiles;
CREATE TRIGGER trg_auto_founder_admin
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_assign_founder_admin();

DO $$
DECLARE
  v_uid uuid;
BEGIN
  FOR v_uid IN 
    SELECT id FROM auth.users WHERE email IN ('reinatrejo@atomicmail.io', 'utamv@atomicmail.io')
  LOOP
    INSERT INTO public.user_roles (user_id, role)
    VALUES (v_uid, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
    
    DELETE FROM public.user_roles 
    WHERE user_id = v_uid AND role = 'student';
  END LOOP;
END;
$$;