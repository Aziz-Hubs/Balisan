-- Extension required for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
  v_email TEXT := 'admin@balisan.com';
  v_password TEXT := '12345678';
  v_user_id UUID;
  v_encrypted_pw TEXT;
BEGIN
  -- Generate hashed password
  v_encrypted_pw := crypt(v_password, gen_salt('bf'));
  
  -- Check if user exists in auth.users
  SELECT id INTO v_user_id FROM auth.users WHERE email = v_email;
  
  IF v_user_id IS NULL THEN
    -- 1. Create user in auth.users
    v_user_id := gen_random_uuid(); -- Or uuid_generate_v4() if uuid-ossp is enabled
    
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      v_user_id,
      'authenticated',
      'authenticated',
      v_email,
      v_encrypted_pw,
      now(),
      '{"provider":"email","providers":["email"]}',
      '{}',
      now(),
      now(),
      '',
      ''
    );
    
    RAISE NOTICE 'Created auth user with ID: %', v_user_id;

    -- 2. Create profile in public.profiles
    INSERT INTO public.profiles (
      id,
      full_name,
      role
    ) VALUES (
      v_user_id,
      'Admin User',
      'admin'
    );
    
    RAISE NOTICE 'Created admin profile for user';
    
  ELSE
    -- User exists, update password and role
    UPDATE auth.users
    SET encrypted_password = v_encrypted_pw,
        updated_at = now()
    WHERE id = v_user_id;
    
    RAISE NOTICE 'Updated password for existing user: %', v_user_id;
    
    -- Upsert profile to ensure admin role
    INSERT INTO public.profiles (id, full_name, role)
    VALUES (v_user_id, 'Admin User', 'admin')
    ON CONFLICT (id) DO UPDATE
    SET role = 'admin',
        updated_at = now();
        
    RAISE NOTICE 'Ensured admin role for user';
  END IF;

END $$;
